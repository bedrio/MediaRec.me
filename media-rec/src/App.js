import "./themes/App.css";
import { theme } from "./themes/AppTheme";
import { ThemeProvider, Typography } from "@material-ui/core";
import Friends from "./pages/Friends";
import WatchList from "./pages/WatchList";
import Notifications from "./pages/Notifications";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Authentication />
    </ThemeProvider>
  );
}

function AppNavigation() {
  return (
    <Router>
      <Nav>
        <Routes>
          <Route path="/" element={<WatchList />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Nav>
    </Router>
  );
}

export default App;
