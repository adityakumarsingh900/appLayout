import React from "react";
import { Box, Anchor } from "grommet";
import { Linkedin } from "grommet-icons";
import { Switch, Route } from "react-router-dom";

import SideBar from "components/SideBar";

import Home from 'pages/home';
import Crimes from "pages/crimes";
import League from "pages/league";

const DashboardLayout = () => (
  <Box direction="row" background="yellow" height={{ min: "100vh" }} fill>
    <SideBar xlarge />
    <Box fill pad="xsmall" height={{ min: "100vh" }}>
      <Box fill align="end">
        <Anchor
          href="https://www.linkedin.com/in/aditya-kumar-singh-a8b584106/"
          target="_blank"
          textAlign="center"
          size="small"
          label="Designed By Aditya"
          color="black"
          icon={<Linkedin color="black" />}
          reverse
        />
      </Box>
      <Box margin={{ top: "xlarge" }}>
        <Switch>
          <Route path="/missions">
            <Crimes />
          </Route>
          <Route path="/justice-league">
            <League />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Box>
    </Box>
  </Box>
);

export default DashboardLayout;
