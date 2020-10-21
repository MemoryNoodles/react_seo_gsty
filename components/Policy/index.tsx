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

export default class Policy extends Component<Props, State> {
    state = {}
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{ marginLeft: '20px', marginRight: '20px' }}>
                <div className="left-title" style={{ marginTop: "20px", marginBottom: "30px", }}>隐私政策</div>
                <div className="firstContent"> 我们重视用户的隐私，球探体育是一款提供体育资讯数据服务类的产品，为说明您在使用我们产品时会有可能使用或储存您的个人信息，我们将通过本指引向您阐述相关事宜。 </div>
                <div className="title">一、我们收集的信息</div>
                <div className="firstContent">
                    &emsp;&emsp;在您使用球探服务过程中，我们会按照如下方式记录您在使用服务时主动提供或因为使用服务而产生的信息，用以向您提供服务、优化我们的服务以及保障您的账号安全。。<br />
                    1. 当您注册球探用户服务时，我们会验证您的昵称、头像、手机号码有效性，这些信息是为了帮助您完成球探用户注册，保护您的账号安全。手机号码信息是为满足法律法规的网络实名制要求。<br />
                    2. 当您需要发表照片、评论、点赞等操作时，我们可能会您授权储存权限，发表的信息会储存在我们的服务器中，储存是实现这一功能所必需的，我们会以加密的方式储存您的隐私内容。。<br />
                    3. 为了您的资金及账户安全当您需要充值时，我们会把您的银行卡类型及账号、姓名、身份证、银行预留电话信息提交到第三方支付进行验证正确性。拒绝提供将不能完成充值，但不影响您使用其他功能服务。
                </div>
                <div className="title">二、信息的储存</div>
                <div className="firstContent">
                    1. 储存的地点 <br />
                    1.1 我们会按照法律法规规定，将境内收集的用户个人信息储存于中国境内。 <br />
                    2.信息储存的期限 <br />
                    2.1 手机号码： 若您需要使用球探服务，我们将一直保存您的手机号码，以保证您正常使用该功能与服务，当您注销球探账号后，我们也将删除相应的信息。<br />
                    2.2 当您发送了内容，我们需要进行信息保存，以保证您正常使用，当您删除内容后，我们也将删除相应的信息。 当我们的产品或服务停止运营的情况时，我们将会以推送通知、站内信等形式告知您，并在一个合理的期间内删除您的个人信息。 <br />
                </div>
                <div className="title">三、退款说明</div>
                <div className="firstContent">
                    为展示您账户的订单信息及保障您的售后权益，我们会收集您在使用球探产品过程中产生的订单信息、交易和消费记录、虚拟财产信息（例如虚拟货币）用于向您展示及便于您对订单进行管理。如发生交易退费情形的，我们可能会要求您提供您的交易信息，包括银行卡信息、账号名称、订单信息用于为您处理退费请求。
                </div>
            </div>
        )
    }
}
