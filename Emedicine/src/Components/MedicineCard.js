import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const MedicineCard = (props) => {

    const context = useContext(UserContext);
    console.log(props);
    return (
        <>
            <Card sx={{ maxWidth: 350, width: 350 }}>
                <CardMedia
                    sx={{ height: 250 }}
                    image = {props.med.imageUrl}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.med.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manufacturer:- {props.med.manufacturer}<br />
                        Unit Price:- {props.med.unitPrice}<br />
                        Quantity-Available:- {props.med.quantity}
                    </Typography>
                </CardContent>
                <CardActions>
                    {(context.user && context.user.type === "admin") && <Button
                        onClick={() => props.handleClickOpen(props.med.id)}
                        variant="contained"
                        sx={{ "&:hover": { backgroundColor: "#0a2538", color: 'white', }, marginLeft: "3%", width: "30%", backgroundColor: '#0a2538', color: "white" }}
                    >
                        Edit
                    </Button>}
                    {(context.user && context.user.type === "admin") ? <Button
                        onClick={() => props.DeleteMedicine(props.med.id)}
                        variant="contained"
                        style={{ "&:hover": { backgroundColor: "#0a2538", color: 'white', }, marginLeft: "40%", width: "30%", backgroundColor: '#0a2538', color: "white" }}
                    >
                        Delete
                    </Button> : <Button
                        onClick={() => props.OrderMedicine(props.med)}
                        variant="contained"
                        sx={{ "&:hover": { backgroundColor: "#0a2538", color: 'white', },  marginLeft: "35%", width: "30%", backgroundColor: '#0a2538', color: "white" }}
                    >
                        Order
                    </Button>}
                </CardActions>
            </Card>
        </>
    )
}

export default MedicineCard;