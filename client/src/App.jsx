import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashborad from "./pages/Dashborad";
import Send from "./pages/Send";
import Update from "./pages/Update";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update" element={<Update />} />
        <Route path="/dashboard" element={<Dashborad />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </>
  );
}

export default App;
