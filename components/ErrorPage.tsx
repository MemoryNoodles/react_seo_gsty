import { NextPage } from 'next';
import { Button } from 'antd';
import Router from 'next/router';

interface ErrorPageProps {
  statusCode: number;
}

const ErrorPage: NextPage<ErrorPageProps> = props => {
  let RenderComp;
  switch (props.statusCode) {
    case 200:
    case 404: {
      RenderComp = () => (
        <div className="content-container">
          <div className="top-bg">
            <div className="code-img">
              <img src="/static/image/404.png" alt="" />
            </div>
            <div className="error-img">
              <img src="/static/image/errorPng.png" alt="" />
            </div>
          </div>
          <div className="bottom-bg">
            <p className="text">服务器开小差了，找不到你想要的内容…</p>
            <p className="btn">
              <Button type="primary" href="/" target="_blank">
                返回首页
              </Button>
            </p>
          </div>
        </div>
      );
      break;
    }
    case 500: {
      RenderComp = () => (
        <div className="content-container">
          <div className="top-bg">
            <div className="code-img">
              <img src="/static/image/500.png" alt="" />
            </div>
            <div className="error-img">
              <img src="/static/image/errorPng.png" alt="" />
            </div>
          </div>
          <div className="bottom-bg">
            <p className="text">
              抱歉，内部服务器错误… <a href="">点击刷新</a>
            </p>
            <p className="btn">
              <Button type="primary" href="/" target="_blank">
                返回首页
              </Button>
            </p>
          </div>
        </div>
      );
      break;
    }
    default:
      break;
  }
  return <RenderComp />;
};

export default ErrorPage;
