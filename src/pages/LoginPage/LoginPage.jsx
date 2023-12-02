import './LoginPage.scss';
import Header from '../../components/Header/Header';

const LoginPage = () => {
    return (
        <div className="page">
            <div className="login">
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

                <div className="cta">
                    <p className="cta__text">Don't have an account?</p>
                    <button className="cta__button">Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;