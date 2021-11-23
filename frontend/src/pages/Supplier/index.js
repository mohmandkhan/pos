import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Label, Alert, Spinner } from 'reactstrap';
import CameraIcon from '../../assets/camera.jpg';
import './Supplier.css';

export default function CreateSupplier(){

            // CompanyName, 
            // CompanyPhone, 
            // CompanyEmail, 
            // CompanyContactPerson, 
            // CompanyAddress

    const [CompanyName, setCompanyName] = useState('');
    const [CompanyPhone, setCompanyPhone] = useState('');
    const [CompanyEmail, setCompanyEmail] = useState('');
    const [CompanyContactPerson, setCompanyContactPerson] = useState('');
    const [CompanyAddress, setCompanyAddress] = useState('');
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

        const SupplierData = new FormData();
        SupplierData.append("CompanyName", CompanyName);
        SupplierData.append("CompanyPhone", CompanyPhone);
        SupplierData.append("CompanyEmail", CompanyEmail);
        SupplierData.append("CompanyContactPerson", CompanyContactPerson);
        SupplierData.append("CompanyAddress", CompanyAddress);
        SupplierData.append("CompanyThumbnail", thumbnail);
        try{

            if(
                CompanyName!=="" && 
                CompanyPhone!=="" &&
                CompanyEmail!=="" &&
                CompanyContactPerson!=="" &&
                CompanyAddress!=="" &&
                thumbnail!==null  
                
                ){

                  const response = await api.post('/supplier/create', SupplierData);
                  //console.log(response.data.message);
                  setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setSuccess(true);
                    setSuccessMessage(response.data.message);
                    setTimeout(() => {
                        setSuccess(false);
                        setSuccessMessage('');
                    }, 3000)
                }, 2000)

            }else{
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

        }catch(error){
            setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setError(true)
                    setErrorMessage('Error occured');
                    setTimeout(() => {
                        setError(false);
                        setErrorMessage('');
                    }, 2000);
                }, 2000)
        }
    }

    return(
        <Container>
            <h1>Create Supplier</h1>
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
                        <input type="text" id="CompanyName" name="CompanyName" value={CompanyName} placeholder={'Company Name'} onChange={(evt) => setCompanyName(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <input type="text" id="CompanyPhone" name="CompanyPhone" value={CompanyPhone} placeholder={'Company Phone'} onChange={(evt) => setCompanyPhone(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <input type="text" id="CompanyEmail" name="CompanyEmail" value={CompanyEmail} placeholder={'Company Email'} onChange={(evt) => setCompanyEmail(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <input type="text" id="CompanyContactPerson" name="CompanyContactPerson" value={CompanyContactPerson} placeholder={'Company Contact Person'} onChange={(evt) => setCompanyContactPerson(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <input type="text" id="CompanyAddress" name="CompanyAddress" value={CompanyAddress} placeholder={'Company Address'} onChange={(evt) => setCompanyAddress(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" className="submit-btn">
                            Create Supplier
                        </Button>
                    </FormGroup>
                </div>
            </Form>
        </Container>
    )
}