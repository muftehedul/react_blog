import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Home from "./components/home.component";
import SiteNavbar from "./components/navbar.component";
import CreatePost from "./components/create.post.component";
import ProtectedRoute from "./components/protected.route.component";

function App() {
  return (
    <Router>
      <div className="App">
        <SiteNavbar />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              {/* Protected routes using a custom ProtectedRoute component */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-post"
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />

              {/* Public routes */}
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />

              {/* Default fallback for unmatched routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
