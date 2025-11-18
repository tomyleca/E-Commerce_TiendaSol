import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NuevoProductoForm.css";
import toast from "react-hot-toast";
import InputField from "../input-field/InputField.jsx";
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
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getCategorias, createProducto } from "../../services/productService.js";
const NuevoProductoForm = () => {
    const formularioInicial = {
        vendedorId: "691a367d75b649ccc4ef4b14", // Ejemplo de vendedor
        titulo: "",
        descripcion: "",
        categoriasId: [],
        precio: "",
        moneda: "",
        stock: 0,
        fotos: [],
        activo: true,
    };
    const [producto, setProducto] = useState(() => ({ ...formularioInicial }));
    const resetFormulario = () => setProducto({ ...formularioInicial });
    const [errores, setErrores] = useState({});
    const [enviando, setEnviando] = useState(false);
    const navegar = useNavigate();

    const [categorias, setCategorias] = useState([]);
    useEffect(() => {
        const cargar = async () => {
            try {
                const categorias = await getCategorias();
                setCategorias(categorias || []);
            } catch (e) {
                console.error("No se pudieron cargar categorías", e);
            }
        };
        cargar();
    }, []);

    const MONEDAS = ["PESO_ARG", "DOLAR_USA", "REAL"];

    const handleChange = (key) => (e) => {
        const value = e.target?.value;
        setProducto((f) => ({ ...f, [key]: value }));
    };

    const handleCategoriasChange = (event) => {
        const value = event.target.value;
        setProducto((f) => ({ ...f, categoriasId: typeof value === "string" ? value.split(",") : value }));
    };

    const handleFotosChange = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) {
            setProducto((f) => ({ ...f, fotos: [] }));
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
            setProducto((f) => ({ ...f, fotos: dataUrls }));
        } catch (err) {
            console.error("Error leyendo archivos de fotos", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (enviando) return;

        const producto = {
            vendedorId: producto.vendedorId,
            titulo: producto.titulo,
            descripcion: producto.descripcion,
            categoriasId: producto.categoriasId,
            precio: Number(producto.precio),
            moneda: producto.moneda,
            stock: Number(producto.stock),
            fotos: Array.isArray(producto.fotos)
                ? producto.fotos
                : producto.fotos
                    ? producto.fotos.split(",").map((s) => s.trim()).filter(Boolean)
                    : [],
            activo: !!producto.activo,
        };

        setEnviando(true);
        try {
            const res = await createProducto(producto);
            toast.success("¡Producto creado con éxito!");
            resetFormulario();
        } catch (err) {
            console.error("Error creando producto", err);
            const msg = err.response?.data?.message || err.message || "Error desconocido";
            alert("Error creando producto: " + msg);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="crear-producto-container">
            <div className="crear-producto-card">
                <div className="crear-producto-header">
                    <AddCircleIcon className="add-icon" />
                    <h2>Crear Producto</h2>
                </div>

                <form className="crear-producto-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-section">
                        <h3>Información del producto</h3>

                        <InputField
                            id="titulo"
                            name="titulo"
                            type="text"
                            label="Titulo"
                            value={producto.titulo}
                            onChange={(e) =>
                                setProducto((f) => ({ ...f, titulo: e.target.value }))
                            }
                            error={!!errores.titulo}
                            helperText={errores.titulo}
                            required
                        />

                        <InputField
                            id="descripcion"
                            name="descripcion (opcional)"
                            type="text"
                            label="Descripción"
                            value={producto.descripcion}
                            onChange={(e) =>
                                setProducto((f) => ({ ...f, descripcion: e.target.value }))
                            }
                            error={!!errores.descripcion}
                            helperText={errores.descripcion}
                        />

                        <FormControl>
                            <InputLabel id="categorias-label">Categorías</InputLabel>
                            <Select
                                labelId="categorias-label"
                                multiple
                                value={producto.categoriasId}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setProducto((f) => ({
                                        ...f,
                                        categoriasId: typeof value === "string" ? value.split(",") : value
                                    }));
                                }}
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
                                        <Checkbox checked={producto.categoriasId.indexOf(c._id || c.id) > -1} />
                                        <ListItemText primary={c.nombre || c.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <InputField
                            id="precio"
                            name="precio"
                            type="number"
                            label="Precio"
                            value={producto.precio}
                            onChange={(e) =>
                                setProducto((f) => ({ ...f, precio: e.target.value }))
                            }
                            error={!!errores.precio}
                            helperText={errores.precio}
                        />

                        <FormControl>
                            <InputLabel id="moneda-label">Moneda</InputLabel>
                            <Select
                                labelId="moneda-label"
                                value={producto.moneda}
                                onChange={(e) =>
                                    setProducto((f) => ({ ...f, moneda: e.target.value }))}
                                label="Moneda"
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
                            {Array.isArray(producto.fotos) && producto.fotos.length > 0 && (
                                <div mt={1} display="flex" gap={1} flexWrap="wrap">
                                    {producto.fotos.map((src, idx) => (
                                        <img key={idx} src={src} alt={`foto-${idx}`} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }} />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <div mb={1}>Stock</div>
                            <ButtonGroup variant="outlined" aria-label="stock controls">
                                <Button
                                    onClick={() => setProducto((f) => ({ ...f, stock: Math.max(0, Number(f.stock) - 1) }))}
                                    disabled={Number(producto.stock) <= 0}
                                >
                                    -
                                </Button>
                                <TextField
                                    value={producto.stock}
                                    onChange={(e) =>
                                        setProducto((f) => ({ ...f, stock: e.target.value }))
                                    }
                                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*", style: { textAlign: "center" } }}
                                />
                                <Button onClick={() => setProducto((f) => ({ ...f, stock: Number(f.stock) + 1 }))}>+</Button>
                            </ButtonGroup>
                            {errores.stock && (
                                <div mt={1} sx={{ color: 'error.main', fontSize: '0.875rem' }}>{errores.stock}</div>
                            )}
                        </div>

                        <div display="flex" gap={2}>
                            <Button type="submit" variant="contained" disabled={enviando}>
                                {enviando ? "Creando..." : "Crear producto"}
                            </Button>
                            <Button type="button" variant="outlined" onClick={resetFormulario}>
                                Limpiar
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NuevoProductoForm;