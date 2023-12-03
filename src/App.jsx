
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ChatRoom from './pages/ChatRoom/ChatRoom';



const App = () => {

    const API_URL = process.env.REACT_APP_BACKEND_URL;

    return (
        <BrowserRouter>

            <Routes>
                <Route path='/' element={<LoginPage API_URL={API_URL} />} />
                <Route path='sign-up' element={<SignUpPage />} />
                <Route path='chat-room' element={<ChatRoom />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;