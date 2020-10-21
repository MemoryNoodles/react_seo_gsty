import React, { Component, ReactNode } from 'react';
import { Table, Tag, Space } from 'antd';
import { withRouter } from 'next/router';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './index.less';
import Link from 'next/link';
import { ColumnType } from 'antd/lib/list';
import apiFun from '../../api/apiFun';
import { handleBackData } from '../../utils/common';
import { isEmpty } from '../../utils';

import moment from 'moment';

interface HeadProps {
  presentCompany: number | string;
  quarterInTime: any;
  showEvent: number[];
}

interface State {
  dataList: any;
  dataSource: any;
  typeStatus: Array<string>;
  matchFast: any;
}
class InstantGame extends Component<HeadProps, State> {
  timer: NodeJS.Timeout;
  timerArr: any[];
  constructor(props: any) {
    super(props);
    const { quarterInTime = [] } = props;
    const {
      notBegun = [],
      ongoing = [],
      alreadyOver = [],
    } = this.classificationData(quarterInTime);
    this.state = {
      dataSource: [...quarterInTime],
      dataList: {
        ongoing: [...ongoing],
        notBegun: [...notBegun],
        alreadyOver: [...alreadyOver],
      },
      typeStatus: ['进行中的比赛', '未开始的比赛', '已完场的比赛'],
      matchFast: [],
    };

    this.timerArr = [];
  }

  classificationData = (quarterInTime: any) => {
    const notBegun = [],
      ongoing = [],
      alreadyOver = [];
    quarterInTime.map((item: any, index: number) => {
      if (item.status == 0) {
        notBegun.push(item);
      } else if (item.status == 5 || item.status == 6 || item.status == 7) {
        ongoing.push(item);
      } else {
        alreadyOver.push(item);
      }
    });

    return { notBegun, ongoing, alreadyOver };
  };

  componentDidMount() {
    this.timer = setInterval((): void => {
      //   this.setState({
      //     now: new Date(),
      //   });
      this.queryMatchFast();
    }, 10000);
  }

  queryMatchFast = async () => {
    const matchFastRes = await apiFun.matchFast();
    const matchFast = handleBackData(matchFastRes);
    this.setState({
      matchFast,
    });
    this.processingChangeData(matchFast);
  };

