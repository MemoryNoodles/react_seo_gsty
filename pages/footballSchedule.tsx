import React, { Component } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import TitleNav from '../components/Breadcrumb/index';
import FootballHeader from '../components/footballHeader/index';
import ScheduleGame from '../components/footballHeader/scheduleGame';
import apiFun from '../api/apiFun';
import { handleBackData } from '../utils/common';
import moment from 'moment';

interface Props {
  futureMatchList: any;
}

interface State {
  showEvent: any;
  searchContent: string;
}

export default class FootballSchedule extends Component<Props, State> {
  static async getInitialProps({ req }) {
    let now = new Date();
    const nowTime = req.query.date
      ? moment(req.query.date).format('YYYY-MM-DD')
      : moment(now).format('YYYY-MM-DD');
    let params = {
      date: String(nowTime),
    };
    const futureMatchListRes = await apiFun.futureMatchList({ ...params });
    const futureMatchList = handleBackData(futureMatchListRes);

    return { futureMatchList };
  }

  constructor(props) {
    super(props);
    this.state = {
      showEvent: '',
      searchContent: '',
    };
  }
  componentDidMount() {
    console.log(456);
  }
  componentWillUnmount() {}

  changeShowEvent(e) {
    this.setState({ showEvent: e });
  }
  changeSearchContent(e) {
    this.setState({ searchContent: e });
  }
  get countDown() {
    //类似 vue 中的计算属性
    return (endDate: string): string => {
      return '';
    };
  }

  render(): any {
    const {futureMatchList} = this.props
    const {searchContent,showEvent} = this.state
    console.log(futureMatchList)
    const dataArr = [
      { name: '即时比分', url: '' },
      { name: '足球', url: '' },
    ];
    return (
      <div>
        <TitleNav dataArr={dataArr}/>
        <FootballHeader
          futureMatchList={futureMatchList}
          changeShowEvent={e => this.changeShowEvent(e)}
          changeSearchContent={e => this.changeSearchContent(e)}
        />
        <ScheduleGame
          futureMatchList={futureMatchList}
          searchContent={searchContent}
          showEvent={showEvent}
        />
      </div>
    );
  }
}
