// lib imports
import React, { useState } from 'react';
import {
  Box,
  Image,
  Button,
  ResponsiveContext,
  Nav,
} from "grommet";

import {
  Analytics,
  Clock,
  Configure,
  Projects,
  Split,
  StatusInfoSmall,
  FormNext,
  FormPrevious,
} from "grommet-icons";

import Notification from 'components/Notification';
import UserDropMenu from 'components/UserDropMenu';
// import InviteUser from 'granite-admin/core/components/InviteUser';

// application imports
import logoImage from 'assets/logo.png';

const width = '256px';

const SidebarButton = ({ icon, label, ...rest }) => (
  <Box pad="small" fill="horizontal">
    <Button
      gap="medium"
      alignSelf="start"
      plain
      icon={icon}
      label={label}
      {...rest}
    />
  </Box>
);

const Sidebar = () => {
  const [hover, setHover] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isCollapsed = ((size === 'small') || collapsed);

        return (
          <Box
            width={isCollapsed && !hover ? "58px" : width}
            style={{
              minWidth: isCollapsed && !hover ? "58px" : width,
              position: "relative",
              transition: "0.5s",
            }}
            elevation="small"
            background="black"
          >
            <SidebarButton
              icon={isCollapsed ? <FormNext /> : <FormPrevious />}
              label={<Image src={logoImage} alt="Company Logo" width="120px" />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <Box
              flex
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Nav
                gap="small"
                flex
                overflow={{ vertical: "auto", horizontal: "hidden" }}
              >
                <SidebarButton icon={<StatusInfoSmall />} label="Focus" />
                <SidebarButton icon={<Projects />} label="Services" />
                <SidebarButton icon={<Clock />} label="Glances" />
                <SidebarButton icon={<Split />} label="Flows" />
                <SidebarButton icon={<Analytics />} label="Analytics" />
                <SidebarButton icon={<Configure />} label="Configure" />
              </Nav>
              <Notification
                isCollapsed={isCollapsed && !hover}
              />
              <UserDropMenu isCollapsed={isCollapsed && !hover} />
            </Box>
          </Box>
        );
      }}
    </ResponsiveContext.Consumer>
  );
};

export default Sidebar;
