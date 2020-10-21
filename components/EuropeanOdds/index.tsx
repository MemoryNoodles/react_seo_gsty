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
    europeanOddsList: any,
    matchId: any
}
interface State {
    historyFilter: {
        radioChecks: Array<object>,
        checkboxs: {
            fileds: { name: string }[],
            games: { name: string }[]
        },
    },
    companyNumbers: number,
    isCheckd: boolean,
}
export default class EuropeanOdds extends Component<Props, State> {
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
        companyNumbers: 0,
        isCheckd: true,
    }
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { europeanOddsList } = this.props
        let dataList = []
        if (europeanOddsList) {
            dataList = JSON.parse(europeanOddsList.content)
        }
        this.setState({
            companyNumbers: dataList.length,
        })
    }
    handleChange = (pagination, filters, sorter) => {
        const { europeanOddsList } = this.props
        let dataList = []
        if (europeanOddsList) {
            dataList = JSON.parse(europeanOddsList.content)
        }
        // console.log(dataList[0])

        if (filters.companyName == null) {
            this.setState({
                companyNumbers: dataList.length,
            })
        } else {
            this.setState({
                companyNumbers: filters.companyName ? filters.companyName.length : 0,
            })
        }

    };
    isNullString(str) {
        if (str == '' || str == null || str == 'null') {
            return '-'
        } else {
            return str
        }
    }
    /* 历史交锋 */
    getColums(): any {
        const { europeanOddsList, matchId } = this.props
        const { isCheckd } = this.state
        let that = this
        // console.log(europeanOddsList, 'europeanOddsList')
        let dataList = []
        if (europeanOddsList) {
            dataList = JSON.parse(europeanOddsList.content)
        }
        // 获取公司名称数组
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
                filtered: true,
                align: 'center',
                onFilter: (value, record) => {
                    // console.log(value, 'value')
                    return record.companyName.indexOf(value) === 0
                },
                filterIcon: < DownOutlined />,
                // onFilterDropdownVisibleChange: (visible) => console.log(visible, 'visible')
            },
            {
                title: '主胜',
                dataIndex: 'status',
                key: 'status',
                align: 'center',
                render(text, rowData) {
                    let startOddsArry = rowData.startOdds.split(',')
                    let endOddsArry = rowData.endOdds.split(',')
                    if (endOddsArry[0] > startOddsArry[0]) {
                        return (
                            <div className="flex_column">
                                {isCheckd ? <div className='flex_row style_center down' >
                                    <div>{startOddsArry[0]}</div>
                                </div> : null}
                                <div className='flex_row style_center top' >
                                    <div className="redText">{endOddsArry[0]}</div>
                                    <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                                </div>
                            </div>)

                    } else if (endOddsArry[0] == startOddsArry[0]) {
                        return (
                            <div className="flex_column">
                                {isCheckd ? <div className='flex_row style_center down' >
                                    <div>{startOddsArry[0]}</div>
                                </div> : null}
                                <div className='flex_row style_center top' >
                                    <div >{endOddsArry[0]}</div>
                                </div>
                            </div>)
                    } else {
                        return (
                            <div className="flex_column">
                                {isCheckd ? <div className='flex_row style_center down' >
                                    <div >{startOddsArry[0]}</div>
                                </div> : null}
                                <div className='flex_row style_center top' >
                                    <div className="greenText">{endOddsArry[0]}</div>
                                    <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                                </div>
                            </div>)
                    }
                }
            },
            {
                title: '和',
                dataIndex: 'instant',
                align: 'center',
                key: 'instant',
                render(text, rowData) {
                    let startOddsArry = rowData.startOdds.split(',')
                    let endOddsArry = rowData.endOdds.split(',')
                    if (endOddsArry[1] > startOddsArry[1]) {
                        return (
                            <div className="flex_column">
                                {isCheckd ? <div className='flex_row style_center down' >
                                    <div >{startOddsArry[1]}</div>
                                </div> : null}
                                <div className='flex_row style_center top' >
                                    <div className="redText">{endOddsArry[1]}</div>
                                    <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                                </div>
                            </div>)

                    } else if (endOddsArry[1] == startOddsArry[1]) {
                        return (
                            <div className="flex_column">
                                {isCheckd ? <div className='flex_row style_center down' >
                                    <div>{startOddsArry[1]}</div>
                                </div> : null}
                                <div className='flex_row style_center top' >
                                    <div >{endOddsArry[1]}</div>
                                </div>
                            </div>)
                    } else {
                        return (
                            <div className="flex_column">
                                {isCheckd ? <div className='flex_row style_center down' >
                                    <div >{startOddsArry[1]}</div>
                                </div> : null}
                                <div className='flex_row style_center top' >
                                    <div className="greenText">{endOddsArry[1]}</div>
                                    <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                                </div>
                            </div>)
                    }
                }
            },
            {
                title: '客胜',
                key: 'homeTeam',
                dataIndex: 'homeTeam',
                align: 'center',
                render(text, rowData) {
                    let startOddsArry = rowData.startOdds.split(',')
                    let endOddsArry = rowData.endOdds.split(',')
                    if (endOddsArry[2] > startOddsArry[2]) {
                        return (
                            <div className="flex_column">
                                {isCheckd ? <div className='flex_row style_center down' >
                                    <div >
                                        {that.isNullString(startOddsArry[2])}
                                    </div>
                                </div> : null}
                                <div className='flex_row style_center top' >
                                    <div className="redText">
                                        {that.isNullString(endOddsArry[2])}
                                    </div>
                                    <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                                </div>
                            </div>)

                    } else if (endOddsArry[2] == startOddsArry[2]) {
                        return (
                            <div className="flex_column ">
                                {isCheckd ? <div className='flex_row style_center down' >
                                    <div className="style_AllCenter">
                                        {that.isNullString(startOddsArry[2])}
                                    </div>
                                </div> : null}
                                <div className='flex_row style_center top' >
                                    <div className="style_AllCenter">
                                        {that.isNullString(endOddsArry[2])}
                                    </div>
                                </div>
                            </div>)
                    } else {
                        return (
                            <div className="flex_column">
                                {isCheckd ? <div className='flex_row style_center down' >
                                    <div >
                                        {that.isNullString(startOddsArry[2])}
                                    </div>
                                </div> : null}
                                <div className='flex_row style_center top' >
                                    <div className="greenText">
                                        {that.isNullString(endOddsArry[2])}
                                    </div>
                                    <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                                </div>
                            </div>)
                    }
                }
            },
            {
                title: '返还率',
                key: 'halfScore',
                dataIndex: 'halfScore',
                align: 'center',
                render(text, rowData) {
                    // console.log(rowData, 'rowData')
                    let statRateArry = rowData.statRate.split(',')
                    let endRateArry = rowData.endRate.split(',')
                    return <div className='flex_column'>
                        {isCheckd ? <div className="down">
                            {that.isNullString(statRateArry[0])}
                        </div> : null}
                        <div className="top">
                            {that.isNullString(endRateArry[0])}
                        </div>
                    </div>
                }
            },
            {
                title: '主胜率',
                dataIndex: 'cornerScore',
                key: 'cornerScore',
                align: 'center',
                render(text, rowData) {
                    let statRateArry = rowData.statRate.split(',')
                    let endRateArry = rowData.endRate.split(',')
                    return <div className='flex_column'>
                        {isCheckd ? <div className="down">
                            {that.isNullString(statRateArry[1])}
                        </div> : null}
                        <div className="top">
                            {that.isNullString(endRateArry[1])}
                        </div>
                    </div>
                }
            },
            {
                title: '和率',
                dataIndex: 'key',
                key: 'key',
                align: 'center',
                render(text, rowData) {
                    let statRateArry = rowData.statRate.split(',')
                    let endRateArry = rowData.endRate.split(',')
                    return <div className='flex_column'>
                        {isCheckd ? <div className="down">
                            {that.isNullString(statRateArry[2])}
                        </div> : null}
                        <div className="top">
                            {that.isNullString(endRateArry[2])}
                        </div>
                    </div>
                }
            },
            {
                title: '客胜率',
                key: 'changeTime',
                dataIndex: 'changeTime',
                align: 'center',
                render(text, rowData) {
                    let statRateArry = rowData.statRate.split(',')
                    let endRateArry = rowData.endRate.split(',')
                    return <div className='flex_column'>
                        {isCheckd ? <div className="down">
                            {that.isNullString(statRateArry[3])}
                        </div> : null}
                        <div className="top">
                            {that.isNullString(endRateArry[3])}
                        </div>
                    </div>
                }
            },
            {
                title: '凯利走势',
                key: 'changeTimes',
                dataIndex: 'changeTimes',
                align: 'center',
                render(text, rowData) {
                    let startKLArry = rowData.startKL.split(',')
                    let endKLArry = rowData.endKL.split(',')
                    return <div className='flex_column style_AllCenter'>
                        {isCheckd ? <div className="flex_row down ">
                            <div>
                                {that.isNullString(startKLArry[0])}
                            </div>
                            <div className="KL">
                                {that.isNullString(startKLArry[1])}
                            </div>
                            <div>
                                {that.isNullString(startKLArry[2])}
                            </div>
                        </div> : null}
                        <div className="flex_row top">
                            <div>
                                {that.isNullString(endKLArry[0])}
                            </div>
                            <div className="KL">
                                {that.isNullString(endKLArry[1])}
                            </div>
                            <div>
                                {that.isNullString(endKLArry[2])}
                            </div>
                        </div>
                    </div>
                }
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
        let { historyFilter, companyNumbers, isCheckd } = this.state;
        const { europeanOddsList } = this.props
        let dataList = []
        if (europeanOddsList) {
            dataList = JSON.parse(europeanOddsList.content)
        }
        // console.log('欧赔', dataList)
        return (
            <div >
                {/* 历史交锋 */}
                <div className="data_content">
                    <Card bordered={false}  >
                        <div className="headDiv">
                            <div className="flex_row headText">
                                共[<div className="redText">{companyNumbers}</div>/{dataList.length}]间公司
                                <div className="checkoutView">
                                    {isCheckd ? <img src={'../../static/image/checkout.png'} alt="" className="checkoutImg" onClick={() => this.setState({ isCheckd: !isCheckd })} /> : <div className="uncheckdView" onClick={() => this.setState({ isCheckd: !isCheckd })}></div>}
                                    <div className="checkoutViewText">
                                        是否显示初指
                                    </div>
                                </div>
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
