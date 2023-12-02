
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';



const App = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='sign-up' element={<SignUpPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;