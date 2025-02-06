import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderTracking from './components/OrderTracking';
import OrderHistory from './components/OrderHistory';
import Login from './components/Login';
import SignUp from './components/SignUp'; 
import PrivateRoute from './components/PrivateRoute';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

const Nav = styled.nav`
    background: #343a40;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
`;

const NavLinks = styled.div`
    display: flex;
`;

const NavLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    margin: 0 15px;
    font-size: 16px;
    &:hover {
        text-decoration: underline;
    }
`;

const LogoutButton = styled.button`
    background: #dc3545;
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;

    &:hover {
        background: #c82333;
    }
`;

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.store.user);
    const [loginData, setLoginData] = useState(null);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const fetchLoginData = async () => {
        try {
            const response = await axios.get('/loginData.json');
            setLoginData(response.data);
            console.log('Login data fetched:', response.data);
        } catch (error) {
            console.error('Error fetching login data:', error);
        }
    };

    useEffect(() => {
        fetchLoginData();
    }, []);

    return (
        <Router>
            <Nav>
                <NavLinks>
                    <NavLink to="/">Product Catalog</NavLink>
                    <NavLink to="/cart">Cart</NavLink>
                    <NavLink to="/checkout">Checkout</NavLink>
                    <NavLink to="/order-tracking">Order Tracking</NavLink>
                    <NavLink to="/order-history">Order History</NavLink>
                    {!user ? (
                        <>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/signup">Sign Up</NavLink> {/* Add link to Sign Up page */}
                        </>
                    ) : (
                        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                    )}
                </NavLinks>
            </Nav>
            <Routes>
                <Route path="/login" element={<Login loginData={loginData} />} />
                <Route path="/signup" element={<SignUp />} /> {/* Add Route for SignUp */}
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-tracking" element={<OrderTracking />} />
                    <Route path="/order-history" element={<OrderHistory />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
