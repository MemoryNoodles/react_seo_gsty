import React, { Component } from 'react';
import TitleNav from '../components/Breadcrumb/index';
import BattleTab from '../components/BattleTab/index';
import DataAnalysis from '../components/DataAnalysis/index';
import apiFun from '../api/apiFun';
import { connect } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import { handleBackData } from '../utils/common';
interface Props {
  matchDetail: Array<object>;
  historyBout: Array<object>;
  lateFight: Array<object>;
  matchRankList: Array<object>;
  matchFutureList: Array<object>;
  matchId: string;
}
interface State {}
interface State {}

class MatchDetail extends Component<Props, State> {
  state = {};

  static async getInitialProps({ req }) {
    let matchId = req.params['1'] || '';

    //获取数据
    let params = {
      matchId: matchId   //比赛ID
    };
    let matchDetail = await apiFun.matchDetail(params);
    let historyBout = await apiFun.historyBout(params);
    let lateFight = await apiFun.lateFight(params);
    let matchRankList = await apiFun.matchRankList(params);
    let matchFutureList = await apiFun.matchFuture({ number: 3, ...params });

    return {
      historyBout,
      lateFight,
      matchRankList,
      matchFutureList,
      matchDetail,
      matchId,
    };
  }
  render() {
    const {
      historyBout,
      lateFight,
      matchRankList,
      matchFutureList,
      matchDetail,
      matchId,
    } = this.props;
    let canusehistoryBout = handleBackData(historyBout);
    let canusematchDetail = handleBackData(matchDetail);
    let canuselateFight = handleBackData(lateFight);
    let canuseMatchRankList = handleBackData(matchRankList);
    let canuseMatchFutureList = handleBackData(matchFutureList);

    const dataArr = [
      { name: '即时比分', url: '' },
      { name: '足球', url: '' },
      { name: '对阵详情', url: '' },
    ];
    console.log(matchId, 'matchId');
    return (
      <div>
        <TitleNav dataArr={dataArr} />
        <BattleTab
          matchId={matchId}
          baseData={canusematchDetail.base ? canusematchDetail.base : {}}
          defaultActiveKey={`matchDetail-${matchId}`}
        />
        <div>
          <DataAnalysis
            historyBout={canusehistoryBout}
            lateFight={canuselateFight}
            matchRankList={canuseMatchRankList}
            matchFutureList={canuseMatchFutureList}
            baseData={canusematchDetail.base ? canusematchDetail.base : {}}
          />
        </div>
      </div>
    );
  }
}

export default MatchDetail;
