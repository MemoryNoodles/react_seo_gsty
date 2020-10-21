import React, { Component } from 'react'
import { Card, Button, Select, Table, Row, Col, Divider } from "antd"
import Link from 'next/link'
import "./index.less"
import {
    DownOutlined,
} from '@ant-design/icons';
import { any, string } from 'prop-types';
interface Props {
    base: any,
    list: any,
    activekey: any
}
interface State {

}
export default class goalOrLetBallTrend extends Component<Props, State> {
    state = {
    }
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    getColums(): any {
        const { base, list, activekey } = this.props
        let zoushiName = activekey == 1 ? '平局' : '走势'
        // console.log(base, 'baseeeee')
        let homeName = base[0].homeName
        let guestName = base[0].guestName
        // console.log(homeName, 'homeName')
        return [
            {
                title: '时间',
                dataIndex: 'time',
                key: 'time',
                align: 'center',
            },
            {
                title: homeName,
                dataIndex: 'homeName',
                key: 'homeName',
                align: 'center',
                render(text, rowData, index) {
                    let oddsArry = rowData.oods.split(',')
                    let nextArry = []
                    if (index + 1 <= list.length - 1) {
                        nextArry = list[index + 1].oods.split(',')
                    } else {
                        nextArry = oddsArry
                    }
                    if (oddsArry[0] > nextArry[0]) {
                        return <div className='flex_row_AllCenter'>
                            <div className="redText">{oddsArry[0]}</div>
                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                        </div>
                    } else if (oddsArry[0] == nextArry[0]) {
                        return <div className='flex_row_AllCenter'>
                            <div>{oddsArry[0]}</div>
                        </div>
                    } else {
                        return <div className='flex_row_AllCenter'>
                            <div className="greenText">{oddsArry[0]}</div>
                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                        </div>
                    }
                }
            },
            {
                title: zoushiName,
                dataIndex: 'homeName',
                key: 'homeName',
                align: 'center',
                render(text, rowData, index) {
                    let nextPK = []
                    if (index + 1 <= list.length - 1) {
                        nextPK = list[index + 1].pk
                    } else {
                        nextPK = rowData.nextPK
                    }
                    if (rowData.pk > nextPK) {
                        return <div className='flex_row_AllCenter'>
                            <div className="redText">{rowData.pk}</div>
                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                        </div>
                    } else if (rowData.pk == nextPK) {
                        return <div className='flex_row_AllCenter'>
                            <div>{rowData.pk}</div>
                        </div>
                    } else {
                        return <div className='flex_row_AllCenter'>
                            <div className="greenText">{rowData.pk}</div>
                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                        </div>
                    }
                }
            },
            {
                title: guestName,
                dataIndex: 'homeName',
                key: 'homeName',
                align: 'center',
                render(text, rowData, index) {
                    let oddsArry = rowData.oods.split(',')
                    let nextArry = []
                    if (index + 1 <= list.length - 1) {
                        nextArry = list[index + 1].oods.split(',')
                    } else {
                        nextArry = oddsArry
                    }
                    if (oddsArry[1] > nextArry[1]) {
                        return <div className='flex_row_AllCenter'>
                            <div className="redText">{oddsArry[1]}</div>
                            <img src={'../../static/image/top.png'} alt="" className="iconImg" />
                        </div>
                    } else if (oddsArry[1] == nextArry[1]) {
                        return <div className='flex_row_AllCenter'>
                            <div>{oddsArry[1]}</div>
                        </div>
                    } else {
                        return <div className='flex_row_AllCenter'>
                            <div className="greenText">{oddsArry[1]}</div>
                            <img src={'../../static/image/down.png'} alt="" className="iconImg" />
                        </div>
                    }
                }
            },

        ];
    }
    render() {
        // let {  } = this.state;
        // const { goalsList, } = this.props
        const { base, list } = this.props
        // console.log(list, 'listssss')
        // console.log(base, 'base')
        // let dataList = []
        // if (goalsList) {
        //     dataList = JSON.parse(goalsList.content)
        // }
        let dayu = '>'
        let xiaoyu = '<'
        return (
            <div className="data_content" style={{ marginTop: '20px' }}>
                {/* 走势图table */}
                <Card bordered={false}  >
                    <div className="left-title" style={{ marginTop: "20px", marginBottom: "30px", }}>球队阵容</div>
                    <div className="flex_row" style={{ marginBottom: '20px', alignItems: 'center' }}>
                        <div className="flex_row_center" style={{ marginRight: '65px' }}>
                            <div className="colorBlock lightColor" style={{ marginRight: '5px' }}></div>
                                据开赛{dayu}12小时
                        </div>
                        <div className="flex_row_center" style={{ marginRight: '65px' }}>
                            <div className="colorBlock deepColor" style={{ marginRight: '5px' }}></div>
                                据开赛{xiaoyu}12小时
                        </div>
                        <div className="flex_row_center">
                            赛中走势
                             <div className="redBall"></div>
                            走势变化
                             <div className="blueBall"></div>
                            水位变化
                        </div>
                    </div>
                    {/* 表格 */}
                    {list.length > 0 ? <Table columns={this.getColums()} dataSource={list} pagination={false} /> : null}
                </Card>
            </div>

        )
    }
}
