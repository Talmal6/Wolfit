import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
type StyledProps = {
  error?: boolean;
};


type LoginComponentProps = {
  onLoginSuccess: () => void; // Prop to notify parent of successful login
};


const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
`;

const Form = styled.form`
  background: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333333;
  text-align: center;
`;

const Input = styled.input<StyledProps>`
  width: 100%;
  padding: 10px;
  margin-bottom: ${(props) => (props.error ? '5px' : '15px')};
  border: ${(props) => (props.error ? '2px solid red' : '1px solid #ccc')};
  border-radius: 5px;
  font-size: 16px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-bottom: 15px;
  display: ${(props: { show: boolean }) => (props.show ? 'block' : 'none')};
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Component
const LoginComponent: React.FC<LoginComponentProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
        setError(true);
    } else {
        setError(false);
        try {
            // Make the login request to the server
            const response = await fetch('http://localhost:3000/login-as-manager', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
              setLoginMessage('Login successful!');
              onLoginSuccess();  // This calls the function passed from the parent component
            
            } else {
                const errorData = await response.json(); // Parse the error response
                setLoginMessage(errorData.error || 'Invalid username or password');
            }
        } catch (err) {
            setLoginMessage('An error occurred. Please try again later.');
        }
    }
};


  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Title>כניסה</Title>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          error={error && !username}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          error={error && !password}
        />
        <ErrorMessage show={error && (!username || !password)}>
          Please fill in all fields.
        </ErrorMessage>
        {loginMessage && <ErrorMessage show>{loginMessage}</ErrorMessage>}
        <Button type="submit">Login</Button>
      </Form>
    </FormWrapper>
  );
};

export default LoginComponent;
