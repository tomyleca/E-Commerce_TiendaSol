export const pedidosMock = [
    {
        _id: "691b40107910565008f9da40",
        comprador: {
            _id: "68ec2e311907349aebce37d3",
            nombre: "Usuario1",
            email: {
                direccion: "mail@gmail.com"
            },
            telefono: 112243453,
            tipo: "VENDEDOR",
            fechaDeAlta: "2025-10-12T22:39:45.279Z",
            __v: 0
        },
        vendedor: {
            _id: "68ec2e311907349aebce37d3",
            nombre: "Usuario1",
            email: {
                direccion: "mail@gmail.com"
            },
            telefono: 112243453,
            tipo: "VENDEDOR",
            fechaDeAlta: "2025-10-12T22:39:45.279Z",
            __v: 0
        },
        itemsPedido: [
            {
                producto: {
                    _id: "68ec62791168388d3dc4e450",
                    vendedor: "68ec2e311907349aebce37d3",
                    titulo: "Camara de video ",
                    descripcion: "Camara de Video Samsung",
                    categorias: [],
                    precio: 1700500,
                    moneda: "ARS",
                    stock: 1,
                    fotos: [
                        "https://example.com/img/televisor1.jpg",
                        "https://example.com/img/televisor2.jpg"
                    ],
                    activo: true,
                    ventas: 2,
                    __v: 0
                },
                cantidad: 1,
                precioUnitario: 1700500
            },
            {
                producto: {
                    _id: "68ed921e4cb6ab4413b95727",
                    vendedor: "68ec2e311907349aebce37d3",
                    titulo: "Celular TELCET",
                    descripcion: "Celular",
                    categorias: [],
                    precio: 250000,
                    moneda: "ARS",
                    stock: 1,
                    fotos: [
                        "https://example.com/img/televisor1.jpg",
                        "https://example.com/img/televisor2.jpg"
                    ],
                    activo: true,
                    ventas: 2,
                    __v: 0
                },
                cantidad: 1,
                precioUnitario: 189999
            }
        ],
        moneda: "ARS",
        direccionEntrega: "Calle Falsa 123, Buenos Aires",
        estado: "COMPLETADO",
        fechaDeCreacion: "2025-11-17T15:32:32.054Z",
        historialDeEstados: [
            "PENDIENTE",
            "COMPLETADO"
        ],
        __v: 0
    },
    {
        _id: "691b4a6f7910565008f9da67",
        comprador: {
            _id: "68ec2e311907349aebce37d3",
            nombre: "Usuario1",
            email: {
                direccion: "mail@gmail.com"
            },
            telefono: 112243453,
            tipo: "VENDEDOR",
            fechaDeAlta: "2025-10-12T22:39:45.279Z",
            __v: 0
        },
        vendedor: {
            _id: "68ec2e311907349aebce37d3",
            nombre: "Usuario1",
            email: {
                direccion: "mail@gmail.com"
            },
            telefono: 112243453,
            tipo: "VENDEDOR",
            fechaDeAlta: "2025-10-12T22:39:45.279Z",
            __v: 0
        },
        itemsPedido: [
            {
                producto: {
                    _id: "68ec62791168388d3dc4e450",
                    vendedor: "68ec2e311907349aebce37d3",
                    titulo: "Camara de video ",
                    descripcion: "Camara de Video Samsung",
                    categorias: [],
                    precio: 1700500,
                    moneda: "ARS",
                    stock: 1,
                    fotos: [
                        "https://example.com/img/televisor1.jpg",
                        "https://example.com/img/televisor2.jpg"
                    ],
                    activo: true,
                    ventas: 2,
                    __v: 0
                },
                cantidad: 1,
                precioUnitario: 1700500
            },
            {
                producto: {
                    _id: "68ed921e4cb6ab4413b95727",
                    vendedor: "68ec2e311907349aebce37d3",
                    titulo: "Celular TELCET",
                    descripcion: "Celular",
                    categorias: [],
                    precio: 250000,
                    moneda: "ARS",
                    stock: 1,
                    fotos: [
                        "https://example.com/img/televisor1.jpg",
                        "https://example.com/img/televisor2.jpg"
                    ],
                    activo: true,
                    ventas: 2,
                    __v: 0
                },
                cantidad: 1,
                precioUnitario: 189999
            }
        ],
        moneda: "ARS",
        direccionEntrega: "Calle Falsa 123, Buenos Aires",
        estado: "PENDIENTE",
        fechaDeCreacion: "2025-11-17T16:16:47.790Z",
        historialDeEstados: [
            "PENDIENTE"
        ],
        __v: 0
    }
];