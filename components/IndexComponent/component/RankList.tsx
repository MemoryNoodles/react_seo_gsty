import React, { Component, ReactNode } from 'react';
import { isEmpty } from '../../../utils';
import Link from 'next/link';

interface Props {
  data: any;
  rankTab: string;
}

interface State {}

export default class RankList extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
    // this.leagueTypeClassArr = [""]
  }
  // renderData=()=>{
  //   const { data = [] } = this.props;
  // }
  render(): ReactNode {
    const { data = [], rankTab = '1' } = this.props;
    return (
      <div className="rank-list-wrap">
        <div className="rank-list-head">
          <span>排名</span>
          <span style={{ flex: 2 }}>球队</span>
          <span>胜平负</span>
          <span>积分</span>
        </div>
        <div className="rank-list-body">
          {/* {data.map((item: any, index: number) => {
            if (isEmpty(item.rankList)) {
              return null;
            }
            return item.rankList.map(
              (
                subItem: {
                  teamName: string;
                  rankNumber: string;
                  winNumber: string;
                  drawNumber: string;
                  failureNumber: string;
                  totalScore: string;
                },
                subIndex: number,
              ) => {
                return (
                  <div
                    key={subItem.teamName + subIndex}
                    className={`rank-list-row ${
                      `${index + 1}` === rankTab ? '' : 'hide'
                    }`}
                  >
                    <p>{subItem.rankNumber}</p>
                    <p style={{ textAlign: 'left', flex: 2 }}>
                      {subItem.teamName}
                    </p>
                    <p>
                      {subItem.winNumber}/{subItem.drawNumber}/
                      {subItem.failureNumber}
                    </p>
                    <p>{subItem.totalScore}</p>
                  </div>
                );
              },
            );
          })} */}

          {data.map((subItem, subIndex) => {
            return (
              <div
                key={subItem.teamName + subIndex}
                className={`rank-list-row `}
              >
                <p>{subItem.rankNumber}</p>
                <p style={{ textAlign: 'left', flex: 2 }}>
                  <Link
                    href={`/team?id=${subItem.teamId}`}
                    as={`/team-${subItem.teamId}`}
                  >
                    <a title={subItem.teamName} target="_blank">
                      {subItem.teamName}
                    </a>
                  </Link>
                </p>
                <p>
                  {subItem.winNumber}/{subItem.drawNumber}/
                  {subItem.failureNumber}
                </p>
                <p>{subItem.totalScore}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
