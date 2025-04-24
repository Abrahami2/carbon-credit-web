import { message } from 'antd';

const useNotification = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleMessage = (type, content, duration = 3) => {
    messageApi.open({
      type,
      content,
      duration,
    });
  };

  return { handleMessage, contextHolder };
};

export default useNotification;
