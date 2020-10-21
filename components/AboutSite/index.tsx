import React, { Component, ReactNode } from 'react';
import { withRouter } from 'next/router';
import './index.less';
import Link from 'next/link';
import AboutUs from '../../components/aboutUs/index';
interface Props {
  router: any;
}
interface State { }

const aboutArr = [
  { name: '关于本站', url: '/about' },
  { name: '隐私政策', url: '/policy' },
  { name: '用户守则', url: '/rules' },
  { name: '联系我们', url: '/contact' },
  { name: '网站地图', url: '/sitemap' },
];

class AboutSite extends Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render(): ReactNode {
    console.log(this.props, 'this.props');
    const { router = {} } = this.props;
    const { route } = router;
    return (
      <div className="about-site-wrap">
        <div className="about-site-tab-box">
          {aboutArr.map(item => {
            return (
              //   <Link key={item.url} href={item.url} prefetch>
              //     <a className={`tab-item ${item.url === route ? 'active' : ''}`}>
              //       {item.name}
              //     </a>
              //   </Link>
              <a
                key={item.url}
                href={item.url}
                className={`tab-item ${item.url === route ? 'active' : ''}`}
              >
                {item.name}
              </a>
            );
          })}
        </div>
        <div className="about-site-content">
          <AboutUs />
        </div>
      </div>
    );
  }
}

export default withRouter(AboutSite);
