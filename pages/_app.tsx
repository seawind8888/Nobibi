import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { NextJSContext } from 'next-redux-wrapper';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';
import NoLayout from '../components/NoLayout';
import '../assets/self-styles.less';
import "antd/dist/antd.less";

type NextContext = NextJSContext & AppProps & {}

const NextApp: NextPage<NextContext> = (props) => {

  const { Component, pageProps, store } = props;
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
        <Component {...pageProps} />
      </NoLayout>
    </Provider>
  );
}

NextApp.getInitialProps = async (context: NextContext) => {
  const { ctx, Component } = context;
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  return { pageProps };
}

export default withRedux(createStore)(withReduxSaga(NextApp));