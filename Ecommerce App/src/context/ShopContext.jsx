import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 0;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [selectedWilaya, setSelectedWilaya] = useState('');
    const [selectedDeliveryType, setSelectedDeliveryType] = useState('domicile');
    const [search, setSearch] = useState('');
    const [showSearch , setShowSearch] = useState(false);
    const [products ,setProducts] = useState([]);
    const [token, setToken] = useState('');



    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : {};
    });
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });
    const navigate = useNavigate()
    
    const getDeliveryFee = () => {
        if (selectedWilaya) {
            return selectedDeliveryType === 'domicile' ? selectedWilaya.domicile : selectedWilaya.stopdesk;
        }
        return 0; // default
    }

    const addToCart = async (itemId, color)=>{

        if (!color) {
            toast.error('select a color first');
            return;
        }

        let cartData = structuredClone(cartItems);


        if (cartData[itemId]) {
            if (cartData[itemId][color]) {
                cartData[itemId][color] += 1 ;
            } else {
                cartData[itemId][color] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][color] = 1;
        } setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add' ,{itemId,color} , {headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.messsage)

            }
        }
    }
       
    const getCartCount = ()=>{
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error('Error calculating cart count:', error);
                }
            }
        }
        return totalCount;

    }

    const getCartAmount = ()=>{
        let totalAmount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        const product = products.find((product)=> product._id === items);
                        if (product) {
                            totalAmount += product.price * cartItems[items][item];
                        }
                    }
                } catch (error) {
                    console.error('Error calculating cart amount:', error);
                }
            }
        }
        return totalAmount;
    }

    const updateQuantity = (itemId,color,quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][color] = quantity

        setCartItems(cartData)
    }

    const placeOrder = () => {
        const orderItems = [];
        for (const itemId in cartItems) {
            for (const color in cartItems[itemId]) {
                if (cartItems[itemId][color] > 0) {
                    const product = products.find(p => p._id === itemId);
                    if (product) {
                        orderItems.push({
                            ...product,
                            color,
                            quantity: cartItems[itemId][color],
                            date: new Date().toLocaleDateString()
                        });
                    }
                }
            }
        }
        if (orderItems.length > 0) {
            setOrders(prevOrders => [...prevOrders, ...orderItems]);
            setCartItems({});
            toast.success('Order placed successfully!');
        } else {
            toast.error('No items in cart to place order.');
        }
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);


    const getProductData = async  ()=> {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    useEffect(()=> {
        getProductData()
    },[]);



    useEffect(()=>{
        if (!token && localStorage.getItem('token') ) {
            setToken(localStorage.getItem('token') )
        }
    },[])

    


    const value = {
        products , currency, delivery_fee, search, setSearch, showSearch , setShowSearch , cartItems,
        setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, selectedWilaya, setSelectedWilaya, selectedDeliveryType, setSelectedDeliveryType, getDeliveryFee, orders, placeOrder, backendUrl, setToken, token
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider
