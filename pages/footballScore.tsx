import React, { Component } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import apiFun from '../api/apiFun';
import { handleBackData } from '../utils/common';
import TitleNav from '../components/Breadcrumb/index';
import FootballHeader from '../components/footballHeader/index';
import InstantGame from '../components/footballHeader/instantGame';
import { any } from 'prop-types';

interface Props {
  quarterInTime: any;
  matchFast: any;
  companyList: any;
}

interface State {
  dataList: Array<any>;
  presentCompany: number | string;
  showEvent: any;
}

export default class FootballScore extends Component<Props, State> {
  static async getInitialProps({ req }) {
    const quarterInTimeRes = await apiFun.quarterInTime();
    const quarterInTime = handleBackData(quarterInTimeRes);
    const companyListRes = await apiFun.getCompanyList();
    const companyList = handleBackData(companyListRes);
    return { quarterInTime, companyList };
  }
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      dataList: [],
      presentCompany: '',
      showEvent:'',
    };
  }
  timer: any = null;

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  getId(params: string) {
    window.location.href = 'login.tsx';
  }
  changeCompany(id: any) {
    this.setState({ presentCompany: id });
  }

  changeShowEvent(e) {
    this.setState({ showEvent: e });
  }
  changeSearchContent(e) {
    console.log(1)
  }
  //比赛状态值 0:未开始 1:待定 2:延迟 3: 取消 4:暂停 5:上半场行中 6:中场休息 7:下半场进行中 8:完成
  render(): any {
    const { presentCompany = '' } = this.state;
    const { quarterInTime, companyList } = this.props;
    const { showEvent } = this.state;
    const dataArr = [
      { name: '即时比分', url: '' },
      { name: '足球', url: '' },
    ];
    return (
      <div className="score-style">
        <TitleNav dataArr={dataArr} />
        <FootballHeader
          isInstant={true}
          companyList={companyList}
          eventList={quarterInTime}
          changeCompany={e => this.changeCompany(e)}
          changeSearchContent = {e =>this.changeSearchContent(e)}
          changeShowEvent={e => this.changeShowEvent(e)}
        />
        <InstantGame
          quarterInTime={quarterInTime}
          showEvent={showEvent}
          presentCompany={presentCompany}
        />
      </div>
    );
  }
}
