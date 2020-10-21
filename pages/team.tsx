// 球队详情

import React, { Component, ReactNode } from 'react';
import TitleNav from '../components/Breadcrumb/index';
import { withRouter } from 'next/router';
import TeamComponent from '../components/TeamComponent';
import apiFun from '../api/apiFun';
import { handleBackData } from '../utils/common';
interface Props {
  router: any;
  teamBaseList: any;
  teamMatchList: any;
  teamBattleList: any;
}
interface State {}

class Team extends Component<Props, State> {
  static async getInitialProps({ req, res }) {
    //获取数据
    let teamId = req.params['1'] || '';
    const teamBase = await apiFun.teamBase({ teamId });
    const teamBaseList = handleBackData(teamBase);

    const teamMatch = await apiFun.teamMatch({ teamId });
    const teamMatchList = handleBackData(teamMatch);

    const teamBattle = await apiFun.teamBattle({ teamId });
    const teamBattleList = handleBackData(teamBattle);

    return {
      teamBaseList,
      teamMatchList,
      teamBattleList,
    };
  }
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {};
  }

  render(): ReactNode {
    const {
      teamBaseList = {},
      teamMatchList = [],
      teamBattleList = [],
    } = this.props;
    const dataArr = [
      { name: '资料库', url: '' },
      { name: '英超', url: '' },
      { name: '安江', url: '' },
    ];
    return (
      <div>
        {/* <TitleNav dataArr={dataArr} /> */}
        <TeamComponent
          teamBaseList={teamBaseList}
          teamMatchList={teamMatchList}
          teamBattleList={teamBattleList}
        />
      </div>
    );
  }
}

export default withRouter(Team);
