import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetchItems = () => {
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:5000/items');
                if (isMounted) {
                    setItems(response.data);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.response ? err.response.data : err.message);
                    setLoading(false);
                }
            }
        }
        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    return { items, loading, error };
};

export default useFetchItems;
