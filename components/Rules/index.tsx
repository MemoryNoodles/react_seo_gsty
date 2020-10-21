import React, { Component } from 'react'
import { Card, Button, Select, Table, Row, Col, Divider } from "antd"
const { Option } = Select;
import Link from 'next/link'
import "./index.less"
import {
    DownOutlined,
} from '@ant-design/icons';
import { any, string } from 'prop-types';

interface Props { }
interface State { }

export default class Rules extends Component<Props, State> {
    state = {}
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{ marginLeft: '20px', marginRight: '20px' }}>
                <div className="left-title" style={{ marginTop: "20px", marginBottom: "30px", }}>用户守则</div>
                <div className="firstContent">
                    光速体育的各项互联网以及通信服务的所有权及经营运作权归其所属公司所有。光速体育敬请您在每次登录网站时阅读本条款。光速体育提供的服务将完全按照其发布的章程、服务条款和操作规则严格执行，用户必须完全同意接受所有服务条款并完成注册程序，才能成为光速体育的注册用户，而且，当用户使用某一或若干光速体育提供的服务时，您和本网站应受针对并适用于该服务且已发布的相应的指引和规定的约束。
                </div>
                <div className="title" style={{ marginTop: '20px' }}>一、相关定义</div>
                <div className="firstContent">
                    （1）用户：指在leisu.com注册登记，并得到leisu.com在线认可，有资格享受leisu.com服务的注册用户，包括通过leisu.com的合作账户（如QQ、微信、新浪微博等）进行登陆的用户。 <br />
                    （2）用户资料：指用户提供的个人信息，包括但不限于：用户名、注册账户密码、银行卡帐号及密码、用户真实姓名、身份证号码等。 <br />
                    （3）账户管理权：用户有权随时查询用户资料，并可对用户名、用户真实姓名、身份证号码以外的信息进行修改。 <br />
                    （4）免费使用权。用户有权免费使用leisu.com的数据系统以及免费获得体育、彩票资讯。 另外，光速体育不能公开用户的姓名、住址、邮政地址、电子邮箱、账号。除非得到用户授权向第三方透露其注册资料，包括： <br />
                    (1)用户要求光速体育或授权某人通过电子邮件服务透露这些信息。<br />
                    (2)相应的法律、法规要求及程序服务需要光速体育提供用户的个人资料。 如果用户提供的资料不准确，不真实，不合法有效，光速体育保留结束用户使用光速体育各项服务的权利。 用户在享用光速体育各项服务的同时，同意接受光速体育提供的各类信息服务。 <br />
                </div>
                <div className="title" style={{ marginTop: '20px' }}> 二、服务的修订和新增</div>
                <div className="firstContent" style={{ marginBottom: '20px' }}>
                    光速体育有权在必要时修改服务条款，服务条款一旦发生变动，将会在重要页面上提示修改内容。如果不同意所改动的内容，用户可以主动取消获得的服务。如果用户继续享用服务，则视为接受服务条款的变动。 光速体育将不时提供其它服务，而这些其它服务可能是受不同的服务条款和条件约束的，若新服务未发布服务条款和条件时，则适用于本条款，其未尽事宜，光速体育拥有最终解释权利。
                </div>
            </div>
        )
    }
}
