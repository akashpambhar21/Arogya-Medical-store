import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Navbar/Navbar';
import { Button, Typography } from '@mui/material';

export default function Orders() {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    
    useEffect(() => {
        axios.post(`https://localhost:7131/api/Orders/${localStorage.getItem("userId")}`).then(
            (response) => {
                setInputs(response.data);
            },
            (error) => {
                console.log(error);
            }
        )
    }, []);

    return (
        <>
            <NavBar />
            {(inputs.length === 0) ? <Typography variant="h6" gutterBottom style={{ marginTop: "8%", marginLeft: "1%" }}>You haven't ordered yet!! <Button onClick={() => { navigate('/') }}>click here</Button> to order.</Typography> :
                <Table bordered hover style={{ marginTop: "15%" }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Medicine Name</th>
                            <th>Order Total</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inputs.map((i, index) => (
                            <tr>
                                <td>{i.id}</td>
                                <td>{i.medicineName}</td>
                                <td>{i.orderTotal}</td>
                                <td>1</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>}
        </>
    );

}