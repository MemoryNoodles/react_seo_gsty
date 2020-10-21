import React, { Component } from 'react';
import { NextPage, NextPageContext } from 'next';
import CommonHead from '../CommonHead';
import './index.less';
import CommonFooter from '../CommonFooter';
import { BackTop } from 'antd';
interface LayoutProps {
  children: React.ReactNode;
  statusCode: number;
}

interface State {}

class CommoneLayout extends Component<LayoutProps, State> {
  constructor(props: any) {
    super(props);
    // this.state = {

    // };
  }

  public render() {
    const { children, statusCode } = this.props;
    return (
      <div className="page-wrap">
        {statusCode == 200 ? (
          <div className="page-box">
            <div className="header-bg">
              <CommonHead />
            </div>
            <div className="main-container" style={{ flex: 1 }}>
              {children}

              <div className="fixed-box">
                <div className="custom-back-top">
                  <span>光速</span>
                  <span>APP</span>
                </div>
                <BackTop visibilityHeight={-1}>
                  <div className="custom-back-top">
                    <img src="/static/image/backTopIcon.png" alt="" />
                    <span>置顶</span>
                  </div>
                </BackTop>
              </div>
            </div>
            <div className="footer-bg">
              <CommonFooter />
            </div>
          </div>
        ) : (
          <div className="page-box">
            <div className="main-container-error" style={{ flex: 1 }}>
              {children}
            </div>
            <div className="footer-bg">
              <CommonFooter />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CommoneLayout;
