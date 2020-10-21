import React, { Component, ReactNode } from 'react';
import AboutSite from '../components/AboutSite';
import { withRouter } from 'next/router';

interface Props {}
interface State {}

class About extends Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div style={{ height: '100%' }}>
        <AboutSite />
      </div>
    );
  }
}

export default withRouter(About);
