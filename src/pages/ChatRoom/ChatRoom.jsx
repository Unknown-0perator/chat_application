import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { sendMessage, receiveMessage } from '../../store/actions/chatActions';

import './ChatRoom.scss';

const socket = io(process.env.REACT_APP_BACKEND_URL);

const ChatRoom = ({ messages, sendMessage, receiveMessage, profileData }) => {
    const { chatUserId } = useParams();
    const userId = profileData._id
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Handle 'chat message' events from the server
        socket.on('chat message', (message) => {
            receiveMessage(message);
        });

        // Clean up on component unmount
        return () => {
            socket.off('chat message');
        };
    }, [receiveMessage]);

    const messagesContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when messages change
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const trimmedMessage = newMessage.trim();

        if (trimmedMessage !== '') {
            const message = {
                userId,
                text: trimmedMessage,
                timestamp: new Date().toLocaleTimeString(),
            };

            // Emit a 'chat message' event to the server
            socket.emit('chat message', message);

            // Dispatch the sendMessage action to update Redux state
            sendMessage(message);

            // Clear the input field
            setNewMessage('');
        }
    };

    return (
        <div className="page">
            <div className="container chat-room">
                <div className="chat-room__header">
                    <Link className="chat-room__back-button" to="/">
                        {/* Your back button SVG or text */}
                    </Link>
                    <p className="chat-room__receiver">Chatting with User {chatUserId}</p>
                </div>

                <ul className="chat-room__list" ref={messagesContainerRef}>
                    {messages.map((message, index) => (
                        <li key={index} className={`chat-room__message chat-room__message--${message.userId === userId ? 'send' : 'receive'}`}>
                            <p className="chat-room__text">{message.text}</p>
                            <span className="chat-room__timestamp">{message.timestamp}</span>
                        </li>
                    ))}
                </ul>

                <form className="chat-room__form" onSubmit={handleFormSubmit}>
                    <div className="chat-room__input-container">
                        <input
                            rows="1"
                            className="chat-room__input"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button type="submit" className="chat-room__button">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    userId: state.user.userId,
    messages: state.chat.messages,
    profileData: state.user.profileData
});

const mapDispatchToProps = (dispatch) => ({
    sendMessage: (message) => dispatch(sendMessage(message)),
    receiveMessage: (message) => dispatch(receiveMessage(message)),
});



export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
