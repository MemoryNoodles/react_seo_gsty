import React, { Component } from 'react';
import './index.less';
import { Tabs } from 'antd';
import moment from 'moment';
import { withRouter } from 'next/router';

interface Props {
  defaultActiveKey: string;
  baseData: any;
  matchId: string;
  router: any;
}
interface State {}

class BattleTab extends Component<Props, State> {
  state = {};
  leagueDataArr: { name: string; router: string }[];
  constructor(props: any) {
    super(props);
    let { matchId } = this.props;
    this.leagueDataArr = [
      {
        name: '数据分析',
        router: `/matchDetail-${matchId}`,
      },
      {
        name: '欧赔',
        router: `/europeanOdds-${matchId}`,
      },
      {
        name: '让球',
        router: `/battleLetBall-${matchId}`,
      },
      {
        name: '进球数',
        router: `/goals-${matchId}`,
      },
      {
        name: '三合一',
        router: `/threeInOne-${matchId}`,
      },
      {
        name: '实况',
        router: `/battleLive-${matchId}`,
      },
    ];
  }
  // onChange = (index: string) => {
  //     window.open(`/${index}`)
  // }
  render() {
    const { defaultActiveKey, baseData, matchId, router } = this.props;
    let status = '';

    switch (baseData.status * 1) {
      case 0:
        status = '未开始';
        break;
      case 1:
        status = '待定';
        break;
      case 2:
        status = '延迟';
        break;
      case 3:
        status = '取消';
        break;
      case 4:
        status = '暂停';
        break;
      case 5:
        status = '上半场行中';
        break;
      case 6:
        status = '中场休息';
        break;
      case 7:
        status = '下半场进行中';
        break;
      case 8:
        status = '完成（90分钟之前）';
        break;
      case 9:
        status = '加时';
        break;
      case 10:
        status = '点球大战';
        break;
      case 11:
        status = '全场结束 ';
        break;
    }
    return (
      <div>
        <div className="teamBase">
          <div className="teamInfo">
            <img
              src={baseData.homeLogoUrl || '/static/image/defaultTeam.png'}
              alt="teamIco"
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.src = '/static/image/defaultTeam.png';
              }}
            />
            <p>{baseData.homeName}</p>
          </div>
          <div className="battleInfo">
            <span className="status">{status}</span>
            <p>{baseData.scoreAll}</p>
            <span className="leagueName">
              {baseData.leagueName}{' '}
              {moment(baseData.forecastStartTime).format('YYYY/MM/DD HH:MM')}
            </span>
          </div>
          <div className="teamInfo">
            <img
              src={baseData.guestLogoUrl || '/static/image/defaultTeam.png'}
              alt="teamIco"
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.src = '/static/image/defaultTeam.png';
              }}
            />
            <p>{baseData.gueestName}</p>
          </div>
        </div>

        <div className="tab_content">
          <Tabs activeKey={router.asPath} centered>
            {this.leagueDataArr.map(item => {
              return (
                <Tabs.TabPane
                  forceRender
                  tab={
                    <a href={item.router}>
                      {item.name}
                    </a>
                  }
                  key={item.router}
                />
              );
            })}
          </Tabs>
        </div>
      </div>
    );
  }
}
export default withRouter(BattleTab);
