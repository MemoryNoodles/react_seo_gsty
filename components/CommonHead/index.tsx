import React, { Component } from 'react';
import { NextPage } from 'next';
import './index.less';
import Link from 'next/link';
import { Menu, Badge, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Router, { withRouter } from 'next/router';
import NProgress from 'nprogress';
import '../../assets/np.less';
const { SubMenu } = Menu;

interface HeadProps {
  router: any;
}

interface State {
  current: string;
}
const homeRouterArr: string[] = [
  'home',
  'footballScore',
  'basketball',
  'ESports',
  'recommend',
  'information',
  'dataInfo',
  'down',
];

class CommonHead extends Component<HeadProps, State> {
  constructor(props: any) {
    super(props);
    const pathname: string =
      props.router && props.router.pathname
        ? props.router.pathname.split('/')[1]
        : '';
    this.state = {
      current: homeRouterArr.indexOf(pathname) > -1 ? pathname : 'home',
    };
  }
  handleClick = (e: any) => {
    // this.setState({ current: e.key });
  };
  componentDidMount() {
    Router.events.on('routeChangeStart', (...args) => {
      console.log('1.routeChangeStart->路由开始变化,参数为:', ...args);
      NProgress.start();
    });
    Router.events.on('routeChangeComplete', (...args) => {
      //防止接口报错路径已经跳转了 但是当前选中项没有跳转成功
      NProgress.done();
      const { router } = this.props;
      const pathname: string =
        router && router.pathname ? router.pathname.split('/')[1] : '';
      this.setState({
        current: homeRouterArr.indexOf(pathname) > -1 ? pathname : 'home',
      });
      console.log('2.routeChangeComplete->路由结束变化,参数为:', ...args);
    });
    Router.events.on('routeChangeError', (...args) => {
      NProgress.done();
      console.log('4,routeChangeError->跳转发生错误,参数为:', ...args);
    });
  }
  public render() {
    const { current } = this.state;
    return (
      <header className="header-wrap">
        <div className="header-logo-menu-box">
          <h1 className="logo-text">光速体育</h1>
          <div className="logo-box">
            <Link href="/">
              <img src="/static/image/logo.png" alt="image" />
            </Link>
          </div>

          <div className="menu-box">
            <Menu
              onClick={e => this.handleClick(e)}
              selectedKeys={[current]}
              mode="horizontal"
            >
              <Menu.Item key="home">
                <Link href="/">
                  <a target="_blank">首 页</a>
                </Link>
              </Menu.Item>
              <SubMenu
                title={
                  <div className="submenu-title">
                    <a>即时比分</a>
                    <DownOutlined />
                  </div>
                }
                popupClassName="custom-submenu-cls"
                popupOffset={[-12, 5]}
              >
                <Menu.Item key="footballScore">
                  <Link href="/footballScore" prefetch>
                    <a target="_blank" rel="noopener noreferrer">
                      足 球
                    </a>
                  </Link>
                </Menu.Item>
                {/* <Menu.Item key="basketball">
                  <Link href="/basketball">
                    <a target="_blank" rel="noopener noreferrer">
                      篮 球
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item key="ESports">
                  <Link href="/ESports">
                    <a target="_blank" rel="noopener noreferrer">
                      电 竞
                    </a>
                  </Link>
                </Menu.Item> */}
              </SubMenu>
              {/* <Menu.Item key="recommend">
                <a rel="noopener noreferrer" href="/recommend">
                  专家推荐
                </a>
              </Menu.Item>
              <Menu.Item key="information">
                <Link href="/information">
                  <a target="_blank" rel="noopener noreferrer">
                    资讯中心
                  </a>
                </Link>
              </Menu.Item> */}
              <Menu.Item key="dataInfo">
                <Link href="/dataInfo">
                  <a target="_blank" rel="noopener noreferrer">
                    资料库
                  </a>
                </Link>
              </Menu.Item>
              {/* <Menu.Item key="down">
                <Badge count={<span className="menu-badge-title">推荐</span>}>
                  <Link href="/down">
                    <a target="_blank" rel="noopener noreferrer">
                      APP下载
                    </a>
                  </Link>
                </Badge>
              </Menu.Item> */}
            </Menu>
          </div>
        </div>

        {/* <div className="login-box">
          <Button>
            <Link href="/login">
              <a target="_blank" rel="noopener noreferrer">
                登录
              </a>
            </Link>
          </Button>
          <Button type="primary">
            <Link href="/register">
              <a target="_blank" rel="noopener noreferrer">
                注册
              </a>
            </Link>
          </Button>
        </div> */}
      </header>
    );
  }
}

export default withRouter(CommonHead);
