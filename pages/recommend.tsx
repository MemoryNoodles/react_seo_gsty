import React, { Component } from 'react';
import { Button } from 'antd';

interface Props {}

interface State {}

let timer: any = null;

export default class Recommend extends Component<Props, State> {
  readonly state: Readonly<State> = {
    now: new Date(),
  };
  timer: any = null;
  componentDidMount() {
    this.timer = setInterval((): void => {
      this.setState({
        now: new Date(),
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  get countDown() {
    //类似 vue 中的计算属性
    return (endDate: string): string => {
      return '';
    };
  }

  render(): any {
    return (
      <div>
        <Button>测试</Button>
        <br />
      </div>
    );
  }
}
