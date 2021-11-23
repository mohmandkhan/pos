import React, { useState, useEffect } from 'react';
import {Button, Spinner, Table} from 'reactstrap';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './Products.css';


export default function GetAllProducts({ history }) {

    const [Products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    const basePath = 'http://localhost:9000/files/'

    useEffect(() => {
        GetProducts();
    }, [])

    const GetProducts = async () => {
        const response = await api.get('/product/all');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setProducts(response.data);
        }, 1000)
    }

    console.log(Products);
    return (
        <div className="Products">
            {loading ? (
                    <Spinner animation="border" role="status" >
                        <span className="visually-hidden"></span>
                    </Spinner>
            ) : ''}
             <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>SubCategory Email</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Products.map(Product => (
                        <tr>
                            <th scope="row"></th>
                            <td><img src={basePath + Product.ProductThumbnail} width="40" height="40" /></td>
                            <td>{Product.ProductTitle}</td>
                            <td>{Product.ProductCategory.CategoryName}</td>
                            <td>{Product.ProductSubCategory.SubCategoryName}</td>
                            <td>{Product.ProductDescription}</td>
                            <td>
                                <Button color="primary" size="sm">Edit</Button>
                                <Button color="danger" size="sm">Delete</Button>
                                <Button color="secondary" size="sm" onClick={()=>history.push('/Product/'+Product._id)}>Details</Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}