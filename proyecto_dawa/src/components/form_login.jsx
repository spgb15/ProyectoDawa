import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import '../styles/form_login.css';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Juan Repara - Grupo 7
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn() {
    const [error, setError] = useState(null);
    const [credentials, setCredentials] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const cedula = data.get('cedula');
        const password = data.get('password');

        if (cedula.length !== 10) {
            setError('La cédula debe contener 10 números');
            return;
        }

        if (!/^\d+$/.test(cedula)) {
            setError('La cédula debe contener solo números');
            return;
        }

        if (!cedula || !password) {
            setError('Ingrese Usuario o contraseña válida');
        } else {
            const credentials = {
                cedula: cedula,
                password: password,
            };
            setCredentials(credentials);
            setError("");
        }
    };

    useEffect(() => {
        if (credentials) {
            fetch("http://localhost:3200/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((data) => {
                        throw new Error(data.message || 'Usuario o contraseña incorrectos');
                    });
                }
                return res.json();
            })
            .then((data) => {
                console.log('Response from server:', data); 
                if (data && data.success) {
                    if (data.data && data.data.cedula && data.data.nombre && data.data.rol) { 
                        console.log(data);
                        const user = {
                            id_usuario: data.data.usuario_id,
                            cedula: data.data.cedula,
                            nombre: data.data.nombre,
                            rol: data.data.rol,
                            
                        };
                        localStorage.setItem('user', JSON.stringify(user));
                        setError(null);
                        navigate('/');
                    } else {
                        throw new Error('Datos de usuario incompletos en la respuesta');
                    }
                } else if (data) {
                    setError(data.message);
                }
            })
            .catch((err) => {
                console.error('Error during login:', err); 
                setError(err.message || 'Usuario o contraseña incorrecta.');
            });
        }
    }, [credentials, navigate]);

    return (
        <div className='contenedor'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
                    <MobileFriendlyIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="cedula"
                        label="Cédula"
                        name="cedula"
                        autoComplete="cedula"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    {error && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert variant="filled" severity="error">
                                {error}
                            </Alert>
                        </Stack>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Iniciar Sesión
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"¿No tienes una cuenta? Crear una"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </div>
    );
}