  processingChangeData = (matchFast = []) => {
    const { dataSource = [] } = this.state;
    // const { dataList = {} } = this.state;
    // const { notBegun = [], ongoing = [], alreadyOver = [] } = dataList;
    const notNewBegun = [],
      ongoingNew = [],
      alreadyNewOver = [];
    dataSource.map((item: any, index: number) => {
      const findIndex = matchFast.findIndex(
        subItem => subItem.dataId == item.dataId,
      );
      if (findIndex > -1) {
        const changeItem = matchFast[findIndex];
        item.currentTime = changeItem.currentTime; //改变当前进程时间
        item.scoreAll = changeItem.scoreAll; //全场比分变化
        item.scoreHalf = changeItem.scoreHalf; //半场比分变化
        item.cornerRatio = changeItem.cornerRatio; //角球变化
        item.status = changeItem.status; //状态变化
        item.euroList = item.euroList
          ? item.euroList.map((euroItem: any) => {
            const comIndex = changeItem.euroList.findIndex(
              (subItem: { companyId: any }) =>
                subItem.companyId == euroItem.companyId,
            );
            if (comIndex > -1) {
              const itemOdds = euroItem.odds || '';
              const itemInstantOdds =
                itemOdds.indexOf('@') > -1
                  ? itemOdds.split('@')[1].split('_')[2]
                  : itemOdds.split('_')[2];

              const itemInstantOddsArr = itemInstantOdds.split(',');

              const changeOdds = changeItem.euroList[comIndex].oddsNew || '';
              const changeOddsArr = changeOdds.split('_')[2].split(',');
              euroItem.winOddsChangeFlag =
                itemInstantOddsArr[0] > changeOddsArr[0]
                  ? 1
                  : itemInstantOddsArr[0] < changeOddsArr[0]
                    ? 2
                    : 3;
              euroItem.drawOddsChangeFlag =
                itemInstantOddsArr[1] > changeOddsArr[1]
                  ? 1
                  : itemInstantOddsArr[1] < changeOddsArr[1]
                    ? 2
                    : 3;
              euroItem.failureOddsChangeFlag =
                itemInstantOddsArr[2] > changeOddsArr[2]
                  ? 1
                  : itemInstantOddsArr[2] < changeOddsArr[2]
                    ? 2
                    : 3;
              if (itemOdds.indexOf('@') > -1) {
                euroItem.odds =
                  euroItem.odds.split('@')[0] + '@' + changeOdds;
              } else {
                euroItem.odds = euroItem.odds + '@' + changeOdds;
              }
            }
            return euroItem;
          })
          : [];
      }
      if (item.status == 0) {
        notNewBegun.push(item);
      } else if (item.status == 5 || item.status == 6 || item.status == 7) {
        ongoingNew.push(item);
      } else {
        alreadyNewOver.push(item);
      }
    });

    this.setState({
      dataList: {
        ongoing: [...ongoingNew],
        notBegun: [...notNewBegun],
        alreadyOver: [...alreadyNewOver],
      },
    });
  };

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  getData() {
    const { dataList } = this.state;
    this.setState({ dataList: dataList });
  }
  getAddOrReduceType(params: number) {
    if (params === 1) {
      return <ArrowDownOutlined className="down-reduce" />;
    } else if (params === 2) {
      return <ArrowUpOutlined className="up-add" />;
    }
  }
  getStatus(val: string) {
    if (Number(val)) {
      return (
        <div className="current-time">
          <img src="../../static/image/time.png" alt="" />
          <span>{val + '′'}</span>
        </div>
      );
    } else {
      return val;
    }
  }
  getTab(index: number) {
    const { dataList, typeStatus } = this.state;
    const { showEvent } = this.props;
    if (index === 0) {
      return (
        <Table
          showHeader={false}
          columns={this.getColums()}
          dataSource={[...dataList.ongoing]}
          pagination={false}
          rowClassName={(record, index) => {
            if (
              !isEmpty(showEvent) &&
              showEvent.indexOf(record.leagueId) == -1
            ) {
              return 'row-hide';
            }
            if (typeof showEvent != 'string' && !showEvent.length) {
              return 'row-hide';
            }
            return '';
          }}
          tableLayout="fixed"
        />
      );
    } else if (index === 1) {
      return (
        <Table
          showHeader={false}
          columns={this.getColums()}
          dataSource={[...dataList.notBegun]}
          pagination={false}
          rowClassName={(record, index) => {
            if (
              !isEmpty(showEvent) &&
              showEvent.indexOf(record.leagueId) == -1
            ) {
              return 'row-hide';
            }
            if (typeof showEvent != 'string' && !showEvent.length) {
              return 'row-hide';
            }
            return '';
          }}
          tableLayout="fixed"
        />
      );
    } else if (index === 2) {
      return (
        <Table
          showHeader={false}
          columns={this.getColums()}
          dataSource={[...dataList.alreadyOver].sort(
            (a, b) => b.status - a.status,
          )}
          pagination={false}
          rowClassName={(record, index) => {
            if (
              !isEmpty(showEvent) &&
              showEvent.indexOf(record.leagueId) == -1
            ) {
              return 'row-hide';
            }
            if (typeof showEvent != 'string' && !showEvent.length) {
              return 'row-hide';
            }
            return '';
          }}
          tableLayout="fixed"
        />
      );
    }
  }
  getEuroList(params: any[], record: any) {
    const { presentCompany = '' } = this.props;
    if (params.length > 0) {
      const findIndex = params.findIndex(
        item => item.companyId == presentCompany,
      );
      if (findIndex > -1) {
        let odds = params[findIndex].odds;

        let initOdds = '';
        let indentOdds = '';

        const winOddsChangeFlag = params[findIndex].winOddsChangeFlag || 3;
        const drawOddsChangeFlag = params[findIndex].drawOddsChangeFlag || 3;
        const failureOddsChangeFlag =
          params[findIndex].failureOddsChangeFlag || 3;
        if (winOddsChangeFlag && winOddsChangeFlag != 3) {
          let timer = setTimeout(() => {
            this.changeTimerStatus(record.dataId, 'winOddsChangeFlag');
          }, 3000);
          this.timerArr.push(timer);
        }
        if (drawOddsChangeFlag && drawOddsChangeFlag != 3) {
          let timer = setTimeout(() => {
            this.changeTimerStatus(record.dataId, 'drawOddsChangeFlag');
          }, 3000);
          this.timerArr.push(timer);
        }
        if (failureOddsChangeFlag && failureOddsChangeFlag != 3) {
          let timer = setTimeout(() => {
            this.changeTimerStatus(record.dataId, 'failureOddsChangeFlag');
          }, 3000);
          this.timerArr.push(timer);
        }

        if (odds.indexOf('@') > -1) {
          initOdds = odds.split('@')[0];
          indentOdds = odds.split('@')[1];
        } else {
          initOdds = odds.split('@')[0];
          indentOdds = odds.split('@')[0];
        }

        const initOddsString = initOdds.split('_')[
          initOdds.split('_').length - 1
        ];
        const indentOddsString = indentOdds.split('_')[
          indentOdds.split('_').length - 1
        ];
        const initOddsArr = initOddsString.split(',');
        const indentOddsArr = indentOddsString.split(',');
        return (
          <div>
            <div>
              <span className="movements-data">{initOddsArr[0]}</span>
              <span className="movements-data">{initOddsArr[1]}</span>
              <span className="movements-data">{initOddsArr[2]}</span>
            </div>
            <div>
              <span
                className={`movements-data ${
                  indentOddsArr[0] > initOddsArr[0]
                    ? 'red'
                    : indentOddsArr[0] < initOddsArr[0]
                      ? 'green'
                      : ''
                  }`}
              >
                <span>{indentOddsArr[0]} </span>
                {winOddsChangeFlag == 1 ? (
                  <img src="/static/image/down.png" alt="" />
                ) : winOddsChangeFlag == 2 ? (
                  <img src="/static/image/up.png" alt="" />
                ) : (
                      ''
                    )}
              </span>
              <span
                className={`movements-data ${
                  indentOddsArr[1] > initOddsArr[1]
                    ? 'red'
                    : indentOddsArr[1] < initOddsArr[1]
                      ? 'green'
                      : ''
                  }`}
              >
                <span>{indentOddsArr[1]}</span>
                {drawOddsChangeFlag == 1 ? (
                  <img src="/static/image/down.png" alt="" />
                ) : winOddsChangeFlag == 2 ? (
                  <img src="/static/image/up.png" alt="" />
                ) : (
                      ''
                    )}
              </span>
              <span
                className={`movements-data ${
                  indentOddsArr[2] > initOddsArr[2]
                    ? 'red'
                    : indentOddsArr[2] < initOddsArr[2]
                      ? 'green'
                      : ''
                  }`}
              >
                <span>{indentOddsArr[2]}</span>
                {failureOddsChangeFlag == 1 ? (
                  <img src="/static/image/down.png" alt="" />
                ) : winOddsChangeFlag == 2 ? (
                  <img src="/static/image/up.png" alt="" />
                ) : (
                      ''
                    )}
              </span>
            </div>
          </div>
        );
        // if (odds.split('@').length > 1) {
        //   return odds.split('@').map((item: string, index: any) => {
        //     let oddsString = item.split('_')[item.split('_').length - 1];
        //     let item2 = oddsString.split(',');
        //     return (
        //       <div>
        //         <span className="movements-data">{item2[0]}</span>
        //         <span className="movements-data">{item2[1]}</span>
        //         <span className="movements-data">{item2[2]}</span>
        //       </div>
        //     );
        //   });
        // } else {
        //   return odds.split('@').map((item: string, index: any) => {
        //     let oddsString = item.split('_')[item.split('_').length - 1];
        //     let item2 = oddsString.split(',');
        //     return (
        //   <div>
        //     <div>
        //       <span className="movements-data">{item2[0]}</span>
        //       <span className="movements-data">{item2[1]}</span>
        //       <span className="movements-data">{item2[2]}</span>
        //     </div>
        //     <div>
        //       <span className="movements-data">{item2[0]}</span>
        //       <span className="movements-data">{item2[1]}</span>
        //       <span className="movements-data">{item2[2]}</span>
        //     </div>
        //   </div>
        //     );
        //   });
        // }
      }
    }
  }
  //定时恢复改变的状态
  changeTimerStatus = (dataId: any, type = '') => {
    const { dataSource = [] } = this.state;
    const { presentCompany = '' } = this.props;
    const findIndex = dataSource.findIndex(
      (item: { dataId: any }) => item.dataId == dataId,
    );

    if (findIndex > -1) {
      const euroList = dataSource[findIndex].euroList || [];

      if (type.indexOf('OddsChange') > -1) {
        const comIndex = euroList.findIndex(
          (subItem: { companyId: string | number }) =>
            subItem.companyId == presentCompany,
        );
        if (comIndex > -1) {
          dataSource[findIndex].euroList[comIndex][type] = 3;
        }
      } else {
        dataSource[findIndex][type] = 3;
      }
    }

    const notNewBegun = [],
      ongoingNew = [],
      alreadyNewOver = [];
    dataSource.map((item: { status: number }) => {
      if (item.status == 0) {
        notNewBegun.push(item);
      } else if (item.status == 5 || item.status == 6 || item.status == 7) {
        ongoingNew.push(item);
      } else {
        alreadyNewOver.push(item);
      }
    });
    this.setState({
      dataList: {
        ongoing: [...ongoingNew],
        notBegun: [...notNewBegun],
        alreadyOver: [...alreadyNewOver],
      },
    });
  };

