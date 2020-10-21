import React, { Component, ReactNode } from 'react';
import LeagueTree from './component/leagueTree';
import './index.less';
import { Tabs, Select } from 'antd';
import LeagueDetails from './component/leagueDetails';
import { isEmpty } from '../../utils';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { DownOutlined } from '@ant-design/icons';
const { Option } = Select;
interface Props {
  leagueAllList: any;
  quarterList: any;
  quarterBase: any;
  router: any;
  type: number;
  quarterMatchList: any;
  matchRankList: any;
  statTeamList: any;
  statMemberList: any;
  quarterAsiaList: any;
  quarterBigList: any;
  quarterBQList: any;
}
interface State {}

class DataInfoPage extends Component<Props, State> {
  leagueDataArr: { name: string; value: string }[];
  constructor(props: any) {
    super(props);
    this.state = {};
    this.leagueDataArr = [
      { name: '英超', value: '1' },
      { name: '意甲', value: '2' },
      { name: '西甲', value: '3' },
      { name: '德甲', value: '4' },
      { name: '法甲', value: '5' },
    ];
  }

  render(): ReactNode {
    const {
      leagueAllList = {},
      quarterList = [],
      quarterBase = {},
      router = {},
      type = 1,
      quarterMatchList = {},
      matchRankList = [],
      statTeamList = [],
      statMemberList = [],
      quarterAsiaList = [],
      quarterBigList = [],
      quarterBQList = [],
    } = this.props;
    const { query = {} } = router;
    const { id = '' } = query;
    const { hot = [], base = [] } = leagueAllList;
    const { matchList = [], group = [] } = quarterMatchList;
    const hotActiveIndex = hot.findIndex(
      (item: { quarterId: any }) => item.quarterId == id,
    );
    let defaultActiveKey = '';

    if (hotActiveIndex > -1) {
      defaultActiveKey = hot[hotActiveIndex].leagueId;
    } else {
      defaultActiveKey = !isEmpty(hot) ? hot[0].leagueId : '';
    }
    let quarterName = '';
    const quarterIndex = quarterList.findIndex(
      (item: { quarterId: any }) => item.quarterId == id,
    );
    if (quarterIndex > -1) {
      quarterName = quarterList[quarterIndex].quarterName || '';
    } else {
      quarterName = !isEmpty(quarterList) ? quarterList[0].quarterName : '';
    }
    return (
      <div className="data-info-page">
        <div className="data-info-hot">
          {/* 联赛列表 */}
          <LeagueTree leagueAllList={leagueAllList} />
        </div>
        <div className="data-info-content">
          {/* 热门联赛的tab */}
          <div className="hot-league-tab-wrap">
            {type === 1 && (
              <Tabs activeKey={`${quarterBase.leagueId}`}>
                {hot.map(
                  (item: {
                    leagueName: string;
                    leagueId: React.ReactText;
                    quarterId: string;
                  }) => {
                    return (
                      <Tabs.TabPane
                        forceRender
                        tab={
                          <a
                            href={`/dataInfo-${item.quarterId}`}
                            title={item.leagueName}
                          >
                            {item.leagueName}
                          </a>
                        }
                        key={item.leagueId}
                      >
                        <div className="league-info">
                          <div className="league-logo-name">
                            <img
                              src={
                                quarterBase.leagueLogo ||
                                '/static/image/defaultTeam.png'
                              }
                              alt="联赛图片"
                              onError={e => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/static/image/defaultTeam.png';
                              }}
                            />
                            <h3 className="league-name">
                              {quarterName} {quarterBase.leagueName}
                            </h3>
                          </div>

                          <div className="league-filter-box">
                            <div className="select-border">
                              <span className="tip">
                                <span className="name">{quarterName}</span>
                                <DownOutlined />
                              </span>
                              <div className="down">
                                <ul className="max max-h-374">
                                  {quarterList.map(
                                    (item: {
                                      quarterId: string | number;
                                      quarterName: string;
                                    }) => {
                                      return (
                                        <li
                                          className={
                                            (id || quarterList[0].quarterId) ==
                                            item.quarterId
                                              ? 'active'
                                              : ''
                                          }
                                          key={item.quarterId}
                                          title={item.quarterName}
                                        >
                                          <a href={`/league-${item.quarterId}`}>
                                            {item.quarterName}
                                          </a>
                                        </li>
                                      );
                                    },
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tabs.TabPane>
                    );
                  },
                )}
              </Tabs>
            )}

            {type === 2 && (
              <div className="league-info">
                <div className="league-logo-name">
                  <img
                    src={
                      quarterBase.leagueLogo || '/static/image/defaultTeam.png'
                    }
                    alt="联赛图片"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/static/image/defaultTeam.png';
                    }}
                  />
                  <h3 className="league-name">
                    {quarterName} {quarterBase.leagueName}
                  </h3>
                </div>

                <div className="league-filter-box">
                  <div className="select-border">
                    <span className="tip">
                      <span className="name">{quarterName}</span>
                      <DownOutlined />
                    </span>
                    <div className="down">
                      <ul className="max max-h-374">
                        {quarterList.map(
                          (item: {
                            quarterId: string | number;
                            quarterName: string;
                          }) => {
                            return (
                              <li
                                className={id == item.quarterId ? 'active' : ''}
                                key={item.quarterId}
                                title={item.quarterName}
                              >
                                <a href={`/league-${item.quarterId}`}>
                                  {item.quarterName}
                                </a>
                              </li>
                            );
                          },
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="league-details-wrap">
            <LeagueDetails
              leagueAllList={leagueAllList}
              matchList={matchList}
              group={group}
              matchRankList={matchRankList}
              statTeamList={statTeamList}
              statMemberList={statMemberList}
              quarterAsiaList={quarterAsiaList}
              quarterBigList={quarterBigList}
              quarterBQList={quarterBQList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DataInfoPage);
