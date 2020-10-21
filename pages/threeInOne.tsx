import React, { Component } from 'react';
import TitleNav from '../components/Breadcrumb/index';
import BattleTab from '../components/BattleTab/index';
import ThreeInOneContent from '../components/ThreeInOne/index';
import apiFun from '../api/apiFun';
import { handleBackData } from '../utils/common';
interface Props {
  threeInOneContentList: any;
  matchDetail: any;
  matchId: number | string;
}
interface State { }

export default class ThreeInOne extends Component<Props, State> {
  state = {};
  static async getInitialProps({ req }) {
    //获取数据
    let matchId = req.params['1'] || '';
    let params = {
      matchId: matchId || 162623, //比赛ID
    };
    let threeInOneContentList = [];
    //获取数据
    let matchDetail = await apiFun.matchDetail(params);
    // 欧赔
    const oupei = await apiFun.europeanOddsList(params);
    let oupeiList = JSON.parse(oupei.content);
    // 让球/亚赔
    const rangqiuList = await apiFun.battleLetBallList(params);
    let rangqiu = JSON.parse(rangqiuList.content);
    // 进球数
    const jinqiuList = await apiFun.goalsList(params);
    let jinqiu = JSON.parse(jinqiuList.content);
    for (let index = 0; index < oupeiList.length; index++) {
      //满足companyId相同的组成一条数据
      let rangqiuCurrent = rangqiu.filter(num => {
        return num.companyId == oupeiList[index].companyId;
      });
      let jinqiuCurrent = jinqiu.filter(num => {
        return num.companyId == oupeiList[index].companyId;
      });
      threeInOneContentList.push({
        startOdds: oupeiList[index].startOdds,
        endOdds: oupeiList[index].endOdds,
        companyName: oupeiList[index].companyName,
        rangStart: rangqiuCurrent[0] ? rangqiuCurrent[0].startOdds : '',
        rangEnd: rangqiuCurrent[0] ? rangqiuCurrent[0].endOdds : '',
        startPK: rangqiuCurrent[0] ? rangqiuCurrent[0].startPK : '',
        endPK: rangqiuCurrent[0] ? rangqiuCurrent[0].endPK : '',
        jinStart: jinqiuCurrent[0] ? jinqiuCurrent[0].startOdds : '',
        jinEnd: jinqiuCurrent[0] ? jinqiuCurrent[0].endOdds : '',
        jinStartPK: jinqiuCurrent[0] ? jinqiuCurrent[0].startPK : '',
        jinEndPK: jinqiuCurrent[0] ? jinqiuCurrent[0].endPK : '',
      });
    }
    // console.log(oupei, 'oupei')
    // console.log(rangqiu, 'rangqiu')
    // console.log(jinqiu, 'jinqiu')
    // console.log(rangqiu, 'rangqiu')
    return { threeInOneContentList, matchDetail, matchId };
  }
  render() {
    const { threeInOneContentList, matchDetail, matchId = '' } = this.props;
    const dataArr = [
      { name: '即时比分', url: '' },
      { name: '足球', url: '' },
      { name: '对阵详情', url: '' },
    ];
    let canusematchDetail = handleBackData(matchDetail);
    return (
      <div>
        <TitleNav dataArr={dataArr} />
        <BattleTab
          matchId={matchId}
          baseData={canusematchDetail.base ? canusematchDetail.base : {}}
          defaultActiveKey={`threeInOne-${matchId}`}
        />
        <div>
          <ThreeInOneContent threeInOneContentList={threeInOneContentList} matchId={matchId} />
        </div>
      </div>
    );
  }
}
