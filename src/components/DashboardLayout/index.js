import React from "react";
import {
  Box
} from "grommet";

import SideBar from "components/SideBar";

const DashboardLayout = () => (
  <Box direction="row" background="yellow" height={{ min: "100vh" }}>
    <SideBar xlarge />
    <Box fill background="black" margin={{ top: "xlarge", horizontal: "xsmall" }}>
      <Box fill align="center" justify="center">
        “I wear a mask. And that mask, it’s not to hide who I am, but to create
        what I am.” —Batman, Batman Vol. 1 #624
      </Box>
    </Box>
  </Box>
);

export default DashboardLayout;
