import useFetchOrders from '../hooks/useFetchOrders';
import io from 'socket.io-client';
import { useCallback, useEffect, useRef, useState } from "react";
import { Grid, Typography } from '@mui/material';
import OrderCard from '../components/OrderCard';

const MerchantPage = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { orders: fetchedOrders, loading, error, hasMore } = useFetchOrders('http://localhost:5000/orders', currentPage);

    useEffect(() => {
        if (fetchedOrders) {
            if (currentPage === 1) {
                setOrders(fetchedOrders);
            } else {
                setOrders(prevOrders => [...prevOrders, ...fetchedOrders]);
            }
        }
    }, [fetchedOrders, currentPage]);

    useEffect(() => {
        const socket = io('http://localhost:5000/');
        socket.on('connect', () => {
            console.log('Socket connected!');
        });
        socket.on('disconnect', (reason) => {
            console.log('Socket disconnected due to:', reason);
        });
        socket.on('connect_error', (error) => {
            console.log('Connection error:', error.message);
        });
        socket.on('connect_timeout', () => {
            console.log('Connection timeout');
        });
        socket.on('error', (error) => {
            console.log('Error event:', error.message);
        });
        socket.on('receive-order', (newOrder) => {
            setOrders(prevOrders => [newOrder, ...prevOrders]);
        });

        return () => socket.disconnect();
    }, []);

    // Infinite scroll logic
    const observer = useRef();
    const lastOrderRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                console.log('Reached bottom, fetching more orders...');
                setCurrentPage(currentPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Recent Orders
            </Typography>

            <Grid container spacing={3}>
                {orders.map((order, index) => (
                    <Grid item key={order._id} xs={12} md={6} ref={orders.length === index + 1 ? lastOrderRef : null}>
                        <OrderCard order={order} />
                    </Grid>
                ))}
            </Grid>

            {loading && <Typography variant="h6" style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</Typography>}
            {error && <Typography variant="h6" color="error" style={{ textAlign: 'center', marginTop: '20px' }}>Error: {error}</Typography>}
        </div>
    );
}

export default MerchantPage;
