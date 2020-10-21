import React, { Component, ReactNode } from 'react';
import './component.less';
import { Card } from 'antd';
import MatchItem from './MatchItem';
import moment from 'moment';
interface Props {
  sortType?: number;
  gameType?: string;
  dateType?: string;
  data: any;
}
interface State {
  matchLiveList: any[];
  matchNoStartList: any[];
  matchFinishList: any[];
  matchOtherList: any[];
  matchMatchFideList: any[];
}

const matchTypeArr = ['', '足球', '篮球', '电竞'];
export default class MatchList extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    const {
      matchLiveList,
      matchNoStartList,
      matchFinishList,
      matchOtherList,
      matchMatchFideList,
    } = this.dataProcessing(props.data);
    this.state = {
      matchLiveList: matchLiveList || [], //正在进行中的比赛
      matchNoStartList: matchNoStartList || [], //未开始的比赛
      matchFinishList: matchFinishList || [], //已完成的比赛
      matchOtherList: matchOtherList || [], //其他状况的比赛

      matchMatchFideList: matchMatchFideList || [], //赛事排序的比赛
    };
  }
  //数据处理
  dataProcessing = (data: any[]) => {
    const matchLiveList = [],
      matchNoStartList = [],
      matchFinishList = [],
      matchOtherList = [],
      matchMatchFideList = [];

    data.map(item => {
      const today = moment(new Date()).format('YYYY-MM-DD');
      const tomorrow = moment(new Date())
        .add(1, 'days')
        .format('YYYY-MM-DD');
      const yesterday = moment(new Date())
        .add(-1, 'days')
        .format('YYYY-MM-DD');

      const itemDate = item.forecastStartTime
        ? moment(item.forecastStartTime).format('YYYY-MM-DD')
        : '';
      item.matchTypeStr = matchTypeArr[item.matchType || 1];
      if (itemDate === today) {
        item.dateType = '2';
      } else if (itemDate === yesterday) {
        item.dateType = '1';
      } else if (itemDate === tomorrow) {
        item.dateType = '3';
      }
      item.dateStr = item.forecastStartTime
        ? moment(item.forecastStartTime).format('MM-DD')
        : '';
      item.timeStr = item.forecastStartTime
        ? moment(item.forecastStartTime).format('HH:mm')
        : '';
      if (item.status >= 4 && item.status <= 7) {
        matchLiveList.push({ ...item });
      } else if (item.status == 0) {
        matchNoStartList.push({ ...item });
      } else if (item.status == 8) {
        matchFinishList.push({ ...item });
      } else {
        matchOtherList.push({ ...item });
      }
      const index = matchMatchFideList.findIndex(
        subItem => subItem.leagueName === item.leagueName,
      );
      if (index > -1) {
        matchMatchFideList[index].list.push({ ...item });
      } else {
        matchMatchFideList.push({
          leagueName: item.leagueName,
          quarterId:item.currentQuarterId,
          list: [{ ...item }],
        });
      }
    });

    return {
      matchLiveList,
      matchNoStartList,
      matchFinishList,
      matchOtherList,
      matchMatchFideList,
    };
  };

  filterFunArrFlag = (arr: { dateType: string; matchTypeStr: string }[]) => {
    const { gameType = '全部', dateType = '1' } = this.props;
    return arr.some((item: { dateType: string; matchTypeStr: string }) => {
      if (gameType === '全部') {
        return item.dateType === dateType;
      } else {
        return item.matchTypeStr === gameType && item.dateType === dateType;
      }
    });
  };

  render(): ReactNode {
    const { sortType = 1, gameType = '全部', dateType = '1' } = this.props;
    const {
      matchLiveList,
      matchNoStartList,
      matchFinishList,
      matchOtherList,
      matchMatchFideList,
    } = this.state;
    return (
      <div className="match-list">
        <div
          className={`sort-item sort-by-time ${sortType !== 1 ? 'hide' : ''}`}
        >
          {/* 正在进行中的比赛 */}
          <div
            className={`live-match ${
              this.filterFunArrFlag(matchLiveList) ? '' : 'hide'
            }`}
          >
            <Card>
              {matchLiveList.map(item => {
                return (
                  <MatchItem
                    gameType={gameType}
                    dateType={dateType}
                    sortType={sortType}
                    key={item.dataId}
                    item={item}
                  />
                );
              })}
            </Card>
          </div>
          {/* 未开始的比赛 */}
          <div
            className={`no-start-match ${
              this.filterFunArrFlag(matchNoStartList) ? '' : 'hide'
            }`}
          >
            <Card>
              {matchNoStartList.map(item => {
                return (
                  <MatchItem
                    gameType={gameType}
                    dateType={dateType}
                    sortType={sortType}
                    key={item.dataId}
                    item={item}
                  />
                );
              })}
            </Card>
          </div>
          {/* 已结束的比赛 */}
          <div
            className={`no-start-match ${
              this.filterFunArrFlag(matchFinishList) ? '' : 'hide'
            }`}
          >
            <div className="left-title">已结束的比赛</div>
            <Card>
              {matchFinishList.map(item => {
                return (
                  <MatchItem
                    gameType={gameType}
                    dateType={dateType}
                    sortType={sortType}
                    key={item.dataId}
                    item={item}
                  />
                );
              })}
            </Card>
          </div>

          <div
            className={`no-start-match ${
              this.filterFunArrFlag(matchOtherList) ? '' : 'hide'
            }`}
          >
            <Card>
              {matchOtherList
                .sort((a, b) => a.status - b.status)
                .map(item => {
                  return (
                    <MatchItem
                      gameType={gameType}
                      dateType={dateType}
                      sortType={sortType}
                      key={item.dataId}
                      item={item}
                    />
                  );
                })}
            </Card>
          </div>
        </div>
        <div
          className={`sort-item sort-by-match ${sortType !== 2 ? 'hide' : ''}`}
        >
          {/* 根据赛事排序的比赛 */}
          <div className="no-start-match">
            {matchMatchFideList.map((item, index) => {
              return (
                <div
                  key={item.leagueId}
                  className={`${
                    this.filterFunArrFlag(item.list) ? '' : 'hide'
                  }`}
                >
                  <Card key={item.leagueName + index}>
                    <div className="ant-card-head">
                      <span className="team-avatar">
                        <img
                          src={
                            item.leagueLogo || '/static/image/defaultTeam.png'
                          }
                          alt={item.leagueName}
                          title={item.leagueName}
                          onError={e => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/static/image/defaultTeam.png';
                          }}
                        />
                      </span>
                      <span className="league-name">
                        <a
                          href={`/league-${item.quarterId}`}
                          target="_blank"
                          title={item.leagueName}
                        >
                          {item.leagueName}
                        </a>
                      </span>
                    </div>
                    {item.list.map((subItem: any) => {
                      return (
                        <MatchItem
                          gameType={gameType}
                          dateType={dateType}
                          sortType={sortType}
                          key={subItem.dataId}
                          item={subItem}
                        />
                      );
                    })}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
