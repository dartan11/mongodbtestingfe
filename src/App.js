import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Chatroom from "./Components/Chatroom";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { logout } = useAuth0();

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/chatroom">Chatrooms</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chatroom" element={<Chatroom />} />
      </Routes>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default App;
