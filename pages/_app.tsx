import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { NextJSContext } from 'next-redux-wrapper';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';
import '../assets/self-styles.less';
import 'antd/dist/antd.less';
import '../assets/common.less';
import CommoneLayout from '../components/CommonLayout';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
type NextContext = NextJSContext & AppProps & {};

const NextApp: NextPage<NextContext> = props => {
  const { Component, pageProps, store } = props;
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Head>
          <title>光速体育-体育数据|足球比分|即时比分</title>
          <link
            rel="shortcut icon"
            href="/static/image/favicon.png"
            type="image/ico"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="keywords" content="光速体育,体育数据,足球比分,即时比分,球队资料,联赛资料" />
          <meta name="description" content="光速体育是专业的体育数据平台，提供最快的即时比分数据，光速体育努力做最好体育数据平台。"></meta>
          <style jsx global>
            {`
              * {
                margin: 0;
                padding: 0;
              }
              body {
                font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei',
                  '微软雅黑', Arial, sans-serif;
              }
            `}
          </style>
        </Head>
        <CommoneLayout {...pageProps}>
          <Component {...pageProps} />
        </CommoneLayout>
      </Provider>
    </ConfigProvider>
  );
};

// Router.onRouteChangeComplete = () => NProgress.done();
// Router.onRouteChangeError = () => NProgress.done();

NextApp.getInitialProps = async (context: NextContext) => {
  const { ctx, Component, req } = context;
  const { res } = ctx;
  const { statusCode } = res;
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  pageProps.statusCode = pageProps.statusCode || statusCode;
  return { pageProps };
};

export default withRedux(createStore)(withReduxSaga(NextApp));
