import React, { Component } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import TitleNav from '../components/Breadcrumb/index';
import FootballHeader from '../components/footballHeader/index';
import EndGame from '../components/footballHeader/endGame';
import apiFun from '../api/apiFun';
import { handleBackData } from '../utils/common';
import moment from 'moment';

interface Props {
  finishMatch: any;
}

interface State {
  showEvent:any;
  searchContent: string;
}

interface State {}

export default class FootballScoreEnd extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showEvent:'',
      searchContent: '',
    };
  }
  static async getInitialProps({ req }) {
    let now = new Date();
    const nowTime = req.query.date?moment(req.query.date).format('YYYY-MM-DD'):moment(now).format('YYYY-MM-DD')
    let params = {
      date: String(nowTime),
    };
    const finishMatchRes = await apiFun.finishMatch({ ...params });
    const finishMatch = handleBackData(finishMatchRes);
    return { finishMatch };
  }

  componentDidMount() {}
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
    const {finishMatch} = this.props
    const {searchContent,showEvent} = this.state
    const dataArr = [
      { name: '即时比分', url: '' },
      { name: '足球', url: '' },
    ];
    return <div>
      <TitleNav dataArr={dataArr}/>
      <FootballHeader finishMatch={finishMatch} changeShowEvent={(e)=>this.changeShowEvent(e)} changeSearchContent={(e)=> this.changeSearchContent(e)}/>
      <EndGame finishMatch={finishMatch} searchContent={searchContent} showEvent={showEvent}/>
    </div>;
  }
}
