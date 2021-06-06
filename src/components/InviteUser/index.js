import React, { useState, useMemo, useEffect } from 'react';
import { UserVoice } from '@styled-icons/boxicons-solid/UserVoice';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import InviteUserLayer from './components/InviteUserLayer';
import EventEmitter from 'granite-admin/utils/event-emitter';
import Toast from 'granite-admin/core/components/Toast';
import MenuButton from 'granite-admin/core/components/MenuButton';
import { withTheme } from 'styled-components';

import { userInvitation } from 'granite-admin/accounts/controllers/user';

const InviteUser = ({ isCollapsed, hoverIndicatorOptions, theme }) => {
  const eventEmitter = useMemo(() => new EventEmitter(), []);
  const [layer, setLayer] = useState(false);
  const defaultToastData = { open: false, message: '' };
  const [toastData, setToastData] = useState(defaultToastData);
  const showToast = (message, color) => setToastData({ open: true, message, color });
  const hideToast = () => setToastData({ open: false, message: '' });

  useEffect(() => {
    const subscription = eventEmitter.getObservable().subscribe(event => {
      switch (event.type) {
        case 'INVITE_SUCCESS':
          showToast('Invite sent successfully');
          setTimeout(() => {
            hideToast();
          }, 5000);
          break;
        case 'INVITE_FAILURE':
          showToast('Failed to invite!!', 'status-error');
          setTimeout(() => {
            hideToast();
          }, 5000);
          break;
        default:
          console.log('Not handled', event);
          break;
      }
    });
    return () => subscription.unsubscribe();
  }, [eventEmitter]);

  return (
    <>
      <MenuButton
        isCollapsed={isCollapsed}
        label="Invite User"
        hoverIndicatorOptions={hoverIndicatorOptions}
        icon={<UserVoice size="22px" color={theme.global.colors['sidebar-icon']} />}
        onClick={() => setLayer('INVITE-USER')}
      />

      {layer === 'INVITE-USER' && (
        <InviteUserLayer setLayer={setLayer} userInvitation={userInvitation} eventEmitter={eventEmitter} />
      )}
      {toastData.open ? (
        <Toast style={{ marginTop: '45px' }} text={toastData.message} background={toastData.color} />
      ) : null}
    </>
  );
};

InviteUser.propTypes = {
  isCollapsed: PropTypes.bool,
  hoverIndicatorOptions: PropTypes.object,
};

export default withTheme(InviteUser);
