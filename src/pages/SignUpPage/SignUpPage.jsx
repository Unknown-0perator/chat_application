import './SignUpPage.scss';
import Header from '../../components/Header/Header';
import CTA from '../../components/CTA/CTA';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/actions/authActions';
import { setProfileData } from '../../store/actions/userActions';

const SignUpPage = ({ API_URL, isLoggedIn, loginAction, setProfileData }) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isLoggedIn)
        if (isLoggedIn) {
            navigate('/')
        }
    }, [navigate, isLoggedIn])

    const [signUpCredential, setSignUpCredential] = useState({
        username: '',
        password: '',
        full_name: ''
    })

    const handleInputChange = (event) => {
        setSignUpCredential({
            ...signUpCredential, [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!signUpCredential.username || !signUpCredential.password || !signUpCredential.full_name) {
            alert('Please fill in all fields.');
            return;
        }

        axios.post(`${API_URL}/user/sign-up`, {
            username: signUpCredential.username,
            password: signUpCredential.password,
            full_name: signUpCredential.full_name
        }).then((response) => {
            if (response.status === 201) {
                const authToken = response.data.token;
                sessionStorage.authToken = authToken;
                setProfileData(response.data)
                loginAction();
                setTimeout(() => {
                    navigate('/');
                });

            }
        }).catch(err => alert(`Error: ${err.message}`))

        setSignUpCredential('')

        event.target.reset();

    }

    return (
        <div className="page">
            <div className="container">
                <Header text='Create new account' />
                <form className="form" onSubmit={handleFormSubmit}>
                    <div className="form__group">
                        <label htmlFor="full_name" className="form__label">Full Name</label>
                        <input onChange={handleInputChange} name='full_name' type="text" className="form__input" />
                    </div>
                    <div className="form__group">
                        <label htmlFor="username" className="form__label">Username</label>
                        <input onChange={handleInputChange} name='username' type="text" className="form__input" />
                    </div>
                    <div className="form__group">
                        <label htmlFor="password" className="form__label">Password</label>
                        <input onChange={handleInputChange} name='password' type="password" className="form__input" />
                    </div>
                    <button className="form__submit">Sign Up</button>
                </form>

                <CTA text='Already have an account?' buttonText='Login' to='/login' />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    profileData: state.user.profileData
});

const mapDispatchToProps = (dispatch) => ({
    loginAction: () => dispatch(login()),
    setProfileData: (data) => dispatch(setProfileData(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);