import React, { useState, useEffect } from 'react';
import { message, Button, Breadcrumb } from 'antd';
import { UpOutlined, DownOutlined, StarOutlined, ShareAltOutlined } from '@ant-design/icons';
import { NextJSContext } from 'next-redux-wrapper';
import { AppStateType } from '../redux/reducers'
import NoAvatar from '../components/NoAvatar';
import CommentList from '../components/CommentList';
import { fetchTopicList, fetchPraiseInfo, actionPraise, actionFavoriteTopic } from '../api';
import timer from '../utils/timer';
import Head from 'next/head';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { User, Topic } from '../@types'


interface initProps {
  topicInfo: Topic,
  userInfo: User
}

const TopicDetail = (props: initProps) => {
  const { topicInfo, userInfo } = props;
  const [praiseNum, setPraiseNum] = useState(0)

  useEffect(() => {
    handleGetPraiseInfo();
  }, [])

  const handleGetPraiseInfo = async () => {
    const { data } = await fetchPraiseInfo({
      topicId: topicInfo._id,
    });
    this.setState({
      praiseNum: data,
    });
  };
  const handleControlPraise = async type => {
    if (!window.localStorage.getItem('username')) {
      Router.push('/login');
      return;
    }
    const data = await actionPraise({
      type: type,
      topicId: topicInfo._id,
      userName: userInfo.userName,
    });
    if (data.success) {
      message.success(data.message);
      handleGetPraiseInfo();
    }
  };
  const handleCellectTopic = async () => {
    if (!window.localStorage.getItem('username')) {
      Router.push('/login');
      return;
    }
    const data = await actionFavoriteTopic({
      userName: userInfo.userName,
      topicId: topicInfo._id,
    });
    if (data.success) {
      message.success(data.message);
    }
  }
  return (
    <>
      <Head>
        <title>{topicInfo.topicTitle}</title>
      </Head>
      <div className='main-inside-container topic-detail-container'>
        <Breadcrumb style={{ marginTop: '10px' }}>
          <Breadcrumb.Item>
            <Link href={`/`}>
              <a href='/'>首页</a>
            </Link>

          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              as={`/topicDetail/${topicInfo._id}`}
              href={`/topicDetail?id=${topicInfo._id}`}>
              <a>
                {topicInfo.topicTitle}
              </a>

            </Link>

          </Breadcrumb.Item>
        </Breadcrumb>
        <h1 className='detail-title'>{topicInfo.topicTitle}</h1>
        <div className='main-info-container'>
          <div className='user-avatar'>
            <NoAvatar
              avatar={topicInfo.userAvatar}
              userName={topicInfo.userName}
            ></NoAvatar>
          </div>
          <div>
            <div className='topic-info-container'>
              {topicInfo.userName} {timer(Date.parse(topicInfo.updateTime))}
            </div>
            <div
              className='topic-content-container'
              dangerouslySetInnerHTML={{ __html: topicInfo.content }}
            ></div>
          </div>
          <div className='praise-control-container'>
            <div
              onClick={() => {
                handleControlPraise('up');
              }}
            >
              <UpOutlined style={{ cursor: 'pointer', fontSize: 16 }} />
            </div>

            <span style={{ textAlign: 'center', fontSize: 18 }}>
              {this.state.praiseNum}
            </span>
            <div
              onClick={() => {
                this.handleControlPraise('down');
              }}
            >
              <DownOutlined style={{ cursor: 'pointer', fontSize: 16 }} />
            </div>
          </div>
        </div>
        <div className='main-control-container'>
          <Button onClick={this.handleCellectTopic} style={{ marginRight: '5px' }} size='large' shape='circle' icon={<StarOutlined />} />
          <Button style={{ marginRight: '5px' }} size='large' shape='circle' icon={<ShareAltOutlined />} />
        </div>
        <CommentList
          topicTitle={topicInfo.topicTitle}
          topicId={topicInfo._id}
        />
      </div>
    </>
  );
}
TopicDetail.getInitialProps = async ({ query }: NextJSContext) => {
  const _topic = await fetchTopicList({
    _id: query.id,
  });
  return { topicInfo: _topic.data.list[0] };
}

const mapStateToProps = (state: AppStateType) => ({
  userInfo: state.user,
});

export default connect(mapStateToProps)(TopicDetail);
