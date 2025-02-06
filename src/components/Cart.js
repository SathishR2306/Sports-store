import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CartContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
`;

const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const Cart = () => {
    const cart = useSelector(state => state.store.cart); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <CartContainer>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map(item => (
                        <CartItem key={item.id}>
                            <span>{item.name}</span>
                            <span>₹ {item.price.toFixed(2)}</span>
                            <Button onClick={() => handleRemoveFromCart(item.id)}>Remove</Button> {/* Pass only item ID */}
                        </CartItem>
                    ))}
                    <Button onClick={handleCheckout}>Proceed to Checkout</Button>
                </>
            )}
        </CartContainer>
    );
};

export default Cart;
