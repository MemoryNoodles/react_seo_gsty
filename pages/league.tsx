import React, { Component, ReactNode } from 'react';
import apiFun from '../api/apiFun';
import TitleNav from '../components/Breadcrumb/index';
import DataInfoPage from '../components/DataInfoPage';
import { handleBackData } from '../utils/common';
import { withRouter } from 'next/router';
import { isEmpty } from '../utils';
interface Props {
  leagueAllRes: any;
  router: any;
  quarterList: any;
  quarterBase: any;
  leagueId?: number;
  quarterMatchList: any;
  matchRankList: any;
  statTeamList: any;
  statMemberList: any;
  quarterAsiaList: any;
  quarterBigList: any;
  quarterBQList: any;
}

interface State {}

class League extends Component<Props, State> {
  static async getInitialProps({ req, res }) {
    //获取数据
    let quarterId = req.params['1'] || '';
    const leagueAllRes = await apiFun.leagueAll();
    const leagueAllList = handleBackData(leagueAllRes);
    if (!quarterId) {
      quarterId =
        !isEmpty(leagueAllList) && !isEmpty(leagueAllList.hot)
          ? leagueAllList.hot[0].quarterId
          : '';
    }
    const quarterBaseRes = await apiFun.quarterBase({ quarterId });
    const quarterBase = handleBackData(quarterBaseRes);
    const leagueId = quarterBase.leagueId || '';
    const quarterRes = await apiFun.leagueQuarter({ leagueId });
    const quarterList = handleBackData(quarterRes);

    const quarterMatch = await apiFun.quarterMatch({ quarterId });
    const quarterMatchList = handleBackData(quarterMatch);

    const matchRank = await apiFun.matchRank({ quarterId });
    const matchRankList = handleBackData(matchRank);

    const statTeam = await apiFun.statTeam({ quarterId });
    const statTeamList = handleBackData(statTeam);

    const statMember = await apiFun.statMember({ quarterId });
    const statMemberList = handleBackData(statMember);

    const quarterAsia = await apiFun.quarterAsia({ quarterId });
    const quarterAsiaList = handleBackData(quarterAsia);

    const quarterBig = await apiFun.quarterBig({ quarterId });
    const quarterBigList = handleBackData(quarterBig);

    const quarterBQ = await apiFun.quarterBQ({ quarterId });
    const quarterBQList = handleBackData(quarterBQ);

    return {
      leagueAllRes,
      quarterList,
      quarterBase,
      quarterMatchList,
      matchRankList,
      statTeamList,
      statMemberList,
      quarterAsiaList,
      quarterBigList,
      quarterBQList,
    };
  }
  render(): ReactNode {
    const {
      leagueAllRes = {},
      quarterList = [],
      quarterBase = {},
      quarterMatchList = {},
      matchRankList = [],
      statTeamList = [],
      statMemberList = [],
      quarterAsiaList = [],
      quarterBigList = [],
      quarterBQList = [],
    } = this.props;
    const leagueAllList = handleBackData(leagueAllRes);
    const dataArr = [
      { name: '资料库', url: '' },
      { name: '足球资料库', url: '' },
    ];
    return (
      <div>
        <TitleNav dataArr={dataArr} />
        <DataInfoPage
          leagueAllList={leagueAllList}
          quarterList={quarterList}
          quarterBase={quarterBase}
          quarterMatchList={quarterMatchList}
          matchRankList={matchRankList}
          statTeamList={statTeamList}
          statMemberList={statMemberList}
          quarterAsiaList={quarterAsiaList}
          quarterBigList={quarterBigList}
          quarterBQList={quarterBQList}
          type={2}
        />
      </div>
    );
  }
}

export default withRouter(League);
