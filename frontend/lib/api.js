// ===========================================
// frontend/lib/api.js
// Simpele helper-functies om met de backend te praten.
// ===========================================

// Verander dit naar je Railway backend URL zodra je hebt gedeployed.
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Haal lijst met producten op met paginering
export async function getProducts(limit = 12, offset = 0) {
  const res = await fetch(`${API_URL}/products?limit=${limit}&offset=${offset}`);
  return res.json();
}

// Haal 1 product op
export async function getProduct(id) {
  const res = await fetch(`${API_URL}/products/${id}`);
  return res.json();
}

// Plaats bestelling
export async function placeOrder(order) {
  const res = await fetch(`${API_URL}/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
}

// Admin helpers (simpel token in header)
export async function adminCreateProduct(data, token) {
  const res = await fetch(`${API_URL}/admin/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "admin-token": token },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function adminUpdateProduct(id, data, token) {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "admin-token": token },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function adminDeleteProduct(id, token) {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: "DELETE",
    headers: { "admin-token": token },
  });
  return res.json();
}

// Logs ophalen voor dashboard
export async function getLogs(limit = 100, offset = 0) {
  const res = await fetch(`${API_URL}/logs?limit=${limit}&offset=${offset}`);
  return res.json();
}
