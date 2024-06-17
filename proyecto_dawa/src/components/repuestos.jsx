import React, { useEffect, useState } from "react";
import { Typography, Button, Modal, TextField, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TablaRepuestos from "./tabla_repuestos.jsx";

export default function Repuestos() {
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [modeloSeleccionado, setModeloSeleccionado] = useState('');
    const [banderaAdd, setBanderaAdd] = useState(false);
    const [nuevoRepuesto, setNuevoRepuesto] = useState({ marca: '', modelo: '', descripcion: '', precio: '' });
    const user = JSON.parse(localStorage.getItem('user'));
    const rol = user.rol;

    useEffect(() => {
        fetch('http://localhost:3200/api/marcas')
            .then((res) => res.json())
            .then((data) => {
                setMarcas(data.data || []);
            })
            .catch(error => console.error('Error fetching marcas:', error));
    }, []);

    useEffect(() => {
        if (marcaSeleccionada) {
            fetch(`http://localhost:3200/api/modelos/${marcaSeleccionada}`)
                .then((res) => res.json())
                .then((data) => {
                    setModelos(data.data || []);
                })
                .catch(error => {
                    console.error('Error fetching modelos:', error);
                    setModelos([]);
                });
        } else {
            setModelos([]);
        }
    }, [marcaSeleccionada]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const handleMarcaChange = (event) => {
        const selectedMarca = event.target.value;
        setMarcaSeleccionada(selectedMarca);
        setModeloSeleccionado('');
        setNuevoRepuesto((prevState) => ({ ...prevState, marca: selectedMarca }));
    };

    const handleModeloChange = (event) => {
        const selectedModelo = event.target.value;
        setModeloSeleccionado(selectedModelo);
        setNuevoRepuesto((prevState) => ({ ...prevState, modelo: selectedModelo }));
    };

    const handleInsertar = () => {
        setBanderaAdd(true);
    };

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setNuevoRepuesto((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <Typography variant="h4" component="h2"
                sx={{ fontWeight: "700", fontFamily: "Arial, Sans-Serif" }}
                color="primary" align="center"
            >
                Precios de los repuestos
            </Typography>

            <Box sx={{ display: 'flex', gap: 4, marginLeft: '10%', marginRight: '10%', marginBottom: '5%', marginTop: '2%' }}>
                <FormControl sx={{ flex: 1 }}>
                    <InputLabel id="marca-select-label">Marca</InputLabel>
                    <Select
                        labelId="marca-select-label"
                        id="marca-select"
                        value={marcaSeleccionada}
                        onChange={handleMarcaChange}
                        label="Marca"
                        fullWidth
                    >
                        <MenuItem value="">Seleccione una marca</MenuItem>
                        {marcas.map((marca) => (
                            <MenuItem key={marca.id_marca} value={marca.id_marca}>
                                {marca.descripcion}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                    <InputLabel id="modelo-select-label">Modelo</InputLabel>
                    <Select
                        labelId="modelo-select-label"
                        id="modelo-select"
                        value={modeloSeleccionado}
                        onChange={handleModeloChange}
                        disabled={!marcaSeleccionada}
                        label="Modelo"
                        fullWidth
                    >
                        <MenuItem value="">Seleccione un modelo</MenuItem>
                        {modelos.map((modelo) => (
                            <MenuItem key={modelo.id_modelo} value={modelo.id_modelo}>
                                {modelo.descripcion}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {rol === 1 ? (<Button
                    variant="contained"
                    color="info"
                    onClick={handleInsertar}
                >Añadir</Button>) : null}

            </Box>
            {marcaSeleccionada && modeloSeleccionado ? (<TablaRepuestos id_marca={marcaSeleccionada} id_modelo={modeloSeleccionado} rol={rol} />
            ) : null}
            <br />
            <Modal
                open={banderaAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={() => setBanderaAdd(false)}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Insertar nuevo producto
                    </Typography>
                    <br />
                    <div>
                        <InputLabel id="marca-select-label">Marca</InputLabel>
                        <Select
                            labelId="marca-select-label"
                            id="marca-select"
                            value={nuevoRepuesto.marca}
                            onChange={handleMarcaChange}
                            label="Marca"
                            fullWidth
                        >
                            {marcas.map((marca) => (
                                <MenuItem key={marca.id_marca} value={marca.id_marca}>
                                    {marca.descripcion}
                                </MenuItem>
                            ))}
                        </Select>

                        <br />

                        <InputLabel id="modelo-select-label">Modelo</InputLabel>
                        <Select
                            labelId="modelo-select-label"
                            id="modelo-select"
                            value={nuevoRepuesto.modelo}
                            onChange={handleModeloChange}
                            disabled={!marcaSeleccionada}
                            label="Modelo"
                            fullWidth
                        >
                            {modelos.map((modelo) => (
                                <MenuItem key={modelo.id_modelo} value={modelo.id_modelo}>
                                    {modelo.descripcion}
                                </MenuItem>
                            ))}
                        </Select>
                        <br />
                        <TextField
                            name="descripcion"
                            id="outlined-required"
                            label="Nombre del Repuesto"
                            onChange={handleChangeInput}
                            value={nuevoRepuesto.descripcion}
                            sx={{ width: '100%', marginBottom: '10%' }}
                        />
                        <br />
                        <TextField
                            name="precio"
                            id="outlined-required"
                            label="Costo"
                            onChange={handleChangeInput}
                            value={nuevoRepuesto.precio}
                            sx={{ width: '100%', marginBottom: '10%' }}
                        />
                        <br />
                    </div>
                    <br />
                    <Stack spacing={2} direction="row">
                        <Button variant='contained'>
                            Guardar
                        </Button>
                        <Button variant='contained' color="error"
                            onClick={() => setBanderaAdd(false)}>
                            Cancelar
                        </Button>
                    </Stack>
                </Box>
            </Modal>

        </div>
    );
}
