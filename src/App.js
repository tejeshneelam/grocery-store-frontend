import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import Payment from "./pages/Payment";
import Admin from "./pages/Admin";
import Donate from "./pages/Donate";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminRoute from "./components/AdminRoute";
import Profile from "./pages/Profile";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } 
        />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
