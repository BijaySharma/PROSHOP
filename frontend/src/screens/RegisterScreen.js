import React, {useState, useEffect} from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { useLocation, useHistory, Link } from 'react-router-dom';

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const location = useLocation();
    const history = useHistory();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    
    
    useEffect(() => {
        if(userInfo){
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match');
        }else{
            dispatch(register(name, email, password));
        }
    }

    return <FormContainer>
        <h1>Sign In</h1>
        { error && <Message variant='danger'>{error}</Message> }
        { message &&  <Message variant='danger'>{message}</Message>}
        { loading && <Loader/> }
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter Full Name' value={name} onChange={(e) => setName(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Re-Enter Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button className='my-3' type='submit' variant='primary'>
                Sign Up
            </Button>
        </Form>
        <Row className='py-3'>
            <Col>
                Already have an account ? 
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Sign In
                </Link>
            </Col>
        </Row>
    </FormContainer>
}

export default RegisterScreen;
