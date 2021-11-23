import React, { useState } from 'react';
import axios from '../../services/api';
import { Container, Button, Form, FormGroup, Input, Alert, Spinner } from 'reactstrap';

export default function Register({ history }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneno, setPhoneNo] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [loading, setLoading] = useState(false);


    const handleSubmit = async evt => {
        evt.preventDefault();

        if (firstName !== "" && lastName !== "" && email !== "" && phoneno !== "" && username !== "" && password !== "") {
            await axios.post('/user/register', { firstName, lastName, email, phoneno, username, password });
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setSuccess(true);
                setSuccessMessage('Account created successfully');
                setTimeout(() => {
                    setSuccess(false);
                    setSuccessMessage('');
                }, 3000)
            }, 2000)
        } else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setError(true)
                setErrorMessage('Missing required information');
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 2000);
            }, 2000)
        }
    }


    return (
        <Container>
            <h2>Register</h2>
            <p><strong>Register</strong> account.</p>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden"></span>
                </Spinner>
            ) : ''}
            {error ? (
                <Alert className="validation" color="danger">{errorMessage}</Alert>
            ) : ''}
            {success ? (
                <Alert className="validation" color="success">{successMessage}</Alert>
            ) : ''}
            <Form onSubmit={handleSubmit} id="InputForm">
                <div className="input-group">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" name="firstName" id="firstName" onChange={evt => setFirstName(evt.target.value)} placeholder="First Name" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" name="lastName" id="lastName" onChange={evt => setLastName(evt.target.value)} placeholder="Last Name" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="email" name="email" id="email" onChange={evt => setEmail(evt.target.value)} placeholder="Email" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" name="phoneno" id="phoneno" onChange={evt => setPhoneNo(evt.target.value)} placeholder="Phone Number" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" name="username" id="username" onChange={evt => setUsername(evt.target.value)} placeholder="Username" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="password" name="password" id="password" onChange={evt => setPassword(evt.target.value)} placeholder="Password" />
                    </FormGroup>
                </div>
                <FormGroup>
                    <Button className="submit-btn">Register</Button>
                </FormGroup>
            </Form>
        </Container>
    )
}