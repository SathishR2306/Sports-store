// components/LogoutButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
    background-color: #dc3545;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #c82333;
    }
`;

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
