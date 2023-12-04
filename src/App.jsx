import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ChatRoom from './pages/ChatRoom/ChatRoom';
import LandingPage from './pages/LandingPage/LandingPage';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { login } from './store/actions/authActions';
import { setProfileData } from './store/actions/userActions';
import { connect } from 'react-redux';

const App = ({ loginAction, setProfileData }) => {
    const API_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        if (!sessionStorage.authToken) {
            return;
        }
        const authorization = { headers: { Authorization: sessionStorage.authToken } };
        axios.get(`${API_URL}/user`, authorization)
            .then(({ data }) => {
                setProfileData(data);
                loginAction();
            })
            .catch(err => console.log(err.message))
    }, [API_URL, loginAction, setProfileData]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage API_URL={API_URL} />} />
                <Route path='/login' element={<LoginPage API_URL={API_URL} />} />
                <Route path='/sign-up' element={<SignUpPage API_URL={API_URL} />} />
                <Route path='/chat-room/:id' element={<ChatRoom />} />
            </Routes>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    profileData: state.user.profileData
});

const mapDispatchToProps = (dispatch) => ({
    loginAction: () => dispatch(login()),
    setProfileData: (data) => dispatch(setProfileData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
