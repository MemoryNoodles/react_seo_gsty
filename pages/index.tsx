import React, { Component, ReactNode } from 'react';
import { Button } from 'antd';
import apiFun from '../api/apiFun';
import Swipper from '../components/Swipper';
import IndexComponent from '../components/IndexComponent';
import moment from 'moment';
import { handleBackData } from '../utils/common';
interface State {}
interface Props {
  data: any;
  leagueRank: any;
  bannerList: any;
}

class Home extends Component<Props, State> {
  static async getInitialProps({ req }) {
    //获取数据
    const tomorrow = moment(new Date())
      .add(1, 'days')
      .format('YYYY-MM-DD');
    const yesterday = moment(new Date())
      .add(-1, 'days')
      .format('YYYY-MM-DD');

    const bannerList = await apiFun.bannerList({});
    const data = await apiFun.homeMatchList({
      startTime: yesterday,
      endTime: tomorrow,
    });

    const leagueRank = await apiFun.homeLeagueRank({});
   
    return { data, leagueRank, bannerList };
  }
  render(): ReactNode {
    // console.log(this.props, '222');
    const { data = {}, leagueRank = {}, bannerList = {} } = this.props;

    const matchList = handleBackData(data);
    const leagueRankList = handleBackData(leagueRank);
    const bannerContentList = handleBackData(bannerList) || [];
   
    return (
      <div>
        {/* <Swipper autoplay bannerContentList={bannerContentList} /> */}
        <IndexComponent data={matchList} leagueRankList={leagueRankList} />
      </div>
    );
  }
}

export default Home;
