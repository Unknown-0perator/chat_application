import './LoginPage.scss';
import Header from '../../components/Header/Header';
import CTA from '../../components/CTA/CTA';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ API_URL }) => {

    const navigate = useNavigate();

    const [loginCredential, setLoginCredential] = useState({
        username: '',
        password: ''
    })

    const handleInputChange = (event) => {
        setLoginCredential({
            ...loginCredential, [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post(`${API_URL}/user/login`, {
            username: loginCredential.username,
            password: loginCredential.password
        }).then((response) => {
            if (response.status !== 403) {
                const authToken = response.data.token;
                sessionStorage.authToken = authToken;

                navigate('/chat-room')
            }
        }).catch(err => alert(`Error: ${err.message}`))

        event.target.reset();
        setLoginCredential('')

    }

    return (
        <div className="page">
            <div className="container">
                <Header />
                <form onSubmit={handleFormSubmit} className="form">
                    <div className="form__group">
                        <label htmlFor="username" className="form__label">Username</label>
                        <input onChange={handleInputChange} type="text" name='username' className="form__input" />
                    </div>
                    <div className="form__group">
                        <label htmlFor="password" className="form__label">Password</label>
                        <input onChange={handleInputChange} type="password" name='password' className="form__input" />
                    </div>
                    <button className="form__submit">Login</button>
                </form>
                <CTA text="Don't have an account?" buttonText='Sign Up' to='/sign-up' />
            </div>
        </div>
    )
}

export default LoginPage;