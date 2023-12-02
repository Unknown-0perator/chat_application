import './CTA.scss';
import { Link } from 'react-router-dom';

const CTA = ({ text, buttonText, to }) => {
    return (
        <div className="cta">
            <p className="cta__text">{text}</p>
            <Link to={to} className="cta__button">{buttonText}</Link>
        </div>
    )
}

export default CTA;