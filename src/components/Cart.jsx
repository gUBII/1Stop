import React from 'react'
import { useCart } from "../hooks/useCart";
import CartItem from './CartItem'
import services from '../api/services'
import { Stack, Offcanvas, Button } from 'react-bootstrap';
import { HiOutlineShoppingBag } from "react-icons/hi";

const Cart = ({showCart}) => {
    const {cart, totalItems, handleCloseCart} = useCart()

    const renderedList = cart.map(item=> <CartItem key={item.product._id} item={item}/>)
    const lineItems = cart.map(item => ({_id: item.product._id, quantity:item.quantity}))
  
    const handleCheckout = () => {
        services.checkout(lineItems)
        .then((url)=>{
             window.location.href = url   
        })

    } 
  
    return (
    <Offcanvas show={showCart} onHide={handleCloseCart} placement="end" scroll='true'>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {totalItems === 0 ? 
                <Stack gap={3} className='d-flex align-items-center'>
                <HiOutlineShoppingBag style={{width:"5em", height:"5em"}} />
                <p>Your shopping cart is empty</p>
                </Stack>
            : <Stack gap={2}>
                {renderedList}
                <Button 
                variant="outline-secondary"
                onClick = {()=> handleCheckout()}
                >Go to Checkout</Button>
            </Stack>}
        </Offcanvas.Body>
  </Offcanvas>
  )
}

export default Cart