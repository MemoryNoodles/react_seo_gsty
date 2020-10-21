import React, { Component, ReactNode } from 'react';
import { Tabs } from 'antd';
import { isEmpty } from '../../../utils';

interface Props {
  matchTypeArr: any;
  childGroupChange: Function;
}
interface State {
  matchTypeActive: string | number;
}

export default class ScheduleResults extends Component<Props, State> {
  leagueTypeArr: { name: string; value: string }[];
  constructor(props: any) {
    super(props);
    const { matchTypeArr = [], childGroupChange } = props;
    let renderTypeArr = [...matchTypeArr];
    if (matchTypeArr.length == 1 && matchTypeArr[0].groupName == '常规赛') {
      renderTypeArr = matchTypeArr[0].child;
    }
    childGroupChange && childGroupChange(renderTypeArr[0] || {});
    this.state = {
      matchTypeActive: !isEmpty(renderTypeArr) ? renderTypeArr[0].groupId : '',
    };
    this.leagueTypeArr = [
      { name: '赛程赛果', value: '1' },
      // { name: '积分榜', value: '2' },
      // { name: '射手榜', value: '3' },
    ];
  }
  matchTypeClick = (item: any) => {
    const { childGroupChange } = this.props;
    this.setState({
      matchTypeActive: item.groupId,
    });
    childGroupChange && childGroupChange(item);
  };
  render(): ReactNode {
    const { matchTypeArr = [] } = this.props;
    const { matchTypeActive = '' } = this.state;
    let renderTypeArr = [...matchTypeArr];
    if (matchTypeArr.length == 1 && matchTypeArr[0].groupName == '常规赛') {
      renderTypeArr = matchTypeArr[0].child;
    }
    return (
      <div>
        <Tabs defaultActiveKey="1">
          {this.leagueTypeArr.map(item => {
            return (
              <Tabs.TabPane
                forceRender
                tab={item.value !== '1' ? <a>{item.name}</a> : item.name}
                key={item.value}
              />
            );
          })}
        </Tabs>
        <div className="match-type-list">
          {renderTypeArr.map((item: any) => {
            return (
              <p
                key={item.groupId}
                className={`match-type-item ${
                  item.groupId == matchTypeActive ? 'active' : ''
                }`}
                onClick={() => this.matchTypeClick(item)}
              >
                {item.groupName}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}
