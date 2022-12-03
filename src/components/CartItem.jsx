import React from 'react'
import { useCart } from "../hooks/useCart";
import {Stack,Button} from 'react-bootstrap'

const CartItem = ({item}) => {
const product = item.product
const {removeFromCart} = useCart()
const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD' })

const renderOptions = Object.entries(item.options)?.map(option =>{
    return(
        <div>{option[0]}: {option[1]}</div>
    )
})

  return (
    <Stack direction = "horizontal" 
            gap={2} 
            className='d-flex align-items-center'>
        <img src={product.img} alt={product.title} style={{width: '100px', height: '105px'}}/>
        <div className='me-auto'>
            <div>
                {product.title} {item.quantity > 1 && (
                <span className="text-muted" style={{fontSize:"0.7em"}}>
                    x{item.quantity}
                </span>
                )}
            </div>
            <div className='text-muted'>
                {currency.format(product.price)}
            </div>
            {renderOptions}
        </div>
        <div>
            {currency.format(product.price * item.quantity)}
        </div>
            <Button variant="outline-danger" size="sm" onClick={()=> removeFromCart(product._id)}>&times;</Button>
    </Stack>
  )
}

export default CartItem