import { combineReducers } from 'redux';

const initialState = {
    products: [
        { id: 1, name: 'Football', price: 729.99 },
        { id: 2, name: 'Basketball', price: 924.99 },
        { id: 3, name: 'Tennis Racket', price: 1259.99 },
        { id: 4, name: 'Cricket Bat', price: 3499.99 },
        { id: 5, name: 'Badminton Shuttlecock (Pack of 12)', price: 799.99 },
        { id: 6, name: 'Running Shoes', price: 4999.99 },
        { id: 7, name: 'Yoga Mat', price: 1499.99 },
        { id: 8, name: 'Table Tennis Paddle', price: 999.99 },
        { id: 9, name: 'Boxing Gloves', price: 2499.99 }
    ],
    cart: [],
    orders: [],
    user: null
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingProductIndex = state.cart.findIndex(item => item.id === action.payload.id);

            if (existingProductIndex !== -1) {
                const updatedCart = [...state.cart];
                updatedCart[existingProductIndex].quantity += 1;
                return {
                    ...state,
                    cart: updatedCart
                };
            }

            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: 1 }]
            };

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            };

        case 'PLACE_ORDER':
            return {
                ...state,
                orders: [...state.orders, { ...action.payload, status: 'Processing' }],
                cart: []
            };

        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            };

        case 'LOGOUT':
            return {
                ...state,
                user: null
            };

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    store: productReducer
});

export default rootReducer;
