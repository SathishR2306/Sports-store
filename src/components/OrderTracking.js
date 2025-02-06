
import React from 'react';
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
`;

const OrderStatus = styled.p`
    font-size: 16px;
    color: #007bff;
`;

const OrderTracking = () => {
 
    const orders = [
        { id: 1, status: 'Shipped' },
        { id: 2, status: 'In Transit' },
        { id: 3, status: 'Delivered' }
    ];

    return (
        <Container>
            <Heading>Order Tracking</Heading>
            <OrderList>
                {orders.map(order => (
                    <OrderItem key={order.id}>
                        <p>Order #{order.id}</p>
                        <OrderStatus>Status: {order.status}</OrderStatus>
                    </OrderItem>
                ))}
            </OrderList>
        </Container>
    );
};

export default OrderTracking;
