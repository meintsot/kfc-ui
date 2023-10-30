import React, { useState } from 'react';
import { useItems } from "../context/ItemsContext";
import { Paper, List, ListItem, ListItemText, Typography, Box, Select, MenuItem } from '@mui/material';

const Cart = () => {
    const { cart } = useItems();

    // State to manage the selected currency
    const [selectedCurrency, setSelectedCurrency] = useState('EUR');

    // Calculate the total based on the selected currency
    const total = +cart.items.reduce((acc, item) => acc + (item.price[selectedCurrency] * item.quantity), 0).toFixed(2);

    // Get available currencies from the first item's price object as an example (assumes all items have the same available currencies)
    const availableCurrencies = Object.keys(cart.items[0]?.price || {});

    return (
        <Paper elevation={2} sx={{ padding: '1rem', backgroundColor: '#f9f9f9', marginTop: '2rem', marginBottom: '2rem' }}>
            <Typography variant="h5" component="div" gutterBottom>
                Your Cart
            </Typography>
            <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                <List>
                    {cart.items.map(item => (
                        <ListItem key={item._id}>
                            <ListItemText primary={`${item.name} - Quantity: ${item.quantity}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box sx={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1">
                    Total: {total} {selectedCurrency}
                </Typography>
                <Select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    sx={{ marginLeft: '1rem' }}
                >
                    {availableCurrencies.map(currency => (
                        <MenuItem key={currency} value={currency}>
                            {currency}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        </Paper>
    );
};

export default Cart;
