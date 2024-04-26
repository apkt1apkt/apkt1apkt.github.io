import { notification } from 'antd';
import { createContext, useCallback, ReactNode } from 'react';

export const NotificationContext = createContext(
  (() => {}) as ShowNotification,
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = useCallback(
    ({ message, description, type = 'info' }: ShowNotificationProps) => {
      api[type]({
        message,
        description,
        duration: 20,
      });
    },
    [api],
  );

  return (
    <NotificationContext.Provider value={showNotification}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

type ShowNotificationProps = {
  message: string;
  description?: string;
  type?: NotificationType;
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type ShowNotification = ({
  message,
  description,
  type,
}: ShowNotificationProps) => void;
