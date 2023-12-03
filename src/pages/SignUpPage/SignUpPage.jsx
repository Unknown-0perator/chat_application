import './SignUpPage.scss';
import Header from '../../components/Header/Header';
import CTA from '../../components/CTA/CTA';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = ({ API_URL }) => {
    const navigate = useNavigate();

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

                navigate('/chat-room')
            }
        }).catch(err => alert(`Error: ${err.message}`))

        event.target.reset();
        setSignUpCredential('')

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

export default SignUpPage;