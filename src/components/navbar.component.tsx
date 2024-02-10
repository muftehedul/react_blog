import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SiteNavbar = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkmod") === "true"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Load dark mode preference from local storage on component mount
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkmod");
    setIsDarkMode(storedDarkMode === "true");
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
  }, []);

  // Toggle dark mode and update local storage
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkmod", newDarkMode.toString());
    // You can implement dark mode theme switching logic here
  };
  // Handle logout
  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    // Update login status
    setIsLoggedIn(false);
    // Redirect to login page
    navigate("/sign-in");
    location.reload();
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      bg={isDarkMode ? "dark" : "light"}
      variant={isDarkMode ? "dark" : "light"}
    >
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarTogglerDemo02" />
        <Navbar.Collapse id="navbarTogglerDemo02">
          <Nav className="ml-auto">
            {isLoggedIn ? ( // Check if user is logged in
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/sign-in" onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/sign-in">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/sign-up">
                    Sign up
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
            <Button
              variant={isDarkMode ? "outline-light" : "outline-dark"}
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <FontAwesomeIcon icon={faSun} />
              ) : (
                <FontAwesomeIcon icon={faMoon} />
              )}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default SiteNavbar;
