import useFetchItems from "../hooks/useFetchItems";
import { createContext, useState, useEffect, useContext } from "react";

export const ItemsContext = createContext();

export const useItems = () => {
    return useContext(ItemsContext);
};

export const ItemsProvider = ({ children }) => {
    const { items: fetchedItems, loading, error } = useFetchItems('http://localhost:3000/items');
    const [items, setItems] = useState({});
    const [cart, setCart] = useState({ items: [], total: 0 });
    const [totalItems, setTotalItems] = useState(0); // New state for total items

    useEffect(() => {
        if (fetchedItems) {
            setItems(fetchedItems);
        }
    }, [fetchedItems]);

    const updateTotalItems = (updatedCartItems) => {
        const total = updatedCartItems.reduce((acc, item) => acc + item.quantity, 0);
        setTotalItems(total);
    };

    const addItemToCart = (itemToAdd) => {
        setCart(prevCart => {
            const existingItem = prevCart.items.find(item => item._id === itemToAdd._id);
            let updatedItems;
            if (existingItem) {
                updatedItems = prevCart.items.map(item =>
                    item._id === itemToAdd._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedItems = [...prevCart.items, { ...itemToAdd, quantity: 1 }];
            }
            const newTotal = updatedItems.reduce((acc, item) => acc + item.price.EUR * item.quantity, 0);
            updateTotalItems(updatedItems); // Update total items
            return { items: updatedItems, total: newTotal };
        });
    };

    const removeItemFromCart = (itemId) => {
        setCart(prevCart => {
            const existingItem = prevCart.items.find(item => item._id === itemId);
            let updatedItems;
            if (existingItem && existingItem.quantity > 1) {
                updatedItems = prevCart.items.map(item =>
                    item._id === itemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                updatedItems = prevCart.items.filter(item => item._id !== itemId);
            }
            const newTotal = updatedItems.reduce((acc, item) => acc + item.price.EUR * item.quantity, 0);
            updateTotalItems(updatedItems); // Update total items
            return { items: updatedItems, total: newTotal };
        });
    };

    const resetCart = () => {
        setCart({ items: [], total: 0 });
        setTotalItems(0);
    };

    return (
        <ItemsContext.Provider value={{ items, cart, totalItems, addItemToCart, removeItemFromCart, resetCart, loading, error }}>
            {children}
        </ItemsContext.Provider>
    );
};
