import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from './UserContext';
import { Grid } from '@mui/material';
import MedicineCard from './MedicineCard';
import EditMedicines from './Admin/EditMedicine';
const Medicines = () => {

    const context = useContext(UserContext);
    const [editopen, setEditOpen] = useState(false);
    const [Medicines, setMedicines] = useState([]);
    const [medid, setMedId] = useState(2);
    const [updated, setUpdated] = useState(false);
    useEffect(() => {
        axios.get("https://localhost:7131/api/Medicines").then(
            (response) => {
                setMedicines(response.data);
            },
            (error) => {
                console.log(error);
            }
        )
    }, [updated]);

    const [inputs, setInputs] = useState({
        name: "",
        manufacturer: "",
        unitPrice: "",
        quantity: "",
        imageUrl: "",
    });

    const onUpdate = () => {
        setUpdated(!updated);
    }

    const navigate = useNavigate();

    const handleClickOpen = (medid) => {
        axios.get(`https://localhost:7131/api/Medicines/${medid}`).then(
            (response) => {
                console.log(response.data.id);
                localStorage.setItem("medid", medid);
                setInputs(response.data);
                setEditOpen(true);
            },
            (error) => {
                console.log(error);
            }
        )
    };

    const handleClose = () => {
        setEditOpen(false);
    };

    const DeleteMedicine = (medId) => {
        axios.delete(`https://localhost:7131/api/Medicines/${medId}`).then(
            (response) => {
                console.log(response);
                onUpdate();
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const OrderMedicine = (med) => {
        if (med.quantity > 0) {

            const Order = ({
                UserID: localStorage.getItem("userId"),
                MedicineName: med.name,
                MedicineID: med.id,
                OrderTotal: med.unitPrice,
            })
            axios.post(`https://localhost:7131/api/Orders`, Order).then(
                (response) => {
                    console.log(response);
                    axios.put(`https://localhost:7131/api/Medicines/${med.id}`, {
                        id:med.id,
                        name: med.name,
                        manufacturer: med.manufacturer,
                        unitPrice: med.unitPrice,
                        quantity: med.quantity-1,
                        imageUrl: med.imageUrl,
                    }).then(
                        (resp) => {
                            console.log(resp.data);
                        },
                        (err) => {
                            console.log(err);
                        }
                    )
                    onUpdate();
                    alert('Ordered Successfully');
                },
                (error) => {
                    console.log(error);
                }
            )
        }
        else {
            alert('Not Available');
        }
    }

    return (
        <>
            <EditMedicines isEditOpen={editopen} onClose={handleClose} id={medid} onUpdate={onUpdate} inputs={inputs} />
            <Grid
                display="flex"
                justifyContent="center"
                spacing={3}
                style={{ marginTop: "150px" }}
                container
            >
                {Medicines.map((med, index) => (
                    <Grid item>
                        <MedicineCard med={med} DeleteMedicine={DeleteMedicine} OrderMedicine={OrderMedicine} handleClickOpen={handleClickOpen} />
                    </Grid>
                ))

                }
            </Grid>
        </>
    )
}

export default Medicines;