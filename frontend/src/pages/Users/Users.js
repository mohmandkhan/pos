import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Table } from 'reactstrap';

export default function GetAllUsers() {

    const [Users, setUsers] = useState([]);

    useEffect(()=>{
        GetAllUsers();
    },[]);

    const GetAllUsers = async () => {
        const response = await api.get('/users');
        setUsers(response.data);
    }

    console.log(Users);

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone No</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {Users.map(User=>(
                        <tr>
                        <th scope="row"></th>
                        <td>{User.firstName}</td>
                        <td>{User.lastName}</td>
                        <td>{User.email}</td>
                        <td>{User.phoneno}</td>
                        <td>{User.username}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}