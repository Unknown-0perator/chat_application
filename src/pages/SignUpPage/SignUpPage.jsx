import './SignUpPage.scss';
import Header from '../../components/Header/Header';

const SignUpPage = () => {
    return (
        <div className="page">
            <div className="login">
                <Header text='Create new account' />
                <form className="form">
                    <div className="form__group">
                        <label htmlFor="" className="form__label">Full Name</label>
                        <input type="text" className="form__input" />
                    </div>
                    <div className="form__group">
                        <label htmlFor="" className="form__label">Username</label>
                        <input type="text" className="form__input" />
                    </div>
                    <div className="form__group">
                        <label htmlFor="" className="form__label">Password</label>
                        <input type="text" className="form__input" />
                    </div>
                    <button className="form__submit">Sign Up</button>
                </form>

                <div className="cta">
                    <p className="cta__text">Already have an account?</p>
                    <button className="cta__button">Login</button>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;