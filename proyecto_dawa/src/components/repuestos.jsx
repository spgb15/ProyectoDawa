import React, { useEffect, useState } from "react";
import {
    Typography,
    Button,
    Modal,
    TextField,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Stack
} from '@mui/material';
import TablaRepuestos from "./tabla_repuestos.jsx";

export default function Repuestos() {
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [modeloSeleccionado, setModeloSeleccionado] = useState('');
    const [banderaAdd, setBanderaAdd] = useState(false);
    const [nuevoRepuestoModal, setNuevoRepuestoModal] = useState({
        marca: '',
        modelo: '',
        descripcion: '',
        precio: '',
        stock: ''
    });
    const [rol, setRol] = useState(null);
    const [modelosModal, setModelosModal] = useState([]);

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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setRol(user.rol);
        }
    }, []);

    useEffect(() => {
        fetch('http://localhost:3200/api/marcas')
            .then((res) => res.json())
            .then((data) => {
                setMarcas(data.data || []);
            })
            .catch(error => console.error('Error fetching marcas:', error));
    }, []);

    const cargarModelos = (selectedMarca, modal = false) => {
        if (selectedMarca) {
            fetch(`http://localhost:3200/api/modelos/${selectedMarca}`)
                .then((res) => res.json())
                .then((data) => {
                    if (modal) {
                        setModelosModal(data.data || []);
                    } else {
                        setModelos(data.data || []);
                    }
                })
                .catch(error => {
                    console.error('Error fetching modelos:', error);
                    if (modal) {
                        setModelosModal([]);
                    } else {
                        setModelos([]);
                    }
                });
        }
    };

    const handleMarcaChange = (event) => {
        const selectedMarca = event.target.value;
        setMarcaSeleccionada(selectedMarca);
        setModeloSeleccionado('');
        cargarModelos(selectedMarca);
    };

    const handleModeloChange = (event) => {
        const selectedModelo = event.target.value;
        setModeloSeleccionado(selectedModelo);
    };

    const handleInsertar = () => {
        setBanderaAdd(true);
        setNuevoRepuestoModal({
            ...nuevoRepuestoModal,
            marca: '',
            modelo: '',
            descripcion: '',
            precio: '',
            stock: ''
        });
    };

    const handleGuardar = () => {
        const datos = {
            marca: nuevoRepuestoModal.marca,
            modelo: nuevoRepuestoModal.modelo,
            descripcion: nuevoRepuestoModal.descripcion,
            precio: nuevoRepuestoModal.precio,
            stock: nuevoRepuestoModal.stock
        };

        fetch('http://localhost:3200/api/repuestos/insertar', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            setBanderaAdd(false);
        })
        .catch((error) => {
            console.error('Error al guardar:', error);
        });
        

        
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setNuevoRepuestoModal((prevState) => ({
            ...prevState,
            [name]: name === 'precio' || name === 'stock' ? parseFloat(value) || '' : value
        }));
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
                {rol === 1 && (
                    <Button
                        variant="contained"
                        color="info"
                        onClick={handleInsertar}
                    >
                        Añadir
                    </Button>
                )}
            </Box>

            {marcaSeleccionada && modeloSeleccionado && ( //Componente Tabla
                <TablaRepuestos id_marca={marcaSeleccionada} id_modelo={modeloSeleccionado} rol={rol}/>
            )}
            <br />
        
            <Modal //Modal para insertar
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
                        <FormControl fullWidth sx={{ width: '100%', marginBottom: '2%' }}>
                            <InputLabel id="marca-select-label-modal">Marca</InputLabel>
                            <Select
                                labelId="marca-select-label-modal"
                                id="marca-select-modal"
                                value={nuevoRepuestoModal.marca}
                                onChange={(e) => {
                                    const selectedMarca = e.target.value;
                                    setNuevoRepuestoModal(prevState => ({
                                        ...prevState,
                                        marca: selectedMarca,
                                        modelo: ''
                                    }));
                                    cargarModelos(selectedMarca, true);
                                }}
                                label="Marca"
                            >
                                <MenuItem value="">Seleccione una marca</MenuItem>
                                {marcas.map((marca) => (
                                    <MenuItem key={marca.id_marca} value={marca.id_marca}>
                                        {marca.descripcion}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ width: '100%', marginBottom: '2%' }}>
                            <InputLabel id="modelo-select-label-modal">Modelo</InputLabel>
                            <Select
                                labelId="modelo-select-label-modal"
                                id="modelo-select-modal"
                                value={nuevoRepuestoModal.modelo}
                                onChange={(e) => setNuevoRepuestoModal(prevState => ({
                                    ...prevState,
                                    modelo: e.target.value
                                }))}
                                label="Modelo"
                            >
                                <MenuItem value="">Seleccione un modelo</MenuItem>
                                {modelosModal.map((modelo) => (
                                    <MenuItem key={modelo.id_modelo} value={modelo.id_modelo}>
                                        {modelo.descripcion}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            name="descripcion"
                            id="outlined-required"
                            label="Nombre del Repuesto"
                            onChange={handleChangeInput}
                            value={nuevoRepuestoModal.descripcion}
                            sx={{ width: '100%', marginBottom: '2%' }}
                        />

                        <TextField
                            name="precio"
                            id="outlined-required"
                            label="Costo"
                            onChange={handleChangeInput}
                            value={nuevoRepuestoModal.precio}
                            sx={{ width: '100%', marginBottom: '2%' }}
                        />

                        <TextField
                            name="stock"
                            id="outlined-required"
                            label="Stock"
                            onChange={handleChangeInput}
                            value={nuevoRepuestoModal.stock}
                            sx={{ width: '100%', marginBottom: '10%' }}
                        />
                    </div>
                    <Stack spacing={2} direction="row">
                        <Button variant='contained'
                            onClick={() => handleGuardar()}>
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
