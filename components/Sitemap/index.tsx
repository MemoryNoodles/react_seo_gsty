import React, { Component } from 'react';
import { Card, Button, Select, Table, Row, Col, Divider } from 'antd';
const { Option } = Select;
import Link from 'next/link';
import './index.less';
import { DownOutlined } from '@ant-design/icons';
import { any, string } from 'prop-types';

interface Props {}
interface State {}
const team = [
  '西甲',
  '西甲',
  '西甲',
  '西甲',
  '西甲',
  '西甲',
  '西甲',
  '西甲',
  '西甲',
  '西甲',
  '西甲',
];

const teamAndLeagueArr = [
  { name: '德甲', id: '487', type: 1 },
  { name: '法甲', id: '1044', type: 1 },
  { name: '中超', id: '790', type: 1 },
  { name: '曼彻斯特城', id: '170', type: 2 },
  { name: '日职联', id: '795', type: 1 },
  { name: '韩K联', id: '805', type: 1 },
  { name: '巴塞罗那', id: '16', type: 2 },
  { name: '意甲', id: '964', type: 1 },
  { name: '亚特兰大', id: 813, type: 2 },
  { name: '英超', id: '942', type: 1 },
  { name: '巴黎圣日尔曼', id: 342, type: 2 },

  { name: '西甲', id: '965', type: 1 },
  { name: '拜仁慕尼黑', id: '17', type: 2 },
];
export default class Sitemap extends Component<Props, State> {
  state = {};
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ marginLeft: '20px', marginRight: '20px' }}>
        <div
          className="left-title"
          style={{ marginTop: '20px', marginBottom: '30px' }}
        >
          足球
        </div>
        {/* 标题 */}
        <div className="flex_row">
          <div className="title_first">比分</div>
          <div className="title_then">
            <a href="/footballScore" target="_blank">
              即时比分
            </a>
          </div>
          <div className="title_then">
            <a href="/footballScoreEnd" target="_blank">
              完场比分
            </a>
          </div>
          <div className="title_then">
            <a href="/footballSchedule" target="_blank">
              未来赛事
            </a>
          </div>
        </div>
        {/* 资料库 */}
        <div className="flex_row" style={{ marginTop: '20px' }}>
          <div className="title_first">资料库</div>
          <div className="contentView">
            {teamAndLeagueArr.map((item, index) => {
              return (
                <div key={item.id} className="contentText">
                  <a
                    title={item.name}
                    href={`${item.type == 1 ? '/league' : '/team'}-${item.id}`}
                    target="_blank"
                  >
                    {item.name}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div
          className="left-title"
          style={{ marginTop: '20px', marginBottom: '30px' }}
        >
          篮球
        </div> */}
        {/* 标题 */}
        {/* <div className="flex_row">
          <div className="title_first">比分</div>
          <div className="title_then">即时比分</div>
          <div className="title_then">完场比分</div>
          <div className="title_then">未来赛事</div>
        </div> */}
        {/* 资料库 */}
        {/* <div className="flex_row" style={{ marginTop: '20px' }}>
          <div className="title_first">资料库</div>
          <div className="contentView">
            {team.map((item, index) => {
              return <div className="contentText">{item}</div>;
            })}
          </div>
        </div>
        <div
          className="left-title"
          style={{ marginTop: '20px', marginBottom: '30px' }}
        >
          电竞
        </div> */}
        {/* 标题 */}
        {/* <div className="flex_row">
          <div className="title_first">比分</div>
          <div className="title_then">即时比分</div>
          <div className="title_then">完场比分</div>
          <div className="title_then">未来赛事</div>
        </div> */}
        {/* 资料库 */}
        {/* <div className="flex_row" style={{ marginTop: '20px' }}>
          <div className="title_first">资料库</div>
          <div className="contentView">
            {team.map((item, index) => {
              return <div className="contentText">{item}</div>;
            })}
          </div>
        </div>
        <div
          className="left-title"
          style={{ marginTop: '20px', marginBottom: '30px' }}
        >
          其他
        </div> */}
        {/* 标题 */}
        {/* <div className="flex_row" style={{ marginBottom: '20px' }}>
          <div className="title_first">情报中心</div>
          <div className="title_then">情报分析</div>
          <div className="title_then">伤病处罚</div>
          <div className="title_then">转会转帅</div>
          <div className="title_then">周边花絮</div>
        </div> */}
      </div>
    );
  }
}
