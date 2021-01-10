import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import LoginIngresar from "./components/LoginIngresar.jsx"

function App() {
  return (
    <Router>
    <Route
      exact path="/"
      component={LoginIngresar}
    />
    </Router>
  );
}

export default App;
