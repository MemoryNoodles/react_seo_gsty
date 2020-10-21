
import React, { Component } from 'react'
import TitleNav from '../components/Breadcrumb/index';
import BattleTab from "../components/BattleTab/index"
import BattleLetBallContent from "../components/EuropeanOdds/index"
import apiFun from '../api/apiFun';
import { handleBackData } from "../utils/common"
interface Props {
    europeanOddsList: any,
    matchId: string,
    matchDetail: Array<object>,
}
interface State {

}

export default class EuropeanOdds extends Component<Props, State> {
    state = {}
    static async getInitialProps({ req }) {
        let matchId = req.params['1'] || '';

        //获取数据
        let params = {
            "matchId": matchId || 162623                 //比赛ID
        };
        //获取数据
        let matchDetail = await apiFun.matchDetail(params);
        const europeanOddsList = await apiFun.europeanOddsList({ matchId: matchId });
        // console.log(europeanOddsList, 'xxz')
        return { europeanOddsList, matchId, matchDetail };
    }
    render() {
        const { europeanOddsList, matchDetail, matchId } = this.props;
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
                    defaultActiveKey={`europeanOdds-${matchId}`} />
                <div>
                    <BattleLetBallContent europeanOddsList={europeanOddsList} matchId={matchId} />
                </div>

            </div>
        )
    }
}


