import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children, initialUnreadCount = 0 }) => {
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(initialUnreadCount);

  const updateUnreadCount = (count) => {
    setUnreadNotificationCount(count);
  };

  const markAllAsRead = () => {
    setUnreadNotificationCount(0);
  };

  const incrementUnreadCount = () => {
    setUnreadNotificationCount(prev => prev + 1);
  };

  const decrementUnreadCount = () => {
    setUnreadNotificationCount(prev => Math.max(0, prev - 1));
  };

  return (
    <NotificationContext.Provider
      value={{
        unreadNotificationCount,
        updateUnreadCount,
        markAllAsRead,
        incrementUnreadCount,
        decrementUnreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
