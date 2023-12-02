
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ChatRoom from './pages/ChatRoom/ChatRoom';



const App = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='sign-up' element={<SignUpPage />} />
                <Route path='chat-room' element={<ChatRoom />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;