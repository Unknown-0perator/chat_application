import './LoginPage.scss';
import Header from '../../components/Header/Header';
import CTA from '../../components/CTA/CTA';

const LoginPage = () => {
    return (
        <div className="page">
            <div className="container">
                <Header />
                <form className="form">
                    <div className="form__group">
                        <label htmlFor="" className="form__label">Username</label>
                        <input type="text" className="form__input" />
                    </div>
                    <div className="form__group">
                        <label htmlFor="" className="form__label">Password</label>
                        <input type="text" className="form__input" />
                    </div>
                    <button className="form__submit">Login</button>
                </form>
                <CTA text="Don't have an account?" buttonText='Sign Up' to='/sign-up' />
            </div>
        </div>
    )
}

export default LoginPage;