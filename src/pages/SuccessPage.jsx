import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import {useItems} from "../context/ItemsContext";

const SuccessPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { resetCart } = useItems();

    const handleBackToOrder = () => {
        resetCart();
        navigate('/');
    };

    return (
        <div>
            <h2>Order Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <p>Order ID: {orderId}</p>
            <Button variant="contained" color="primary" onClick={handleBackToOrder}>
                Place Another Order
            </Button>
        </div>
    );
};

export default SuccessPage;
