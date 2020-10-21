import React, { Component, ReactNode } from 'react';
import { Card, Button, Tabs } from 'antd';
import './index.less';
import moment from 'moment';
import MatchList from './component/MatchList';
import RankList from './component/RankList';
interface Props {
  data: any;
  leagueRankList: any;
}
interface State {
  gameType: string;
  dateType: string;
  sortType: number;
  rankTab: string;
  todayNum: number;
  yesterdayNum: number;
  tomorrowNum: number;
}
export default class IndexComponent extends Component<Props, State> {
  gameTypeArr: { name: string; imgPath: string }[];
  dateTypeArr: { name: string; value: string }[];
  sortBtnArr: { value: number; name: string }[];
  leagueDataArr: { name: string; value: string }[];
  constructor(props: any) {
    super(props);
    const { data = [] } = props;
    const { todayNum, yesterdayNum, tomorrowNum } = this.dateTypeNum(data);
    this.state = {
      gameType: '全部',
      dateType: '2',
      sortType: 1,
      rankTab: '1',
      todayNum,
      yesterdayNum,
      tomorrowNum,
    };
    this.gameTypeArr = [
      { name: '全部', imgPath: '' },
      { name: '足球', imgPath: '/static/image/footballIcon.png' },
      { name: '篮球', imgPath: '/static/image/basketballIcon.png' },
    ];

    this.dateTypeArr = [
      { name: '昨天', value: '1' },
      { name: '今天', value: '2' },
      { name: '明天', value: '3' },
    ];
    this.sortBtnArr = [
      { value: 1, name: '时间排序' },
      { value: 2, name: '赛事排序' },
    ];

    this.leagueDataArr = [
      { name: '英超', value: '1' },
      { name: '意甲', value: '2' },
      { name: '西甲', value: '3' },
      { name: '德甲', value: '4' },
      { name: '法甲', value: '5' },
    ];
  }
  
  //排序类型改变
  sortTypeChange = (value: number) => {
    const { sortType = 1 } = this.state;
    if (sortType === value) {
      return false;
    }
    this.setState({
      sortType: value,
    });
  };
  //时间范围改变
  dateTypeChange = (value: string) => {
    const { dateType = '2' } = this.state;
    if (dateType === value) {
      return false;
    }
    this.setState({
      dateType: value,
    });
  };

  dateTypeNum = (data: any[]) => {
    const today = moment(new Date()).format('YYYY-MM-DD');
    const tomorrow = moment(new Date())
      .add(1, 'days')
      .format('YYYY-MM-DD');
    const yesterday = moment(new Date())
      .add(-1, 'days')
      .format('YYYY-MM-DD');

    let todayNum = 0;
    let yesterdayNum = 0;
    let tomorrowNum = 0;
    data.map((item: { forecastStartTime: string }) => {
      const itemDate = item.forecastStartTime
        ? moment(item.forecastStartTime).format('YYYY-MM-DD')
        : '';
      if (itemDate === today) {
        todayNum++;
      } else if (yesterday === itemDate) {
        yesterdayNum++;
      } else if (tomorrow === itemDate) {
        tomorrowNum++;
      }
    });
    return {
      todayNum,
      yesterdayNum,
      tomorrowNum,
    };
  };

  render(): ReactNode {
    const {
      gameType = '全部',
      dateType = '2',
      sortType = 1,
      rankTab = '1',
    } = this.state;
    const { data, leagueRankList = [] } = this.props;
    const { todayNum, yesterdayNum, tomorrowNum } = this.state;
    const dateNumArr = [yesterdayNum, todayNum, tomorrowNum];
    return (
      <div className="index-content-wrap">
        <div className="index-content-left index-content">
          <Card bordered={false}>
            <div className="game-title">
              <div className="game-type">
                {this.gameTypeArr.map(item => {
                  return (
                    <a
                      className={`game-type-item ${gameType === item.name ? 'active' : ''
                        }`}
                      key={item.name}
                      onClick={() => this.setState({ gameType: item.name })}
                    >
                      {item.imgPath && (
                        <img
                          src={item.imgPath}
                          alt={item.name}

                          title={item.name}
                        />
                      )}
                      <span>{item.name}</span>
                    </a>
                  );
                })}
              </div>
              <div className="date-type-wrap">
                {this.dateTypeArr.map(item => {
                  return (
                    <a
                      onClick={() => this.dateTypeChange(item.value)}
                      key={item.value}
                      className={`${dateType === item.value ? 'active' : ''}`}
                    >
                      {item.name}({dateNumArr[parseInt(item.value) - 1]})
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="game-sort-wrap">
              {this.sortBtnArr.map(item => {
                return (
                  <Button
                    onClick={() => this.sortTypeChange(item.value)}
                    type={sortType === item.value ? 'primary' : 'default'}
                    key={item.value}
                  >
                    {item.name}
                  </Button>
                );
              })}
            </div>
          </Card>
          <MatchList
            sortType={sortType}
            gameType={gameType}
            dateType={dateType}
            data={data}
          />
        </div>
        <div className="index-content-right index-content">
          <div>
            <div className="left-title-wrap">
              <div className="left-title">足球积分榜</div>
            </div>
            <Tabs
              defaultActiveKey={rankTab}
            // onChange={activeKey => this.setState({ rankTab: activeKey })}
            >
              {leagueRankList.map(
                (
                  item: { leagueName: string; rankList: any },
                  index: number,
                ) => {
                  return (
                    <Tabs.TabPane
                      forceRender
                      tab={item.leagueName}
                      key={`${index + 1}`}
                    >
                      <RankList data={item.rankList} rankTab={rankTab} />
                    </Tabs.TabPane>
                  );
                },
              )}
            </Tabs>
          </div>
          {/* <Card bordered={false}>
            
          </Card> */}
        </div>
      </div>
    );
  }
}
