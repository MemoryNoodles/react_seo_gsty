import React, { Component } from 'react';
import { Card, Button, Select, Table, Row, Col, Menu } from 'antd';
const { SubMenu } = Menu;
import { DownOutlined, CheckOutlined } from '@ant-design/icons';
const { Option } = Select;
import Link from 'next/link';
import './index.less';
import { any, string } from 'prop-types';
import { isEmpty } from '../../utils';

function GetGamestate(props) {
    const { historyFilter, zkSame, changeFiled, changeGame } = props;
    /* 主客是否相同 */
    let selectFiled = historyFilter.checkboxs.fileds.filter(item => {
        return item.selected == true
    })
    let defaultVal = [];
    historyFilter.checkboxs.games.forEach(item => {
        if (item.isSelected) {
            defaultVal.push(item.name)
        }
    })
    return <div className="filter-content">
        {
            historyFilter.radioChecks.map((item, index) => {
                return <Button onClick={() => zkSame(index)} type={item.active ? "primary" : "default"} shape="round">{item.name}</Button>
            })
        }

        <Select onSelect={(value) => changeFiled(value, "history")} defaultValue={isEmpty(selectFiled) || selectFiled[0].name} style={{ width: 72 }}>
            {
                historyFilter.checkboxs.fileds.map(item => {
                    return <Option key={item.value} value={item.value} >{item.name}</Option>
                })
            }

        </Select>
        <Select onSelect={(value) => changeGame(value)} mode="multiple" defaultValue={defaultVal} style={{ minWidth: 90 }}>
            {
                historyFilter.checkboxs.games.map(item => {
                    return <Option key={item.name} value={item.name}>{item.name}</Option>
                })
            }

        </Select>
    </div>
  
}

interface Props {
  historyBout: any;
  lateFight: any;
  matchRankList: any;
  matchFutureList: any;
  baseData: any;
}
interface State {
  historyFilter: {
    radioChecks: { name: string; active: boolean }[];
    checkboxs: {
      fileds: { name: string; value: number; selected: boolean }[];
      games: { name: string; isSelected: boolean }[];
    };
  };
  historyEuroActive: any;
  historyAsiaActive: any;

  lastFightFilter: {
    homeTeam: Array<object>;
    awayTeam: Array<object>;
    homeFileds: { name: string; value: number; selected: boolean }[];
    homeGames: { name: string; isSelected: boolean }[];
    homeGamezk: { name: string; isSelected: boolean }[];
    guestFileds: { name: string; value: number; selected: boolean }[];
    guestGames: { name: string; isSelected: boolean }[];
    guestGamezk: { name: string; isSelected: boolean }[];
  };
  lastFightEuroActive_home: any;
  lastFightAsiaActive_home: any;
  lastFightEuroActive_guest: any;
  lastFightAsiaActive_guest: any;
}

