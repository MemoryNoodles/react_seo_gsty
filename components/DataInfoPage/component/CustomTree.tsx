import React, { Component, ReactNode } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Link from 'next/link';
interface Props {
  areaList: any;
  filterName?: string;
}
interface State {
  dataSource: any[];
  expandKeys: number[];
}
export default class CustomTree extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    const { areaList = [] } = this.props;
    this.state = {
      expandKeys: [],
      dataSource: [...(areaList || [])],
    };
  }
  expandFun = (item: any) => {
    const { expandKeys = [] } = this.state;
    const index = expandKeys.indexOf(item.areaId);
    if (index > -1) {
      expandKeys.splice(index, 1);
    } else {
      expandKeys.push(item.areaId);
    }
    this.setState({
      expandKeys,
    });
  };
  render(): ReactNode {
    const { dataSource = [], expandKeys = [] } = this.state;
    const { filterName = '' } = this.props;
    return (
      <div className="tree-wrap">
        {dataSource.map(item => {
          const flag = expandKeys.some(numberItem => {
            return numberItem === item.areaId;
          });

          let hideFlag = item.areaName.indexOf(filterName) > -1;
          if (!hideFlag) {
            hideFlag = item.leagueList.some(
              (subItem: { leagueName: string | string[] }) => {
                return subItem.leagueName.indexOf(filterName) > -1;
              },
            );
          }
          return (
            <div
              key={item.areaId}
              className={`tree-item ${hideFlag ? '' : 'hide'}`}
            >
              <p
                className="tree-item-head"
                onClick={() => this.expandFun(item)}
              >
                <span className="indent">
                  {flag ? <MinusOutlined /> : <PlusOutlined />}
                </span>
                {/* <span className="avatar" /> */}
                <span style={{ verticalAlign: 'middle' }}>{item.areaName}</span>
              </p>
              <div className={`tree-item-content ${flag ? '' : 'hide'}`}>
                {item.leagueList.map(
                  (subItem: {
                    leagueId: React.Key;
                    quarterId: string;
                    leagueLogo: string;
                    leagueName: string;
                  }) => {
                    return (
                      <Link
                        href={`/league?id=${subItem.quarterId}`}
                        as={`/league-${subItem.quarterId}`}
                        key={subItem.leagueId}
                      >
                        <a target="_blank">
                          <p
                            className={`tree-chilren-item ${
                              subItem.leagueName.indexOf(filterName) === -1
                                ? 'hide'
                                : ''
                            }`}
                          >
                            <span
                              className="indent"
                              style={{
                                width: '20px',
                                height: '16px',
                                margin: 0,
                              }}
                            ></span>
                            <span className="indent">
                              <img
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  display: 'inline-block',
                                }}
                                src={
                                  subItem.leagueLogo ||
                                  '/static/image/defaultTeam.png'
                                }
                                alt={subItem.leagueName}
                                title={subItem.leagueName}
                                onError={e => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/static/image/defaultTeam.png';
                                }}
                              />
                            </span>
                            <span style={{ verticalAlign: 'middle' }}>
                              {subItem.leagueName}
                            </span>
                          </p>
                        </a>
                      </Link>
                    );
                  },
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
