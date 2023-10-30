import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Cart from './Cart';
import UserInfoForm from './UserInfoForm';
import { useItems } from '../context/ItemsContext';

const OrderModal = ({onClose}) => {
    const { cart } = useItems();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const newSocket = io('http://localhost:5000/');
        setSocket(newSocket);

        newSocket.on('order-confirmation', (response) => {
            setIsSubmitting(false);

            if (response.status === 'success') {
                navigate(`/success/${response.orderId}`);
                onClose();
            } else {
                setError(response.message || "An internal error has occurred. Please try again later.");
            }
        });

        // Clean up and disconnect the socket when the component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, [navigate]);

    const handleUserInfoSubmit = (userInfo) => {
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);

        const order = {
            customerName: userInfo.fullName,
            customerAddress: userInfo.address,
            totalAmount: cart.total,
            items: cart.items.map(item => ({ item: item._id, quantity: item.quantity })),
            orderDate: new Date().toISOString(),
            expectedDeliveryTime: new Date(Date.now() + 1.5 * 60 * 60 * 1000).toISOString()
        };

        if (socket) {
            console.log('Socket connected:', socket.connected);
            socket.emit('place-order', order);
        }
    };

    return (
        <div>
            <Cart />
            <UserInfoForm onUserInfoSubmit={handleUserInfoSubmit} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default OrderModal;
