import {notification} from 'antd';

notification.config({
  top: 100,
  duration: 9,
});

export const notices = {
  success: (res) => notification.success({
    message: res,
  }),
  error: (res) =>  notification.error({
    message: res,
  }),
  info: (res) => {
    notification.info({
      message: res,
    })
  }
}