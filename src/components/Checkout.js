import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
`;

const Heading = styled.h2`
    color: #333;
`;

const CheckoutForm = styled.form`
    max-width: 500px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
`;

const Select = styled.select`
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    padding: 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const Popup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    z-index: 1000;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('Pay on Delivery');
    const [showPopup, setShowPopup] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        
        console.log(`Selected payment method: ${paymentMethod}`);

        setShowPopup(true);
    };

    const handleClosePopup = () => {
      
        setShowPopup(false);
        navigate('/');
    };

    return (
        <Container>
            <Heading>Checkout</Heading>
            <CheckoutForm onSubmit={handleSubmit}>
                <Input type="text" placeholder="Name" required />
                <Input type="text" placeholder="Address" required />
                <Input type="text" placeholder="City" required />
                <Input type="text" placeholder="State" required />
                <Input type="text" placeholder="PIN Code" required />
                
                <Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="Pay on Delivery">Pay on Delivery</option>
                    <option value="UPI Payment">UPI Payment</option>
                </Select>

                <Button type="submit">Complete Purchase</Button>
            </CheckoutForm>

           
            {showPopup && (
                <>
                    <Overlay />
                    <Popup>
                        <h3>Purchase Successful!</h3>
                        <p>Your order has been placed successfully.</p>
                        <Button onClick={handleClosePopup}>Close</Button>
                    </Popup>
                </>
            )}
        </Container>
    );
};

export default Checkout;
