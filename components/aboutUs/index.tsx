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
}
interface State {
}

export default class AboutUs extends Component<Props, State> {
    state = {}
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{ marginLeft: '20px', marginRight: '20px' }}>
                <div className="left-title" style={{ marginTop: "20px", marginBottom: "36px", }}>关于本站</div>
                <div className="firstContent">
                    光速体育（www.leisu.com）是一家专业提供体育赛事比分直播、走势、走势分析的综合型体育数据平台，平台由上海炫体信息科技有限公司主办，以服务体育群体为宗旨，为彩民打造最详细、最专业的赛事讯息聚合交流平台，并为专业的体育机构提供数据和资讯服务。
                </div>
                <div className="twoContent">
                    光速体育将致力于国内体育产业的健康发展，不断提升自身服务水平，努力成为中国最好的体育数据平台，为振兴国内体育事业贡献一份力量。
                </div>
                <div className="threeContent">
                    光速体育为您提供。
                </div>
                <div className="fourContent">
                    快速、稳定的即时比分服务；
                </div>
                <div className="fourContent">
                    专业、全面的数据分析和赛事推荐；
                </div>
                <div className="fourContent">
                    真实、及时的赛事资讯和比赛情报；
                </div>
                <div className="fourContent">
                    详细、完善的赛事、球队、球员数据资料。
                </div>
            </div>
        )
    }
}
