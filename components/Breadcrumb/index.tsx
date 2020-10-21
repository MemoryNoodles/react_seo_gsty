import React, { Component, ReactNode } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter } from 'next/router';
import './index.less';
import { isEmpty } from '../../utils';
interface HeadProps {
  dataArr: { name: string; url: string }[];
}
interface State {}

class TitleNav extends Component<HeadProps, State> {
  constructor(props: any) {
    super(props);
    // this.state = {

    // };
  }
  componentDidMount() {
    console.log(this, 'rpg');
  }

  render(): ReactNode {
    const { dataArr = [] } = this.props;
    if (isEmpty(dataArr)) {
      return null;
    }
    return (
      <div className="nav-header">
        <Breadcrumb separator="">
          <Breadcrumb.Item>当前位置</Breadcrumb.Item>
          <Breadcrumb.Separator>:</Breadcrumb.Separator>
          {dataArr.map((item, index) => {
            return [
              <Breadcrumb.Item>
                <a href={item.url}>{item.name}</a>
              </Breadcrumb.Item>,
              index !== dataArr.length - 1 && (
                <Breadcrumb.Separator>{'>'}</Breadcrumb.Separator>
              ),
            ];
          })}
        </Breadcrumb>
      </div>
    );
  }
}

export default withRouter(TitleNav);
