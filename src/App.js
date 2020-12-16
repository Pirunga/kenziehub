import "./App.css";

import { Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import Home from "./pages/home/Home.jsx";
import UsersList from "./pages/users-list/UserList";
import UserProfile from "./pages/user-profile/UserProfile";
import UserArea from "./pages/user-area/UserArea";
import RegisterPage from "./pages/register";
import JobsForm from "./pages/new-job";

function App() {
  return (
    <div className="App">
      <nav>
        <Navbar />
      </nav>

      <div className="body">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/cadastro">
            <RegisterPage />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/usuario">
            <h1> Área do usuário</h1>
            <UserArea />
          </Route>

          <Route path="/usuarios">
            <UsersList />
          </Route>

          <Route path="/meu-perfil">
            <UserProfile />
          </Route>

          <Route path="/newjob">
            <JobsForm />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
