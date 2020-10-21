import React, { Component, ReactNode } from 'react';
import { Table, Tag, Space } from 'antd';
import { withRouter } from 'next/router';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './index.less';
import Link from 'next/link';
import moment from 'moment';
interface HeadProps {
  data: Array<object>;
}
class InstantGame extends Component<any, HeadProps> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount() {
        const {futureMatchList} = this.props
        this.setState({data:futureMatchList});
    }
    getData() {
        const { data } = this.state
        const newdata = []
        data.map((item,index)=>{
            // newdata.map((item2,index2)=>{
            //     if(item.id === item2.)
            // })
            console.log(item,'879')
            console.log(index,'9999')
        })
        this.setState({ data: data })
    }
    getAddOrReduceType(params) {
        if(params === 1) {
            return <ArrowDownOutlined className="down-reduce"/>
        } else if (params === 2) {
            return  <ArrowUpOutlined className="up-add"/>
        }
    }
    getColums():any {
        return [
            {
                title: '赛事',
                dataIndex: 'leagueName',
                key: 'leagueName',
                align: 'center',
                render: (text, record) => <div>
                                      <img
                          className="league-head"
                          src={record.leagueLogo || '/static/image/defaultTeam.png'}
                          alt={text}
                          title={text}
                          onError={e => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/static/image/defaultTeam.png';
                          }}
                        />
                        <a
                          href={`/league-${record.currentQuarterId}`}
                          title={text}
                          target="_blank"
                        >
                          {text}
                        </a>
                </div>,
            },
            {
                title: '轮次',
                dataIndex: 'groupName',
                key: 'groupName',
                align: 'center',
            },
            {
                title: '比赛时间',
                dataIndex: 'forecastStartTime',
                key: 'forecastStartTime',
                align: 'center',
            },
            {
                title: '主场球队',
                key: 'homeName',
                dataIndex: 'homeName',
                align: 'center',
                render(text: any, rowData: any) {
                    return (
                        <a href={`/team-${rowData.homeId}`} title={text} target="_blank">
                        {text}
                        </a>
                    );
                },
            },
            {
                title: '比分',
                key: 'score',
                dataIndex: 'score',
                align: 'center',
                render(text, rowData) {
                    return '-';
                }
            },
            {
                title: '客场球队',
                key: 'guestName',
                dataIndex: 'guestName',
                align: 'center',
                render(text: any, rowData: any) {
                  return (
                    <a href={`/team-${rowData.guestId}`} title={text} target="_blank">
                      {text}
                    </a>
                  );
                },
            },
            {
                title: '',
                dataIndex: 'key',
                key: 'key',
                align: 'center',
                render: (text, record) => <div className="live-status">
                    <img src="../../static/image/live.png" alt=""/>
                </div>,
            },
            {
                title: '让球',
                key: 'asiaNumber',
                dataIndex: 'asiaNumber',
                align: 'center',
                render: (text, record) => <div>
                    {text}
                </div>,
            },
            {
                title: '技术统计',
                key: 'dataCenter',
                dataIndex: 'name',
                align: 'center',
                render: (text: any, record: { dataId: any }) => <div>
                    <Link
                        href={`/matchDetail?${record.dataId}`}
                        as={`/matchDetail-${record.dataId}`}
                    >
                        <a className="data-center-style">数据分析</a>
                    </Link>
                    <a onClick={() => this.getData()}>走势</a>
                </div>,
            },
            {
                title: '关注',
                key: 'movements',
                dataIndex: 'movements',
                align: 'center',
                render: (text, record) => <div className="red">
                    ⭐
                </div>,
            },
        ];
    }
    render(): ReactNode {
        const { showEvent,searchContent } = this.props
        const { data } = this.state;
        return <div className="header-content">
            <Table 
                columns={this.getColums()} 
                dataSource={[...data]} 
                pagination={false}
                rowClassName={(record: any, index) => {
                    const isSearch = (record.leagueName.indexOf(searchContent) != -1 || record.guestName.indexOf(searchContent) != -1 || record.homeName.indexOf(searchContent) != -1)
                    if (showEvent.length > 0) {
                        const flag = showEvent.some(item => record.leagueId == item)
                        return flag && isSearch ? "" : "row-hide"
                    } else {
                        if (searchContent) {
                            return isSearch ? "" : "row-hide"
                        } 
                        if(typeof showEvent != 'string') {
                            return 'row-hide'
                        }
                        return ''
                    }
                }}
            />
        </div>
    }
  }

export default withRouter(InstantGame);
  