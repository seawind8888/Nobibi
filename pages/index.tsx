
// import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react'
import { Pagination, Button, Breadcrumb } from 'antd';
import { NextPage, NextJSContext } from 'next-redux-wrapper';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import TopicItem from '../components/TopicItem';
import { fetchTopicList } from '../api';
import { fetchTopiclList } from '../redux/actions/topic';
import Router from 'next/router';
import NoAvatar from '../components/NoAvatar';
import { User, Topic } from '../@types/index'
import { AppStateType } from '../redux/reducers'

interface HomeProps {
  topicInfo: Topic,
  userInfo: User,
  channelList: [],
  breadCrumbList: []
}

const Home: NextPage<HomeProps> = (props) => {

  const { userInfo, channelList, topicInfo, breadCrumbList } = props;
  const [hotTopicList, setHotTopicList] = useState([])
  const dispatch = useDispatch();


  useEffect(() => {
    handleGetHotTopicList()
  }, [])

  const handleGetHotTopicList = async () => {
    const { data } = await fetchTopicList({
      hot: true
    });
    setHotTopicList(data.list);
  }

  const handleGetTopicList = async ({
    showAll = false,
    type = '',
    categoryName = '',
    page = 1
  }) => {

    const _type = type || topicInfo.type;
    let _categoryName = categoryName || topicInfo.categoryName;
    if (showAll) {
      _categoryName = '';
    }
    if (!type && categoryName && categoryName === topicInfo.categoryName) return;
    const params = { _type, _categoryName, page };
    Router.push(`/?type=${_type}&categoryName=${_categoryName}&page=${page}`);
    dispatch(fetchTopiclList(params));
  }



  return (
    <div className='main-inside-container'>
      <div className='home-container'>
        <div className='list-item-container'>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href={`/`}>
                <a href='/'>首页</a>
              </Link>

            </Breadcrumb.Item>
            {
              breadCrumbList.map((e, i) => (
                <Breadcrumb.Item
                  key={i}>
                  {e}
                </Breadcrumb.Item>
              ))

            }
          </Breadcrumb>
          <div style={{ marginTop: '10px' }}>
            <Button shape='round' className='topic-channel-button' onClick={() => handleGetTopicList({ showAll: true })}>全部</Button>
            {channelList.map((e: any) => {
              return (
                <Button shape='round' key={e._id} className='topic-channel-button' onClick={() => handleGetTopicList({ categoryName: e.categoryName })}>{e.categoryName}</Button>
              );
            })}
          </div>
          {topicInfo.list.map((e, i) => {
            return <TopicItem topicInfo={e} key={i}></TopicItem>;
          })}
        </div>
        <div className='home-right-container'>
          <div>
            {userInfo.userName ? <div className='user-info-container'>
              <NoAvatar
                avatar={userInfo.avatar}
                userName={userInfo.userName}
                size={56}
              />
              <div className='user-info-container--right'>
                <span style={{ marginLeft: '10px', fontSize: '22px' }}>
                  {userInfo.userName}
                </span>
                <div>
                  <Button onClick={() => handleGetTopicList({ type: '我的发布' })} style={{ padding: 0, paddingLeft: '10px' }} type='link'>我的发布</Button>
                  <Button onClick={() => handleGetTopicList({ type: '我的收藏' })} type='link'>我的收藏</Button>
                </div>
              </div>
            </div> : ' '}
          </div>
          <div className='hot-topic-container'>
            <div className='hot-title-container'>
              <div className='title-start-block'></div>
              <span>最热</span>
            </div>
            <ul className='hot-list-container'>
              {hotTopicList.map(item => (
                <li key={item._id}>
                  <Link href={`/topicDetail/${item._id}`}>
                    <a style={{ color: 'rgba(0, 0, 0, 0.65)' }} href={`/topicDetail?id=${item._id}`}>{item.topicTitle}</a>
                  </Link>

                </li>
              ))}
            </ul>
          </div>
          <div className='ad-container'>广告位招租</div>

        </div>
      </div>
      <div className='topic-pagenation-container'>
        {topicInfo.total > 10 ? (
          <Pagination
            total={topicInfo.total}
            current={topicInfo.page}
            onChange={(e) => handleGetTopicList({ page: e })}
            showQuickJumper
          />
        ) : (
            <div />
          )}
      </div>
    </div>
  );
}

Home.getInitialProps = ({ store, query }: NextJSContext) => {
  // const { store, query, isServer } = ctx;
  // if (isServer) {
  store.dispatch(fetchTopiclList(query));
  return {
    breadCrumbList: Object.keys(query).filter(e => !!query[e] && e !== 'page').map(e => {
      return query[e];
    }),
    userInfo: {}
  };
}

const mapStateToProps = (state: AppStateType) => ({
  topicInfo: state.topic,
  channelList: state.channel.list,
  userInfo: state.user,
});


export default connect(mapStateToProps)(Home);