  getColums(): any {
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
        title: '时间',
        dataIndex: 'forecastStartTime',
        key: 'forecastStartTime',
        width: '6%',
        align: 'center',
        render(value: moment.MomentInput) {
          return value ? moment(value).format('HH:mm') : '';
        },
      },
      {
        title: '状态',
        dataIndex: 'currentTime',
        key: 'currentTime',
        width: '6%',
        align: 'center',
        render: (text: any, record: any) => <div>{this.getStatus(text)}</div>,
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
        render(text: any, rowData: any) {
          return rowData.status==0?'-':text || '-';
        },
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
        render(text: any, rowData: any) {
          return text || '-';
        },
      },
      {
        title: '角球',
        dataIndex: 'cornerRatio',
        key: 'cornerRatio',
        width: '6%',
        align: 'center',
        render(text: any, rowData: any) {
          return text || '-';
        },
      },
      //   {
      //     title: '直播',
      //     dataIndex: 'status',
      //     key: 'status',
      //     width: '6%',
      //     align: 'center',
      //     render: (text: number, record: any) => (
      //       <div className="live-status">
      //         {text === 5 || text === 6 || text === 7 ? (
      //           <img src="../../static/image/live.png" alt="" />
      //         ) : (
      //           ''
      //         )}
      //       </div>
      //     ),
      //   },
      {
        title: '走势',
        key: 'euroList',
        dataIndex: 'euroList',
        width: '22%',
        align: 'center',
        render: (text: any, record: any, index: any) => (
          <div>{this.getEuroList(text, record)}</div>
        ),
      },
      {
        title: '数据中心',
        key: 'dataCenter',
        dataIndex: 'name',
        align: 'center',
        render: (text: any, record: { dataId: any }) => {
          return (
            <div>
              <Link
                href={`/matchDetail?${record.dataId}`}
                as={`/matchDetail-${record.dataId}`}
              >
                <a className="data-center-style" target="_blank">
                  析
                </a>
              </Link>
              <Link
                // prefetch
                href={`/trend-${this.props.presentCompany}&${record.dataId}`}
              // as={`/matchDetail-${record.id}`}
              >
                <a >走势</a>
              </Link>
            </div>
          );
        },
      },
    ];
  }
  render(): ReactNode {
    const { dataList, typeStatus } = this.state;
    const { showEvent } = this.props;
    const { ongoing = [], notBegun = [], alreadyOver = [] } = dataList;
    console.log(notBegun,'notBegun')
    let flagArr = [];
    flagArr[0] =
      !isEmpty(ongoing) &&
      (isEmpty(showEvent) ||
        ongoing.some(
          (item: { leagueId: number }) => showEvent.indexOf(item.leagueId) > -1,
        ));
    flagArr[1] =
      !isEmpty(notBegun) &&
      (isEmpty(showEvent) ||
        notBegun.some(
          (item: { leagueId: number }) => showEvent.indexOf(item.leagueId) > -1,
        ));
    flagArr[2] =
      !isEmpty(alreadyOver) &&
      (isEmpty(showEvent) ||
        alreadyOver.some(
          (item: { leagueId: number }) => showEvent.indexOf(item.leagueId) > -1,
        ));
    return (
      <div className="header-content score-style">
        <Table
          columns={this.getColums()}
          pagination={false}
          className="header-tab"
          tableLayout="fixed"
        />
        {typeStatus.map((item, index) => {
          return (
            <div className={`table-wrap ${flagArr[index] ? '' : 'wrap-hide'}`}>
              <div className="instant-title">
                <span className="style-title"></span>
                <span className="title-name">{item}</span>
              </div>
              {this.getTab(index)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(InstantGame);
