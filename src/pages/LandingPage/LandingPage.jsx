import './LandingPage.scss';
import Header from '../../components/Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setSearchedUserData } from '../../store/actions/searchedUserAction';



const LandingPage = ({ API_URL, isLoggedIn, setSearchedUserData, searchedUserData }) => {
    const navigate = useNavigate();

    const [searchCredential, setSearchCredential] = useState({
        search: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        setSearchCredential({
            ...searchCredential,
            [event.target.name]: event.target.value,
        });
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        const authorization = { headers: { Authorization: sessionStorage.authToken } };

        try {
            const response = await axios.post(`${API_URL}/user/search`, {
                username: searchCredential.search
            }, authorization);
            setSearchedUserData(response.data)
            setSearchCredential({ search: '' });
        } catch (error) {
            console.error('Error searching for user:', error);
            setError('An error occurred while searching for the user.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [navigate, isLoggedIn]);

    return (
        <div className="page">
            <div className="container">
                <Header heading='Search user by username' />
                <form className="form" onSubmit={handleSearch}>
                    <div className="form__group">
                        <label htmlFor="search" className="form__label">Search</label>
                        <input onChange={handleInputChange} type="text" name='search' className="form__input" />
                    </div>
                    <button className="form__submit" disabled={loading}>Search</button>
                </form>
                <div className="user">
                    {loading && <p>Loading...</p>}
                    {error && <p className="error-message">{error}</p>}
                    {searchedUserData && (
                        <ul className="user__list">
                            <li className="user__item">
                                <Link to={`/chat-room/${searchedUserData._id}`} className="user__name">{searchedUserData.username}</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};




const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    searchedUserData: state.search.searchedUserData,
});

const mapDispatchToProps = (dispatch) => ({
    setSearchedUserData: (data) => dispatch(setSearchedUserData(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);