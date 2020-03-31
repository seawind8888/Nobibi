import { NextPageContext } from 'next';
import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';
import NoLayout from '../components/NoLayout';
import '../assets/self-styles.less';
// import { RouterTitle } from '../constants/ConstTypes';
import "antd/dist/antd.less";
// import { withRouter } from 'next/router';

interface AppContext extends NextPageContext {
  store: any
}

class NextApp extends App<AppContext> {

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }


  render() {
    const { Component, pageProps,  store } = this.props;
    return (
      <Provider store={store}>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <title>Nobibi-next</title>
          <link rel='shortcut icon' href='/static/favicon.ico' type='image/ico' />
          <style jsx global>{`
            * {
              margin: 0;
              padding: 0;
            }
            body {
              font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
            }
          `}
          </style>
        </Head>
        <NoLayout>
          <Component {...pageProps}  />
        </NoLayout>
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(NextApp));