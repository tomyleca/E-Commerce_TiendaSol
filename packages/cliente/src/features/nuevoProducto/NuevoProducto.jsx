import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../../components/navbar/navbar.jsx';
import "./NuevoProducto.css";
import {
    TextField,
    Button,
    ButtonGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Checkbox,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import { getCategorias } from "../../services/productService";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function NuevoProducto({ onCreated }) {
    const [categorias, setCategorias] = useState([]);
    const [carga, setCarga] = useState(false);
    const [errores, setErrores] = useState({});

    const [formulario, setFormulario] = useState({
        vendedorId: "69129b802aafccbbe4ab9987", // Ejemplo de vendedor
        titulo: "",
        descripcion: "",
        categoriasId: [],
        precio: "",
        moneda: "",
        stock: 0,
        fotos: [],
        activo: true,
    });

    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await getCategorias();
                setCategorias(data || []);
            } catch (e) {
                console.error("No se pudieron cargar categorías", e);
            }
        };
        cargar();
    }, []);

    // Opciones de moneda disponibles
    const MONEDAS = ["PESO_ARG", "DOLAR_USA", "REAL"];

    const handleChange = (key) => (e) => {
        const value = e.target?.value;
        setFormulario((f) => ({ ...f, [key]: value }));
    };

    const handleCategoriasChange = (event) => {
        const value = event.target.value;
        setFormulario((f) => ({ ...f, categoriasId: typeof value === "string" ? value.split(",") : value }));
    };

    const handleFotosChange = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) {
            setFormulario((f) => ({ ...f, fotos: [] }));
            return;
        }
        const readFileAsDataUrl = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

        try {
            const dataUrls = await Promise.all(files.map(readFileAsDataUrl));
            setFormulario((f) => ({ ...f, fotos: dataUrls }));
        } catch (err) {
            console.error("Error leyendo archivos de fotos", err);
        }
    };

    const validar = () => {
        const err = {};
        if (!formulario.titulo) err.titulo = "Título requerido";
        if (!formulario.descripcion) err.descripcion = "Descripción requerida";
        if (!formulario.precio || isNaN(Number(formulario.precio))) err.precio = "Precio inválido";
        if (!formulario.moneda) err.moneda = "Moneda requerida";
        const stockNum = Number(formulario.stock);
        if (!Number.isInteger(stockNum) || stockNum < 0) err.stock = "El stock debe ser un entero positivo";
        if (!formulario.vendedorId) err.vendedorId = "VendedorId requerido";
        setErrores(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validar()) return;

        const payload = {
            vendedorId: formulario.vendedorId,
            titulo: formulario.titulo,
            descripcion: formulario.descripcion,
            categoriasId: formulario.categoriasId,
            precio: Number(formulario.precio),
            moneda: formulario.moneda,
            stock: Number(formulario.stock),
            fotos: Array.isArray(formulario.fotos)
                ? formulario.fotos
                : formulario.fotos
                    ? formulario.fotos.split(",").map((s) => s.trim()).filter(Boolean)
                    : [],
            activo: !!formulario.activo,
        };

        setCarga(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/productos`, payload, {
                headers: { "Content-Type": "application/json" },
            });
            if (onCreated) onCreated(res.data);
            else {
                alert("Producto creado");
                setFormulario({
                    vendedorId: "69129b802aafccbbe4ab9987",
                    titulo: "",
                    descripcion: "",
                    categoriasId: [],
                    precio: "",
                    moneda: "PESO_ARG",
                    stock: 0,
                    fotos: [],
                    activo: true,
                });
            }
        } catch (err) {
            console.error("Error creando producto", err);
            const msg = err.response?.data?.message || err.message || "Error desconocido";
            alert("Error creando producto: " + msg);
        } finally {
            setCarga(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="form" onSubmit={handleSubmit}>
                <Typography variant="h5" className="titulo-nuevo-producto">
                    Nuevo producto
                </Typography>
                <Stack>
                    <TextField label="Título" value={formulario.titulo} onChange={handleChange("titulo")} error={!!errores.titulo} helperText={errores.titulo} />

                    <TextField label="Descripción" value={formulario.descripcion} onChange={handleChange("descripcion")} error={!!errores.descripcion} helperText={errores.descripcion} />

                    <FormControl>
                        <InputLabel id="categorias-label">Categorías</InputLabel>
                        <Select
                            labelId="categorias-label"
                            multiple
                            value={formulario.categoriasId}
                            onChange={handleCategoriasChange}
                            input={<OutlinedInput label="Categorías" />}
                            renderValue={(selected) =>
                                categorias
                                    .filter((c) => selected.includes(c._id || c.id))
                                    .map((c) => c.nombre || c.name)
                                    .join(", ")
                            }
                        >
                            {categorias.map((c) => (
                                <MenuItem key={c._id || c.id} value={c._id || c.id}>
                                    <Checkbox checked={formulario.categoriasId.indexOf(c._id || c.id) > -1} />
                                    <ListItemText primary={c.nombre || c.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField label="Precio" value={formulario.precio} onChange={handleChange("precio")} error={!!errores.precio} helperText={errores.precio} />

                    <FormControl>
                        <InputLabel id="moneda-label">Moneda</InputLabel>
                        <Select
                            labelId="moneda-label"
                            value={formulario.moneda}
                            onChange={handleChange("moneda")}
                            label="Moneda"
                            sx={{ minWidth: 180 }}
                        >
                            {MONEDAS.map((m) => (
                                <MenuItem key={m} value={m}>
                                    {m}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div mt={2}>
                        <div mb={1}>Fotos</div>
                        <input
                            accept="image/*"
                            id="fotos-input"
                            type="file"
                            multiple
                            style={{ display: 'none' }}
                            onChange={handleFotosChange}
                        />
                        <label htmlFor="fotos-input">
                            <Button variant="outlined" component="span">Seleccionar fotos</Button>
                        </label>
                        {Array.isArray(formulario.fotos) && formulario.fotos.length > 0 && (
                            <div mt={1} display="flex" gap={1} flexWrap="wrap">
                                {formulario.fotos.map((src, idx) => (
                                    <img key={idx} src={src} alt={`foto-${idx}`} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }} />
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <div mb={1}>Stock</div>
                        <ButtonGroup variant="outlined" aria-label="stock controls">
                            <Button
                                onClick={() => setFormulario((f) => ({ ...f, stock: Math.max(0, Number(f.stock) - 1) }))}
                                disabled={Number(formulario.stock) <= 0}
                            >
                                -
                            </Button>
                            <TextField
                                value={formulario.stock}
                                onChange={(e) =>
                                    setFormulario((f) => ({ ...f, stock: e.target.value }))
                                }
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*", style: { textAlign: "center" } }}
                            />
                            <Button onClick={() => setFormulario((f) => ({ ...f, stock: Number(f.stock) + 1 }))}>+</Button>
                        </ButtonGroup>
                        {errores.stock && (
                            <div mt={1} sx={{ color: 'error.main', fontSize: '0.875rem' }}>{errores.stock}</div>
                        )}
                    </div>

                    <div display="flex" gap={2}>
                        <Button type="submit" variant="contained" disabled={carga}>
                            {carga ? "Creando..." : "Crear producto"}
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={() =>
                                setFormulario({
                                    vendedorId: "69129b802aafccbbe4ab9987",
                                    titulo: "",
                                    descripcion: "",
                                    categoriasId: [],
                                    precio: "",
                                    moneda: "PESO_ARG",
                                    stock: 0,
                                    fotos: [],
                                    activo: true,
                                })
                            }
                        >
                            Limpiar
                        </Button>
                    </div>
                </Stack>
            </div>
        </>
    );
}
