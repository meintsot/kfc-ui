import React from 'react';
import Item from './Item';
import { useItems } from "../context/ItemsContext";
import { Paper, Box } from '@mui/material';

const ItemList = ({ category }) => {
    const { items } = useItems();
    const itemsInCategory = items[category] || [];

    return (
        <Paper elevation={2} sx={{ padding: '1rem', backgroundColor: '#f7f7f7', marginTop: '1rem' }}>
            <Box className="item-list" sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {itemsInCategory.map(item => (
                    <Item key={item._id} item={item} />
                ))}
            </Box>
        </Paper>
    );
};

export default ItemList;
