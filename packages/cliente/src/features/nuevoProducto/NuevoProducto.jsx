import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Checkbox,
    ListItemText,
    FormControlLabel,
    Stack,
    Typography,
} from "@mui/material";
import { getCategorias } from "../../services/productService";

const API_BASE =
    process.env.REACT_APP_API_BASE_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3001" : "");

export default function NuevoProducto({ onCreated }) {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formulario, setFormulario] = useState({
        vendedorId: "69129b802aafccbbe4ab9987", // Ejemplo de vendedor
        titulo: "",
        descripcion: "",
        categoriasId: [],
        precio: "",
        moneda: "",
        stock: "",
        fotos: "",
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

    const handleChange = (key) => (e) => {
        const value = e.target?.value;
        setFormulario((f) => ({ ...f, [key]: value }));
    };

    const handleCategoriasChange = (event) => {
        const value = event.target.value;
        setFormulario((f) => ({ ...f, categoriasId: typeof value === "string" ? value.split(",") : value }));
    };

    const validate = () => {
        const err = {};
        if (!formulario.titulo) err.titulo = "Título requerido";
        if (!formulario.descripcion) err.descripcion = "Descripción requerida";
        if (!formulario.precio || isNaN(Number(formulario.precio))) err.precio = "Precio inválido";
        if (!formulario.moneda) err.moneda = "Moneda requerida";
        if (!formulario.stock || !Number.isInteger(Number(formulario.stock))) err.stock = "Stock debe ser entero";
        // vendedorId is required by backend; include check but keep optional in UI
        if (!formulario.vendedorId) err.vendedorId = "VendedorId requerido";
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
            vendedorId: formulario.vendedorId,
            titulo: formulario.titulo,
            descripcion: formulario.descripcion,
            categoriasId: formulario.categoriasId,
            precio: Number(formulario.precio),
            moneda: formulario.moneda,
            stock: Number(formulario.stock),
            fotos: formulario.fotos ? formulario.fotos.split(",").map((s) => s.trim()).filter(Boolean) : [],
            activo: !!formulario.activo,
        };

        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE}/productos`, payload, {
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
                    moneda: "",
                    stock: "",
                    fotos: "",
                    activo: true,
                });
            }
        } catch (err) {
            console.error("Error creando producto", err);
            const msg = err.response?.data?.message || err.message || "Error desconocido";
            alert("Error creando producto: " + msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="formulario" onSubmit={handleSubmit}>
            <Typography variant="h5" mb={2}>
                Nuevo producto
            </Typography>
            <Stack>
                <TextField label="Título" value={formulario.titulo} onChange={handleChange("titulo")} error={!!errors.titulo} helperText={errors.titulo} fullWidth />

                <TextField label="Descripción" value={formulario.descripcion} onChange={handleChange("descripcion")} error={!!errors.descripcion} helperText={errors.descripcion} multiline rows={3} fullWidth />

                <FormControl fullWidth>
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

                <TextField label="Precio" value={formulario.precio} onChange={handleChange("precio")} error={!!errors.precio} helperText={errors.precio} />

                <TextField label="Moneda" value={formulario.moneda} onChange={handleChange("moneda")} />

                <TextField label="Stock" value={formulario.stock} onChange={handleChange("stock")} error={!!errors.stock} helperText={errors.stock} />

                <Box display="flex" gap={2}>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? "Creando..." : "Crear producto"}
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={() =>
                            setFormulario({
                                titulo: "",
                                descripcion: "",
                                categoriasId: [],
                                precio: "",
                                moneda: "PESO_ARG",
                                stock: "",
                                fotos: "",
                                activo: true,
                            })
                        }
                    >
                        Limpiar
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}
