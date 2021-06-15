import React, {useState} from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';

const PaymentScreen = () => {
    const history = useHistory();

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if(!shippingAddress){
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    const submitHandler = e =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeOrder');
    }

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                         type='radio'
                         label='PayPal or Credit Card'
                         id='PayPal'
                         name='paymentMethod'
                         value='PayPal'
                         onChnage={(e) => setPaymentMethod(e.target.value)} 
                         checked
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button className='my-3' type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
};

export default PaymentScreen;
