// components/OrderHistory.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
`;

const Heading = styled.h2`
    color: #333;
`;

const OrderList = styled.div`
    background: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const OrderItem = styled.div`
    margin-bottom: 15px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

const OrderTotal = styled.p`
    font-size: 16px;
    color: #007bff;
`;



const fetchOrderHistory = () => {
    return [
        { id: 101, total: 199.99 },
        { id: 102, total: 89.99 },
        { id: 103, total: 49.99 }
    ];
};

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      
        const orderData = fetchOrderHistory();
        setOrders(orderData);
    }, []);

    return (
        <Container>
            <Heading>Order History</Heading>
            <OrderList>
                {orders.map(order => (
                    <OrderItem key={order.id}>
                        <p>Order #{order.id}</p>
                        <OrderTotal>Total: RS:{order.total.toFixed(2)}</OrderTotal>
                    </OrderItem>
                ))}
            </OrderList>
        </Container>
    );
};

export default OrderHistory;
