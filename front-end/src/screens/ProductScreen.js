import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { detailsProduct } from '../actions/productActions';


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [dispatch, productId]);
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }
    return (
        <div>
            {loading ? (<LoadingBox />
            ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
                ) : ( 

        <div>
            <Link to="/">Back to result</Link>
            <div className="row top">
                <div className="col-2">
                    <img className="large" src={product.image} alt ={product.name} />
                 </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h2>{product.name}</h2>
                        </li>
                        <li>
                            <Rating 
                                rating={product.rating}
                                numReviews={product.numReviews}
                            />
                        </li>
                        <li>
                            Price : ${product.price}
                        </li>
                        <li>
                             Description: <p>{product.description}</p>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    {product.countInStock > 0 ? (
                                        <span className="success">In stock</span>
                                        ) : (
                                        <span className="danger">Unavilable</span>
                                    )}

                                </div>
                            </li>
                            { product.countInStock > 0 && (
                                <>  
                                <li className="row">
                                    <div>QTY</div>
                                    <div>
                                        <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                            {
                                                [...Array(product.countInStock).keys()].map(
                                                    (x) => (
                                                    <option key={x+1} value={x+1}>{x + 1}</option>
                                                )
                                                 )}
                                        </select>
                                    </div>
                                </li>
                                    <li>
                                        <button onClick={addToCartHandler}
                                            className="primary block">Add to Cart</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )}
    </div>
    );
}
