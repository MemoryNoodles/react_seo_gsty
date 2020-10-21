import React, { Component } from 'react';
import { Card, Table } from 'antd';
import './index.less';

interface Props {
  oddsInTime: any;
  matchDetail: any;
  matchBattle: any;
}
interface State {}

export default class BattleLiveCom extends Component<Props, State> {
  state = {};
  eventItem(arr) {
    return arr.map(item => {
      let imgIco = '',
        text = '';
      switch (item.eventType * 1) {
        case 1:
          imgIco = '/static/image/football_ico.png';
          text = '角球';
          break;
        case 2:
          imgIco = '/static/image/inball_ico.png';
          text = '进球';
          break;
        case 3:
          imgIco = '/static/image/headball_ico.png';
          text = '点球';
          break;
        case 4:
          imgIco = '/static/image/ownball_ico.png';
          text = '乌龙球';
          break;
        case 5:
          imgIco = '/static/image/yellowcard_ico.png';
          text = '黄牌';
          break;
        case 6:
          imgIco = '/static/image/redcard_ico.png';
          text = '红牌';
          break;
        case 7:
          imgIco = '/static/image/yyr_ico.png';
          text = '两黄变红';
          break;
        case 8:
          imgIco = '/static/image/changout_ico.png';
          text = '换人';
          break;
      }
      return (
        <div
          className="eventItem"
          style={{ left: item.time.match(/\d+/)[0] + '%' }}
        >
          <img src={imgIco} alt="" />
          <div className="eventDetail">
            {item.teamName}-{text}
            <span>{item.time}'</span>
          </div>
        </div>
      );
    });
  }
  /* 事件 */
  result() {
    const { oddsInTime, matchDetail } = this.props;

    let gameBefore = oddsInTime.before ? oddsInTime.before : {};
    let gameafter = oddsInTime.after ? oddsInTime.after : {};
    let winLoseBefores = gameBefore.euro ? gameBefore.euro.split(',') : [];
    let letBallBefores = gameBefore.asia ? gameBefore.asia.split(',') : [];
    let inBallBefores = gameBefore.big ? gameBefore.big.split(',') : [];

    let winLoseing = gameafter.euro ? gameafter.euro.split(',') : [];
    let letBalling = gameafter.asia ? gameafter.asia.split(',') : [];
    let inBalling = gameafter.big ? gameafter.big.split(',') : [];
    const tdHtml = arr => {
      return (
        <td className="tdContent">
          <span>{arr[0]}</span>
          <span>{arr[1]}</span>
          <span>{arr[2]}</span>
        </td>
      );
    };

    let teamBase = matchDetail.base ? matchDetail.base : {};
    let teamEvent = matchDetail.event ? matchDetail.event : [];
    let homeTeamEvent = teamEvent.filter(item => {
      if (item.teamId == teamBase.homeId) {
        item.teamName = teamBase.homeName;
        return item;
      }
    });
    let guestTeamEvent = teamEvent.filter(item => {
      if (item.teamId == teamBase.guestId) {
        item.teamName = teamBase.gueestName;
        return item;
      }
    });
    //事件时间线
    let eventWidth = '0%';
    if (teamBase.currentTime == '完') {
      eventWidth = '100%';
    } else if (teamBase.currentTime == '中') {
      eventWidth = '50%';
    } else {
      eventWidth = teamBase.currentTime.match(/\d+/)
        ? teamBase.currentTime.match(/\d+/)[0] + '%'
        : '0%';
    }

    let eventIcos = [
      {
        img: '/static/image/inball_ico.png',
        name: '进球',
      },
      {
        img: '/static/image/headball_ico.png',
        name: '点球',
      },
      {
        img: '/static/image/football_ico.png',
        name: '角球',
      },
      {
        img: '/static/image/changIn_ico.png',
        name: '换入',
      },
      {
        img: '/static/image/redcard_ico.png',
        name: '红牌',
      },
      {
        img: '/static/image/yellowcard_ico.png',
        name: '黄牌',
      },
      {
        img: '/static/image/ownball_ico.png',
        name: '乌龙球',
      },
      {
        img: '/static/image/yyr_ico.png',
        name: '两黄变红',
      },
      {
        img: '/static/image/changout_ico.png',
        name: '换出',
      },
    ];
    return (
      <div className="data_content live">
        <Card bordered={false}>
          <div className="result_title">
            <div>胜负</div>
            <div>让球</div>
            <div>进球数</div>
          </div>
          <table>
            <tr>
              <td className="tdTitle">赛中</td>
              {tdHtml(winLoseing)}
              {tdHtml(letBalling)}
              {tdHtml(inBalling)}
            </tr>
            <tr>
              <td className="tdTitle">赛前</td>
              {tdHtml(winLoseBefores)}
              {tdHtml(letBallBefores)}
              {tdHtml(inBallBefores)}
            </tr>
          </table>
          <div
            className="left-title"
            style={{ marginTop: '20px', marginBottom: '30px' }}
          >
            事件
          </div>
          <div className="event_content">
            <div className="team_content">
              <div className="teamInfo">
                <div>
                  <img src={teamBase.homeLogoUrl} alt="" />
                </div>
                <span>{teamBase.homeName}</span>
              </div>
              <div className="teamInfo">
                <div>
                  <img src={teamBase.guestLogoUrl} alt="" />
                </div>
                <span>{teamBase.gueestName}</span>
              </div>
            </div>
            <div className="event_data">
              <div className="time">
                <span>0'</span>
                <span>15'</span>
                <span>30'</span>
                <span>HT</span>
                <span>60'</span>
                <span>75'</span>
                <span>90</span>
              </div>
              <div className="event_map">
                <div className="homeTeamEvent" style={{ width: eventWidth }}>
                  {this.eventItem(homeTeamEvent)}
                </div>
                <div className="guestTeamEvent" style={{ width: eventWidth }}>
                  {this.eventItem(guestTeamEvent)}
                </div>
                <span className="eventTime" style={{ left: eventWidth }}></span>
                {/* 时间分割线 定位*/}
                <span className="line" style={{ left: 0 }}></span>
                <span className="line" style={{ left: '16.67%' }}></span>
                <span className="line" style={{ left: '33.34%' }}></span>
                <span className="line" style={{ left: '50%' }}></span>
                <span className="line" style={{ left: '66.67%' }}></span>
                <span className="line" style={{ left: '83.34%' }}></span>
                <span className="line" style={{ left: '100%' }}></span>
              </div>
              <ul className="event_ico_content">
                {eventIcos.map(item => {
                  return (
                    <li>
                      <img src={item.img} alt="" />
                      <span>{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  /* 技术统计 */
  static() {
    const { matchDetail } = this.props;
    let teamBase = matchDetail.base ? matchDetail.base : {};
    const arr = [
      { keyName: 'riskAttackRatio', name: '危险进攻' },
      { keyName: 'attackRatio', name: '进攻' },
      { keyName: 'onTargetRatio', name: '射正' },
      { keyName: 'outTargetRatio', name: '射偏' },
      { keyName: 'yellowCardRatio', name: '黄牌' },
      { keyName: 'redCardRatio', name: '红牌' },
      { keyName: 'cornerRatio', name: '角球' },
      { keyName: 'ballControlRatio', name: '控球' },
      { keyName: 'pointSphereRatio', name: '点球' },
    ];
    return (
      <div className="data_content">
        <Card bordered={false}>
          <div className="left-title" style={{ marginBottom: '20px' }}>
            本场技术统计
          </div>
          {arr.map(item => {
            const value = teamBase[item.keyName] || '0:0';
            let leftNum = value.split(':')[0]
              ? parseInt(value.split(':')[0])
              : 0;
            let rightNum = value.split(':')[1]
              ? parseInt(value.split(':')[1])
              : 0;
            let leftPercent = '0';
            let rightPercent = '0';
            if (leftNum + rightNum !== 0) {
              leftPercent = ((leftNum / (leftNum + rightNum)) * 100).toFixed(2);
              rightPercent = ((rightNum / (leftNum + rightNum)) * 100).toFixed(
                2,
              );
            }
            return (
              <div className="staticItem">
                <div>
                  <div className="pro" style={{ marginRight: '10px' }}>
                    <div
                      className="progress"
                      style={{
                        background: '#0CB0D0',
                        width: leftPercent + '%',
                        right: 0,
                      }}
                    ></div>
                  </div>
                  <span>{leftNum}</span>
                </div>
                <div>{item.name}</div>
                <div>
                  <span>{rightNum}</span>
                  <div className="pro" style={{ marginLeft: '10px' }}>
                    <div
                      className="progress"
                      style={{
                        background: '#FC833E',
                        width: rightPercent + '%',
                        left: 0,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    );
  }
  /* 阵容 */
  matchBattle() {
    const { matchDetail, matchBattle } = this.props;
    let teamBase = matchDetail.base ? matchDetail.base : {};

    return (
      <div className="data_content battle_wrap">
        <Card bordered={false}>
          <div className="left-title" style={{ margin: '10px 20px 20px' }}>
            阵容
          </div>
          <div className="matchBattle_content">
            <div className="teamFormat">
              <div>
                {teamBase.homeName} {matchBattle.homeFormat}
              </div>
              <div>
                {teamBase.gueestName} {matchBattle.guestFormat}
              </div>
            </div>
            <div className="battle_content">
              <div className="homebattle">
                {matchBattle.homeList.map(item => {
                  if (item.battleType == 1) {
                    return (
                      <div
                        className="playerPos"
                        style={{
                          left: item.coordX + '%',
                          top: item.coordY + '%',
                        }}
                      >
                        <img src={item.memberLogo} alt="" />
                        <div>
                          {item.playNumber} {item.memberName}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="guestbattle">
                {matchBattle.guestList.map(item => {
                  if (item.battleType == 1) {
                    return (
                      <div
                        className="playerPos"
                        style={{
                          left: item.coordX + '%',
                          top: item.coordY + '%',
                        }}
                      >
                        <img src={item.memberLogo} alt="" />
                        <div>
                          {item.playNumber} {item.memberName}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="substitute">
              <div className="sub_home">
                {matchBattle.homeList.map(item => {
                  if (item.battleType == 2) {
                    return (
                      <div className="sub_player">
                        <img src={item.memberLogo} alt="" />
                        <span>
                          {item.playNumber} {item.memberName}
                        </span>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="subText">替补</div>
              <div className="sub_home">
                {matchBattle.guestList.map(item => {
                  if (item.battleType == 2) {
                    return (
                      <div className="sub_player">
                        <img src={item.memberLogo} alt="" />
                        <span>
                          {item.playNumber} {item.memberName}
                        </span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.result()}
        {this.static()}
        {this.matchBattle()}
      </div>
    );
  }
}
