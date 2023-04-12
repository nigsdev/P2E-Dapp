import React from 'react';
import PropTypes from 'prop-types';
import Notification from 'rc-notification';
import { ThemeProps, RTLProps } from '../../shared/prop-types/ReducerProps';
import { BasicNotification } from '../../shared/components/Notification';

let popUpNotification = null;
// eslint-disable-next-line no-return-assign
Notification.newInstance({ style: { top: 65 } }, n => popUpNotification = n);

const NotificationPopUp = (theme, rtl, setIsShowNotification, title, message, color) => {
  const initialProps = {
    content: <BasicNotification
      title={title}
      message={message}
      theme={theme}
      color={color}
    />,
    key: 'notification-popup',
    closable: true,
    duration: 5,
    style: {
      top: 0,
      left: 'calc(100vw - 100%)',
    },
    className: `right-up ltr-support`,
    onClose() {
      setIsShowNotification(false);
    },
  };
  popUpNotification.notice(initialProps);
};

NotificationPopUp.propTypes = {
  theme: ThemeProps.isRequired,
  rtl: RTLProps.isRequired,
  setIsShowNotification: PropTypes.func.isRequired,
};

export default NotificationPopUp;
