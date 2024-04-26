import { NotificationContext } from '@src/providers/NotificationProvider';
import { useContext } from 'react';

export const useAppNotification = () => useContext(NotificationContext);
