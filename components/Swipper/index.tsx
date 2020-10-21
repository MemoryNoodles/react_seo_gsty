import React, { Component, ReactNode } from 'react';
import { Carousel } from 'antd';
import './index.less';
import { isEmpty } from '../../utils';
export declare type DotPosition = 'top' | 'bottom' | 'left' | 'right';
interface Props {
  autoplay?: boolean;
  afterChange?: () => void;
  beforeChange?: () => void;
  dotPosition?: DotPosition;
  bannerContentList?: any;
  dots?:
    | boolean
    | {
        className?: string;
      };
}

interface State {}

export default class Swipper extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render(): ReactNode {
    const {
      autoplay = false,
      afterChange = () => {},
      beforeChange = () => {},
      dotPosition = 'bottom',
      dots = true,
      bannerContentList = [],
    } = this.props;
    console.log(bannerContentList, '222');
    return (
      <div className="swipper-wrap">
        {!isEmpty(bannerContentList) && (
          <Carousel
            autoplay={autoplay}
            afterChange={afterChange}
            beforeChange={beforeChange}
            dotPosition={dotPosition}
            dots={dots}
            {...this.props}
          >
            {bannerContentList.map(
              (item: {
                breviaryPicture: string;
                link: string;
                title: string;
              }) => {
                return (
                  <div key={item.breviaryPicture} className="banner-item">
                    <a href={item.link}>
                      <img src={item.breviaryPicture || ''} alt={item.title} />
                    </a>
                  </div>
                );
              },
            )}
          </Carousel>
        )}
      </div>
    );
  }
}
