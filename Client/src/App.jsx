import Header from './components/shared/header/Header.component';
import Footer from './components/shared/footer/Footer.component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage.component.jsx'
import LoginPage from './pages/login-page/loginPage.component.jsx'
import CartPage from './pages/cart-page/CartPage.component'
import SignUpPage from './pages/sign-up-page/SignUpPage.component.jsx'
import NotFoundPage from './pages/not-found-page/notFoundPage.component.jsx'
import BookPage from './pages/book-page/BookPage.component';
import { CartProvider } from './contexts/CartProvider.component.jsx';
import AuthProvider from './contexts/AuthProvider.component.jsx';


function App() {
 

  return (
    <BrowserRouter>
    <AuthProvider>
        <CartProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/book/:bookID" element={<BookPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    <Footer />
        </CartProvider>
        </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
