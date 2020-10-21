import React, { Component, ReactNode } from 'react';
import { Table, Tag, Space } from 'antd';
import { withRouter } from 'next/router';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './index.less';
import moment from 'moment';
interface HeadProps {
    data: Array<object>,
    isChange: boolean
}
class InstantGame extends Component<any, HeadProps> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isChange: true,
        };
    }
    componentDidMount() {
        const { finishMatch } = this.props
        this.setState({ data: finishMatch })
    }
    getData() {
        const { data } = this.state
        const newdata = []
        data.map((item, index) => {
            // newdata.map((item2,index2)=>{
            //     if(item.id === item2.)
            // })
            console.log(item, '879')
            console.log(index, '9999')
        })
        this.setState({ data: data })
    }
    getAddOrReduceType(params) {
        if (params === 1) {
            return <ArrowDownOutlined className="down-reduce" />
        } else if (params === 2) {
            return <ArrowUpOutlined className="up-add" />
        }
    }
    getColor(params, index) {
        params = Number(params)
        if (index === 1) {
            switch (params) {
                case 1:
                    return 'red'
                    break;
                case 2:
                    return 'blue'
                    break;
                case 3:
                    return 'green'
                    break;
                default:
                    break;
            }
        } else {
            switch (params) {
                case 1:
                    return 'red'
                    break;
                case 2:
                    return 'green'
                    break;
                case 3:
                    return 'blue'
                    break;
                default:
                    break;
            }
        }
    }
    getColums():any {
        const { isChange } = this.state
        return [
            {
                title: '赛事',
                dataIndex: 'leagueName',
                key: 'leagueName',
                width: '10%',
                align: 'center',
                render: (
                    text: string,
                    record: { leagueLogo: string; currentQuarterId: number },
                  ) => (
                      <div>
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
                      </div>
                    ),
            },
            {
                title: '轮次',
                dataIndex: 'groupName',
                key: 'groupName',
                width: '10%',
                align: 'center',
            },
            {
                title: '时间',
                dataIndex: 'forecastStartTime',
                key: 'forecastStartTime',
                align: 'center',
                render: (text, record) => <div>
                    {moment(text).format('MM/DD')}
                </div>,
            },
            {
                title: '状态',
                dataIndex: 'currentTime',
                key: 'currentTime',
                width: '6%',
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
                key: 'scoreAll',
                dataIndex: 'scoreAll',
                width: '6%',
                align: 'center',
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
                title: '半场',
                key: 'scoreHalf',
                dataIndex: 'scoreHalf',
                width: '6%',
                align: 'center',
            },
            {
                title: '角球',
                dataIndex: 'cornerRatio',
                key: 'cornerRatio',
                width: '6%',
                align: 'center',
            },
            {
                title: '胜负',
                dataIndex: 'SPF',
                key: 'SPF',
                width: '6%',
                align: 'center',
                render: (text, record) => <div className={this.getColor(text, 1)}>
                    {['胜', '平', '负'][text - 1]}
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
                title: '进球数',
                key: 'big',
                dataIndex: 'big',
                width: '7%',
                align: 'center',
                render: (text, record) => <div className={this.getColor(text, 2)}>
                    {['大', '小', '走'][text - 1]}
                </div>,
            },
            {
                title: '技术统计',
                key: 'dataCenter',
                dataIndex: 'name',
                width: '13%',
                align: 'center',
                render: (text, record) => <div>
                    <a className="data-center-style">数据分析</a>
                    <a onClick={() => this.getData()}>走势</a>
                </div>,
            },
        ];
    }
    render(): ReactNode {
        const { showEvent,searchContent } = this.props
        const { data } = this.state;
        return <div className="header-content tab-content">
            <Table
                columns={this.getColums()}
                dataSource={[...data]} pagination={false}
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
