import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import './Product.css';

export default function GetProduct({ history }) {
    const [Product, setProduct] = useState([]);
    const path = history.location.pathname;
    const productId = path.substring(path.lastIndexOf('/') + 1);
    const basePath = 'http://localhost:9000/files/'
    useEffect(() => {
        GetProductWithID(productId);
    }, [])

    const GetProductWithID = async (productId) => {
        const response = await api.get('/product/' + productId)
        setProduct(response.data.product);
    }

    console.log(Product);

    return (
        <div class="card">
            {Product ? (
                <div class="container-fliud">
                <div class="wrapper row">
                    <div class="preview col-md-6">
                        
                        <div class="preview-pic tab-content">
                          <div class="tab-pane active" id="pic-1"><img src={basePath + Product.ProductThumbnail} /></div>
                        </div>
                        <ul class="preview-thumbnail nav nav-tabs">
                          <li class="active"><a data-target="#pic-1" data-toggle="tab"><img src={basePath + Product.ProductThumbnail} /></a></li>
                        </ul>
                        
                    </div>
                    <div class="details col-md-6">
                        <h3 class="product-title">{Product.ProductTitle}</h3>
                        <div class="rating">
                            <div class="stars">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                            </div>
                            <span class="review-no">Barcode: {Product.ProductBarcode}</span>
                        </div>
                        <p class="product-description">{Product.ProductDescription}</p>
                        <h4 class="price">Cost price: <span>{Product.ProductCostPrice}</span></h4>
                        <h4 class="price">Sale price: <span>{Product.ProductSalePrice}</span></h4>
                    </div>
                </div>
            </div>
            ): 'Product Loading...'}
        </div>
    )
}