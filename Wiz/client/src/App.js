import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginIngresar from "./components/LoginIngresar.jsx";
import Home from "./components/Home.jsx"
import Users from "./containers/Users.jsx"
import SimpleModal from "./containers/SimpleModal.jsx"
import Reg from "./containers/Reg.jsx"
import Register from "./containers/Register.jsx"

function App() {
  return (
    <Router>
    <Route
      exact path="/"
      component={LoginIngresar}
    />
    <Route
      exact path="/home"
      component={Home}
    />
    <Route
      exact path="/home/users"
      component={Users}
    />
    <Route
    exact path="/home/users/chart"
    component={SimpleModal}
    />
    <Route
    exact path="/home/reg"
    component={Reg}
    />
    <Route
    exact path="/Register"
    component={Register}
    />
    </Router>
  );
}

export default App;
