import MobileFriendly from "@mui/icons-material/MobileFriendly";
import { Typography, Box, Button, Container } from "@mui/material";
import { NavLink } from 'react-router-dom';
import '../styles/footer.css';

export default function Component() {
    const pages = [
        { title: 'Inicio', path: '/' },
        { title: 'Precio de Repuestos', path: '/precio' },
        { title: 'Estado de la reparación', path: '/estado' },
        { title: 'Acerca de nosotros', path: '/nosotros' },
        { title: 'Contactanos', path: '/contacto' },
        { title: 'Iniciar Sesión', path: '/login' },
        { title: 'Registrarse', path: '/register' }
    ];

    const legalLinks = [
        {
            title: 'Política de privacidad',
            path: '/'
        },
        {
            title: 'Términos de servicio',
            path: '/'
        },
        {
            title: 'Política de cookies',
            path: '/'
        }
    ];

    return (
        <footer className="bg">
            <Container maxWidth='xl'>
                <div className="container">
                    <div className="logo-column">
                        <a href="/" className="logo">
                            <MobileFriendly sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '50px', color: 'black' }} />
                            <Typography sx={{
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 900,
                                fontSize: '25px',
                                letterSpacing: '.2rem',
                                color: 'black',
                                textDecoration: 'none'
                            }}>Juan Repara</Typography>
                        </a>
                    </div>
                    <div className="links-column">
                        <Typography component='h4' variant="subtitle" sx={{ marginBottom: '10px' }}>Quick Links</Typography>
                        <span style={{ display: 'inline-block', flexDirection: 'column' }} >
                            {pages.map((page) => (
                                <Button
                                    key={page.title}
                                    component={NavLink}
                                    to={page.path}
                                    sx={{ m: 2, color: 'black', display: 'block', margin: '3px', padding: '0', fontSize: '12px' }}
                                    className="links"
                                >
                                    {page.title}
                                </Button>
                            ))}
                        </span>
                    </div>
                    <div className="legal-column">
                        <Typography component='h4' variant="subtitle" sx={{ marginBottom: '10px' }}>Legal</Typography>
                        <nav>
                            {legalLinks.map((legal) => (
                                <Button
                                    key={legal.title}
                                    component={NavLink}
                                    to={legal.path}
                                    sx={{ m: 2, color: 'black', display: 'block', margin: '3px', padding: '0', fontSize: '12px' }}
                                    className="links"
                                >
                                    {legal.title}
                                </Button>
                            ))}
                        </nav>
                    </div>
                </div>
                <div className="copy-column">
                        <p className="copy">&copy; 2024 Juan Repara - Grupo 7. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    )
}
