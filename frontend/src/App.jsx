import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginUser from "./pages/LoginUser";
import ProtectedRoute from "./ProtectedRoute";
import ListPets from "./pages/ListPets";
import ListPetUser from "./pages/ListPetUser";
import RegisterPets from "./pages/RegisterPets";
import { HelpProvider } from "./context/HelpContext";

function App() {
  return (
    <BrowserRouter>
      <HelpProvider>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/listpets" element={<ListPets />} />
            <Route path="/listpet/:id" element={<ListPetUser />} />
            <Route path="/registerPet" element={<RegisterPets mode="create" />} />
            <Route path="/updatePet" element={<RegisterPets mode="update" />} />
          </Route>
        </Routes>
      </HelpProvider>
    </BrowserRouter>
  );
}

export default App;
