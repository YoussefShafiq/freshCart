import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export let CartContext = createContext()

export default function CartContextProvider({ children }) {


    const [cartItems, setCartItems] = useState(null)

    let headers = {
        token: localStorage.getItem('userToken')
    }

    async function updateProduct(productId, count) {
        try {
            let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                count
            }, {
                headers
            })

            setCartItems(data);
            return data;

        } catch (error) {
            console.log(error);
        }
    }

    async function deleteProduct(productId) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers
            })
            setCartItems(data);
            return data;

        } catch (error) {
            console.log(error);
        }
    }

    async function getCartItems() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers
            })
            setCartItems(data)
            return data
        } catch (error) {
            if (error.response.data.statusMsg == 'fail') {
                return 'noCartFound'
            }
            console.log(error.response.data.statusMsg);
        }
    }

    async function addToCart(productId) {
        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                productId
            }, {
                headers
            })
            getCartItems()
            toast.success(data.message, {
                duration: 2000
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function checkoutSession(shippingAddress) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartItems.data._id}?url=http://localhost:5173`, {
                shippingAddress
            }, {
                headers
            })
            console.log(data);
            return data
        } catch (error) {
            console.log(error.response.data);

        }
    }

    useEffect(() => {
        getCartItems()
    }, [])


    return <CartContext.Provider value={{ checkoutSession, deleteProduct, updateProduct, addToCart, getCartItems, cartItems, setCartItems }}>
        {children}
    </CartContext.Provider>
}