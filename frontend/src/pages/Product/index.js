import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Label, Alert, Spinner } from 'reactstrap';
import CameraIcon from '../../assets/camera.jpg';
import './product.css';

export default function CreateProduct({ history }) {
    const [ProductBarcode, setProductBarcode] = useState('');
    const [ProductCategory, setProductCategory] = useState('');
    const [ProductSubCategory, setProductSubCategory] = useState('');
    const [ProductTitle, setProductTitle] = useState('');
    const [ProductDescription, setProductDescription] = useState('');
    const [ProductModel, setProductModel] = useState('');
    const [ProductSKU, setProductSKU] = useState('');
    const [ProductCostPrice, setProductCostPrice] = useState('');
    const [ProductSalePrice, setProductSalePrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [Categories, setCategories] = useState([]);
    const [SubCategories, setSubCategories] = useState([]);

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

    const getSubCategories = async (catId) => {
        setProductCategory(catId);
        const response = await api.get('/subcategories/' + catId);
        setSubCategories(response.data);
    }


    const submitHandler = async (evt) => {
        evt.preventDefault();

        const user_id = localStorage.getItem('user');
        console.log(
            'User: ' + user_id,
            'ProductBarcode: ' + ProductBarcode,
            'ProductCategory: ' + ProductCategory,
            'ProductSubCategory: ' + ProductSubCategory,
            'ProductTitle: ' + ProductTitle,
            'ProductDescription: ' + ProductDescription,
            'ProductModel: ' + ProductModel,
            'ProductSKU: ' + ProductSKU,
            'ProductCostPrice: ' + ProductCostPrice,
            'ProductSalePrice: ' + ProductSalePrice
        )
        const ProductData = new FormData();
        ProductData.append("ProductBarcode", ProductBarcode);
        ProductData.append("ProductCategory", ProductCategory);
        ProductData.append("ProductSubCategory", ProductSubCategory);
        ProductData.append("ProductTitle", ProductTitle);
        ProductData.append("ProductDescription", ProductDescription);
        ProductData.append("ProductModel", ProductModel);
        ProductData.append("ProductSKU", ProductSKU);
        ProductData.append("ProductCostPrice", ProductCostPrice);
        ProductData.append("ProductSalePrice", ProductSalePrice);
        ProductData.append("ProductThumbnail", thumbnail);
        try {
            if (
                ProductBarcode !== "" &&
                ProductCategory !== "" &&
                ProductSubCategory !== "" &&
                ProductTitle !== "" &&
                ProductDescription !== "" &&
                ProductModel !== "" &&
                ProductSKU !== "" &&
                ProductCostPrice !== "" &&
                ProductSalePrice !== "" &&
                thumbnail !== false &&
                user_id !== ""
            ) {
                console.log('Inside Success block');
                api.post('/product/create', ProductData, { headers: { user_id } });
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setSuccess(true);
                    setSuccessMessage('Product created successfully');
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

    // console.log(ProductCategory);
    // console.log(SubCategories);
    return (
        <Container>
            <h1>Create Product</h1>
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
                        <select name="ProductCategory" id="ProductCategory" onChange={(evt) => { getSubCategories(evt.target.value) }}>
                            <option value="">Select Category</option>
                            {Categories.map(category => (
                                <option key={category._id} value={category._id} >{category.CategoryName}</option>
                            ))}
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <select name="ProductSubCategory" id="ProductSubCategory" onChange={(evt) => setProductSubCategory(evt.target.value)}>
                            <option value="">Select Sub Category</option>
                            {SubCategories.map(subcategory => (
                                <option key={subcategory._id} value={subcategory._id} >{subcategory.SubCategoryName}</option>
                            ))}
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <input type="text" id="ProductBarcode" name="ProductBarcode" value={ProductBarcode} placeholder={'Product Barcode'} onChange={(evt) => setProductBarcode(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <input type="text" id="ProductTitle" name="ProductTitle" value={ProductTitle} placeholder={'Product Title'} onChange={(evt) => setProductTitle(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <textarea rows="5" cols="22" id="ProductDescription" name="ProductDescription" placeholder="Product Description" onChange={(evt) => setProductDescription(evt.target.value)}></textarea>
                    </FormGroup>
                    <FormGroup>
                        <input type="text" id="ProductModel" name="ProductModel" value={ProductModel} placeholder={'Product Model'} onChange={(evt) => setProductModel(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <input type="text" id="ProductSKU" name="ProductSKU" value={ProductSKU} placeholder={'Product SKU'} onChange={(evt) => setProductSKU(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <input type="text" id="ProductCostPrice" name="ProductCostPrice" value={ProductCostPrice} placeholder={'Product Cost Price'} onChange={(evt) => setProductCostPrice(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <input type="text" id="ProductSalePrice" name="ProductSalePrice" value={ProductSalePrice} placeholder={'Product Sale Price'} onChange={(evt) => setProductSalePrice(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" className="submit-btn">
                            Create Product
                        </Button>
                    </FormGroup>
                </div>
            </Form>
        </Container>
    )
}