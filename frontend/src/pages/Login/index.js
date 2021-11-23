import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import { Container, Button, Form, FormGroup, Input, Alert } from 'reactstrap';

export default function Login({ history }) {

    useEffect(()=>{
        CheckUser();
    },[])
    //useState Hook
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    

    //Method for submit

    const handleSubmit = async evt => {
        evt.preventDefault();

        //Send request through axios
        const response = await axios.post('/user/login', { username, password });
        //Get the userId from reponse
        const userId = response.data._id || false;
        if (userId) {
            localStorage.setItem('user', userId);
            history.push('/');
        } else {
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 2000)
        }

    }

    const CheckUser = async () => {
        const user_id = localStorage.getItem('user');
        const user = await axios.get('/user/'+user_id);
            console.log(user.data._id);
        if(user){
            history.push('/dashboard');
        }
    }


    return (
        <Container>
            <h2>Login</h2>
            <p><strong>Login</strong> into your account.</p>
            <Form onSubmit={handleSubmit} id="InputForm">
                <div className="input-group">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" name="username" id="username" onChange={evt => setUsername(evt.target.value)} placeholder="Your Username" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="password" name="password" id="password" onChange={evt => setPassword(evt.target.value)} placeholder="Your Password" />
                    </FormGroup>
                </div>
                <FormGroup>
                    <Button className="submit-btn">Login</Button>
                </FormGroup>
                <FormGroup>
                    <Button className="secondary-btn" onClick={() => history.push("/register")}>Register</Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className="event-validation" color="danger">Missing required information</Alert>
            ) : ''}
        </Container>
    )
}