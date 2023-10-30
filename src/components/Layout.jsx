import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, IconButton, Badge, Box, CssBaseline, Dialog } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useItems } from '../context/ItemsContext';
import OrderModal from './OrderModal';
import {useLocation} from "react-router-dom";

const Layout = ({ children }) => {
    const location = useLocation();

    const { totalItems } = useItems();

    // State for controlling the visibility of the user info modal
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <CssBaseline />
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        KFC Fast Food
                    </Typography>
                    {location.pathname == "/" && (
                        <IconButton color="inherit" sx={{ ml: 2 }} onClick={handleOpen}>
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {children}
                </Box>
            </Container>

            {/* Order Modal */}
            <Dialog open={open} onClose={handleClose}>
                <OrderModal onClose={handleClose} />
            </Dialog>

            <Box component="footer" sx={{ py: 2, mt: 'auto', backgroundColor: 'background.default' }}>
                <Typography variant="body2" color="textSecondary" align="center">
                    © KFC Fast Food, 2023
                </Typography>
            </Box>
        </div>
    );
}

export default Layout;
