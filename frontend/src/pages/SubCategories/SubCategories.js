import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Table, Button } from 'reactstrap';
import moment from 'moment';


export default function GetAllSubCategories({ history }) {

    const [SubCategories, setSubCategories] = useState([]);

    const basePath = 'http://localhost:9000/files/'

    useEffect(() => {
        GetSubCategories();
    }, [])

    const GetSubCategories = async () => {
        const response = await api.get('/subcategories/');
        setSubCategories(response.data);
    }

    const DeleteSubCategory = async (subcategoryId) => {
        console.log(subcategoryId);
        const response = await api.delete('/subcategory/delete/' + subcategoryId);
        if (response.data.message === 'Deleted') {
            GetSubCategories();
        }
    }

    console.log(SubCategories);
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>SubCategory Name</th>
                        <th>SubCategory Description</th>
                        <th>Date Created</th>
                        <th>Created By</th>
                        <th>Belongs To</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {SubCategories.map(SubCategory => (
                        <tr>
                            <th scope="row"></th>
                            <td><img src={basePath + SubCategory.thumbnail} alt="Subcategory" width="40" height="40" /></td>
                            <td>{SubCategory.SubCategoryName}</td>
                            <td>{SubCategory.SubCategoryDescription}</td>
                            <td>{moment(SubCategory.date).format('l')}</td>
                            <td>{SubCategory.user.firstName}</td>
                            <td>{SubCategory.category.CategoryName}</td>
                            <td>
                                <Button color="primary" size="sm">Edit</Button>
                                <Button color="danger" size="sm" onClick={() => DeleteSubCategory(SubCategory._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}