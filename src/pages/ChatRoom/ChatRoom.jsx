import './ChatRoom.scss';
import { Link } from 'react-router-dom';

const ChatRoom = () => {
    return (
        <div className="page">
            <div className="container chat-room">
                <div className="chat-room__header">
                    <Link className="chat-room__back-button">
                        <svg className="chat-room__back-icon" width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42 21.3125H5.12695L21.2666 37.4521L19.4209 39.2979L0.123047 20L19.4209 0.702148L21.2666 2.54785L5.12695 18.6875H42V21.3125Z" fill="#808080" />
                        </svg>
                    </Link>
                    <p className="chat-room__receiver">Ahmad Akhtar</p>
                </div>

                <ul className="chat-room__list">
                    <li className="chat-room__message chat-room__message--send">
                        <p className="chat-room__text">Hello I am Ahmad. I am sending this message</p>
                        <span className="chat-room__timestamp">Now</span>
                    </li>
                    <li className="chat-room__message chat-room__message--receive">
                        <p className="chat-room__text">Hello I am Ahmad. I am receiving this message</p>
                        <span className="chat-room__timestamp">Now</span>
                    </li>
                </ul>

                <form className="chat-room__form">
                    <div className="chat-room__input-container">
                        <textarea name="" id="" rows="1" className="chat-room__input"></textarea>
                        <button className="chat-room__button">Send</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ChatRoom;