import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../Layout/index";
import MainWrapper from "./MainWrapper";
import ConnectWallet from "../Pages/ConnectWallet/ConnectWallet";
import DashBoard from "../Pages/Dashboard/Dashboard";
import Activity from "../Pages/Activity/Activity";
import ManageGem from "../Pages/ManageGem/ManageGem";
import Supragames from "../Pages/Supragames/Supragames";
const wrappedRoutes = () => (
  <div>
    <Layout />

    <div className="container__wrap">
      <Switch>
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/activity" component={Activity} />
        <Route
          path="/game/:supraGame"
          component={(props) => <Supragames {...props} />}
        />
        <Route
          path="/gem/:gemType"
          component={(props) => <ManageGem {...props} />}
        />
      </Switch>
    </div>
  </div>
);

const Router = () => {
  return (
    <MainWrapper>
      <main>
        <Switch>
          <Route exact path="/" component={ConnectWallet} />
          <Route path="/" component={wrappedRoutes} />
        </Switch>
      </main>
    </MainWrapper>
  );
};

export default Router;
