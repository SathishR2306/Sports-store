
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const user = useSelector(state => state.store.user);

    return (
        <Route
            {...rest}
            element={user ? <Element /> : <Navigate to="/login" />}
        />
    );
};

export default ProtectedRoute;
