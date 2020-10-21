
import React, { Component } from 'react'
import TitleNav from '../components/Breadcrumb/index';
import BattleTab from "../components/BattleTab/index"
import BattleLetBallContent from "../components/BattleLetBall/index"
import apiFun from '../api/apiFun';
import { handleBackData } from "../utils/common"
interface Props {
    letBallList: any,
    matchId: string,
    matchDetail: Array<object>,
}
interface State {

}

export default class BattleLetBall extends Component<Props, State> {
    state = {}
    static async getInitialProps({ req }) {
        let matchId = req.params['1'] || '';
        let params = {
            "matchId": matchId || 162623                 //比赛ID
        };
        //获取数据
        let matchDetail = await apiFun.matchDetail(params);
        const letBallList = await apiFun.battleLetBallList({ matchId: matchId });
        return { letBallList, matchId, matchDetail };
    }
    render() {
        const { letBallList, matchDetail, matchId } = this.props;
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
                    defaultActiveKey={`battleLetBall-${matchId}`} />
                <div>
                    <BattleLetBallContent letBallList={letBallList} matchId={matchId} />
                </div>

            </div>
        )
    }
}


