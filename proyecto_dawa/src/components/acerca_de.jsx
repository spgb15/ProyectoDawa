import React from 'react';
import { Typography, Box, Grid, Container, Paper } from '@mui/material';
import '../styles/AboutUs.css';

const AcercaDe = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="section">
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom className="blue-title">
                Acerca de Juan Repara
              </Typography>
              <Typography variant="body1" paragraph>
                Bienvenido a Juan Repara, tu aliado confiable en el mundo de la
                reparación y mantenimiento de teléfonos celulares. Con una pasión
                inquebrantable por la tecnología y un compromiso absoluto con la
                satisfacción del cliente, en Juan Repara nos dedicamos a
                proporcionar soluciones eficientes y accesibles para tus
                dispositivos móviles.
              </Typography>
              <img src="https://www.digitaloutlet.com.uy/imgs/plantillas/reparacin-de-celulares-20240516160244.jpg" alt="Juan Repara" className="about-us-image" />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="section">
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom className="blue-title">
                Nuestro Compromiso
              </Typography>
              <Typography variant="body1" paragraph>
                En Juan Repara entendemos lo importante que son tus dispositivos
                móviles en tu vida diaria. Desde comunicarte con tus seres
                queridos hasta manejar tus negocios, sabemos que un teléfono
                celular en perfecto estado es esencial. Por eso, nos comprometemos
                a ofrecer:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                    <strong>Calidad y Profesionalismo:</strong> Nuestro equipo de
                    técnicos altamente capacitados está listo para diagnosticar y
                    resolver cualquier problema que pueda tener tu teléfono
                    celular, utilizando repuestos de la más alta calidad.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Transparencia:</strong> Creemos en la honestidad y la
                    transparencia en cada paso del proceso de reparación. Te
                    mantendremos informado sobre el estado de tu dispositivo y
                    los costos involucrados en todo momento.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Servicio Personalizado:</strong> Entendemos que cada
                    cliente es único. Nos adaptamos a tus necesidades
                    específicas y te ofrecemos soluciones personalizadas que se
                    ajusten a tu presupuesto y tiempo disponible.
                  </Typography>
                </li>
              </ul>
              <img src="https://www.tudiras.com.es/media/media/784/1410/39074/vinilo-textil-compromiso-sublimacion-tu-diras-sl.jpg" alt="Compromiso" className="about-us-image" />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="section">
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom className="blue-title">
                Nuestros Servicios
              </Typography>
              <Typography variant="body1" paragraph>
                En Juan Repara ofrecemos una amplia gama de servicios para
                asegurarnos de que tu teléfono celular reciba el tratamiento
                adecuado:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                    <strong>Reparación de Pantallas y Componentes:</strong> Desde
                    pantallas rotas hasta baterías agotadas, estamos aquí para
                    reparar y reemplazar cualquier componente dañado de tu
                    teléfono.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Venta de Repuestos:</strong> Disponemos de una extensa
                    selección de repuestos originales y compatibles para
                    diferentes marcas y modelos de teléfonos celulares. Desde
                    baterías hasta cámaras y botones, tenemos todo lo que
                    necesitas para mantener tu dispositivo en óptimas
                    condiciones.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Asesoramiento y Consultoría:</strong> ¿No estás seguro
                    de qué reparación necesita tu teléfono? No te preocupes,
                    nuestros expertos están disponibles para asesorarte y
                    responder a todas tus preguntas.
                  </Typography>
                </li>
              </ul>
              <img src="https://www.compraensanjuan.com/fotos_articulos/310228_1.jpg" alt="Servicios" className="about-us-image" />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="section">
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom className="blue-title">
                Nuestra Historia
              </Typography>
              <Typography variant="body1" paragraph>
                Fundada por Juan Pérez, un apasionado por la tecnología y con más de una
                década de experiencia en el campo de la reparación de teléfonos
                celulares, Juan Repara comenzó como un pequeño taller en nuestra
                comunidad local. Con el tiempo, hemos crecido gracias al apoyo y la
                confianza de nuestros clientes, expandiendo nuestros servicios para
                satisfacer las necesidades crecientes del mercado.
              </Typography>
              <Typography variant="body1" paragraph>
                En Juan Repara, estamos comprometidos con la excelencia y la
                satisfacción del cliente. Confía en nosotros para mantener tu teléfono
                celular funcionando como nuevo. ¡Visítanos hoy mismo y descubre por qué
                somos la elección número uno en reparación y repuestos de teléfonos
                celulares!
              </Typography>
              <img src="https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/D0C7/production/_98674435_1.jpg.webp" alt="Nuestra Historia" className="about-us-image" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AcercaDe;
