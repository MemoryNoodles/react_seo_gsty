import React, { Component, ReactNode } from 'react';
import { Tabs, Table, Radio, Select } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import DataTable from './dataTable';
import ScheduleResults from './ScheduleResults';
import moment from 'moment';
import { RadioChangeEvent } from 'antd/lib/radio';
import { isEmpty } from '../../../utils';
const { Option } = Select;
interface Props {
  leagueAllList: any;
  matchList: any;
  group: any;
  matchRankList: any;
  statTeamList: any;
  statMemberList: any;
  quarterAsiaList: any;
  quarterBigList: any;
  quarterBQList: any;
}
interface State {
  matchTypeArr: any;
  dataTabActiveKey: string;
  childGroupItem: { groupId?: string | number; groupName?: string };
  asiaComList: any;
  bigComList: any;
  euroComList: any;
  companyOddType: string;
  selectComId: string | number;
}

export default class LeagueDetails extends Component<Props, State> {
  leagueDataTabArr: { name: string; value: string }[];
  dataFilterList: { value: string; name: string }[][];
  constructor(props: any) {
    super(props);
    const { matchList = [] } = props;
    const {
      asiaComList = [],
      bigComList = [],
      euroComList = [],
      selectComId,
    } = this.initCompanyList(matchList);
    this.state = {
      matchTypeArr: (() => {
        const arr = [];
        for (let i = 1; i <= 38; i++) {
          arr.push({ id: Math.random(), name: `${i}` });
        }
        return arr;
      })(),

      dataTabActiveKey: '1',

      childGroupItem: {},

      asiaComList,
      bigComList,
      euroComList,

      companyOddType: '1',

      selectComId,
    };
    this.leagueDataTabArr = [
      { name: '积分榜', value: '1' },
      { name: '球队数据', value: '2' },
      { name: '球员数据', value: '3' },
      { name: '让球', value: '4' },
      { name: '进球数', value: '5' },
      { name: '半全场', value: '6' },
    ];
    this.dataFilterList = [
      [
        { value: '1', name: '总积分' },
        { value: '2', name: '主场积分' },
        { value: '3', name: '客场积分' },
        { value: '4', name: '半场总积分' },
        { value: '5', name: '半场主场积分' },
        { value: '6', name: '半场客场积分' },
      ],
      [
        { value: '1', name: '射手榜' },
        { value: '2', name: '助攻榜' },
        { value: '3', name: '球员防守' },
        { value: '4', name: '球队数据' },
      ],
      [
        { value: '1', name: '射手榜' },
        { value: '2', name: '助攻榜' },
        { value: '3', name: '球员防守' },
        { value: '4', name: '球队数据' },
      ],
      [
        { value: '1', name: '综合走势' },
        { value: '2', name: '主场走势' },
        { value: '3', name: '客场走势' },
        // { value: '4', name: '半场总走势' },
        // { value: '5', name: '半场主场走势' },
        // { value: '6', name: '半场客场走势' },
      ],
      [
        { value: '1', name: '综合走势' },
        { value: '2', name: '主场走势' },
        { value: '3', name: '客场走势' },
        // { value: '4', name: '半场总走势' },
        // { value: '5', name: '半场主场走势' },
        // { value: '6', name: '半场客场走势' },
      ],
      [
        { value: '1', name: '总计' },
        { value: '2', name: '主场' },
        { value: '3', name: '客场' },
      ],
    ];
  }

  initCompanyList = (matchList = []) => {
    const asiaComList = [],
      bigComList = [],
      euroComList = [];
    matchList.map(item => {
      item.asiaList &&
        item.asiaList.map((subItem: { companyId: any; companyName: any }) => {
          const asiaFlag = asiaComList.some(
            flagItem => subItem.companyId == flagItem.companyId,
          );
          if (!asiaFlag) {
            asiaComList.push({
              companyId: subItem.companyId || '',
              companyName: subItem.companyName || '',
            });
          }
        });

      item.bigList &&
        item.bigList.map((subItem: { companyId: any; companyName: any }) => {
          const bigFlag = bigComList.some(
            flagItem => subItem.companyId == flagItem.companyId,
          );
          if (!bigFlag) {
            bigComList.push({
              companyId: subItem.companyId || '',
              companyName: subItem.companyName || '',
            });
          }
        });

      item.euroList &&
        item.euroList.map((subItem: { companyId: any; companyName: any }) => {
          const euroFlag = euroComList.some(
            flagItem => subItem.companyId == flagItem.companyId,
          );
          if (!euroFlag) {
            euroComList.push({
              companyId: subItem.companyId || '',
              companyName: subItem.companyName || '',
            });
          }
        });
    });
    return {
      asiaComList,
      bigComList,
      euroComList,
      selectComId: !isEmpty(asiaComList) ? asiaComList[0].companyId : '',
    };
  };

