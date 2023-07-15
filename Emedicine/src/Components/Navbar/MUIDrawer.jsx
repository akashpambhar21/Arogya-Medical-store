import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Link } from 'react-router-dom';
import React from 'react'

const MUIDrawer = () => {
    const [openDrawer, setopenDrawer] = React.useState(false);

    return (
        <React.Fragment>
            <Drawer open={openDrawer} onClose={() => setopenDrawer(false)}>
                <List>
                    <ListItemButton component={Link} to="/" onClick={() => setopenDrawer(false)}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ mt: 1 }}>Home</ListItemText>
                    </ListItemButton>

                    <ListItemButton component={Link} to="/profile" onClick={() => setopenDrawer(false)}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ mt: 1 }}>Profile</ListItemText>
                    </ListItemButton>

                    <ListItemButton component={Link} to="/orders" onClick={() => setopenDrawer(false)}>
                        <ListItemIcon>
                            <MedicalServicesIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ mt: 1 }}>My Orders</ListItemText>
                    </ListItemButton>

                </List>
            </Drawer>
            <IconButton onClick={() => setopenDrawer(!openDrawer)} sx={{ ml: 0.5 }}>
                <MenuIcon sx={{ color: blue[50] }} />
            </IconButton>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    ml: 1,
                    mr: 1,
                    // display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.05rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                Arogya Medical Store
            </Typography>
        </React.Fragment>
    )
}

export default MUIDrawer