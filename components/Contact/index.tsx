import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
import { Card, Button, Select, Table, Row, Col, Divider } from "antd"
import { Map } from 'react-amap';
const { Option } = Select;
import Link from 'next/link'
import "./index.less"
import {
    DownOutlined,
} from '@ant-design/icons';
import { any, string } from 'prop-types';
{/* <script type="text/javascript" src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=XP7YUAHE7LohQZXLzPGICmXNSRFeEwIN"></script> */ }

interface Props { }
interface State { }

const center = { longitude: 104.055553, latitude: 30.58710 }
export default class Contact extends Component<Props, State> {
    state = {}
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{ marginLeft: '20px', marginRight: '20px' }}>
                <div className="left-title" style={{ marginTop: "20px", marginBottom: "30px", }}>联系我们</div>
                <div id="allmap" style={{ width: '100%', height: '200px', }}>
                    <Map amapkey={'b77bd89aa2ec6e600d19bcdd5d8e3fb5'} center={center} zoom={100} />
                </div>
                <div className="firstContent" style={{ marginTop: '20px' }}>
                    用户服务：service@leisu.com <br />
                    市场、合作邮箱：hezuo@leisu.com<br />
                     客服QQ：800830816（周一至周日 09:30 - 22:00） <br />
                     联系电话：400-100-1876（工作日上午10:00-12:00 下午2:00-4:00） <br />
                     联系地址：上海市闵行区新龙路62号21幢<br />
                </div>
            </div>
        )
    }
}