export default class DataAnalysis extends Component<Props, State> {
  static getAllgames = list => {
    let leagues = [];
    list.forEach(item => {
      let hasGame = true;
      leagues.forEach((gameItem, index) => {
        if (gameItem.name == item.leagueName) {
          hasGame = false;
        }
      });

      if (hasGame) {
        leagues.push({
          name: item.leagueName,
          isSelected: true,
        });
      }
    });
    return leagues;
  };
  static getFileds = list => {
    let len = list.length / 5;
    let fileds = [];
    for (let i = 1; i <= Math.ceil(len); i++) {
      fileds.push({
        name: `${i * 5}场`,
        value: i * 5,
        selected: i == Math.ceil(len) ? true : false,
      });
    }
    return fileds;
  };
  constructor(props) {
    super(props);
    const { historyBout, lateFight } = this.props;

    this.state = {
      /* 历史 */
      historyFilter: {
        radioChecks: [
          {
            name: '全部赛事',
            active: true,
          },
          {
            name: '主客相同',
            active: false,
          },
        ],
        checkboxs: {
          fileds: DataAnalysis.getFileds(historyBout),
          games: DataAnalysis.getAllgames(historyBout),
        },
      },
      //欧赔  亚赔
      historyEuroActive: '',
      historyAsiaActive: '',
      /* 近期战绩 */
      lastFightFilter: {
        homeTeam: [
          {
            name: '全部',
            isSelected: true,
          },
          {
            name: '主场',
            isSelected: false,
          },
          {
            name: '客场',
            isSelected: false,
          },
        ],
        awayTeam: [
          {
            name: '全部',
            isSelected: true,
          },
          {
            name: '主场',
            isSelected: false,
          },
          {
            name: '客场',
            isSelected: false,
          },
        ],
        //主场 场数  赛事
        homeFileds: DataAnalysis.getFileds(lateFight.home),
        homeGames: DataAnalysis.getAllgames(lateFight.home),
        homeGamezk: [
          {
            name: '全部',
            isSelected: true,
          },
          {
            name: '主场',
            isSelected: false,
          },
          {
            name: '客场',
            isSelected: false,
          },
        ],
        //客场 场数  赛事
        guestFileds: DataAnalysis.getFileds(lateFight.guest),
        guestGames: DataAnalysis.getAllgames(lateFight.guest),
        guestGamezk: [
          {
            name: '全部',
            isSelected: true,
          },
          {
            name: '主场',
            isSelected: false,
          },
          {
            name: '客场',
            isSelected: false,
          },
        ],
      },
      lastFightEuroActive_home: '',
      lastFightAsiaActive_home: '',
      lastFightEuroActive_guest: '',
      lastFightAsiaActive_guest: '',
    };
  }
  /*  */
  /* 
     *历史交锋 
      type: history , lastFight
      team: 近期战绩的home guest
    */
  getColums(type, team): any {
    let {
      historyAsiaActive,
      historyEuroActive,
      lastFightEuroActive_home,
      lastFightAsiaActive_home,
      lastFightEuroActive_guest,
      lastFightAsiaActive_guest,
    } = this.state;
    const { historyBout, lateFight } = this.props;
    let euroList = [],
      asiaList = [];
    if (type == 'history') {
      euroList =
        historyBout && historyBout[0]
          ? historyBout[0].euroList
            ? historyBout[0].euroList
            : []
          : [];
      asiaList =
        historyBout && historyBout[0]
          ? historyBout[0].asiaList
            ? historyBout[0].asiaList
            : []
          : [];
    } else if (type == 'lastFight') {
      euroList =
        lateFight[team] && lateFight[team][0]
          ? lateFight[team][0].euroList
            ? lateFight[team][0].euroList
            : []
          : [];
      asiaList =
        lateFight[team] && lateFight[team][0]
          ? lateFight[team][0].asiaList
            ? lateFight[team][0].asiaList
            : []
          : [];
    }

    return [
      {
        title: '赛事',
        align: 'center',
        dataIndex: 'leagueName',
        key: 'leagueName',
        render: (text, record) => {
          return (
            <div>
              {/* <img className="league-head" style={{width:}} src={record.leagueLogo} alt="" /> */}
              <a>{text}</a>
            </div>
          );
        },
      },
      {
        title: '时间',
        align: 'center',
        dataIndex: 'forecastStartTime',
        key: 'forecastStartTime',
      },
      {
        align: 'center',
        title: '主场球队',
        dataIndex: 'homeName',
        key: 'homeName',
      },
      {
        align: 'center',
        title: '比分',
        dataIndex: 'scoreAll',
        key: 'scoreAll',
      },
      {
        title: '客场球队',
        align: 'center',
        key: 'guestName',
        dataIndex: 'guestName',
        render(text, rowData) {
          return text;
        },
      },
      {
        title: '半场',
        align: 'center',
        key: 'scoreHalf',
        dataIndex: 'scoreHalf',
      },
      {
        title: '角球',
        align: 'center',
        key: 'cornerRatio',
        dataIndex: 'cornerRatio',
      },
      {
        title: '胜负',
        align: 'center',
        key: 'SPF',
        dataIndex: 'SPF',
        render: text => {
          let result = '';
          switch (text * 1) {
            case 1:
              result = '胜';
              break;
            case 2:
              result = '平';
              break;
            case 3:
              result = '负';
              break;
            default:
              result = '未知';
              break;
          }
          return result;
        },
      },
      /* 欧赔 */
      {
        title: () => {
          let companyName = '';
          if (type == 'history') {
            console.log(euroList);
            euroList.forEach(item => {
              if (item.companyId == historyEuroActive) {
                companyName = item.companyName;
              }
            });
          } else if (type == 'lastFight' && team == 'home') {
            euroList.forEach(item => {
              if (item.companyId == lastFightEuroActive_home) {
                companyName = item.companyName;
              }
            });
          } else if (type == 'lastFight' && team == 'guest') {
            euroList.forEach(item => {
              if (item.companyId == lastFightEuroActive_guest) {
                companyName = item.companyName;
              }
            });
          }

          //如果不存在 则默认显示第一个
          if (!companyName) {
            companyName =
              euroList[0] && euroList[0].companyName
                ? euroList[0].companyName
                : '无';
          }
          return (
            <div className="historyBount_euro">
              <div>
                {companyName}
                <DownOutlined style={{fontSize:10, marginLeft:5}}/> 胜负
              </div>
              <div className="historyBount_eurolist">
                <ul>
                  {euroList &&
                    euroList.map((item, index) => {
                      if (type == 'history') {
                        return (
                          <li
                          style={{color:historyEuroActive == item.companyId?"#333E7D":"#666666"}}
                            onClick={() =>
                              this.setState({
                                historyEuroActive: item.companyId,
                              })
                            }
                          >
                            {companyName == item.companyName &&  <CheckOutlined style={{color:"#333E7D"}}/> }{item.companyName}
                          </li>
                        );
                      } else if (type == 'lastFight' && team == 'home') {
                        return (
                          <li
                          style={{color:lastFightEuroActive_home == item.companyId?"#333E7D":"#666666"}}
                            onClick={() =>
                              this.setState({
                                lastFightEuroActive_home: item.companyId,
                              })
                            }
                          >
                            {companyName == item.companyName &&  <CheckOutlined style={{color:"#333E7D"}}/> }{item.companyName}
                          </li>
                        );
                      } else if (type == 'lastFight' && team == 'guest') {
                        return (
                           <li
                            style={{color:lastFightEuroActive_guest == item.companyId?"#333E7D":"#666666"}}
                            onClick={() =>
                              this.setState({
                                lastFightEuroActive_guest: item.companyId,
                              })
                            }
                          >
                            {companyName == item.companyName && <CheckOutlined style={{color:"#333E7D"}}/>} {item.companyName}
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            </div>
          );
        },
        dataIndex: 'euroList',
        key: 'euroList',
        align: 'center',
        render: euroList => {
          let oddsNew = '';
          if (type == 'history') {
            euroList.forEach(item => {
              if (item.companyId == historyEuroActive) {
                oddsNew = item.oddsNew;
              }
            });
          } else if (type == 'lastFight' && team == 'home') {
            euroList.forEach(item => {
              if (item.companyId == lastFightEuroActive_home) {
                oddsNew = item.oddsNew;
              }
            });
          } else if (type == 'lastFight' && team == 'guest') {
            euroList.forEach(item => {
              if (item.companyId == lastFightEuroActive_guest) {
                oddsNew = item.oddsNew;
              }
            });
          }
          if (!oddsNew) {
            oddsNew = isEmpty(euroList) ? '' : euroList[0].oddsNew;
          }
          let index = oddsNew ? oddsNew.lastIndexOf('_') : 0;
          let oddStr = oddsNew ? oddsNew.slice(index + 1) : '';
          let odds = oddStr ? oddStr.split(',') : [];
          return (
            <div className="odds">
              <span>{odds[0] || '空'}</span>
              <span>{odds[1] || '空'}</span>
              <span>{odds[2] || '空'}</span>
            </div>
          );
        },
      },
      /* 亚赔 */
      {
        title: () => {
          let companyName = '';
          if (type == 'history') {
            asiaList.forEach(item => {
              if (item.companyId == historyAsiaActive) {
                companyName = item.companyName;
              }
            });
          } else if (type == 'lastFight' && team == 'home') {
            asiaList.forEach(item => {
              if (item.companyId == lastFightAsiaActive_home) {
                companyName = item.companyName;
              }
            });
          } else if (type == 'lastFight' && team == 'guest') {
            asiaList.forEach(item => {
              if (item.companyId == lastFightAsiaActive_guest) {
                companyName = item.companyName;
              }
            });
          }

          //如果不存在 则默认显示第一个
          if (!companyName) {
            companyName =
              asiaList[0] && asiaList[0].companyName
                ? asiaList[0].companyName
                : '无';
          }
          return (
            <div className="historyBount_euro">
              <div>
                {companyName}
                <DownOutlined style={{fontSize:10, marginLeft:5}}/> 让球
              </div>
              <div className="historyBount_eurolist">
                <ul>
                  {asiaList &&
                    asiaList.map((item, index) => {
                      if (type == 'history') {
                        return (
                          <li
                          style={{color:historyAsiaActive == item.companyId?"#333E7D":"#666666"}}
                            onClick={() =>
                              this.setState({
                                historyAsiaActive: item.companyId,
                              })
                            }
                          >
                             {companyName == item.companyName && <CheckOutlined style={{color:"#333E7D"}}/>}{item.companyName}
                          </li>
                        );
                      } else if (type == 'lastFight' && team == 'home') {
                        return (
                          <li
                          style={{color:lastFightAsiaActive_home == item.companyId?"#333E7D":"#666666"}}
                            onClick={() =>
                              this.setState({
                                lastFightAsiaActive_home: item.companyId,
                              })
                            }
                          >
                             {companyName == item.companyName && <CheckOutlined style={{color:"#333E7D"}}/>}{item.companyName}
                          </li>
                        );
                      } else if (type == 'lastFight' && team == 'guest') {
                        return (
                          <li
                          style={{color:lastFightAsiaActive_guest == item.companyId?"#333E7D":"#666666"}}
                            onClick={() =>
                              this.setState({
                                lastFightAsiaActive_guest: item.companyId,
                              })
                            }
                          >
                           {companyName == item.companyName && <CheckOutlined style={{color:"#333E7D"}}/>} {item.companyName}
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            </div>
          );
        },
        dataIndex: 'asiaList',
        align: 'center',
        key: 'asiaList',
        render: asiaList => {
          let oddsNew = '';
          if (type == 'history') {
            asiaList.forEach(item => {
              if (item.companyId == historyAsiaActive) {
                oddsNew = item.oddsNew;
              }
            });
          } else if (type == 'lastFight' && team == 'home') {
            asiaList.forEach(item => {
              if (item.companyId == lastFightAsiaActive_home) {
                oddsNew = item.oddsNew;
              }
            });
          } else if (type == 'lastFight' && team == 'guest') {
            asiaList.forEach(item => {
              if (item.companyId == lastFightAsiaActive_guest) {
                oddsNew = item.oddsNew;
              }
            });
          }
          if (!oddsNew) {
            oddsNew = isEmpty(asiaList) ? '' : asiaList[0].oddsNew;
          }
          let oddArr = oddsNew ? oddsNew.split('_') : '';
          let odds = oddArr[2] ? oddArr[2].split(',') : [];
          return (
            <div className="odds">
              <span>{oddArr[1] || '空'}</span>
              <span>{odds[0] || '空'}</span>
              <span>{odds[1] || '空'}</span>
            </div>
          );
        },
      },
      {
        title: '走势',
        key: 'asiaList',
        align: 'center',
        dataIndex: 'asiaList',
        render: asiaList => {
          let text = '';
          let trend = 4;

          if (type == 'history') {
            if (historyAsiaActive == '') {
              historyAsiaActive = asiaList[0] ? asiaList[0].companyId : '';
            }
            asiaList.forEach(item => {
              if (item.companyId == historyAsiaActive) {
                trend = item.trend;
              }
            });
          } else {
            if (team == 'home') {
              if (lastFightAsiaActive_home == '') {
                lastFightAsiaActive_home = asiaList[0]
                  ? asiaList[0].companyId
                  : '';
              }
              asiaList.forEach(item => {
                if (item.companyId == lastFightAsiaActive_home) {
                  trend = item.trend;
                }
              });
            } else {
              if (lastFightAsiaActive_guest == '') {
                lastFightAsiaActive_guest = asiaList[0]
                  ? asiaList[0].companyId
                  : '';
              }
              asiaList.forEach(item => {
                if (item.companyId == lastFightAsiaActive_guest) {
                  trend = item.trend;
                }
              });
            }
          }

          switch (trend * 1) {
            case 1:
              text = '赢';
              break;
            case 2:
              text = '走';
              break;
            case 3:
              text = '输';
              break;
            default:
              text = '未知';
              break;
          }
          return text;
        },
      },
      {
        title: '进球数',
        align: 'center',
        key: 'bigList',
        dataIndex: 'bigList',
        render: bigList => {
          let text = '';
          let inBall = bigList && bigList[0] ? bigList[0].big : '4';
          switch (inBall * 1) {
            case 1:
              text = '大';
              break;
            case 2:
              text = '走';
              break;
            case 3:
              text = '小';
              break;
            default:
              text = '未知';
              break;
          }
          return <span>{text}</span>;
        },
      },
    ];
  }
  /* 过滤 zkSame 主客是否相同 */
  zkSame(chooseIndex) {
    const { historyFilter } = this.state;
    historyFilter.radioChecks = historyFilter.radioChecks.map((item, index) => {
      item.active = false;
      if (index == chooseIndex) {
        item.active = true;
      }
      return item;
    });
    this.setState({
      historyFilter,
    });
  }
  /* 
     *比赛场数 
       value: 选择的值
       type: 历史  近期
       team:近期  主队 客队  
    */
  changeFiled(value, type, team) {
    const { historyFilter, lastFightFilter } = this.state;
    if (type == 'history') {
      historyFilter.checkboxs.fileds = historyFilter.checkboxs.fileds.map(
        item => {
          item.selected = false;
          if (item.value == value) {
            item.selected = true;
          }
          return item;
        },
      );

      this.setState({
        historyFilter,
      });
    } else if (type == 'lastFight' && team == 'home') {
      lastFightFilter.homeFileds = lastFightFilter.homeFileds.map(item => {
        item.selected = false;
        if (item.value == value) {
          item.selected = true;
        }
        return item;
      });

      this.setState({
        lastFightFilter,
      });
    } else if (type == 'lastFight' && team == 'guest') {
      lastFightFilter.guestFileds = lastFightFilter.guestFileds.map(item => {
        item.selected = false;
        if (item.value == value) {
          item.selected = true;
        }
        return item;
      });

      this.setState({
        lastFightFilter,
      });
    }
  }
  /* 选择 联赛 */
  changeGame(value, type, team) {
    const { historyFilter, lastFightFilter } = this.state;
    console.log(value);
    if (type == 'lastFight' && team == 'guest') {
      lastFightFilter.guestGames = lastFightFilter.guestGames.map(item => {
        if (item.name == value) {
          item.isSelected = true;
        }
        return item;
      });

      this.setState({
        lastFightFilter,
      });
    }
    if (type == 'lastFight' && team == 'home') {
      lastFightFilter.homeGames = lastFightFilter.homeGames.map(item => {
        if (item.name == value) {
          item.isSelected = true;
        }
        return item;
      });

      this.setState({
        lastFightFilter,
      });
    }
  }
  /* 删除选择 */
  delchangeGame(value, type, team) {
    const { historyFilter, lastFightFilter } = this.state;
    console.log(value);
    if (type == 'lastFight' && team == 'guest') {
      lastFightFilter.guestGames = lastFightFilter.guestGames.map(item => {
        if (item.name == value) {
          item.isSelected = false;
        }
        return item;
      });

      this.setState({
        lastFightFilter,
      });
    }
    if (type == 'lastFight' && team == 'home') {
      lastFightFilter.homeGames = lastFightFilter.homeGames.map(item => {
        if (item.name == value) {
          item.isSelected = false;
        }
        return item;
      });

      this.setState({
        lastFightFilter,
      });
    } else if (type == 'history') {
      // lastFightFilter.homeFileds = lastFightFilter.homeFileds.map(item => {
      //     item.selected = false
      //     if (item.value == value) {
      //         item.selected = true
      //     }
      //     return item
      // })
      // this.setState({
      //     lastFightFilter
      // })
    }
  }
  /* 选择主场 客场 全部 */
  changeLastZK(value, type) {
    const { lastFightFilter } = this.state;
    lastFightFilter[type] = lastFightFilter[type].map(item => {
      item.isSelected = false;
      if (item.name == value) {
        item.isSelected = true;
      }
      return item;
    });
    console.log(lastFightFilter[type], 'lastFightFilter[type]');
    this.setState({
      lastFightFilter,
    });
  }
  /* 结果描述 */
  textInfo(textL, numInfo: { number: number; color: string }, textR) {
    return [
      <span>{textL}</span>,
      <span style={{ color: numInfo.color }}>{numInfo.number}</span>,
      <span>{textR}</span>,
    ];
  }
  /* 历史交锋 数据 */
  historyContent() {
    const { historyBout, baseData } = this.props;

    let { historyFilter, historyAsiaActive, historyEuroActive } = this.state;

    /* 历史交锋 场数 */
    let selectFiledVal = 0;
    historyFilter.checkboxs.fileds.forEach(item => {
      if (item.selected) {
        selectFiledVal = item.value;
      }
    });
    /* 历史交锋  赛事 */
    /* 主客相同 */
    let historyBoutList = JSON.parse(JSON.stringify(historyBout));
    historyFilter.radioChecks.forEach(item => {
      if (item.active == true && item.name == '主客相同') {
        historyBoutList = historyBoutList.filter(gameItem => {
          return gameItem.homeId == baseData.homeId;
        });
      }
    });
    /* 统计 */
    let theShowList = historyBout.slice(0, selectFiledVal);
    let showListNum =
      historyBout.length > selectFiledVal ? selectFiledVal : historyBout.length;
    //胜平负
    let win = theShowList.filter(item => item.SPF == 1).length;
    let draw = theShowList.filter(item => item.SPF == 2).length;
    let lose = theShowList.filter(item => item.SPF == 3).length;
    //赢走输
    let trendWin = 0,
      trendGo = 0,
      trendLost = 0;
    //如果historyAsiaActive为"",则给默认值
    if (historyAsiaActive == '') {
      historyAsiaActive =
        historyBout[0] && historyBout[0].asiaList
          ? historyBout[0].asiaList[0]
            ? historyBout[0].asiaList[0].companyId
            : ''
          : '';
    }
    theShowList.forEach(item => {
      item.asiaList.forEach(item => {
        if (item.companyId == historyAsiaActive && item.trend == 1) {
          trendWin += 1;
        } else if (item.companyId == historyAsiaActive && item.trend == 2) {
          trendGo += 1;
        } else if (item.companyId == historyAsiaActive && item.trend == 3) {
          trendLost += 1;
        }
      });
    });
    //大球 小球
    let bigBall = 0,
      smallBall = 0;
    theShowList.forEach(item => {
      item.bigList.forEach(item => {
        if (item.companyId == historyAsiaActive && item.big == 1) {
          bigBall += 1;
        } else if (item.companyId == historyAsiaActive && item.big == 3) {
          smallBall += 1;
        }
      });
    });

    return (
      <div className="data_content">
        <Card
          bordered={false}
          title={<div className="left-title">历史交锋</div>}
        >
          <div style={{ margin: '10px 0' }}>
            <GetGamestate
              changeFiled={this.changeFiled.bind(this)}
              changeGame={this.changeGame.bind(this)}
              zkSame={this.zkSame.bind(this)}
              historyFilter={historyFilter}
              historyBout={historyBout}
            />
          </div>
          <div>
            <Table
              columns={this.getColums('history', '')}
              dataSource={historyBoutList.slice(0, selectFiledVal)}
              pagination={false}
            />
            {/* 统计 */}
            <div className="textInfo">
              {this.textInfo(
                '近',
                { number: showListNum, color: '#999' },
                '场交锋',
              )}
              。{this.textInfo('胜', { number: win, color: '#FF2625' }, '场')}，
              {this.textInfo('平', { number: draw, color: '#0D7DE0' }, '场')}，
              {this.textInfo('输', { number: lose, color: '#00C08E' }, '场')}；
              {this.textInfo(
                '近',
                { number: showListNum, color: '#999' },
                '场开盘',
              )}
              ，
              {this.textInfo('', { number: trendWin, color: '#FF2625' }, '赢')}
              {this.textInfo('', { number: trendGo, color: '#0D7DE0' }, '走')}
              {this.textInfo('', { number: trendLost, color: '#00C08E' }, '输')}
              ；
              {this.textInfo(
                '',
                { number: bigBall, color: '#00C08E' },
                '场为大球',
              )}
              ；
              {this.textInfo(
                '',
                { number: smallBall, color: '#00C08E' },
                '场为小球',
              )}
              ；
            </div>
          </div>
        </Card>
      </div>
    );
  }
  /* 近期战绩 */
  lateFightContent(list = [], team) {
    const { baseData } = this.props;
    let {
      lastFightFilter,
      lastFightAsiaActive_home,
      lastFightAsiaActive_guest,
    } = this.state;
    /* 场数 主客场 */
    let selectFiledVal_home = 0,
      selectFiledVal_guest = 0;
    if (team == 'home') {
      lastFightFilter.homeFileds.forEach(item => {
        if (item.selected) {
          selectFiledVal_home = item.value;
        }
      });
    } else {
      lastFightFilter.guestFileds.forEach(item => {
        if (item.selected) {
          selectFiledVal_guest = item.value;
        }
      });
    }

    /* 统计 */
    let theShowList_home = [],
      showListNum_home,
      theShowList_guest = [],
      showListNum_guest;

    if (team == 'home') {
      let homeGameSelect = [];
      //主客场赛选
      let homeGameZKSelect = '';
      lastFightFilter.homeGamezk.forEach(item => {
        if (item.isSelected) {
          homeGameZKSelect = item.name;
        }
      });
      //赛事赛选

      lastFightFilter.homeGames.forEach(item => {
        if (item.isSelected) {
          homeGameSelect.push(item.name);
        }
      });
      console.log(homeGameSelect, 'homeGameSelect');
      //场数赛选
      theShowList_home = list
        .filter(item => {
          if (homeGameSelect.indexOf(item.leagueName) >= 0) {
            if (homeGameZKSelect == '主场' && item.homeId == baseData.homeId) {
              return item;
            } else if (
              homeGameZKSelect == '客场' &&
              item.guestId == baseData.guestId
            ) {
              return item;
            } else if (homeGameZKSelect == '全部') {
              return item;
            }
          }
        })
        .slice(0, selectFiledVal_home);
      showListNum_home =
        list.length > selectFiledVal_home ? selectFiledVal_home : list.length;
    } else {
      let homeGusetSelect = [];
      //主客场赛选
      let gusetGameZKSelect = '';
      lastFightFilter.guestGamezk.forEach(item => {
        if (item.isSelected) {
          gusetGameZKSelect = item.name;
        }
      });
      lastFightFilter.guestGames.forEach(item => {
        if (item.isSelected) {
          homeGusetSelect.push(item.name);
        }
      });

      theShowList_guest = list
        .filter(item => {
          if (homeGusetSelect.indexOf(item.leagueName) >= 0) {
            if (gusetGameZKSelect == '主场' && item.homeId == baseData.homeId) {
              return item;
            } else if (
              gusetGameZKSelect == '客场' &&
              item.guestId == baseData.guestId
            ) {
              return item;
            } else if (gusetGameZKSelect == '全部') {
              return item;
            }
          }
        })
        .slice(0, selectFiledVal_guest);

      showListNum_guest =
        list.length > selectFiledVal_guest ? selectFiledVal_guest : list.length;
    }

    //胜平负
    let win_home = 0,
      draw_home = 0,
      lose_home = 0,
      win_guest = 0,
      draw_guest = 0,
      lose_guest = 0;
    if (team == 'home') {
      win_home = theShowList_home.filter(item => item.SPF == 1).length;
      draw_home = theShowList_home.filter(item => item.SPF == 2).length;
      lose_home = theShowList_home.filter(item => item.SPF == 3).length;
    } else {
      win_guest = theShowList_guest.filter(item => item.SPF == 1).length;
      draw_guest = theShowList_guest.filter(item => item.SPF == 2).length;
      lose_guest = theShowList_guest.filter(item => item.SPF == 3).length;
    }

    //赢走输
    let trendWin_home = 0,
      trendGo_home = 0,
      trendLost_home = 0,
      trendWin_guest = 0,
      trendGo_guest = 0,
      trendLost_guest = 0;
    //如果historyAsiaActive为"",则给默认值

    if (team == 'home') {
      if (lastFightAsiaActive_home == '') {
        lastFightAsiaActive_home =
          list[0] && list[0].asiaList
            ? list[0].asiaList[0]
              ? list[0].asiaList[0].companyId
              : ''
            : '';
      }
      theShowList_home.forEach(item => {
        item.asiaList.forEach(item => {
          if (
            item.companyId ==
              (team == 'home'
                ? lastFightAsiaActive_home
                : lastFightAsiaActive_guest) &&
            item.trend == 1
          ) {
            trendWin_home += 1;
          } else if (
            item.companyId ==
              (team == 'home'
                ? lastFightAsiaActive_home
                : lastFightAsiaActive_guest) &&
            item.trend == 2
          ) {
            trendGo_home += 1;
          } else if (
            item.companyId ==
              (team == 'home'
                ? lastFightAsiaActive_home
                : lastFightAsiaActive_guest) &&
            item.trend == 3
          ) {
            trendLost_home += 1;
          }
        });
      });
    } else {
      if (lastFightAsiaActive_guest == '') {
        lastFightAsiaActive_guest =
          list[0] && list[0].asiaList
            ? list[0].asiaList[0]
              ? list[0].asiaList[0].companyId
              : ''
            : '';
      }
      theShowList_guest.forEach(item => {
        item.asiaList.forEach(item => {
          if (
            item.companyId ==
              (team == 'home'
                ? lastFightAsiaActive_home
                : lastFightAsiaActive_guest) &&
            item.trend == 1
          ) {
            trendWin_guest += 1;
          } else if (
            item.companyId ==
              (team == 'home'
                ? lastFightAsiaActive_home
                : lastFightAsiaActive_guest) &&
            item.trend == 2
          ) {
            trendGo_guest += 1;
          } else if (
            item.companyId ==
              (team == 'home'
                ? lastFightAsiaActive_home
                : lastFightAsiaActive_guest) &&
            item.trend == 3
          ) {
            trendLost_guest += 1;
          }
        });
      });
    }

    //大球 小球
    let bigBall_home = 0,
      smallBall_home = 0,
      bigBall_guest = 0,
      smallBall_guest = 0,
      len = 0;
    if (team == 'home') {
      theShowList_home.forEach(item => {
        item.bigList.forEach(item => {
          if (
            item.companyId ==
              (team == 'home'
                ? lastFightAsiaActive_home
                : lastFightAsiaActive_guest) &&
            item.big == 1
          ) {
            bigBall_home += 1;
          } else if (
            item.companyId ==
              (team == 'home'
                ? lastFightAsiaActive_home
                : lastFightAsiaActive_guest) &&
            item.big == 3
          ) {
            smallBall_home += 1;
          }
        });
      });
      len = lastFightFilter.homeFileds.length;
    } else {
      theShowList_guest.forEach(item => {
        item.bigList.forEach(item => {
          if (
            item.companyId ==
              (team == 'home'
                ? lastFightAsiaActive_home
                : lastFightAsiaActive_guest) &&
            item.big == 1
          ) {
            bigBall_guest += 1;
          } else if (
            item.companyId ==
              (team == 'home'
                ? lastFightAsiaActive_home
                : lastFightAsiaActive_guest) &&
            item.big == 3
          ) {
            smallBall_guest += 1;
          }
        });
      });
      len = lastFightFilter.guestFileds.length;
    }

    /* 赛选默认选择 */
    let defaultVal = [];
    if (team == 'home') {
      lastFightFilter.homeGames.forEach(item => {
        if (item.isSelected) {
          defaultVal.push(item.name);
        }
      });
    } else {
      lastFightFilter.guestGames.forEach(item => {
        if (item.isSelected) {
          defaultVal.push(item.name);
        }
      });
    }
    return (
      <>
        <div style={{ margin: '10px 0' }}>
          <div className="filter-content">
            {team == 'home' ? (
              <div className="teamInfo">
                <img src={baseData.homeLogoUrl} alt="" />
                {baseData.homeName}
              </div>
            ) : (
              <div className="teamInfo">
                <img src={baseData.guestLogoUrl} alt="" />
                {baseData.gueestName}
              </div>
            )}
            <Select
              onSelect={value => this.changeFiled(value, 'lastFight', team)}
              defaultValue={
                team == 'home'
                  ? lastFightFilter.homeFileds[len - 1].name
                  : lastFightFilter.guestFileds[len - 1].name
              }
              style={{ width: 72 }}
            >
              {team == 'home'
                ? lastFightFilter.homeFileds.map(item => {
                    return (
                      <Option key={item.value} value={item.value}>
                        {item.name}
                      </Option>
                    );
                  })
                : lastFightFilter.guestFileds.map(item => {
                    return (
                      <Option key={item.value} value={item.value}>
                        {item.name}
                      </Option>
                    );
                  })}
            </Select>
            <Select
              onSelect={value =>
                this.changeLastZK(
                  value,
                  team == 'home' ? 'homeGamezk' : 'guestGamezk',
                )
              }
              defaultValue={
                team == 'home'
                  ? lastFightFilter.homeGamezk[0].name
                  : lastFightFilter.guestGamezk[0].name
              }
              style={{ width: 72 }}
            >
              {team == 'home'
                ? lastFightFilter.homeGamezk.map(item => {
                    return (
                      <Option key={item.name} value={item.name}>
                        {item.name}
                      </Option>
                    );
                  })
                : lastFightFilter.guestGamezk.map(item => {
                    return (
                      <Option key={item.name} value={item.name}>
                        {item.name}
                      </Option>
                    );
                  })}
            </Select>
            <Select
              onSelect={value => this.changeGame(value, 'lastFight', team)}
              mode="multiple"
              defaultValue={defaultVal}
              onDeselect={value => this.delchangeGame(value, 'lastFight', team)}
              style={{ minWidth: 90 }}
            >
              {team == 'home'
                ? lastFightFilter.homeGames.map(item => {
                    return (
                      <Option key={item.name} value={item.name}>
                        {item.name}
                      </Option>
                    );
                  })
                : lastFightFilter.guestGames.map(item => {
                    return (
                      <Option key={item.name} value={item.name}>
                        {item.name}
                      </Option>
                    );
                  })}
            </Select>
          </div>
        </div>
        <div>
          <Table
            columns={this.getColums('lastFight', team)}
            dataSource={team == 'home' ? theShowList_home : theShowList_guest}
            pagination={false}
          />
          <div className="textInfo">
            {team == 'home' ? (
              <>
                {this.textInfo(
                  '近',
                  { number: showListNum_home, color: '#999' },
                  '场交锋',
                )}
                。
                {this.textInfo(
                  '胜',
                  { number: win_home, color: '#FF2625' },
                  '场',
                )}
                ，
                {this.textInfo(
                  '平',
                  { number: draw_home, color: '#0D7DE0' },
                  '场',
                )}
                ，
                {this.textInfo(
                  '输',
                  { number: lose_home, color: '#00C08E' },
                  '场',
                )}
                ；
                {this.textInfo(
                  '近',
                  { number: showListNum_home, color: '#999' },
                  '场开盘',
                )}
                ，
                {this.textInfo(
                  '',
                  { number: trendWin_home, color: '#FF2625' },
                  '赢',
                )}
                {this.textInfo(
                  '',
                  { number: trendGo_home, color: '#0D7DE0' },
                  '走',
                )}
                {this.textInfo(
                  '',
                  { number: trendLost_home, color: '#00C08E' },
                  '输',
                )}
                ；
                {this.textInfo(
                  '',
                  { number: bigBall_home, color: '#00C08E' },
                  '场为大球',
                )}
                ；
                {this.textInfo(
                  '',
                  { number: smallBall_home, color: '#00C08E' },
                  '场为小球',
                )}
                ；
              </>
            ) : (
              <>
                {this.textInfo(
                  '近',
                  { number: showListNum_guest, color: '#999' },
                  '场交锋',
                )}
                。
                {this.textInfo(
                  '胜',
                  { number: win_guest, color: '#FF2625' },
                  '场',
                )}
                ，
                {this.textInfo(
                  '平',
                  { number: draw_guest, color: '#0D7DE0' },
                  '场',
                )}
                ，
                {this.textInfo(
                  '输',
                  { number: lose_guest, color: '#00C08E' },
                  '场',
                )}
                ；
                {this.textInfo(
                  '近',
                  { number: showListNum_guest, color: '#999' },
                  '场开盘',
                )}
                ，
                {this.textInfo(
                  '',
                  { number: trendWin_guest, color: '#FF2625' },
                  '赢',
                )}
                {this.textInfo(
                  '',
                  { number: trendGo_guest, color: '#0D7DE0' },
                  '走',
                )}
                {this.textInfo(
                  '',
                  { number: trendLost_guest, color: '#00C08E' },
                  '输',
                )}
                ；
                {this.textInfo(
                  '',
                  { number: bigBall_guest, color: '#00C08E' },
                  '场为大球',
                )}
                ；
                {this.textInfo(
                  '',
                  { number: smallBall_guest, color: '#00C08E' },
                  '场为小球',
                )}
                ；
              </>
            )}
          </div>
        </div>
      </>
    );
  }
  /* 联赛积分 Colum*/
  getRankColums(): any {
    return [
      {
        title: '',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        render: type => {
          let typeText = '';
          switch (type * 1) {
            case 1:
              typeText = '总积分';
              break;
            case 2:
              typeText = '主场';
              break;
            case 3:
              typeText = '客场';
              break;
          }
          return typeText;
        },
      },
      {
        title: '场数',
        align: 'center',
        dataIndex: 'matchNumber',
        key: 'matchNumber',
      },
      {
        title: '胜场',
        align: 'center',
        dataIndex: 'winNumber',
        key: 'winNumber',
      },
      {
        title: '负场',
        align: 'center',
        dataIndex: 'failureNumber',
        key: 'failureNumber',
      },
      {
        title: '平数',
        align: 'center',
        dataIndex: 'drawNumber',
        key: 'drawNumber',
      },
      {
        title: '进球',
        align: 'center',
        dataIndex: 'totalInGoal',
        key: 'totalInGoal',
      },
      {
        title: '失球',
        align: 'center',
        dataIndex: 'totalOutGoal',
        key: 'totalOutGoal',
      },
      {
        title: '净胜球',
        align: 'center',
        dataIndex: 'totalNetGoal',
        key: 'totalNetGoal',
      },
      {
        title: '积分',
        align: 'center',
        dataIndex: 'totalScore',
        key: 'totalScore',
      },
      {
        title: '排名',
        align: 'center',
        dataIndex: 'rankNumber',
        key: 'rankNumber',
      },
      {
        title: '胜率',
        align: 'center',
        dataIndex: 'winRate',
        key: 'winRate',
      },
    ];
  }

  /* 联赛积分 */
  matchRankContent() {
    const { matchRankList, baseData } = this.props;

    return (
      <div className="matchRank">
        <div>
          <div className="teamNameLogo">
            <img src={baseData.homeLogoUrl} alt="" />
            <span>{baseData.homeName}</span>
          </div>
          <Table
            bordered={true}
            columns={this.getRankColums()}
            dataSource={matchRankList.home}
            pagination={false}
          />
        </div>
        <div>
          <div className="teamNameLogo">
            <img src={baseData.guestLogoUrl} alt="" />
            <span>{baseData.gueestName}</span>
          </div>
          <Table
            bordered={true}
            columns={this.getRankColums()}
            dataSource={matchRankList.guest}
            pagination={false}
          />
        </div>
      </div>
    );
  }
  /* 未来赛事 Colum*/
  getFutureColums(): any {
    return [
      {
        title: '时间',
        dataIndex: 'forecastStartTime',
        key: 'forecastStartTime',
        align: 'center',
      },
      {
        title: '联赛',
        dataIndex: 'leagueName',
        key: 'leagueName',
        align: 'center',
      },
      {
        title: '比赛',
        key: 'homeName',
        align: 'center',
        width: '40%',
        dataIndex: 'homeName',
        render: (text, item) => {
          return (
            <span>
              {item.homeName} V S {item.guestName}
            </span>
          );
        },
      },
      {
        title: '相隔',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
      },
    ];
  }
  matchFutureContent() {
    const { matchFutureList, baseData } = this.props;

    return (
      <div className="future_content">
        <div>
          <div className="teamNameLogo">
            <img src={baseData.homeLogoUrl} alt="" />
            <span>{baseData.homeName}</span>
          </div>
          <Table
            tableLayout="fixed"
            bordered={true}
            columns={this.getFutureColums()}
            dataSource={matchFutureList.home}
            pagination={false}
          />
        </div>
        <div>
          <div className="teamNameLogo">
            <img src={baseData.guestLogoUrl} alt="" />
            <span>{baseData.gueestName}</span>
          </div>
          <Table
            tableLayout="fixed"
            bordered={true}
            columns={this.getFutureColums()}
            dataSource={matchFutureList.guest}
            pagination={false}
          />
        </div>
      </div>
    );
  }
  render() {
    const { historyBout, lateFight } = this.props;
    return (
      <div className="dataAnalysis">
        {/* 历史交锋 */}
        {this.historyContent()}
        {/* 近期战绩 */}
        <div className="data_content">
          <Card
            bordered={false}
            title={<div className="left-title">近期战绩</div>}
          >
            {this.lateFightContent(lateFight.home, 'home')}
            {this.lateFightContent(lateFight.guest, 'guest')}
          </Card>
        </div>

        {/* 联赛积分 */}
        <div className="data_content">
          <Card
            bordered={false}
            title={<div className="left-title">联赛积分</div>}
          >
            {this.matchRankContent()}
          </Card>
        </div>
        {/* 未来赛事 */}
        <div className="data_content">
          <Card
            bordered={false}
            title={<div className="left-title">未来赛事</div>}
          >
            {this.matchFutureContent()}
          </Card>
        </div>
      </div>
    );
  }
}
