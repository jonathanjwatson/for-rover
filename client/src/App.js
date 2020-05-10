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
      try {
        const decoded = await jwt.verify(
          tokenFromStorage,
          process.env.REACT_APP_SECRET_KEY
        );
        if (decoded && decoded.email && decoded.id) {
          setUserObject(decoded);
          setIsLoggedIn(true);
        }
      } catch (e) {
        setUserObject({});
        setIsLoggedIn(false);
        sessionStorage.setItem("jwt", "");
        console.error(e);
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
          {/* Changed component to render: https://tylermcginnis.com/react-router-pass-props-to-components/ */}
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} checkForToken={checkForToken} />
            )}
          />
          <Route
            path="/sign-up"
            render={(props) => (
              <SignUp {...props} checkForToken={checkForToken} />
            )}
          />
          <Route
            path="/complete-profile/:id"
            render={(props) => <CompleteProfile {...props} />}
          />
          <Route
            path="/dashboard/:id"
            render={(props) => <Dashboard {...props} />}
          />
          <Route exact path="/matches">
            <Matches />
          </Route>
          <Route
            path="/new-match/:id"
            render={(props) => <FindNewMatch {...props} />}
          />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
