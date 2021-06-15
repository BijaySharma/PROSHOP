import React, {useState, useEffect} from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { useLocation, useHistory } from 'react-router-dom';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const { loading, user, error } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const location = useLocation();
    const history = useHistory();
    
    
    useEffect(() => {
        if(!userInfo){
            history.push('/login');
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'));
            }else{
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [history, userInfo, user, dispatch, getUserDetails]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match');
        }else{
           dispatch(updateUserProfile({id: user._id, name, email, password}));
        }
    }

    return <Row>
        <Col md={3}>
        <h2>User Profile</h2>
        { error && <Message variant='danger'>{error}</Message> }
        { success && <Message variant='success'>User Updated Successfully</Message> }
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
                Update
            </Button>
        </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
}

export default ProfileScreen;
