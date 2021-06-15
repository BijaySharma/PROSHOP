import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';

const ShippingScreen = () => {
    const history = useHistory();

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = e =>{
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        e.preventDefault();
        history.push('/payment');
    }

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type='text' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} ></Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} ></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control type='text' placeholder='Postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} ></Form.Control>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Postal Code' value={country} onChange={(e) => setCountry(e.target.value)} ></Form.Control>
                </Form.Group>
                <Button className='my-3' type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
};

export default ShippingScreen;
