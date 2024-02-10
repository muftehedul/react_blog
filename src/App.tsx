import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Home from "./components/home.component";
import SiteNavbar from "./components/navbar.component";

function App() {
  return (
    <Router>
      <div className="App">
        <SiteNavbar />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;