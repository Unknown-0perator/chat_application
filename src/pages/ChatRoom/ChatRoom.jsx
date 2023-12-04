import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { sendMessage, receiveMessage } from '../../store/actions/chatActions';

import './ChatRoom.scss';

const socket = io(process.env.REACT_APP_BACKEND_URL);

const ChatRoom = ({ messages, sendMessage, receiveMessage, profileData, searchedUserData }) => {
    const { id } = useParams()
    const [newMessage, setNewMessage] = useState('');
    useEffect(() => {
        socket.on('chat message', (message) => {
            receiveMessage(message);
        });
        scrollToBottom();
        return () => {
            socket.off('chat message');
        };

    }, [messages, receiveMessage]);

    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const trimmedMessage = newMessage.trim();

        if (trimmedMessage !== '') {
            await Promise.all([profileData, searchedUserData]);
            const message = {
                senderId: profileData._id,
                recipientId: searchedUserData._id || id,
                text: trimmedMessage,
                timestamp: new Date().toLocaleString(),
            };
            socket.emit('chat message', message);
            sendMessage(message);
            setNewMessage('');
        }
    };

    return (
        <div className="page">
            <div className="container chat-room">
                <div className="chat-room__header">
                    <p className="chat-room__receiver">Chatting with User {searchedUserData.fullName}</p>
                </div>

                <ul className="chat-room__list" ref={messagesContainerRef}>
                    {messages.map((message, index) => (
                        <li key={index} className={`chat-room__message chat-room__message--${message.senderId === profileData._id ? 'send' : 'receive'}`}>
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
    messages: state.chat.messages,
    profileData: state.user.profileData,
    searchedUserData: state.search.searchedUserData,
});

const mapDispatchToProps = (dispatch) => ({
    sendMessage: (message) => dispatch(sendMessage(message)),
    receiveMessage: (message) => dispatch(receiveMessage(message)),
});



export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
