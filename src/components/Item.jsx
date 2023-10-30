import React, { useState } from 'react';
import { useItems } from '../context/ItemsContext';
import { Typography, Button, Select, MenuItem, Box } from '@mui/material';

const Item = ({ item }) => {
    const { addItemToCart, removeItemFromCart, cart } = useItems();  // Destructure cart from the context

    // Check if the current item exists in the cart and its quantity
    const cartItem = cart.items.find(cartItem => cartItem._id === item._id);
    const itemQuantityInCart = cartItem ? cartItem.quantity : 0;

    // State to manage the selected currency
    const [selectedCurrency, setSelectedCurrency] = useState('EUR');

    // Get available currencies from the item's price object
    const availableCurrencies = Object.keys(item.price);

    return (
        <Box className="item" sx={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '4px', marginBottom: '1rem' }}>
            <Typography variant="h6" gutterBottom>{item.name}</Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>{item.description}</Typography>
            <Typography variant="body1" gutterBottom>
                Price: {item.price[selectedCurrency]}
            </Typography>
            <Select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                sx={{ marginBottom: '1rem', marginRight: '1rem' }}
            >
                {availableCurrencies.map(currency => (
                    <MenuItem key={currency} value={currency}>
                        {currency}
                    </MenuItem>
                ))}
            </Select>
            <Button variant="contained" color="primary" onClick={() => addItemToCart(item)} sx={{ marginRight: '1rem' }}>
                +
            </Button>
            {itemQuantityInCart > 0 && (   // Conditionally render the "-" button
                <Button variant="contained" color="secondary" onClick={() => removeItemFromCart(item._id)}>
                    -
                </Button>
            )}
        </Box>
    );
};

export default Item;
