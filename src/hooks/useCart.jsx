import { createContext, useState, useContext } from "react";
import Cart from "../components/Cart";

const CartContext = createContext(null)

export const useCart = () =>  useContext(CartContext)

export const CartProvider =({children}) =>{
    const [cart, setCart] = useState([])
    const [showCart, setShowCart] = useState(false);

    const handleCloseCart = () => setShowCart(false);
    const handleShowCart = () => setShowCart(true);

    const totalItems = cart.reduce((qty, item) => item.quantity + qty,0)

    const getItemQuantity = (product => cart.find(item => item.id === product._id)?.quantity || 0)
    const increaseCartQuantity = (product, qty, options)=>{
        setCart(currCart=>{
            if(currCart.find(item => item.product._id ===product._id)==null){
                return [...currCart, {product, quantity: qty, options}]
            }
            else {
                return currCart.map(item =>{
                    if(item.product._id===product._id){
                        return{...item, quantity:item.quantity+qty,options}
                    } else{
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id) => {
        setCart(currCart =>{
            return currCart.filter(item => item.product._id !==id)
        })
    }

    return(
        <CartContext.Provider value = {{getItemQuantity,increaseCartQuantity, removeFromCart, handleShowCart, handleCloseCart, cart, totalItems}}>
        {children}
        <Cart showCart={showCart}/>
        </CartContext.Provider>
    )
}