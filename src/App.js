import React,{useContext, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductContext, ProductProvider } from './context/ProductContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import Cart from './page/Cart';
import Favarate from './page/Favarate';
import ProductList from './page/ProductList';
import ProductDetails from './page/ProductDetails';
import LoginSeller from './components/LoginSeller';
import RegisterSeller from './page/RegisterSeller';
import { Outlet } from 'react-router-dom';
import GiftList from './page/GiftList';
import ForgetPass from './page/ForgetPass';
import VerifyCode from './page/VerifyCode';
import SetPass from './page/SetPass';
import SellerLogin from './page/SellerLogin';
import SellerDash from './page/SellerDash';
import FavoriteSection from './page/FavoriteSection';
import JournalDetails from './page/JournalDetails';
import GiftDetails from './page/GiftDetails';
import ScrollToTopButton from './components/ScrollToTopButton';
// import ScrollRevealWrapper from './assets/ScrollRevealWrapper'; // مكون لتفعيل scrollReveal

const Layout = () => (
  <>
    <Navbar />

    <Outlet />
    <Footer />
  </>
);

const App = () => {
   
  return (
    <ProductProvider>
      <ScrollToTopButton />


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favarate" element={<Favarate />} />
            <Route path="/productList" element={<ProductList />} />
            <Route path="/giftList" element={<GiftList />} />
            <Route path="/SellerLogin" element={<SellerLogin />} />
            <Route path="/SellerDash" element={<SellerDash />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/ForgetPass" element={<ForgetPass />} />
            <Route path="/VerifyCode?" element={<VerifyCode />} />
            <Route path="/gift/:id" element={<GiftDetails />} />
            <Route path="/SetPass" element={<SetPass />} />
            <Route path="/favorites" element={<FavoriteSection />} />
            <Route path="/JournalDetails/:id" element={<JournalDetails />} />


            <Route path="login-seller" element={<LoginSeller />} />
            <Route path="register-seller" element={<RegisterSeller />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
};

export default App;
