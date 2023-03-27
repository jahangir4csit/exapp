import { notification } from 'antd';

const [api] = notification.useNotification();
export const openNotification  = (type) => {
    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };