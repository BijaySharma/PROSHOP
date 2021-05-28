import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


const ProductScreen = () => {
    let params = useParams();
    const productDetails = useSelector(state => state.productDetails);
    const { error, loading, product } = productDetails;
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProductDetails(params.id));
    },[dispatch, params.id]);

    return <>

        <Link className="btn btn-light my-3" to="/">Go Back</Link>

        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
        
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroupItem>
                        <h3>{product.name}</h3>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroupItem>
                    <ListGroupItem>
                        Price: ${product.price}
                    </ListGroupItem>
                    <ListGroupItem>
                        Description: ${product.description}
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md-3>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        {product.price}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem >
                                <Button type="button" className="col-12" disabled={product.countInStock === 0}>Add to Cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </ListGroup>
                </Card>
            </Col>
        </Row>

        
        </>}
        
    </>
    
};

export default ProductScreen;
