import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Label, Alert, Spinner } from 'reactstrap';
import CameraIcon from '../../assets/camera.jpg';
import './subcategory.css';

export default function CreateSubCategory() {

    const [SubCategoryName, setSubCategoryName] = useState('');
    const [SubCategoryDescription, setSubCategoryDescription] = useState('');
    const [SubCategoryDate, setSubCategoryDate] = useState('');
    const [category_id, setCategoryID] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [Categories, setCategories] = useState([]);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);


    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        const response = await api.get('/categories/');
        setCategories(response.data);
    }

    const submitHandler = async (evt) => {
        evt.preventDefault();
        const user_id = localStorage.getItem('user');
        const subcategoryData = new FormData();
        subcategoryData.append("SubCategoryName", SubCategoryName);
        subcategoryData.append("SubCategoryDescription", SubCategoryDescription);
        subcategoryData.append("SubCategoryDate", SubCategoryDate);
        subcategoryData.append("thumbnail", thumbnail);
        subcategoryData.append("category_id", category_id);

        console.log(SubCategoryName, SubCategoryDescription, SubCategoryDate, category_id)

        try {
            if (
                SubCategoryName !== '' &&
                SubCategoryDescription !== '' &&
                SubCategoryDate !== '' &&
                thumbnail !== null &&
                category_id !== ""
            ) {
                await api.post('/subcategory/create', subcategoryData, { headers: { user_id } });
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setSuccess(true);
                    setSuccessMessage('SubCategory created successfully');
                    setTimeout(() => {
                        setSuccess(false);
                        setSuccessMessage('')
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
            <h1>Create sub category</h1>
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
                        <select name="category_id" id="category_id" onChange={(evt) => setCategoryID(evt.target.value)}>
                            <option value="">Select Category</option>
                            {Categories.map(category => (
                                <option key={category._id} value={category._id}>{category.CategoryName}</option>
                            ))}
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <input type="text" id="SubCategoryName" name="SubCategoryName" value={SubCategoryName} placeholder={'SubCategory Name'} onChange={(evt) => setSubCategoryName(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <textarea cols="23" rows="5" id="SubCategoryDescription" name="SubCategoryDescription" placeholder={'Sub Category Description'} onChange={(evt) => setSubCategoryDescription(evt.target.value)}>{SubCategoryDescription}</textarea>
                    </FormGroup>
                    <FormGroup>
                        <input type="date" id="SubCategoryDate" name="SubCategoryDate" value={SubCategoryDate} placeholder={'SubCategory Date'} onChange={(evt) => setSubCategoryDate(evt.target.value)} />
                    </FormGroup>
                </div>
                <Button type="submit" className="submit-btn">
                    Create SubCategory
                </Button>
            </Form>
        </Container>
    )
}