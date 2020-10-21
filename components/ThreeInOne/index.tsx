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
    threeInOneContentList: any,
    matchId: any,
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
export default class ThreeInOne extends Component<Props, State> {
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
        const { threeInOneContentList } = this.props
        this.setState({
            companyNumbers: threeInOneContentList.length,
        })
    }
    handleChange = (pagination, filters, sorter) => {
        const { threeInOneContentList } = this.props
        let dataList = []
        if (threeInOneContentList) {
            dataList = JSON.parse(threeInOneContentList.content)
        }
        if (filters.companyName == null) {
            this.setState({
                companyNumbers: dataList.length,
            })
        } else {
            this.setState({
                companyNumbers: filters.companyName.length,
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
        const { threeInOneContentList } = this.props
        const { isCheckd } = this.state
        let that = this
        // console.log(threeInOneContentList, 'threeInOneContentList')
        // 获取公司名称数组
        let companyNameArry = threeInOneContentList.map((item, index) => {
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
                align: 'center',
                filters: companyNameArry,
                filtered: true,
                ellipsis: true,
                onFilter: (value, record) => { return record.companyName.indexOf(value) === 0 },
                filterIcon: < DownOutlined />,
            },
            {
                title: '胜负',
                align: 'center',
                ellipsis: true,
                children: [
                    {
                        title: '主胜',
                        dataIndex: 'age1',
                        key: 'age1',
                        ellipsis: true,
                        align: 'center',
                        render(text, rowData) {
                            let startOddsArry = rowData.startOdds.split(',')
                            let endOddsArry = rowData.endOdds.split(',')
                            if (endOddsArry[0] > startOddsArry[0]) {
                                return (
                                    <div className="flex_column ">
                                        {isCheckd ? <div className='flex_row style_center down'>
                                            <div >{that.isNullString(startOddsArry[0])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="redText">{that.isNullString(endOddsArry[0])}</div>
                                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)

                            } else if (endOddsArry[0] == startOddsArry[0]) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div>{that.isNullString(startOddsArry[0])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div >{that.isNullString(endOddsArry[0])}</div>
                                        </div>
                                    </div>)
                            } else {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startOddsArry[0])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="greenText">{that.isNullString(endOddsArry[0])}</div>
                                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)
                            }
                        }
                    },
                    {
                        title: '平',
                        dataIndex: 'age2',
                        key: 'age2',
                        align: 'center',
                        render(text, rowData) {
                            let startOddsArry = rowData.startOdds.split(',')
                            let endOddsArry = rowData.endOdds.split(',')
                            if (endOddsArry[1] > startOddsArry[1]) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startOddsArry[1])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="redText">{that.isNullString(endOddsArry[1])}</div>
                                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)

                            } else if (endOddsArry[1] == startOddsArry[1]) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div>{that.isNullString(startOddsArry[1])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div >{that.isNullString(endOddsArry[1])}</div>
                                        </div>
                                    </div>)
                            } else {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startOddsArry[1])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="greenText">{that.isNullString(endOddsArry[1])}</div>
                                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)
                            }
                        }
                    },
                    {
                        title: '客胜',
                        dataIndex: 'age3',
                        key: 'age3',
                        align: 'center',
                        render(text, rowData) {
                            let startOddsArry = rowData.startOdds.split(',')
                            let endOddsArry = rowData.endOdds.split(',')
                            if (endOddsArry[2] > startOddsArry[2]) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startOddsArry[2])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="redText">{that.isNullString(endOddsArry[2])}</div>
                                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)

                            } else if (endOddsArry[2] == startOddsArry[2]) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div>{that.isNullString(startOddsArry[2])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div >{that.isNullString(endOddsArry[2])}</div>
                                        </div>
                                    </div>)
                            } else {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startOddsArry[2])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="greenText">{that.isNullString(endOddsArry[2])}</div>
                                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)
                            }
                        }
                    },
                ]
            },
            {
                title: '让球',
                children: [
                    {
                        title: '主胜',
                        dataIndex: 'age4',
                        key: 'age4',
                        align: 'center',
                        render(text, rowData) {
                            let startOddsArry = rowData.rangStart.split(',')
                            let endOddsArry = rowData.rangEnd.split(',')
                            if (endOddsArry[0] > startOddsArry[0]) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div>{that.isNullString(startOddsArry[0])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="redText">{that.isNullString(endOddsArry[0])}</div>
                                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)

                            } else if (endOddsArry[0] == startOddsArry[0]) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div>{that.isNullString(startOddsArry[0])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div >{that.isNullString(endOddsArry[0])}</div>
                                        </div>
                                    </div>)
                            } else {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startOddsArry[0])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="greenText">{that.isNullString(endOddsArry[0])}</div>
                                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)
                            }
                        }
                    },
                    {
                        title: '平',
                        dataIndex: 'age5',
                        key: 'age5',
                        align: 'center',
                        render(text, rowData) {
                            let startPK = rowData.startPK
                            let endPK = rowData.endPK
                            if (endPK > startPK) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startPK)}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="redText">{that.isNullString(endPK)}</div>
                                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)

                            } else if (endPK == startPK) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div>{that.isNullString(startPK)}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div >{that.isNullString(endPK)}</div>
                                        </div>
                                    </div>)
                            } else {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startPK)}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="greenText">{that.isNullString(endPK)}</div>
                                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)
                            }
                        }
                    },
                    {
                        title: '客胜',
                        dataIndex: 'age6',
                        key: 'age6',
                        align: 'center',
                        render(text, rowData) {
                            let startOddsArry = rowData.rangStart.split(',')
                            let endOddsArry = rowData.rangEnd.split(',')
                            if (endOddsArry[1] > startOddsArry[1]) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startOddsArry[1])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="redText">{that.isNullString(endOddsArry[2])}</div>
                                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)

                            } else if (endOddsArry[1] == startOddsArry[1]) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div>{that.isNullString(startOddsArry[1])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div >{that.isNullString(endOddsArry[1])}</div>
                                        </div>
                                    </div>)
                            } else {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startOddsArry[1])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="greenText">{that.isNullString(endOddsArry[1])}</div>
                                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)
                            }
                        }
                    },
                ]
            },
            {
                title: '进球数',
                children: [
                    {
                        title: '大球',
                        dataIndex: 'age7',
                        key: 'age7',
                        align: 'center',
                        render(text, rowData) {
                            let startOddsArry = rowData.jinStart.split(',')
                            let endOddsArry = rowData.jinEnd.split(',')
                            if (endOddsArry[0] > startOddsArry[0]) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div>{that.isNullString(startOddsArry[0])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="redText">{that.isNullString(endOddsArry[0])}</div>
                                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)

                            } else if (endOddsArry[0] == startOddsArry[0]) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div>{that.isNullString(startOddsArry[0])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div >{that.isNullString(endOddsArry[0])}</div>
                                        </div>
                                    </div>)
                            } else {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startOddsArry[0])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="greenText">{that.isNullString(endOddsArry[0])}</div>
                                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)
                            }
                        }
                    },
                    {
                        title: '走势',
                        dataIndex: 'age8',
                        key: 'age8',
                        align: 'center',
                        render(text, rowData) {
                            let startPK = rowData.jinStartPK
                            let endPK = rowData.jinEndPK
                            if (endPK > startPK) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startPK)}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="redText">{that.isNullString(endPK)}</div>
                                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)

                            } else if (endPK == startPK) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div>{that.isNullString(startPK)}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div >{that.isNullString(endPK)}</div>
                                        </div>
                                    </div>)
                            } else {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startPK)}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="greenText">{that.isNullString(endPK)}</div>
                                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)
                            }
                        }
                    },
                    {
                        title: '小球',
                        dataIndex: 'age9',
                        key: 'age9',
                        align: 'center',
                        render(text, rowData) {
                            let startOddsArry = rowData.jinStart.split(',')
                            let endOddsArry = rowData.jinEnd.split(',')
                            if (endOddsArry[1] > startOddsArry[1]) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startOddsArry[1])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="redText">{that.isNullString(endOddsArry[2])}</div>
                                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)

                            } else if (endOddsArry[1] == startOddsArry[1]) {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div>{that.isNullString(startOddsArry[1])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div >{that.isNullString(endOddsArry[1])}</div>
                                        </div>
                                    </div>)
                            } else {
                                return (
                                    <div className="flex_column">
                                        {isCheckd ? <div className='flex_row style_center down' >
                                            <div >{that.isNullString(startOddsArry[1])}</div>
                                        </div> : null}
                                        <div className='flex_row style_center top' >
                                            <div className="greenText">{that.isNullString(endOddsArry[1])}</div>
                                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                                        </div>
                                    </div>)
                            }
                        }
                    },
                ]
            },
        ];
    }
    textInfo(textL, numInfo: { number: number, color: string }, textR) {
        return (
            [
                <span> {textL}</span >,
                <span style={{ color: numInfo.color }}>{numInfo.number}</span>,
                <span>{textR}</span>
            ]
        )
    }
    render() {
        let { historyFilter, companyNumbers, isCheckd } = this.state;
        const { threeInOneContentList } = this.props

        return (
            <div >
                {/* 历史交锋 */}
                <div className="data_content">
                    <Card bordered={false}  >
                        <div className="headDiv">
                            <div className="flex_row headText">
                                共[<div className="redText">{companyNumbers}</div>/{threeInOneContentList.length}]间公司
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
                            <Table columns={this.getColums()} dataSource={threeInOneContentList} pagination={false} onChange={this.handleChange} />
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}
