import './Header.scss';
import Logo from '../../assets/Logo.png';

const Header = ({ text }) => {
    return (
        <div className="header">
            <img src={Logo} alt="For Love of writers Logo" className="header__logo" />
            <h2 className="header__heading--secondary">{text}</h2>
            <h1 className="header__heading--primary">Chat Portal</h1>
        </div>
    )
}


export default Header;