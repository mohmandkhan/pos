import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import api from '../../services/api';
import { Table } from 'reactstrap';
import moment from 'moment';


export default function GetAllSuppliers({ history }) {

    const [Suppliers, setSuppliers] = useState([]);

    const basePath = 'http://localhost:9000/files/'

    useEffect(() => {
        GetSuppliers();
    }, [])

    const GetSuppliers = async () => {
        const response = await api.get('/suppliers/');
        setSuppliers(response.data);
    }

    const DeleteSupplier = async (supplierId) => {
        console.log(supplierId);
        const response = await api.delete('/supplier/delete/'+supplierId);
        if(response.data.message === 'Deleted'){
            GetSuppliers();
        }
    }

    //console.log(Suppliers);
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Company Name</th>
                        <th>Company Phone</th>
                        <th>Company Email</th>
                        <th>Contact Person</th>
                        <th>Company Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Suppliers.map(Supplier => (
                        <tr>
                            <th scope="row"></th>
                            <td><img src={basePath+Supplier.CompanyThumbnail} width="40" height="40" /></td>
                            <td>{Supplier.CompanyName}</td>
                            <td>{Supplier.CompanyPhone}</td>
                            <td>{Supplier.CompanyEmail}</td>
                            <td>{Supplier.CompanyContactPerson}</td>
                            <td>{Supplier.CompanyAddress}</td>
                            <td>
                                <Button color="primary" size="sm">Edit</Button>
                                <Button color="danger" size="sm" onClick={()=>DeleteSupplier(Supplier._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}