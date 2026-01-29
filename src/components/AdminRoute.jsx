import { Navigate } from "react-router-dom";

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  const payload = parseJwt(token);
  if (!payload) return <Navigate to="/login" />;

  // Ensure token role is admin and email is allowed
  if (payload.role !== "admin" || payload.email !== "admin@gmail.com") {
    return <h2>Access Denied (Admin Only)</h2>;
  }

  return children;
}
