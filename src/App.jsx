import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router";
import { AuthContextProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
