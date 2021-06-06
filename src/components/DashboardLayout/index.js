import React from "react";
import { Box, Anchor } from "grommet";
import { Linkedin } from "grommet-icons";

import SideBar from "components/SideBar";

const DashboardLayout = () => (
  <Box direction="row" background="yellow" height={{ min: "100vh" }} fill>
    <SideBar xlarge />
    <Box
      fill
      pad="xsmall"
      height={{ min: "100vh" }}
    >
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
      <Box margin={{ top: 'xlarge' }}>
        <Box background="black" align="center" justify="center">
          “I wear a mask. And that mask, it’s not to hide who I am, but to
          create what I am.” —Batman, Batman Vol. 1 #624
        </Box>
      </Box>
    </Box>
  </Box>
);

export default DashboardLayout;
