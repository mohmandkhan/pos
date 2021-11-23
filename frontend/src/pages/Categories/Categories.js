import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Table } from 'reactstrap';
import moment from 'moment';


export default function GetAllCategories({ history }) {

    const [Categories, setCategories] = useState([]);

    const basePath = 'http://localhost:9000/files/'

    useEffect(() => {
        GetCategories();
    }, [])

    const GetCategories = async () => {
        const response = await api.get('/categories/');
        setCategories(response.data);
    }

    const serialNo = 0;

    console.log(Categories);
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Category Name</th>
                        <th>Category Description</th>
                        <th>Date Created</th>
                        <th>Created By</th>
                    </tr>
                </thead>
                <tbody>
                    {Categories.map(Category => (
                        <tr>
                            <th scope="row"></th>
                            <td><img src={basePath+Category.thumbnail} width="40" height="40" /></td>
                            <td>{Category.CategoryName}</td>
                            <td>{Category.CategoryDescription}</td>
                            <td>{moment(Category.date).format('l')}</td>
                            <td>{Category.user.firstName}</td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}