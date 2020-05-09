import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import jwt from "jsonwebtoken";
import NavBar from "./components/Shared/NavBar/NavBar";
import Home from "./containers/Home/Home";
import Login from "./containers/Login";
import CompleteProfile from "./containers/CompleteProfile";
import Dashboard from "./containers/Dashboard";
import Matches from "./containers/Matches";
import FindNewMatch from "./containers/FindNewMatch";
import NotFound from "./containers/NotFound";
import SignUp from "./containers/SignUp";

function App(props) {
  const [userObject, setUserObject] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkForToken();
  }, []);

  const checkForToken = async () => {
    const tokenFromStorage = await sessionStorage.getItem("jwt");
    if (tokenFromStorage) {
      const decoded = await jwt.verify(
        tokenFromStorage,
        process.env.REACT_APP_SECRET_KEY
      );
      if (decoded && decoded.email && decoded.id) {
        setUserObject(decoded);
        setIsLoggedIn(true);
      }
    }
  };

  const logOutUser = () => {
    setUserObject({});
    setIsLoggedIn(false);
    sessionStorage.setItem("jwt", "");
  };

  return (
    <>
      <Router>
        <NavBar
          isLoggedIn={isLoggedIn}
          logOutUser={logOutUser}
          userObject={userObject}
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            path="/login"
            component={(props) => (
              <Login {...props} checkForToken={checkForToken} />
            )}
          />
          <Route
            path="/sign-up"
            component={(props) => (
              <SignUp {...props} checkForToken={checkForToken} />
            )}
          />
          <Route
            path="/complete-profile/:id"
            component={(props) => <CompleteProfile {...props} />}
          />
          <Route
            path="/dashboard/:id"
            component={(props) => <Dashboard {...props} />}
          />
          <Route exact path="/matches">
            <Matches />
          </Route>
          <Route exact path="/new-match">
            <FindNewMatch />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
