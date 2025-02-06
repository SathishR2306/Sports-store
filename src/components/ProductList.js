
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
`;

const ProductListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const ProductCard = styled.div`
    width: calc(33.333% - 20px);
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 15px;
    box-sizing: border-box;
    text-align: center;
`;

const ProductTitle = styled.h3`
    margin: 10px 0;
    color: #333;
`;

const ProductPrice = styled.p`
    color: #007bff;
    font-size: 18px;
    margin: 10px 0;
`;

const AddToCartButton = styled.button`
    background-color: #28a745;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #218838;
    }
`;

const ProductList = () => {
    const products = useSelector(state => state.store.products);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <Container>
            <h2>Product Catalog</h2>
            <ProductListContainer>
                {products.map(product => (
                    <ProductCard key={product.id}>
                        <ProductTitle>{product.name}</ProductTitle>
                        <ProductPrice>RS:{product.price.toFixed(2)}</ProductPrice>
                        <AddToCartButton onClick={() => handleAddToCart(product)}>
                            Add to Cart
                        </AddToCartButton>
                    </ProductCard>
                ))}
            </ProductListContainer>
        </Container>
    );
};

export default ProductList;
