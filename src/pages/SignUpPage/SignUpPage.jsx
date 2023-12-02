import './SignUpPage.scss';
import Header from '../../components/Header/Header';
import CTA from '../../components/CTA/CTA';

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

                <CTA text='Already have an account?' buttonText='Login' to='/login' />
            </div>
        </div>
    )
}

export default SignUpPage;