  dataTabChange = (activeKey: string) => {
    this.setState({
      dataTabActiveKey: activeKey,
    });
  };

  childGroupChange = (item: any) => {
    this.setState({
      childGroupItem: { ...item },
    });
  };

  companyOddsTypeChange = (e: RadioChangeEvent) => {
    const {
      companyOddType = '1',
      asiaComList = [],
      bigComList = [],
      euroComList = [],
    } = this.state;
    const companyList = [[...asiaComList], [...bigComList], [...euroComList]][
      parseInt(companyOddType) - 1
    ];
    this.setState({
      companyOddType: e.target.value,
      selectComId: !isEmpty(companyList) ? companyList[0].companyId : '',
    });
  };

  //处理公司和赔率之间的数据

  render(): ReactNode {
    const {
      matchTypeArr = [],
      dataTabActiveKey = '1',
      childGroupItem = {},
      companyOddType = '1',
      asiaComList = [],
      bigComList = [],
      euroComList = [],
      selectComId = '',
    } = this.state;
    const {
      matchList = [],
      group = [],
      matchRankList = [],
      statTeamList = [],
      statMemberList = [],
      quarterAsiaList = [],
      quarterBigList = [],
      quarterBQList = [],
    } = this.props;
    const dataArr = [
      [],
      [...matchRankList],
      [...statTeamList],
      [...statMemberList],
      [...quarterAsiaList],
      [...quarterBigList],
      [...quarterBQList],
    ];

    const columns: ColumnsType = [
      {
        title: '轮次',
        dataIndex: 'groupId',
        align: 'center',
        key: 'groupId',
        render(value) {
          let valueName = value || '';
          group.some(
            (item: {
              groupId: any;
              groupName: any;
              child: { groupId: any; groupName: any }[];
            }) => {
              if (value == item.groupId) {
                valueName = item.groupName;
                return true;
              } else {
                return (
                  item.child &&
                  item.child.some(
                    (subItem: { groupId: any; groupName: any }) => {
                      if (value == subItem.groupId) {
                        valueName = subItem.groupName;
                        return true;
                      }
                    },
                  )
                );
              }
            },
          );
          return valueName;
        },
      },
      {
        title: '时间',
        align: 'center',
        dataIndex: 'forecastStartTime',
        key: 'forecastStartTime',
        render(value) {
          return value ? (
            <div>
              <p>{moment(value).format('MM-DD')}</p>
              <p>{moment(value).format('HH:mm')}</p>
            </div>
          ) : (
            ''
          );
        },
      },
      {
        width: '13%',
        title: '主队',
        dataIndex: 'homeName',
        align: 'center',
        key: 'homeName',
        render: (text: string, rowData: any) => {
          return (
            <a target="_blank" title={text} href={`/team-${rowData.homeId}`}>
              {text}
            </a>
          );
        },
      },
      {
        title: '比分',
        dataIndex: 'scoreAll',
        align: 'center',
        key: 'scoreAll',
        render(value) {
          return value || '0:0';
        },
      },
      {
        width: '13%',
        title: '客队',
        dataIndex: 'guestName',
        align: 'center',
        key: 'guestName',
        render: (text: string, rowData: any) => {
          return (
            <a target="_blank" title={text} href={`/team-${rowData.guestId}`}>
              {text}
            </a>
          );
        },
      },
      {
        width: '26%',
        title: () => {
          const companyList = [
            [...asiaComList],
            [...bigComList],
            [...euroComList],
          ][parseInt(companyOddType) - 1];
          return (
            <div>
              <Radio.Group
                onChange={e => this.companyOddsTypeChange(e)}
                defaultValue={companyOddType}
                buttonStyle="solid"
              >
                <Radio value={'1'}>亚指</Radio>
                <Radio value={'2'}>大小</Radio>
                <Radio value={'3'}>欧指</Radio>
              </Radio.Group>
              <div className="select-com">
                <span>初盘:</span>
                <Select
                  onChange={value => this.setState({ selectComId: value })}
                  value={
                    selectComId ||
                    (!isEmpty(companyList) ? companyList[0].companyId : '')
                  }
                >
                  {companyList.map(item => {
                    return (
                      <Option key={item.companyId} value={item.companyId}>
                        {item.companyName}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
          );
        },
        dataIndex: 'address',
        align: 'center',
        key: 'address',
        render(value, record: any, index) {
          const oddsList =
            [
              [...(record.asiaList || [])],
              [...(record.bigList || [])],
              [...(record.euroList || [])],
            ][parseInt(companyOddType) - 1] || [];
          const findObj = oddsList.find(item => {
            return item.companyId == selectComId;
          });

          /*
            时间_盘口_赔率@时间_盘口_赔率 
            越在前面的时间越早,即初赔是第一个,即时赔是最后一个
            赔率是用","号隔开的
          */

          if (findObj && findObj.oddsNew) {
            const oddsNewStr = findObj.oddsNew.split('_')[
              findObj.oddsNew.split('_').length - 1
            ];
            return (
              <div className="odds-wrap">
                {oddsNewStr.split(',').map((item: string, index: number) => {
                  return (
                    <span key={item + index}>
                      <span>{item}</span>
                    </span>
                  );
                })}
              </div>
            );
          }
          // console.log(record.asiaList, 'asiaList');
          // console.log(record.euroList, 'euroList');
          return findObj && findObj.oddsNew;
        },
      },
      {
        width: '10%',
        title: '资料',
        dataIndex: 'address',
        align: 'center',
        key: 'address',
        render(text, rowData: any) {
          return (
            <div>
              <p>
                <a target="_blank" href={`/matchDetail-${rowData.dataId}`}>
                  [析]
                </a>
                <a target="_blank" href={`/europeanOdds-${rowData.dataId}`}>
                  [欧]
                </a>
              </p>
              <p>
                <a target="_blank" href={`/battleLetBall-${rowData.dataId}`}>
                  [亚]
                </a>
                <a target="_blank" href={`/goals-${rowData.dataId}`}>
                  [大]
                </a>
              </p>
            </div>
          );
        },
      },
      {
        width: '10%',
        title: '半场',
        dataIndex: 'scoreHalf',
        align: 'center',
        key: 'scoreHalf',
        render(value) {
          return value || '0:0';
        },
      },
    ];
    return (
      <div className="match-details-box">
        {/* <Tabs defaultActiveKey="1">
          {this.leagueTypeArr.map(item => {
            return (
              <Tabs.TabPane forceRender tab={item.name} key={item.value} />
            );
          })}
        </Tabs> */}
        <ScheduleResults
          childGroupChange={(item: any) => this.childGroupChange(item)}
          matchTypeArr={group}
        />

        <div className="match-schedule-results">
          <Table
            tableLayout="fixed"
            columns={columns}
            dataSource={matchList}
            pagination={false}
            rowClassName={(record: any, index) => {
              if (record.groupId != childGroupItem.groupId) {
                return 'row-hide';
              }
              return '';
            }}
          />
        </div>
        <div>
          <Tabs
            defaultActiveKey={dataTabActiveKey}
            onChange={activeKey => this.dataTabChange(activeKey)}
          >
            {this.leagueDataTabArr.map(item => {
              return (
                <Tabs.TabPane forceRender tab={item.name} key={item.value}>
                  <DataTable
                    dataTabActiveKey={item.value}
                    dataSource={dataArr[parseInt(item.value)] || []}
                    typeArr={this.dataFilterList[parseInt(item.value) - 1]}
                  />
                </Tabs.TabPane>
              );
            })}
          </Tabs>
        </div>
      </div>
    );
  }
}
