import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ListarMascotas from "./pages/ListarMascotas.jsx";
import ConsultarMascota from "./pages/ConsultarMascota.jsx";
import { HelpsProvider } from "./context/HelpsContext.jsx";
import Login from "./pages/Login.jsx";
import FormMascotas from "./pages/FormMascotas.jsx";

function App() {
  return (
    <HelpsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />} >
            <Route path="/listpets" element={<ListarMascotas />} />
            <Route path="/register" element={<FormMascotas />} />
            <Route path="/actualizar/:id" element={<FormMascotas />} />
            <Route path="/consultar/:id" element={<ConsultarMascota />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelpsProvider>
  )
}

export default App;
