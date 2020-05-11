import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { message, Button, Breadcrumb, Popover } from 'antd';
import { UpOutlined, DownOutlined, StarOutlined, StarFilled, ShareAltOutlined } from '@ant-design/icons';
import { NextJSContext } from 'next-redux-wrapper';
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
  WeiboShareButton,
  WeiboIcon
} from "react-share";
import { getFavoriteTopic } from '../api'
import { AppStateType } from '../redux/reducers'
import NoAvatar from '../components/NoAvatar';
import CommentList from '../components/CommentList';
import { fetchTopicList, fetchPraiseInfo, actionPraise, actionFavoriteTopic } from '../api';
import timer from '../utils/timer';
import Head from 'next/head';
import { User, Topic } from '../@types'


interface TopicDetailProps {
  topicInfo: Topic,
  userInfo: User
}

const TopicDetail = (props: TopicDetailProps) => {
  const { topicInfo, userInfo } = props;
  const router = useRouter()
  const [praiseNum, setPraiseNum] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    handleGetPraiseInfo();
    handleGetFavoriteInfo()
  }, [])

  const getUserName = () => {
    return userInfo.userName || window.localStorage.getItem('userName')
  }

  const handleGetPraiseInfo = async () => {
    const { data } = await fetchPraiseInfo({
      topicId: topicInfo._id,
    });
    setPraiseNum(data)
  };

  const handleGetFavoriteInfo = async () => {
    const { data } = await getFavoriteTopic({
      userName: getUserName()
    })
    if (!data.list.length) {
      setIsFavorite(false)
    }
    data.list.forEach(element => {
      if (element._id === topicInfo._id) {
        setIsFavorite(true)
      }
    });


  }

  const handleControlPraise = async type => {
    if (!window.localStorage.getItem('userName')) {
      router.push('/login');
      return;
    }
    const data = await actionPraise({
      type: type,
      topicId: topicInfo._id,
      userName: getUserName()
    });
    if (data.success) {
      message.success(data.message);
      handleGetPraiseInfo();
    }
  };

  const handleCellectTopic = async () => {
    if (!window.localStorage.getItem('userName')) {
      router.push('/login');
      return;
    }
    const data = await actionFavoriteTopic({
      userName: getUserName(),
      topicId: topicInfo._id,
      type: isFavorite ? 'isCancel' : 'isFavorite'
    });
    if (data.success) {
      message.success(data.message);
      handleGetFavoriteInfo()
    }
  }
  

  const renderShareContent = () => {
    const url = 'http://www.baidu.com'
    const title = '111'
    console.log('[router]',router)
    return (
      <div>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <EmailShareButton style={{marginLeft: '10px'}} url={url} >
        <EmailIcon size={40} round/>
      </EmailShareButton>
      <TwitterShareButton style={{marginLeft: '10px'}} url={url} title={title}>
        <TwitterIcon size={40} round/>
      </TwitterShareButton>
      <WeiboShareButton style={{marginLeft: '10px'}} url={url} title={title} >
        <WeiboIcon size={40} round />
      </WeiboShareButton>
    </div>
    )
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
              <a>{topicInfo.topicTitle}</a>
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
            <div onClick={() => { handleControlPraise('up'); }}>
              <UpOutlined style={{ cursor: 'pointer', fontSize: 16 }} />
            </div>
            <span style={{ textAlign: 'center', fontSize: 18 }}>
              {praiseNum}
            </span>
            <div onClick={() => { handleControlPraise('down') }}>
              <DownOutlined style={{ cursor: 'pointer', fontSize: 16 }} />
            </div>
          </div>
        </div>
        <div className='main-control-container'>

          <Button onClick={handleCellectTopic} style={{ marginRight: '5px' }} size='large' shape='circle' icon={isFavorite ? <StarFilled /> : <StarOutlined />} />
          {/* <Button style={{ marginRight: '5px' }} size='large' shape='circle' icon={<ShareAltOutlined />} /> */}
          <Popover content={renderShareContent()} trigger="hover">
            <Button style={{ marginRight: '5px' }} size='large' shape='circle' icon={<ShareAltOutlined />} />
          </Popover>
          
         
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
