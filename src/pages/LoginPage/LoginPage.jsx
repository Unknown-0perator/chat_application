import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../../store/actions/authActions'; // Import the login action
import { setProfileData } from '../../store/actions/userActions';
import './LoginPage.scss';
import Header from '../../components/Header/Header';
import CTA from '../../components/CTA/CTA';

const LoginPage = ({ API_URL, isLoggedIn, loginAction, setProfileData }) => {
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [navigate, isLoggedIn]);

    const [loginCredential, setLoginCredential] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (event) => {
        setLoginCredential({
            ...loginCredential,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        axios
            .post(`${API_URL}/user/login`, {
                username: loginCredential.username,
                password: loginCredential.password,
            })
            .then((response) => {
                if (response.status !== 403) {
                    const authToken = response.data.token;
                    sessionStorage.authToken = authToken;
                    setProfileData(response.data)
                    // Dispatch the login action to update Redux state
                    loginAction();

                    setTimeout(() => {
                        navigate('/');
                    });
                }
            })
            .catch((err) => alert(`Error: ${err.message}`));

        event.target.reset();
        setLoginCredential('');
    };

    return (
        <div className="page">
            <div className="container">
                <Header />
                <form onSubmit={handleFormSubmit} className="form">
                    <div className="form__group">
                        <label htmlFor="username" className="form__label">
                            Username
                        </label>
                        <input
                            onChange={handleInputChange}
                            type="text"
                            name="username"
                            className="form__input"
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="password" className="form__label">
                            Password
                        </label>
                        <input
                            onChange={handleInputChange}
                            type="password"
                            name="password"
                            className="form__input"
                        />
                    </div>
                    <button type="submit" className="form__submit">
                        Login
                    </button>
                </form>
                <CTA text="Don't have an account?" buttonText="Sign Up" to="/sign-up" />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    profileData: state.user.profileData
});

const mapDispatchToProps = (dispatch) => ({
    loginAction: () => dispatch(login()),
    setProfileData: (data) => dispatch(setProfileData(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
