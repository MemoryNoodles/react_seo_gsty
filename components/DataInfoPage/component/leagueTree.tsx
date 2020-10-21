import React, { Component, ReactNode } from 'react';
import { Collapse, Input, Button, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CustomTree from './CustomTree';
import { isEmpty } from '../../../utils';
import Link from 'next/link';
const { TreeNode } = Tree;
const { Panel } = Collapse;
interface Props {
  leagueAllList: any;
}
interface State {
  filterName: string;
  filterNameStr: string;
}

export default class LeagueTree extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      filterName: '',
      filterNameStr: '',
    };
  }
  //过滤框输入改变
  filterValueChange = (e: any) => {
    console.log(e.target.value);
    this.setState({
      filterNameStr: e.target.value,
    });
  };

  render(): ReactNode {
    const { leagueAllList = {} } = this.props;
    const { hot = [], base = [] } = leagueAllList;
    const { filterName = '', filterNameStr = '' } = this.state;
    const hotInFilterFlag = hot.some(
      (item: { leagueName: string | string[] }) => {
        return item.leagueName.indexOf(filterName) > -1;
      },
    );

    return (
      <div className="">
        <div className="search-box">
          <Input
            value={filterNameStr}
            onChange={e => this.filterValueChange(e)}
            onPressEnter={(e: any) =>
              this.setState({
                filterNameStr: e.target.value,
                filterName: e.target.value,
              })
            }
            placeholder="请输入联赛名称"
          />
          <Button
            onClick={() => this.setState({ filterName: filterNameStr.trim() })}
            ghost
          >
            搜索
          </Button>
        </div>
        {(isEmpty(hot) || !isEmpty(base)) && (
          <Collapse accordion expandIconPosition="right" defaultActiveKey="1">
            {!isEmpty(hot) && hotInFilterFlag && (
              <Panel header="热门" key="1" className="hot">
                {hot.map((item: any) => {
                  return (
                    <Link
                      href={`/league?id=${item.quarterId}`}
                      as={`/league-${item.quarterId}`}
                      key={item.leagueId}
                    >
                      <a target="_blank">
                        <p
                          className={`league-item ${
                            item.leagueName.indexOf(filterName) > -1
                              ? ''
                              : 'hide'
                          }`}
                        >
                          <span>
                            <img
                              src={
                                item.leagueLogo ||
                                '/static/image/defaultTeam.png'
                              }
                              alt={item.leagueName}
                              title={item.leagueName}
                              onError={e => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/static/image/defaultTeam.png';
                              }}
                            />
                          </span>
                          <span>{item.leagueName}</span>
                        </p>
                      </a>
                    </Link>
                  );
                })}
              </Panel>
            )}
            {base.map(
              (item: {
                stateName: string;
                stateId: React.ReactText;
                areaList: any;
              }) => {
                //这个是判断是否符合过滤条件的
                let flag = item.stateName.indexOf(filterName) > -1;
                if (!flag) {
                  flag = item.areaList.some(
                    (subItem: {
                      areaName: string | string[];
                      leagueList: any[];
                    }) => {
                      return (
                        subItem.areaName.indexOf(filterName) > -1 ||
                        (subItem.leagueList &&
                          subItem.leagueList.some(
                            (secondItem: { leagueName: string | string[] }) => {
                              return (
                                secondItem.leagueName.indexOf(filterName) > -1
                              );
                            },
                          ))
                      );
                    },
                  );
                }
                return (
                  <Panel
                    header={item.stateName}
                    key={item.stateId}
                    className={!flag && 'hide'}
                  >
                    <CustomTree
                      filterName={filterName}
                      areaList={item.areaList}
                    />
                  </Panel>
                );
              },
            )}
          </Collapse>
        )}
      </div>
    );
  }
}
