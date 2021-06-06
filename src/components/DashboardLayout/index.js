import React from "react";
import {
  Box
} from "grommet";

import SideBar from "components/SideBar";

const DashboardLayout = () => (
  <Box direction="row" background="yellow" height={{ min: "100vh" }}>
    <SideBar xlarge />
    <Box fill background="black" margin={{ top: 'xlarge', left: 'xsmall' }}></Box>
  </Box>
);

export default DashboardLayout;
