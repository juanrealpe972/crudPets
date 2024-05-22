import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelpsProvider } from "./context/HelpsContext";

import LoginUser from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import ListarMascota from "./pages/ListarMascota";
import FormMascotas from "./pages/FormMascotas";

function App() {
  return (
    <HelpsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/listpets" element={<ListarMascota />} />
            <Route path="/registerpet" element={<FormMascotas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelpsProvider>
  );
}

export default App;
