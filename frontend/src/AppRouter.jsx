import { Routes, Route } from "react-router-dom";
import Auth from "./features/auth/pages/Auth";
import Protected from "./features/shared/Protected";
import GuestRoute from "./features/shared/Guestroute";
import Home from "./features/product/pages/Home";
import Products from "./features/product/pages/Products";
import Negotiation from "./features/product/pages/Negotiation";
import Leaderboard from "./features/product/pages/Leaderboard";
import Layout from "./features/product/components/Layout";

const AppRouter = () => {
  return (
    
    <Routes>

    
    
      <Route
        path="/auth"
        element={
          <GuestRoute>
            <Auth />
          </GuestRoute>
        }
      />


     <Route
  element={
    <Protected>
      <Layout />
    </Protected>
  }
>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/deal" element={<Negotiation />} />
  <Route path="/leaderboard" element={<Leaderboard />} />
    </Route>


    
    </Routes>
  );
};

export default AppRouter;
