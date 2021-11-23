import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './bootstrap.css';
import './megamenu.css';

export default function LeftMenu({ history }) {
    return (
        <div className="left-menu">
            <div class="menu-container">
                <div class="seer-header-container">
                    <nav class="seer-menu menu-caret">
                        <ul>
                            <li class="current-menu mega-menu dropdown_menu">
                            <Link to="/">Dashboard</Link>
                            </li>
                            <li class="current-menu mega-menu dropdown_menu">
                                <a href="#">Categories<span></span></a>
                                <ul>
                                    <li>
                                        <div class="mega-menu-container">
                                            <div class="row">
                                                <div class="col-6 col-sm-6 col-xl-3">
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/createCategory">Create Category</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/Categories">All Categories</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li class="current-menu mega-menu dropdown_menu">
                                <a href="#">SubCategories<span></span></a>
                                <ul>
                                    <li>
                                        <div class="mega-menu-container">
                                            <div class="row">
                                                <div class="col-6 col-sm-6 col-xl-3">
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/createsubCategory">Create SubCategory</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/SubCategories">All SubCategories</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li class="current-menu mega-menu dropdown_menu">
                                <a href="#">Products<span></span></a>
                                <ul>
                                    <li>
                                        <div class="mega-menu-container">
                                            <div class="row">
                                                <div class="col-6 col-sm-6 col-xl-3">
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/createProduct">Create Product</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/Products">All Products</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li class="current-menu mega-menu dropdown_menu">
                                <a href="#">People<span></span></a>
                                <ul>
                                    <li>
                                        <div class="mega-menu-container">
                                            <div class="row">
                                                <div class="col-6 col-sm-6 col-xl-3">
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/register">Create User</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/Users">All Users</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/Supplier">Create Supplier</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/Suppliers">All Suppliers</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li class="current-menu mega-menu dropdown_menu">
                                <a href="#">Purchases<span></span></a>
                                <ul>
                                    <li>
                                        <div class="mega-menu-container">
                                            <div class="row">
                                                <div class="col-6 col-sm-6 col-xl-3">
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/createPurchase">Create Purchase</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/Purchases">All Purchases</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li class="current-menu mega-menu dropdown_menu">
                                <a href="#">Sales<span></span></a>
                                <ul>
                                    <li>
                                        <div class="mega-menu-container">
                                            <div class="row">
                                                <div class="col-6 col-sm-6 col-xl-3">
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/createSale">Create Sale</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mega-menu-box">
                                                        <div class="mega-menu-media">
                                                            <div class="mega-menu-media-info">
                                                                <h4 class="mega-menu-heading"><Link to="/Sales">All Sales</Link></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}