import { Paper, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';

const OrderCard = ({ order }) => {
    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
                Order from: {order.customerName}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
                Address: {order.customerAddress}
            </Typography>
            <Divider style={{ margin: '10px 0' }} />
            <List>
                {order.items.map(item => (
                    <ListItem key={item.item.name}>
                        <ListItemText primary={`${item.item.name} (x${item.quantity})`} secondary={`$${item.item.price.toFixed(2)} each`} />
                    </ListItem>
                ))}
            </List>
            <Divider style={{ margin: '10px 0' }} />
            <Typography color="textSecondary">
                Total Amount: ${order.totalAmount.toFixed(2)}
            </Typography>
            <Typography color="textSecondary">
                Order Date: {new Date(order.orderDate).toLocaleString()}
            </Typography>
            <Typography color="textSecondary">
                Expected Delivery: {new Date(order.expectedDeliveryTime).toLocaleString()}
            </Typography>
        </Paper>
    );
}

export default OrderCard;
