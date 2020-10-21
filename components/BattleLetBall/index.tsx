import React, { Component } from 'react'
import { Card, Button, Select, Table, Row, Col, Divider } from "antd"
const { Option } = Select;
import Link from 'next/link'
import "./index.less"
import {
    DownOutlined,
} from '@ant-design/icons';
import { any, string } from 'prop-types';

interface Props {
    letBallList: any,
    matchId: any,
}
interface State {
    historyFilter: {
        radioChecks: Array<object>,
        checkboxs: {
            fileds: { name: string }[],
            games: { name: string }[]
        }
    },
    companyNumber: number,
}

export default class BattleLetBall extends Component<Props, State> {
    state = {
        historyFilter: {
            radioChecks: [
                {
                    name: "全部赛事",
                    active: true,
                    value: "all"
                },
                {
                    name: "主客相同",
                    active: false,
                    value: "dd"
                }
            ],
            checkboxs: {
                fileds: [
                    {
                        name: "5场"
                    }
                ],
                games: [
                    {
                        name: "球会友谊",

                    },
                    {
                        name: "越南联"
                    }
                ]
            }
        },
        companyNumber: 0,

    }
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { letBallList } = this.props
        let dataList = []
        if (letBallList) {
            dataList = JSON.parse(letBallList.content)
        }
        this.setState({
            companyNumber: dataList.length,
        })
    }
    handleChange = (pagination, filters, sorter) => {
        const { letBallList } = this.props
        let dataList = []
        if (letBallList) {
            dataList = JSON.parse(letBallList.content)
        }
        if (filters.companyName == null) {
            this.setState({
                companyNumber: dataList.length,
            })
        } else {
            this.setState({
                companyNumber: filters.companyName.length,
            })
        }

    };
    /* 历史交锋 */
    getColums(): any {
        const { letBallList, matchId } = this.props
        let dataList = []
        if (letBallList) {
            dataList = JSON.parse(letBallList.content)
        }
        let companyNameArry = dataList.map((item, index) => {
            return {
                text: item.companyName,
                value: item.companyName,
            }
        })
        return [
            {
                title: '全部公司',
                dataIndex: 'companyName',
                key: 'companyName',
                filters: companyNameArry,
                align: 'center',
                filtered: true,
                onFilter: (value, record) => { return record.companyName.indexOf(value) === 0 },
                filterIcon: < DownOutlined />,
            },
            {
                title: '主队',
                dataIndex: 'status',
                key: 'status',
                align: 'center',
                render(text, rowData) {
                    let startOddsArry = rowData.startOdds.split(',')
                    let endOddsArry = rowData.endOdds.split(',')
                    if (endOddsArry[0] > startOddsArry[0]) {
                        return <div className='flex_row_center'>
                            <div className="redText">{endOddsArry[0]}</div>
                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                        </div>
                    } else if (endOddsArry[0] == startOddsArry[0]) {
                        return <div className='flex_row_center'>
                            <div>{endOddsArry[0]}</div>
                        </div>
                    } else {
                        return <div className='flex_row_center'>
                            <div className="greenText">{endOddsArry[0]}</div>
                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                        </div>
                    }
                }
            },
            {
                title: '即时',
                dataIndex: 'instant',
                key: 'instant',
                align: 'center',
                render(text, rowData) {
                    if (rowData.endPK > rowData.startPK) {
                        return <div className="redText">{rowData.endPK}</div>
                    } else if (rowData.endPK == rowData.startPK) {
                        return <div >{rowData.endPK}</div>
                    } else {
                        return <div className="greenText">{rowData.endPK}</div>
                    }
                }
            },
            {
                title: '客队',
                key: 'homeTeam',
                dataIndex: 'homeTeam',
                align: 'center',
                render(text, rowData) {
                    let startOddsArry = rowData.startOdds.split(',')
                    let endOddsArry = rowData.endOdds.split(',')
                    if (endOddsArry[1] > startOddsArry[1]) {
                        return <div className='flex_row_center'>
                            <div className="redText">{endOddsArry[1]}</div>
                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                        </div>
                    } else if (endOddsArry[1] == startOddsArry[1]) {
                        return <div className='flex_row_center'>
                            <div>{endOddsArry[1]}</div>
                        </div>
                    } else {
                        return <div className='flex_row_center'>
                            <div className="greenText">{endOddsArry[1]}</div>
                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                        </div>
                    }
                }
            },
            {
                title: '主队',
                key: 'halfScore',
                dataIndex: 'halfScore',
                align: 'center',
                render(text, rowData) {
                    let startOddsArry = rowData.startOdds.split(',')
                    return <div className='flex_row_center'>
                        <div>{startOddsArry[0]}</div>
                    </div>
                }
            },
            {
                title: '初始',
                dataIndex: 'cornerScore',
                key: 'cornerScore',
                align: 'center',
                render(text, rowData) {
                    return <div className='flex_row_center'>
                        <div>{rowData.startPK}</div>
                    </div>
                }
            },
            {
                title: '客队',
                dataIndex: 'key',
                key: 'key',
                align: 'center',
                render(text, rowData) {
                    let startOddsArry = rowData.startOdds.split(',')
                    return <div className='flex_row_center'>
                        <div>{startOddsArry[1]}</div>
                    </div>
                }
            },
            {
                title: '变化时间',
                key: 'changeTime',
                dataIndex: 'changeTime',
                align: 'center',
            },
            {
                title: '查看',
                key: 'movements',
                dataIndex: 'movements',
                align: 'center',
                render(text, rowData) {
                    return (
                        <Link
                            href={`/trend-${rowData.companyId}&${matchId}`}
                        >
                            <a>
                                <img src={'../../static/image/toView.png'} alt="" className="toViewImg" />
                            </a>
                        </Link>
                    )
                }
            },
        ];
    }
    textInfo(textL, numInfo: { number: number, color: string }, textR) {
        return (
            [
                <span>{textL}</span>,
                <span style={{ color: numInfo.color }}>{numInfo.number}</span>,
                <span>{textR}</span>
            ]
        )
    }
    render() {
        let { historyFilter, companyNumber } = this.state;
        const { letBallList } = this.props
        let dataList = []
        if (letBallList) {
            dataList = JSON.parse(letBallList.content)
        }
        return (
            <div >
                {/* 历史交锋 */}
                <div className="data_content">
                    <Card bordered={false}  >
                        <div className="headDiv">
                            <div className="flex_row headText">
                                共[<div className="redText">{companyNumber}</div>/{dataList.length}]间公司
                            </div>
                            <div className="flex_row">
                                <div className="flex_row_center">
                                    <div className="redBall"></div> 上升
                                </div>
                                <div className="flex_row_center ">
                                    <div className="greenBall"></div> 下降
                                </div>
                            </div>
                        </div>
                        <div>
                            <Table columns={this.getColums()} dataSource={dataList} pagination={false} onChange={this.handleChange} />
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}
