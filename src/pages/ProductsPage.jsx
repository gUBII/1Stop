import React,{useState, useEffect} from "react";
import ProductItem from "../components/ProductItem";
import api from '../api/services'
import {Container, Row, Col} from 'react-bootstrap';

export default function ProductsPage() {

  const [products, setProducts] = useState([]);

    useEffect(() => {
      api.getProducts()
      .then(response =>{
        setProducts(response)
      })
    }, [])

    return (
      <Container
        className = 'h-100' 
        style={{'backgroundColor': 'white'}}>
        <Row xs={1} md={2} lg={4} className="g-1`">
            {products.map((product) =>(
              <Col key={product._id}>
                <ProductItem product={product}/>
              </Col>
            ))}
        </Row>
      </Container>
    )
}
