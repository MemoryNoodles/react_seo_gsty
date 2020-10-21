import { message } from 'antd';
export const handleBackData = res => {
  if (res.status == 2) {
    if (typeof window !== 'undefined') {
      message.error('服务器错误');
    }
  } else if (res.status == 1) {
    return (
      res.content &&
      (typeof res.content == 'string' ? JSON.parse(res.content) : res.content)
    );
  }
};
