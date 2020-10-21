import React, { Component } from 'react';
import { Button } from 'antd';
import Link from 'next/link'
import TitleNav from '../components/Breadcrumb/index'
import DetailsHeader from '../components/detailsHeader/index'

interface Props {}

interface State {}

let timer: any = null;

export default class Ceshi extends Component<Props, State> {
  readonly state: Readonly<State> = {
    now: new Date(),
  };
  timer: any = null;

  componentDidMount() {
      console.log(456)
    this.timer = setInterval((): void => {
      this.setState({
        now: new Date(),
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }


  render(): any {
    return <div>
      <TitleNav/>
      <DetailsHeader/>
    </div>;
  }
}
