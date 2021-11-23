import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Label, Alert, Spinner } from 'reactstrap';
import CameraIcon from '../../assets/camera.jpg';
import './category.css';

export default function CreateCategory() {

    const [CategoryName, setCategoryName] = useState('');
    const [CategoryDescription, setCategoryDescription] = useState('');
    const [CategoryDate, setCategoryDate] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    const submitHandler = async (evt) => {
        evt.preventDefault();
        const user_id = localStorage.getItem('user');
        const categoryData = new FormData();
        categoryData.append("CategoryName", CategoryName);
        categoryData.append("CategoryDescription", CategoryDescription);
        categoryData.append("CategoryDate", CategoryDate);
        categoryData.append("thumbnail", thumbnail);

        try {
            if (
                CategoryName !== '' &&
                CategoryDescription !== '' &&
                CategoryDate !== '' &&
                thumbnail !== null
            ) {
                console.log('Category Sent');
                await api.post('/category/create', categoryData, { headers: { user_id } });
                console.log(categoryData);
                console.log('Category Saved');

                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setSuccess(true);
                    setSuccessMessage('Category created successfully');
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

        } catch (error) {
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
            <h1>Create category</h1>
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
            <Form onSubmit={submitHandler} id="InputForm">
                <div className="input-group">
                    <FormGroup>
                        <Label id="thumbnail" style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
                            <input type="file" onChange={(evt) => setThumbnail(evt.target.files[0])} />
                            <img src={CameraIcon} style={{ maxWidth: '50px' }} alt="Upload Icon" />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <input type="text" id="CategoryName" name="CategoryName" value={CategoryName} placeholder={'Category Name'} onChange={(evt) => setCategoryName(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <textarea cols="23" rows="5" id="CategoryDescription" name="CategoryDescription" placeholder={'Category Description'} onChange={(evt) => setCategoryDescription(evt.target.value)}>{CategoryDescription}</textarea>
                    </FormGroup>
                    <FormGroup>
                        <input type="date" id="CategoryDate" name="CategoryDate" value={CategoryDate} placeholder={'Category Date'} onChange={(evt) => setCategoryDate(evt.target.value)} />
                    </FormGroup>
                </div>
                <Button type="submit" className="submit-btn">
                    Create Category
                </Button>
            </Form>
        </Container>
    )
}