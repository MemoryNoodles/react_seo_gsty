import React, { Component, ReactNode } from 'react';
import './component.less';
import { RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
interface Props {
  item: any;
  gameType?: string;
  dateType?: string;
  sortType?: number;
}
interface State { }

export default class MatchItem extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  addZero = (number: number) => {
    // if (number < 10 && number > 0) {
    //   return `0${number}`;
    // }
    return number;
  };

  filterFun = (item: { dateType: string; matchTypeStr: string }) => {
    const { gameType = '全部', dateType = '1' } = this.props;
    // console.log(item.matchTypeStr, gameType, '222');
    if (gameType === '全部') {
      return item.dateType === dateType;
    } else {
      return item.matchTypeStr === gameType && item.dateType === dateType;
    }
  };
  handleTime(currentTime) {
    let re = /\d+/;
    return re.test(currentTime)
  }
  render(): ReactNode {
    const { item = {}, sortType = 1 } = this.props;
    const { scoreAll = '0:0' } = item;
    const imgArr = [
      '',
      '/static/image/footballIcon.png',
      '/static/image/basketballIcon.png',
    ];

    const notImgArr = [
      '',
      '/static/image/footballIconGray.png',
      '/static/image/basketballIconGray.png',
    ];
    return (
      <div className={`match-item ${this.filterFun(item) ? '' : 'hide'}`}>
        <img
          className="match-type-img"
          src={
            item.status >= 4 && item.status <= 7
              ? imgArr[item.matchType || 1]
              : notImgArr[item.matchType || 1]
          }
          alt=""
        />
        <div className="match-item-date-time">
          <p>{item.dateStr}</p>
          <p>{item.timeStr}</p>
        </div>
        <p className={`league-name ${sortType === 2 ? 'hide' : ''}`}>
          <a
            target="_blank"
            title={item.leagueName}
            href={`/league-${item.currentQuarterId}`}
          >
            {item.leagueName}
          </a>
        </p>
        <p className="current-time">{this.handleTime(item.currentTime) ? (
          <>
            <img src="/static/image/time.png" style={{marginRight:2, width:14, height:14, marginBottom:2}} alt="" />
            {item.currentTime}'
          </>
        ):(
           item.currentTime
        )}</p>

        <div className="team-info">
          <p className="home-name">
            <span>
              <Link
                href={`/team?id=${item.homeId}`}
                as={`/team-${item.homeId}`}
              >
                <a title={item.homeName} target="_blank">
                  {item.homeName}
                </a>
              </Link>
            </span>
            <span className="team-avatar">
              <img
                src={item.homeLogo || '/static/image/defaultTeam.png'}
                alt={item.homeName}
                title={item.homeName}
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/static/image/defaultTeam.png';
                }}
              />
            </span>
          </p>
          <p className="score">
            {
              item.currentTime == "未" ? (
                <>
                  <span></span>
                  <span>-</span>
                  <span></span>
                </>
              ) : (
                  <>
                    <span>{this.addZero(scoreAll.split(':')[0])}</span>
                    <span>:</span>
                    <span>{this.addZero(scoreAll.split(':')[1])}</span>
                  </>
                )
            }

          </p>
          <p className="gueest-name">
            <span className="team-avatar">
              <img
                src={item.guestLogo || '/static/image/defaultTeam.png'}
                alt={item.guestName}
                title={item.guestName}
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/static/image/defaultTeam.png';
                }}
              />
            </span>
            <span>
              <Link
                href={`/team?id=${item.guestId}`}
                as={`/team-${item.guestId}`}
              >
                <a title={item.guestName} target="_blank">
                  {item.guestName}
                </a>
              </Link>
            </span>
          </p>
        </div>
        <div className="match-action">
          <a href={`/matchDetail-${item.dataId}`} target="_blank">
            <RightOutlined />
          </a>
        </div>
      </div>
    );
  }
}
