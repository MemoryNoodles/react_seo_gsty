import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { NextPage } from 'next';
import { withRouter} from 'next/router'
import './index.less'
interface HeadProps {}

class TitleNav extends Component<NextPage, HeadProps> {
  constructor(props) {
    super(props);
    // this.state = {

    // };
  }
  componentDidMount () {
      console.log(this,'rpg')
  }

  public render() {
    return  <div>
        <div>
            <div>
                <img src="" alt=""/>
                <div>马西斯</div>
            </div>
            <div>
                <div>中场</div>
                <div>2-0</div>
                <div>越南已 2020 07-14 10:00</div>
            </div>
            <div>
                <img src="" alt=""/>
                <div>法西斯</div>
            </div>
        </div>
    </div>
  }
}

export default withRouter(TitleNav)
