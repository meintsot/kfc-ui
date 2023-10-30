import React, { useState } from 'react';
import {TextField, Box, Typography, Button} from '@mui/material';

const UserInfoForm = ({ onUserInfoSubmit }) => {
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        address: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUserInfoSubmit(userInfo);
    };

    return (
        <Box sx={{ mt: 2, p: 2 }} component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
                Place Your Order
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
                Please provide your information below to proceed with the order placement.
            </Typography>
            <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                margin="normal"
                required
                name="fullName"
                value={userInfo.fullName}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label="Address"
                variant="outlined"
                margin="normal"
                required
                name="address"
                value={userInfo.address}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                margin="normal"
                required
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleChange}
            />
            <Box mt={2}>
                <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
            </Box>
        </Box>
    );
};

export default UserInfoForm;
