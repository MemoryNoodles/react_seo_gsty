import React, { Component } from 'react';
import TitleNav from '../components/Breadcrumb/index';
import BattleTab from '../components/BattleTab/index';
import BattleLiveCom from '../components/BattleLiveCom/index';
import apiFun from '../api/apiFun';
import { handleBackData } from '../utils/common';
interface Props {
  oddsInTime: Array<object>;
  matchDetail: Array<object>;
  matchBattle: Array<object>;
  matchId: string;
}
interface State {}

export default class BattleLive extends Component<Props, State> {
  state = {};
  static async getInitialProps({ req }) {
    let matchId = req.params['1'] || '';
    let params = {
      matchId: matchId, //比赛ID
    };
    let oddsInTime = await apiFun.oddInTime(params);
    let matchDetail = await apiFun.matchDetail(params);
    let matchBattle = await apiFun.matchBattle(params);
    return { oddsInTime, matchDetail, matchBattle, matchId };
  }
  render() {
    const { oddsInTime, matchDetail, matchBattle, matchId } = this.props;
    let canUseOddsInTime = handleBackData(oddsInTime);
    let canUsematchDetail = handleBackData(matchDetail);
    let canUsematchBattle = handleBackData(matchBattle);
    const dataArr = [
      { name: '即时比分', url: '' },
      { name: '足球', url: '/footballScore' },
      { name: '对阵详情', url: '' },
    ];

    return (
      <div>
        <TitleNav dataArr={dataArr} />
        <BattleTab
          matchId={matchId}
          baseData={canUsematchDetail.base ? canUsematchDetail.base : {}}
          defaultActiveKey={`battleLive-${matchId}`}
        />
        <div>
          <BattleLiveCom
            oddsInTime={canUseOddsInTime}
            matchDetail={canUsematchDetail}
            matchBattle={canUsematchBattle}
          />
        </div>
      </div>
    );
  }
}
