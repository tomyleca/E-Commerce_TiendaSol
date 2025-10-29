// Servicio simple con mock para notificaciones
// Futuro: reemplazar por fetch a backend /usuario/{id}/notificaciones

const mockNotifications = [
  { id: "n1", tipo: "envio", mensaje: "Tu pedido #1234 fue enviado", fecha: "2025-10-28T10:00:00Z", leida: false },
  { id: "n2", tipo: "cancelacion", mensaje: "Se canceló el envío del pedido #1235", fecha: "2025-10-27T16:30:00Z", leida: false },
  { id: "n3", tipo: "venta", mensaje: "Vendiste el producto 'Caramelito'", fecha: "2025-10-26T09:15:00Z", leida: true },
];

export async function getNotifications(usuarioId) {
  // Simulamos latencia de red
  await new Promise((r) => setTimeout(r, 300));
  // En un futuro usar usuarioId para filtrar
  return mockNotifications;
}

export async function marcarNotificacionLeida(id) {
  // Mock local: en real, PUT /usuario/{id}/notificaciones/{notificacionId}
  await new Promise((r) => setTimeout(r, 150));
  return { ok: true };
}
