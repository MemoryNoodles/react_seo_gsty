import React, { Component } from 'react';
import { NextPage } from 'next';
import './index.less';
import Link from 'next/link';
import { Divider } from 'antd';
interface FooterProps {}

class CommonFooter extends Component<NextPage, FooterProps> {
  recordeArr: { name: string; url: string }[];
  LinksArr: { name: string; url: string }[];
  aboutArr: { name: string; url: string }[];
  constructor(props: any) {
    super(props);
    // this.state = {

    // };
    this.LinksArr = [
      { name: '捷报比分', url: 'http://www.nowscore.com/' },
      { name: '人民网体育', url: 'http://sports.people.com.cn/' },
      { name: '飞鲸体育数据', url: 'https://www.feijing88.com/' },
      { name: '球票预定', url: 'http://www.saiday.com/' },
      { name: '凤凰体育', url: 'https://sports.ifeng.com/' },
      { name: '足球分析', url: 'http://www.liveofchina.com/zuqiufenxi/' },
      { name: '极电竞', url: 'https://www.365rich.com/' },
    ];

    this.aboutArr = [
      { name: '关于本站', url: '/about' },
      { name: '隐私政策', url: '/policy' },
      { name: '用户守则', url: '/rules' },
      { name: '联系我们', url: '/contact' },
      { name: '网站地图', url: '/sitemap' },
    ];

    this.recordeArr = [
      { name: '备案信息', url: '/static/image/record-info.png' },
      { name: '经营许可', url: '/static/image/license.png' },
      { name: '企业性质', url: '/static/image/enterpriseType.png' },
    ];
  }

  public render() {
    return (
      <div>
        <footer className="footer-wrap">
          <div className="links-wrap">
            <div>友情链接：</div>
            {this.LinksArr.map(item => {
              return (
                <div key={item.url} className="link-item">
                  <a
                    title={item.name}
                    target="_blank"
                    href={item.url}
                    rel="nofollow noopener noreferrer"
                  >
                    {item.name}
                  </a>
                </div>
              );
            })}
          </div>
          <div className="about-wrap">
            {this.aboutArr.map((item: any, index: Number) => {
              return [
                <div key={item.url} className="about-item">
                  <Link href={item.url}>
                    <a
                      title={item.name}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      {item.name}
                    </a>
                  </Link>
                </div>,
                index < this.aboutArr.length - 1 && (
                  <Divider
                    key={item.url + index}
                    type="vertical"
                    className="about-link-divider"
                  />
                ),
              ];
            })}
          </div>
          <div className="statement-wrap">
            <div className="statement-title">声明：</div>
            <div className="statement-content">
              本网资讯仅供体育爱好者浏览、购买中国足彩参考之用。任何人不得用于非法用途，否则责任自负。
              本网所登载广告均为广告客户的个人意见及表达方式，和本网无任何关系。
              链接的广告仅限于体育或中国足彩推荐信息、不得含有色情、政治或博彩信息，如有违反国家法律规定的，
              本网有权随时予以删除，并保留与有关部门合作追究的权利。
            </div>
          </div>

          <div className="copyright-box">
            Copyright © 2002-2019 光速 All rights reserved. 蜀ICP备18016560号-2
          </div>

          <div className="record-box">
            {this.recordeArr.map(item => {
              return (
                <div className="record-item" key={item.url}>
                  <img src={item.url} alt={item.name} />
                </div>
              );
            })}
          </div>
        </footer>
      </div>
    );
  }
}

export default CommonFooter;
