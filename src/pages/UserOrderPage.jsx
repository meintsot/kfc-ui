import React, { useState } from 'react';
import { Tabs, Tab, Container, Grid } from '@mui/material';
import ItemList from "../components/ItemList";
import Cart from "../components/Cart";

const UserOrderPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('Appetizers'); // default category

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategory(newValue);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* Category Selector */}
            <Tabs value={selectedCategory} onChange={handleCategoryChange} centered variant="fullWidth" indicatorColor="primary" textColor="primary">
                <Tab label="Appetizers" value="Appetizers" />
                <Tab label="Drinks" value="Drinks" />
                <Tab label="Main Dishes" value="Main Dishes" />
            </Tabs>

            <Grid container spacing={4} sx={{ mt: 4 }}>
                {/* Items List */}
                <Grid item xs={12} md={8}>
                    <ItemList category={selectedCategory} />
                </Grid>

                {/* Cart */}
                <Grid item xs={12} md={4}>
                    <Cart />
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserOrderPage;
