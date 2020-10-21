
import React, { Component } from 'react'
import TitleNav from '../components/Breadcrumb/index';
import apiFun from '../api/apiFun';
import { Tabs, Card } from 'antd';
import { Chart, Line, Point, Legend } from 'bizcharts';
import TrendContent from '../components/Trend/index';
import GoalOrLetBallTrend from '../components/goalOrLetBallTrend/index';
interface Props {
    // goalsList: any
    euListParse: any,
    goalListParse: any,
    letBallListParse: any,
}
const { TabPane } = Tabs;
interface State {
    activekey: any
}
// 数据源
const data = [
    {
        month: "Jan",
        city: "Tokyo",
        temperature: 7,
        id: 1,
    },
    {
        month: "Jan",
        city: "London",
        temperature: 3.9,
        id: 2,
    },
    {
        month: "Feb",
        city: "Tokyo",
        temperature: 6.9,
        id: 1,
    },
    {
        month: "Feb",
        city: "London",
        temperature: 4.2,
        id: 2,
    },
    {
        month: "Mar",
        city: "Tokyo",
        temperature: 2.5,
        id: 1,
    },
    {
        month: "Mar",
        city: "London",
        temperature: 5.7,
        id: 2,
    },
    {
        month: "Apr",
        city: "Tokyo",
        temperature: 14.5,
        id: 1,
    },
];

export default class Trend extends Component<Props, State> {
    state = {
        activekey: 1,
    }
    callback(key) {
        console.log(key);
        this.setState({
            activekey: key
        })

    }

    returnOption() {

        // return option;
    }
    static async getInitialProps({ req }) {
        console.log(req.params, 'resqqqq')
        let matchId = req.params['1'] || '';
        let companyId = req.params['0'] || '';
        // let params = {
        //     "matchId": matchId || 162623                 //比赛ID
        // };
        // 欧指
        const euList = await apiFun.european_detail({ matchId: matchId, companyId: companyId });
        console.log(JSON.parse(euList.content), 'euList')
        //让球
        const goalList = await apiFun.asia_detail({ matchId: matchId, companyId: companyId });
        //进球数
        const letBallList = await apiFun.size_detail({ matchId: matchId, companyId: companyId });
        // return { goalsList, matchId, matchDetail };
        let euListParse = JSON.parse(euList.content)
        let goalListParse = JSON.parse(goalList.content)
        let letBallListParse = JSON.parse(letBallList.content)
        return { euListParse, goalListParse, letBallListParse }
    }

    dealData(list, base) {
        let newArry = []
        list.map((item, index) => {
            // console.log(item.oods)
            newArry.push(
                {
                    name: base[0].homeName,
                    time: item.time,
                    pl: (item.oods.split(','))[0]
                }
            )
            newArry.push(
                {
                    name: base[0].guestName,
                    time: item.time,
                    pl: (item.oods.split(','))[1]
                }
            )
        })
        return newArry
    }
    render() {
        const { euListParse, goalListParse, letBallListParse } = this.props;
        const { activekey } = this.state
        const dataArr = [
            { name: '即时比分', url: '' },
            { name: '足球', url: '' },
            { name: '走势变化图', url: '' },
        ];
        // console.log(euListParse, 'euListParse')
        // console.log(goalListParse, 'goalListParse')
        // console.log(letBallListParse, 'letBallListParse')
        return (
            <div>
                <TitleNav dataArr={dataArr} />
                <Card bordered={false}  >
                    <Tabs defaultActiveKey="1" onChange={(key) => this.callback(key)}>
                        <TabPane tab="欧指" key="1" >
                            <div className="data_content">
                                {euListParse.base && activekey == 1 ? <TrendContent base={euListParse.base} list={euListParse.list} activekey={euListParse} /> : null}
                            </div>
                        </TabPane>
                        <TabPane tab="让球" key="2">
                            <div className="data_content">
                                {/* {goalListParse.list.length > 0 ? <Chart scale={{ temperature: { min: 0 } }} autoFit height={320} data={this.dealData(goalListParse.list, goalListParse.base)} >
                                    <Line shape="smooth" position="time*pl" color="name" label="temperature" />
                                    <Legend
                                        position={'right-top'}
                                        layout={'horizontal'}
                                    />
                                    <Point position="time*pl" color="city" layout />
                                </Chart> : null} */}
                            </div>
                        </TabPane>
                        <TabPane tab="进球数" key="3">
                            <div className="data_content">
                                {/* {letBallListParse.list.length > 0 ? <Chart scale={{ temperature: { min: 0 } }} autoFit height={320} data={this.dealData(letBallListParse.list, letBallListParse.base)} >
                                    <Line shape="smooth" position="time*pl" color="name" label="temperature" />
                                    <Legend
                                        position={'right-top'}
                                        layout={'horizontal'}
                                    />
                                    <Point position="time*pl" color="city" layout />
                                </Chart> : null} */}
                            </div>
                        </TabPane>
                    </Tabs>
                    {/* <GoalsContent goalsList={goalsList} /> */}
                </Card>

                {goalListParse.base && activekey == 2 ? <GoalOrLetBallTrend base={goalListParse.base} list={goalListParse.list} activekey={activekey} /> : null}
                {letBallListParse.base && activekey == 3 ? <GoalOrLetBallTrend base={letBallListParse.base} list={letBallListParse.list} activekey={activekey} /> : null}
            </div>
        )
    }
}


