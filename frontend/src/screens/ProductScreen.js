import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Col,Row,Image,ListGroup,Button,Form, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {listProductDetails} from '../actions/productAction.js'

const ProductScreen = ({ history,match }) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetails= useSelector(state => state.productDetails)
    const { loading , error, product } = productDetails


    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHundler = ()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (
        <div>
        <Link className='btn btn-primary my-3' to='/'>Go Back</Link> 
        {loading ? <Loader /> : error ? <Message variant ='danger'>{error}</Message> :
        (
          <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />

              </Col>
              <Col md={3}>
                  <ListGroup variant='flush'>
                      <ListGroupItem>
                          <h3>{product.name}</h3>
                      </ListGroupItem>
                      <ListGroupItem>
                          <Rating className='ra'
                            value={product.rating}
                            text={`${product.numReviews} reviews`}/>
                      </ListGroupItem>
                      <ListGroupItem>
                          Price : ${product.price}
                      </ListGroupItem>
                      <ListGroupItem>
                          Description : {product.description}
                      </ListGroupItem>
                  </ListGroup>

              </Col>
              <Col md={3}>
                  <ListGroup variant ='flush'>
                      <ListGroupItem>
                          <Row>
                              <Col>Price : </Col>
                              <Col><strong>${product.price}</strong></Col>
                          </Row>
                      </ListGroupItem>
                      <ListGroupItem>
                          <Row>
                              <Col>Status : </Col>
                              <Col>{product.countInStock > 0 ?'In Stock!': 'Out Of Stock!'}</Col>
                          </Row>
                      </ListGroupItem>
                      {product.countInStock > 0 && (
                          <ListGroup.Item>
                              <Row>
                                  <Col>Quantity</Col>
                                  <Col>
                                    <Form.Control 
                                        as='select' 
                                        value={qty}
                                        onChange={(e)=>setQty(e.target.value)}
                                    >
                                        {
                                            [...Array(product.countInStock).keys()].map(x => (
                                                <option key={x + 1} value ={x + 1}>{x + 1}</option>
                                                ))
                                        }
                                    </Form.Control>
                                  </Col>
                              </Row>
                          </ListGroup.Item>
                      )}

                      <ListGroupItem>
                           <Button
                            onClick={addToCartHundler}
                            className='btn-block'
                            type='button'
                            disabled={product.countInStock===0}
                            >
                            Add To Cart
                           </Button>
                      </ListGroupItem>
                  </ListGroup>
              </Col>
          </Row>
        )}

        </div>
    )
}

export default ProductScreen
