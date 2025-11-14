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

// Same fallback logic used elsewhere in the app
const API_BASE =
    process.env.REACT_APP_API_BASE_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3001" : "");

export default function Formulario({ onCreated }) {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        vendedorId: "",
        titulo: "",
        descripcion: "",
        categoriasId: [],
        precio: "",
        moneda: "PESO_ARG",
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
        setForm((f) => ({ ...f, [key]: value }));
    };

    const handleCategoriasChange = (event) => {
        const value = event.target.value;
        setForm((f) => ({ ...f, categoriasId: typeof value === "string" ? value.split(",") : value }));
    };

    const validate = () => {
        const err = {};
        if (!form.titulo) err.titulo = "Título requerido";
        if (!form.descripcion) err.descripcion = "Descripción requerida";
        if (!form.precio || isNaN(Number(form.precio))) err.precio = "Precio inválido";
        if (!form.moneda) err.moneda = "Moneda requerida";
        if (!form.stock || !Number.isInteger(Number(form.stock))) err.stock = "Stock debe ser entero";
        // vendedorId is required by backend; include check but keep optional in UI
        if (!form.vendedorId) err.vendedorId = "VendedorId requerido";
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
            vendedorId: form.vendedorId,
            titulo: form.titulo,
            descripcion: form.descripcion,
            categoriasId: form.categoriasId,
            precio: Number(form.precio),
            moneda: form.moneda,
            stock: Number(form.stock),
            fotos: form.fotos ? form.fotos.split(",").map((s) => s.trim()).filter(Boolean) : [],
            activo: !!form.activo,
        };

        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE}/productos`, payload, {
                headers: { "Content-Type": "application/json" },
            });
            if (onCreated) onCreated(res.data);
            else {
                alert("Producto creado");
                setForm({
                    vendedorId: "",
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
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
            <Typography variant="h5" mb={2}>
                Nuevo producto
            </Typography>
            <Stack spacing={2}>
                <TextField
                    label="VendedorId"
                    value={form.vendedorId}
                    onChange={handleChange("vendedorId")}
                    error={!!errors.vendedorId}
                    helperText={errors.vendedorId || "Id del vendedor (requerido para crear)"}
                    fullWidth
                />

                <TextField label="Título" value={form.titulo} onChange={handleChange("titulo")} error={!!errors.titulo} helperText={errors.titulo} fullWidth />

                <TextField label="Descripción" value={form.descripcion} onChange={handleChange("descripcion")} error={!!errors.descripcion} helperText={errors.descripcion} multiline rows={3} fullWidth />

                <InputLabel id="categorias-label">Categorías</InputLabel>
                <Select
                    labelId="categorias-label"
                    multiple
                    value={form.categoriasId}
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
                            <Checkbox checked={form.categoriasId.indexOf(c._id || c.id) > -1} />
                            <ListItemText primary={c.nombre || c.name} />
                        </MenuItem>
                    ))}
                </Select>

                <TextField label="Precio" value={form.precio} onChange={handleChange("precio")} error={!!errors.precio} helperText={errors.precio} />

                <TextField label="Moneda" value={form.moneda} onChange={handleChange("moneda")} />

                <TextField label="Stock" value={form.stock} onChange={handleChange("stock")} error={!!errors.stock} helperText={errors.stock} />

                <TextField label="Fotos (URLs separadas por coma)" value={form.fotos} onChange={handleChange("fotos")} helperText="Opcional" />

                <FormControlLabel control={<Checkbox checked={!!form.activo} onChange={(e) => setForm((f) => ({ ...f, activo: e.target.checked }))} />} label="Activo" />

                <Box display="flex" gap={2}>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? "Creando..." : "Crear producto"}
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={() =>
                            setForm({
                                vendedorId: "",
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
