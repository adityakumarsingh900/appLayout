// Lib Imports
import React, { useEffect, useState } from 'react';
import { Avatar, Box, DropButton, Stack, Text } from 'grommet';
import styled from 'styled-components';
import { Bell } from '@styled-icons/fa-solid/Bell';
import PropTypes from 'prop-types';
import { User } from 'grommet-icons';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
// Core Imports
import Tooltip from 'granite-admin/core/components/Tooltip';
import Loader from 'granite-admin/core/components/Loader';
import DropMenu from 'granite-admin/core/components/DropMenu';
import { withTheme } from 'styled-components';

import { fetchNotifications, fetchNotificationCount, markRead } from 'granite-admin/common/gateways/notification-api';

const StyledText = styled(Text)`
  a {
    color: #0e84ad;
    text-decoration: underline;
  }
  a:hover {
    color: #fbab31;
  }
`;

const Notification = ({ isCollapsed, theme }) => {
  const history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState();
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);

  // console.log(page);

  useEffect(() => {
    handleFetchNotificationCount();
    const intervalId = setInterval(handleFetchNotificationCount, 1000 * 60);
    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   handleFetchNotifications();
  // }, []);

  const handleFetchNotifications = () => {
    setLoader(true);
    fetchNotifications(page)
      .then(response => {
        if (page === 1) setNotifications(response.list);
        else setNotifications(notifications => _.uniqBy([...notifications, ...response.list], 'pk'));
        setPage(response.nextPage);
        setLoader(false);
      })
      .catch(() => setLoader(false));
  };

  const handleFetchNotificationCount = () => {
    fetchNotificationCount()
      .then(res => setCount(res.count))
      .catch(err => console.log(err));
  };

  const handleNotificationClick = notification => {
    markRead(notification.pk).then(() => handleFetchNotificationCount());
    if (notification.url !== '') history.push(notification.url);
  };

  return (
    <DropMenu
      icon={
        <Stack anchor="top-right">
          <Bell size="20px" color={theme.global.colors['sidebar-icon']} />
          {count && (
            <Box
              flex="grow"
              background="sidebar-icon"
              width="12px"
              height="12px"
              align="center"
              justify="center"
              round="full"
              margin={{ left: '2rem' }}
              border={{ size: '1px', color: 'brand' }}
              pad="xsmall"
            >
              <Text size="small" color="white">
                {count > 9 ? '9+' : count}
              </Text>
            </Box>
          )}
        </Stack>
      }
      isCollapsed={isCollapsed}
      label={<Text>Notification</Text>}
      dropProps={{ style: { borderRadius: '6px' } }}
      dropAlign={{ bottom: 'bottom', left: 'right' }}
      onClose={() => {
        setPage(1);
        setNotifications([]);
      }}
      onOpen={handleFetchNotifications}
      renderItems={() => (
        <NotificationStack
          notifications={notifications}
          loader={loader}
          handleNotificationClick={handleNotificationClick}
          setPage={setPage}
          page={page}
          handleFetchNotifications={handleFetchNotifications}
        />
      )}
    />
  );
};

const NotificationStack = ({
  notifications,
  loader,
  handleNotificationClick,
  setPage,
  page,
  handleFetchNotifications,
}) => {
  const handleScroll = e => {
    const before = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (before && page && !loader) handleFetchNotifications();
  };

  return (
    <Box background="white" width="medium-l" height="medium-l" overflow={{ vertical: 'auto' }} onScroll={handleScroll}>
      <Box flex={{ shrink: 0 }} background="brand" pad="medium" justify="center" width="100%">
        <Text color="white">Notifications</Text>
      </Box>
      <Box flex={{ grow: 1 }}>
        {notifications.map((notification, index) => (
          <Box
            key={index}
            direction="row-responsive"
            align="center"
            justify="between"
            onClick={() => handleNotificationClick(notification)}
            pad={{ vertical: 'small', left: 'small', right: 'medium' }}
            hoverIndicator
          >
            <Box direction="row" gap="small" align="center">
              {getUserAvatar()}
              <Box width="medium">
                <StyledText weight="bold" dangerouslySetInnerHTML={{ __html: notification.text }} />
                <Text color="status-disabled">
                  <Tooltip content={notification.createdAt} align="bottom">
                    <Text>{notification.createdAt}</Text>
                  </Tooltip>
                </Text>
              </Box>
            </Box>
            {!notification.status && (
              <Box flex={{ shrink: 0 }} round="full" background="secondary" height="8px" width="8px" />
            )}
          </Box>
        ))}

        {loader && (
          <Box margin={{ vertical: 'medium' }} align="center" justify="center">
            <Loader size="20px" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

const getUserAvatar = () => {
  return (
    <Box flex="grow">
      <Avatar background="brand-light" round="full">
        <User />
      </Avatar>
    </Box>
  );
};

Notification.propTypes = {
  isCollapsed: PropTypes.bool,
};

export default withTheme(Notification);
