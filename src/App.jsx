import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProductForm from "./pages/ProductForm";
import AddUtils from "./pages/AddUtils";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="addProduct" element={<ProductForm />} />
          <Route path="addUtils" element={<AddUtils />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
