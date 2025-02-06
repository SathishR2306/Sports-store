import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';  
import logo from './logo.png';

const Container = styled.div`
    max-width: 450px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    background: #fff;
`;

const Logo = styled.img`
    display: block;
    margin: 0 auto 20px;
    width: 100px;
    height: auto;
`;

const Heading = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
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

const Error = styled.p`
    color: #dc3545;
    text-align: center;
`;

const CheckboxContainer = styled.div`
    margin-bottom: 15px;
    display: flex;
    align-items: center;
`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setEmailError('');
        setPasswordError('');
        setLoginError('');

        // Validate email and password
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format. Please enter a valid email.');
        } else if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.');
        } else {
            try {
                // Fetch user data from db.json
                const response = await axios.get('http://localhost:3000/users');
                const users = response.data;

                // Find matching user
                const user = users.find(user => user.email === email && user.password === password);

                if (user) {
                    // Dispatch login action
                    dispatch({ type: 'LOGIN', payload: { email: user.email } });
                    navigate('/');
                } else {
                    // Show login error
                    setLoginError('Invalid email or password. Please try again.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                setLoginError('An error occurred while logging in. Please try again later.');
            }
        }
    };

    return (
        <Container>
            <Logo src={logo} alt="Logo" />
            <Heading>SAT Sports</Heading>
            <Heading>LOGIN</Heading>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {emailError ? <Error>{emailError}</Error> : null}

                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {passwordError ? <Error>{passwordError}</Error> : null}

                <CheckboxContainer>
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label>Show Password</label>
                </CheckboxContainer>

                <Button type="submit">Login</Button>
                {loginError ? <Error>{loginError}</Error> : null}
            </Form>
            <Button onClick={() => navigate('/signup')}>Don't have an account? Sign Up</Button>
        </Container>
    );
};

export default Login;
