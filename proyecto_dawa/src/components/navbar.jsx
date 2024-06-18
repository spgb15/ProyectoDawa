import '../App.css';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import { NavLink, useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

export default function Navbar() {
    const pages = [
        { title: 'Inicio', path: '/' },
        { title: 'Servicios' },
        { title: 'Acerca de nosotros', path: '/nosotros' },
        { title: 'Contactanos', path: '/contacto' }
    ];

    const services = [
        { title: 'Precios de los repuestos', path: '/precios' },
        { title: 'Estado de la reparación', path: '/estado' },
        { title: 'Facturación', path: '/factura' },
    ];

    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElServices, setAnchorElServices] = React.useState(null);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenServicesMenu = (event) => {
        setAnchorElServices(event.currentTarget);
    };

    const handleCloseServicesMenu = () => {
        setAnchorElServices(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MobileFriendlyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Juan Repara
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                page.title === 'Servicios' ?
                                    (user ? (
                                        <MenuItem key={page.title} onClick={handleOpenServicesMenu}>
                                            <Typography textAlign="center">{page.title}</Typography>
                                        </MenuItem>
                                    ) : (
                                        <MenuItem key={page.title} onClick={handleCloseNavMenu} component={NavLink} to={page.path}>
                                            <Typography textAlign="center">{page.title}</Typography>
                                        </MenuItem>
                                    )
                                ) : (
                                    <MenuItem key={page.title} onClick={handleCloseNavMenu} component={NavLink} to={page.path}>
                                        <Typography textAlign="center">{page.title}</Typography>
                                    </MenuItem>
                                )
                            ))}
                        </Menu>
                    </Box>
                    <MobileFriendlyIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={NavLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Juan Repara
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'left', marginRight: '15px' } }}>
                        {pages.map((page) => (
                            page.title === 'Servicios' ? (
                                <Button
                                    key={page.title}
                                    onClick={handleOpenServicesMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.title}
                                </Button>
                            ) : (
                                <Button
                                    key={page.title}
                                    component={NavLink}
                                    to={page.path}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.title}
                                </Button>
                            )
                        ))}
                    </Box>

                    <Menu
                        id="services-menu"
                        anchorEl={anchorElServices}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElServices)}
                        onClose={handleCloseServicesMenu}
                    >
                        {services.map((service) => (
                            <MenuItem key={service.title} onClick={handleCloseServicesMenu} component={NavLink} to={service.path}>
                                <Typography textAlign="center">{service.title}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {user ? (
                                <div>
                                    <MenuItem>
                                        <Typography textAlign="center" fontWeight="bold">{user.nombre}</Typography>
                                    </MenuItem>
                                    <Divider/>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">Cerrar sesión</Typography>
                                    </MenuItem>
                                </div>
                            ) : (
                                <>
                                    <MenuItem onClick={handleCloseUserMenu} component={NavLink} to="/login">
                                        <Typography textAlign="center">Login</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu} component={NavLink} to="/register">
                                        <Typography textAlign="center">Registro</Typography>
                                    </MenuItem>
                                </>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
