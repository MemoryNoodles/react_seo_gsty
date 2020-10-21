
import React, { Component } from 'react'
import TitleNav from '../components/Breadcrumb/index';
import BattleTab from "../components/BattleTab/index"
import GoalsContent from "../components/goals/index"
import apiFun from '../api/apiFun';
import { handleBackData } from "../utils/common"
interface Props {
    goalsList: any,
    matchId: string,
    matchDetail: Array<object>,
}
interface State {

}

export default class Goals extends Component<Props, State> {
    static async getInitialProps({ req }) {
        let matchId = req.params['1'] || '';
        let params = {
            "matchId": matchId || 162623                 //比赛ID
        };
        //获取数据
        let matchDetail = await apiFun.matchDetail(params);
        const goalsList = await apiFun.goalsList(params);
        // console.log(goalsList, 'xxxxx');
        return { goalsList, matchId, matchDetail };
    }
    state = {}

    render() {
        const { goalsList, matchDetail, matchId } = this.props;
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
                    defaultActiveKey={`goals-${matchId}`} />
                <div>
                    <GoalsContent goalsList={goalsList} matchId={matchId} />
                </div>
            </div>
        )
    }
}


