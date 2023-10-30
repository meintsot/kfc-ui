import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchOrders = (url) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchOrders = async () => {
            try {
                const response = await axios.get(url, {
                    params: { offset: orders.length }
                });
                if (isMounted) {
                    setOrders(prevOrders => [...prevOrders, ...response.data]);
                    setLoading(false);
                    if (response.data.length < 10) {
                        setHasMore(false);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.response ? err.response.data : err.message);
                    setLoading(false);
                }
            }
        };

        if (hasMore) {
            fetchOrders();
        }

        return () => {
            isMounted = false;
        };
    }, [url, hasMore]);

    return { orders, loading, error, hasMore };
};

export default useFetchOrders;
