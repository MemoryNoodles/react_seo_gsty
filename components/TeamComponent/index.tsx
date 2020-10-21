import React, { Component, ReactNode } from 'react';
import './index.less';
import { Select, Button, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import Item from 'antd/lib/list/Item';
import apiFun from '../../api/apiFun';
const { Option } = Select;
interface Props {
  teamBaseList: any;
  teamMatchList: any;
  teamBattleList: any;
}
interface State {
  leagueId: string | number;
  homeGuestType: string | number;
  isAll: boolean;
}

export default class TeamComponent extends Component<Props, State> {
  leagueList: any[];
  constructor(props: any) {
    super(props);
    const { teamMatchList = [] } = this.props;

    this.leagueList = this.initLeagueList(teamMatchList);

    this.state = {
      leagueId: '',
      homeGuestType: '',
      isAll: true,
    };
  }

  initLeagueList = (teamMatchList: any[]) => {
    const leagueList = [];
    teamMatchList.map((item: { leagueId: any; leagueName: any }) => {
      const flag = leagueList.some(
        subItem => subItem.leagueId == item.leagueId,
      );
      if (!flag) {
        leagueList.push({
          leagueId: item.leagueId,
          leagueName: item.leagueName,
        });
      }
    });
    return leagueList;
  };
  //赛事赛程的表格列
  getColumn = () => {
    const arr: any = [
      {
        title: '赛事',
        dataIndex: 'leagueName',
        key: 'leagueName',
        align: 'center',
        render(value: string, record: any) {
          return (
            <p className="name-logo">
              <span className="logo">
                <img
                  src={record.leagueLogo || '/static/image/defaultTeam.png'}
                  alt={value}
                  title={value}
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/static/image/defaultTeam.png';
                  }}
                />
              </span>
              <a
                target="_blank"
                href={`/league-${record.currentQuarterId}`}
                title={value}
                className="name"
              >
                {value}
              </a>
            </p>
          );
        },
      },
      {
        title: '轮次',
        dataIndex: 'groupName',
        key: 'groupName',
        align: 'center',
      },
      {
        title: '时间',
        dataIndex: 'forecastStartTime',
        key: 'forecastStartTime',
        align: 'center',
      },
      {
        title: '主队',
        dataIndex: 'homeName',
        key: 'forecastStartTime',
        align: 'center',
        render(text: string = '', rowData: any = {}) {
          return <a href="">{text}</a>;
        },
      },
      {
        title: '比分',
        dataIndex: 'scoreAll',
        key: 'scoreAll',
        align: 'center',
        render(text: string = '', rowData: any = {}) {
          return <span>{text || '-'}</span>;
        },
      },
      {
        title: '客队',
        dataIndex: 'guestName',
        key: 'guestName',
        align: 'center',
        render(text: string = '', rowData: any = {}) {
          return <a href="">{text}</a>;
        },
      },
      {
        title: '半场',
        dataIndex: 'scoreHalf',
        key: 'scoreHalf',
        align: 'center',
      },
      {
        title: '技术统计',
        dataIndex: 'other',
        key: 'other',
        align: 'center',

        render(text, rowData: any) {
          return (
            <span>
              <a
                href={`/matchDetail-${rowData.dataId}`}
                target="_blank"
                style={{ marginRight: 10 }}
              >
                析
              </a>
              {/* <a href="">走势</a> */}
            </span>
          );
        },
      },
    ];
    return arr;
  };
  //赛事赛程的表格数据
  getDataSource() {
    const { teamMatchList = [], teamBaseList = {} } = this.props;
    const { leagueId = '', homeGuestType = '', isAll = false } = this.state;
    const dataArr = teamMatchList.filter(
      (item: { leagueId: string | number; homeName: any; guestName: any }) => {
        if (homeGuestType == 1) {
          console.log(
            leagueId ? item.leagueId == leagueId : true,
            item.homeName,
            teamBaseList.simpleShortName,
          );
          return (
            (leagueId ? item.leagueId == leagueId : true) &&
            item.homeName == teamBaseList.simpleShortName
          );
        } else if (homeGuestType == 2) {
          return (
            (leagueId ? item.leagueId == leagueId : true) &&
            item.guestName == teamBaseList.simpleShortName
          );
        } else {
          return leagueId ? item.leagueId == leagueId : true;
        }
      },
    );

    // const arr = [];
    // for (let i = 0; i < 500; i++) {
    //   arr.push({
    //     scoreAll: '0:0', //全场比分
    //     score90: '0:0', //90分钟比分
    //     homeName: '冈本', //主队名称
    //     guestName: '木本', //客队名称
    //     leagueName: '英超', //联赛名称
    //     groupName: '1', //分组名称
    //     leagueLogo: 'xasx', //联赛LOGO
    //     dataId: Math.random(), //主键
    //     leagueId: 1, //联赛ID
    //     scoreHalf: '0:0', //半场比分
    //     forecastStartTime: '2018-01-13 19:13', //比赛预计开始时间
    //     homeId: 1, //主队ID
    //     guestId: 1, //客队ID
    //   });
    // }
    return dataArr;
  }

  //球队阵容的列项

  getBattleColumn = () => {
    const placeArr = ['未知', '后卫', '中场', '前锋', '守门员', '替补'];
    const arr: any = [
      {
        title: '号码',
        dataIndex: 'playNumber',
        key: 'playNumber',
        align: 'center',
      },
      {
        title: '球员',
        dataIndex: 'simpleFullName',
        key: 'simpleFullName',
        align: 'center',
        render(value: string, record: any) {
          return (
            <p className="name-logo">
              <span className="logo">
                <img
                  src={record.memberLogo || '/static/image/defaultTeam.png'}
                  alt={value}
                  title={value}
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/static/image/defaultTeam.png';
                  }}
                />
              </span>
              <span className="name">{value}</span>
            </p>
          );
        },
      },
      {
        title: '英文名称',
        dataIndex: 'englishName',
        key: 'englishName',
        align: 'center',
      },
      {
        title: '出生日',
        dataIndex: 'birthday',
        key: 'birthday',
        align: 'center',
      },
      {
        title: '身高(cm)',
        dataIndex: 'height',
        key: 'height',
        align: 'center',
      },
      {
        title: '体重(kg)',
        dataIndex: 'weight',
        key: 'weight',
        align: 'center',
      },
      {
        title: '位置',
        dataIndex: 'teamPlace',
        key: 'teamPlace',
        align: 'center',
        render(text: string = '', rowData: any = {}) {
          return <span>{placeArr[text] || '未知'}</span>;
        },
      },
      {
        title: '身价',
        dataIndex: 'memberMuch',
        key: 'memberMuch',
        align: 'center',
      },
    ];
    return arr;
  };

  getBattleDataSource = () => {
    const { teamBattleList = [] } = this.props;
    return teamBattleList;
  };

  render(): ReactNode {
    const { teamBaseList = {} } = this.props;
    const { leagueId = '', homeGuestType = '', isAll = false } = this.state;
    return (
      <div className="team-details-page">
        <div className="team-details-left">
          <div className="team-info-box">
            <div className="team-name-avater">
              <img
                src={teamBaseList.teamLogo || '/static/image/defaultTeam.png'}
                alt={teamBaseList.simpleShortName}
                title={teamBaseList.simpleShortName}
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/static/image/defaultTeam.png';
                }}
              />
              <div className="team-name">
                <h2>{teamBaseList.simpleShortName || ''}</h2>
                <p>{teamBaseList.englishName || ''}</p>
              </div>
            </div>
            <div className="team-about">
              <p>
                <span className="th">成立时间</span>
                <span className="td">{teamBaseList.setUpTime || ''}</span>
                <span className="th">主教练</span>
                <span className="td">{teamBaseList.chiefCoach || ''}</span>
                {/* <span className="th">国家</span>
                <span className="td">{teamBaseList.country || ''}</span> */}
              </p>
              <p>
                <span className="th">球场</span>
                <span className="td">{teamBaseList.footPlace || ''}</span>
                <span className="th">球场容量</span>
                <span className="td">{teamBaseList.capacity || ''}</span>
              </p>
              <p>
                <span className="th">市值</span>
                <span className="td">{teamBaseList.teamMuch || ''}</span>
              </p>
            </div>
          </div>

          <div className="team-match-result">
            <div className="box-head">
              <div className="left-title">
                <span>赛程赛果</span>
              </div>
              <div className="filter-box">
                <Select
                  value={leagueId}
                  onChange={value =>
                    this.setState({
                      leagueId: value,
                      isAll: !value && !homeGuestType,
                    })
                  }
                  style={{ width: 100 }}
                >
                  <Option value="">全部赛事</Option>
                  {this.leagueList.map(item => {
                    return (
                      <Option value={item.leagueId} key={item.leagueId}>
                        {item.leagueName}
                      </Option>
                    );
                  })}
                </Select>
                <Select
                  value={homeGuestType}
                  style={{ width: 100 }}
                  onChange={value =>
                    this.setState({
                      homeGuestType: value,
                      isAll: !value && !leagueId,
                    })
                  }
                >
                  <Option value="">主客</Option>
                  <Option value="1">主队</Option>
                  <Option value="2">客队</Option>
                </Select>

                <Button
                  onClick={() =>
                    this.setState({
                      homeGuestType: '',
                      leagueId: '',
                      isAll: true,
                    })
                  }
                  type={isAll ? 'primary' : 'default'}
                >
                  全部
                </Button>
              </div>
            </div>
            <div className="result-table">
              <Table
                // tableLayout="fixed"
                pagination={{
                  size: 'small',
                  showSizeChanger: true,
                  showQuickJumper: true,
                }}
                columns={this.getColumn()}
                dataSource={this.getDataSource()}
              />
            </div>
          </div>

          <div className="team-match-result">
            <div className="box-head">
              <div className="left-title">
                <span>球队阵容</span>
              </div>
              <div>主教练：{teamBaseList.chiefCoach}</div>
            </div>
            <div className="result-table">
              <Table
                pagination={false}
                columns={this.getBattleColumn()}
                dataSource={this.getBattleDataSource()}
              />
            </div>
          </div>
        </div>
        {teamBaseList.descr && (
          <div className="team-details-right">
            <div className="team-desc">
              <div className="box-head">
                <div className="left-title">
                  <span>球队简介</span>
                </div>
              </div>

              <div className="team-desc-text">{teamBaseList.descr}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
