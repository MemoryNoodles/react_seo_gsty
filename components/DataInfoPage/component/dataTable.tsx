import React, { Component, ReactNode } from 'react';
import { isEmpty } from '../../../utils';
import { Table, Radio, Select } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { type } from 'os';

const { Option } = Select;
interface Props {
  typeArr: { value: string; name: string }[];
  dataTabActiveKey?: string;
  dataSource: any;
}
interface State {
  chooseActive: string;
  tagArr: any[];
}

export default class DataTable extends Component<Props, State> {
  tdArr: any[][];
  colorArr: string[];
  constructor(props: any) {
    super(props);
    const { typeArr = [] } = props;
    this.state = {
      chooseActive: '',
      tagArr: [
        { name: '冠军联赛', type: '1' },
        { name: '欧联杯', type: '2' },
        { name: '降级', type: '3' },
      ],
    };
    this.tdArr = [
      [
        {
          title: '排名',
          dataIndex: 'rankNumber',
          align: 'center',
          key: 'rankNumber',
        },
        {
          title: '球队',
          dataIndex: 'teamName',
          align: 'center',
          key: 'teamName',
          render(value: string, record: any) {
            return (
              <p className="name-logo">
                <span className="logo">
                  <img
                    src={record.teamLogo || '/static/image/defaultTeam.png'}
                    alt={value}
                    title={value}
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/static/image/defaultTeam.png';
                    }}
                  />
                </span>
                <a
                  target="_blank"
                  href={`/team-${record.teamId}`}
                  title={value}
                  className="name"
                >
                  {value}
                </a>
              </p>
            );
          },
        },
        {
          title: '场次',
          dataIndex: 'matchNumber',
          align: 'center',
          key: 'matchNumber',
        },
        {
          title: '胜',
          dataIndex: 'winNumber',
          align: 'center',
          key: 'winNumber',
        },
        {
          title: '平',
          dataIndex: 'drawNumber',
          align: 'center',
          key: 'drawNumber',
        },
        {
          title: '负',
          dataIndex: 'failureNumber',
          align: 'center',
          key: 'failureNumber',
        },
        {
          title: '进球',
          dataIndex: 'totalInGoal',
          align: 'center',
          key: 'totalInGoal',
        },
        {
          title: '失球',
          dataIndex: 'totalOutGoal',
          align: 'center',
          key: 'totalOutGoal',
        },
        {
          title: '净胜球',
          dataIndex: 'totalNetGoal',
          align: 'center',
          key: 'totalNetGoal',
        },
        {
          title: '场均进球',
          dataIndex: 'averageInGoal',
          align: 'center',
          key: 'averageInGoal',
        },
        {
          title: '场均失球',
          dataIndex: 'averageOutGoal',
          align: 'center',
          key: 'averageOutGoal',
        },
        {
          title: '场均净胜',
          dataIndex: 'averageNetGoal',
          align: 'center',
          key: 'averageNetGoal',
        },
        {
          title: '积分',
          dataIndex: 'totalScore',
          align: 'center',
          key: 'totalScore',
        },
      ],
      [
        {
          title: '排名',
          dataIndex: 'rankNumber',
          align: 'center',
          key: 'rankNumber',
        },
        {
          title: '球队',
          dataIndex: 'teamName',
          align: 'center',
          key: 'teamName',
          render(value: string, record: any) {
            return (
              <p className="name-logo">
                <span className="logo">
                  <img
                    src={record.teamLogo || '/static/image/defaultTeam.png'}
                    alt={value}
                    title={value}
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/static/image/defaultTeam.png';
                    }}
                  />
                </span>
                <a
                  target="_blank"
                  href={`/team-${record.teamId}`}
                  title={value}
                  className="name"
                >
                  {value}
                </a>
              </p>
            );
          },
        },
        {
          title: '数量',
          dataIndex: 'totalNumber',
          align: 'center',
          key: 'totalNumber',
        },
      ],
      [
        {
          title: '排名',
          dataIndex: 'rankNumber',
          align: 'center',
          key: 'rankNumber',
        },
        {
          title: '球队',
          dataIndex: 'teamName',
          align: 'center',
          key: 'teamName',
          render(value: string, record: any) {
            return (
              <p className="name-logo">
                <span className="logo">
                  <img
                    src={record.teamLogo || '/static/image/defaultTeam.png'}
                    alt={value}
                    title={value}
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/static/image/defaultTeam.png';
                    }}
                  />
                </span>
                <a
                  target="_blank"
                  href={`/team-${record.teamId}`}
                  title={value}
                  className="name"
                >
                  {value}
                </a>
              </p>
            );
          },
        },
        {
          title: '球员',
          dataIndex: 'memberName',
          align: 'center',
          key: 'memberName',
          render(value: string, record: any) {
            return (
              <p className="name-logo">
                <span className="logo">
                  <img
                    src={record.memberLogo || '/static/image/defaultTeam.png'}
                    alt={value}
                    title={value}
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/static/image/defaultTeam.png';
                    }}
                  />
                </span>
                <span className="name">{value}</span>
              </p>
            );
          },
        },
        {
          title: '数量',
          dataIndex: 'totalNumber',
          align: 'center',
          key: 'totalNumber',
        },
      ],
      [
        {
          title: '排名',
          dataIndex: 'rankNumber',
          align: 'center',
          key: 'rankNumber',
        },

        {
          title: '球队',
          dataIndex: 'teamName',
          align: 'center',
          key: 'teamName',
          render(value: string, record: any) {
            return (
              <p className="name-logo">
                <span className="logo">
                  <img
                    src={record.teamLogo || '/static/image/defaultTeam.png'}
                    alt={value}
                    title={value}
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/static/image/defaultTeam.png';
                    }}
                  />
                </span>
                <a
                  target="_blank"
                  href={`/team-${record.teamId}`}
                  title={value}
                  className="name"
                >
                  {value}
                </a>
              </p>
            );
          },
        },
        {
          title: '场次',
          dataIndex: 'matchNumber',
          align: 'center',
          key: 'matchNumber',
        },
        {
          title: '赢',
          dataIndex: 'winNumber',
          align: 'center',
          key: 'winNumber',
        },
        {
          title: '和',
          dataIndex: 'drawNumber',
          align: 'center',
          key: 'drawNumber',
        },
        {
          title: '输',
          dataIndex: 'failureNumber',
          align: 'center',
          key: 'failureNumber',
        },
        {
          title: '净胜',
          dataIndex: 'netNumber',
          align: 'center',
          key: 'netNumber',
        },
        {
          title: '上',
          dataIndex: 'S',
          align: 'center',
          key: 'S',
        },
        {
          title: '和',
          dataIndex: 'P',
          align: 'center',
          key: 'P',
        },
        {
          title: '下',
          dataIndex: 'F',
          align: 'center',
          key: 'F',
        },
      ],
      [
        {
          title: '排名',
          dataIndex: 'rankNumber',
          align: 'center',
          key: 'rankNumber',
        },

        {
          title: '球队',
          dataIndex: 'teamName',
          align: 'center',
          key: 'teamName',
          render(value: string, record: any) {
            return (
              <p className="name-logo">
                <span className="logo">
                  <img
                    src={record.teamLogo || '/static/image/defaultTeam.png'}
                    alt={value}
                    title={value}
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/static/image/defaultTeam.png';
                    }}
                  />
                </span>
                <a
                  target="_blank"
                  href={`/team-${record.teamId}`}
                  title={value}
                  className="name"
                >
                  {value}
                </a>
              </p>
            );
          },
        },
        {
          title: '场次',
          dataIndex: 'matchNumber',
          align: 'center',
          key: 'matchNumber',
        },
        {
          title: '大球',
          dataIndex: 'bigNumber',
          align: 'center',
          key: 'bigNumber',
        },
        {
          title: '和',
          dataIndex: 'drawNumber',
          align: 'center',
          key: 'drawNumber',
        },
        {
          title: '小球',
          dataIndex: 'smallNumber',
          align: 'center',
          key: 'smallNumber',
        },
        {
          title: '大球净胜',
          dataIndex: 'netNumber',
          align: 'center',
          key: 'netNumber',
        },
        {
          title: '大球率',
          dataIndex: 'bigRate',
          align: 'center',
          key: 'bigRate',
        },
      ],
      [
        {
          title: '球队',
          dataIndex: 'teamName',
          align: 'center',
          key: 'teamName',
          render(value: string, record: any) {
            return (
              <p className="name-logo">
                <span className="logo">
                  <img
                    src={record.teamLogo || '/static/image/defaultTeam.png'}
                    alt={value}
                    title={value}
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/static/image/defaultTeam.png';
                    }}
                  />
                </span>
                <a
                  target="_blank"
                  href={`/team-${record.teamId}`}
                  title={value}
                  className="name"
                >
                  {value}
                </a>
              </p>
            );
          },
        },

        {
          title: '胜胜',
          dataIndex: 'SS',
          align: 'center',
          key: 'SS',
        },
        {
          title: '胜平',
          dataIndex: 'SP',
          align: 'center',
          key: 'SP',
        },
        {
          title: '胜负',
          dataIndex: 'SF',
          align: 'center',
          key: 'SF',
        },
        {
          title: '平胜',
          dataIndex: 'PS',
          align: 'center',
          key: 'PS',
        },
        {
          title: '平平',
          dataIndex: 'PP',
          align: 'center',
          key: 'PP',
        },
        {
          title: '平负',
          dataIndex: 'PF',
          align: 'center',
          key: 'PF',
        },
        {
          title: '负胜',
          dataIndex: 'FS',
          align: 'center',
          key: 'FS',
        },
        {
          title: '负平',
          dataIndex: 'FP',
          align: 'center',
          key: 'FP',
        },
        {
          title: '负负',
          dataIndex: 'FF',
          align: 'center',
          key: 'FF',
        },
      ],
    ];

    this.colorArr = ['#CFA5F5', '#58DEA5', '#E2E2E2'];
  }
  chooseFun = (value: string) => {
    this.setState({
      chooseActive: value,
    });
  };

  getColumn = () => {
    const { dataTabActiveKey = '1' } = this.props;
    const columns: ColumnsType = this.tdArr[parseInt(dataTabActiveKey) - 1];
    return columns;
  };
  render(): ReactNode {
    let { typeArr = [], dataTabActiveKey = '1', dataSource = [] } = this.props;
    let { chooseActive = '', tagArr = [] } = this.state;
    let tableData = [...dataSource];

    if (dataTabActiveKey == '2' || dataTabActiveKey == '3') {
      tableData = [];
      typeArr = dataSource.map(
        (item: { statList: any; statName: any; statType: any }) => {
          item.statList.map((subItem: any) => {
            tableData.push({
              ...subItem,
              type: item.statType,
            });
          });
          return {
            name: item.statName,
            value: item.statType,
          };
        },
      );
    }
    chooseActive = chooseActive || (!isEmpty(typeArr) ? typeArr[0].value : '');
    return (
      <div className="data-table-wrap">
        <div className="data-type-btns">
          {typeArr.map(item => {
            return (
              <p
                onClick={() => this.chooseFun(item.value)}
                className={`data-type-btns-item ${
                  item.value == chooseActive ? 'active' : ''
                }`}
                key={item.value}
              >
                {item.name}
              </p>
            );
          })}
        </div>

        <div className="data-table-content">
          <Table
            // tableLayout="fixed"
            columns={this.getColumn()}
            dataSource={tableData}
            pagination={false}
            rowClassName={(record: any, index: number) => {
              if (record.type != chooseActive) {
                return 'row-hide';
              }
              return '';
            }}
          />
        </div>

        {dataTabActiveKey === '1' && (
          <div className="score-box">
            <div className="tag-box">
              {tagArr.map(item => {
                return (
                  <p key={item.type} className="tag-item">
                    <span
                      className="point"
                      style={{
                        backgroundColor: this.colorArr[parseInt(item.type) - 1],
                      }}
                    />
                    <span>{item.name}</span>
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
