import { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Button } from 'antd';
import { connect } from 'react-redux';
import Link from 'next/link';
import TopicItem from '../components/TopicItem';
import { getTopicList } from '../api'; 


import NoAvatar from '../components/NoAvatar';

class Home extends PureComponent {
  static propTypes = {
    topicListInfo: PropTypes.array.isRequired,
    topicListTotal: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    userInfo: PropTypes.object,
    topicChannelInfo: PropTypes.string,
    channelList: PropTypes.array
  };
  static defaultProps = {
    topicListTotal: 0,
    topicChannelInfo: '',
    channelList: [],
    userInfo: {}
  };
  static async getInitialProps({ ctx }) {
    const { store } = ctx;
    store.dispatch({
      type: 'FETCH_TOPIC_LIST',
      payload: {
        page: 1,
      },
    });
    return {};
  }

  constructor(props) {
    super(props);
  }
  state = {
    hotTopicList: []
  }
  componentDidMount() {
    this.handleGetHotTopic();
  }
  changePagenation = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'FETCH_TOPIC_LIST',
      payload: {
        page: e,
      },
    });
  }
  handleChangeChannel = (e) => {
    const { dispatch, topicChannelInfo } = this.props;
    if (topicChannelInfo === e) return;
    dispatch({
      type: 'FETCH_TOPIC_LIST',
      payload: { categoryName: e },
    });
  }
  handleGetMyTopic = () => {
    const { dispatch, userInfo } = this.props;
    dispatch({
      type: 'FETCH_TOPIC_LIST',
      payload: { userName: userInfo.userName},
    });
  }
  handleGetHotTopic = async () => {
    const { data } = await getTopicList({
      hot: true
    });
    this.setState({
      hotTopicList: data.list
    });
  }

  render() {
    const { topicListInfo, topicListTotal, userInfo, channelList } = this.props;
    const { hotTopicList } = this.state;
    return (
      <Fragment>
        <div className='main-inside-container'>
          <div className='home-container'>
            <div className='list-item-container'>
              <div>
                <Button shape='round' style={{marginRight: '5px', marginBottom: '5px'}} onClick={() => this.handleChangeChannel('all')}>全部</Button>
                {channelList.map(e => {
                  return (
                    <Button shape='round' key={e._id} style={{marginRight: '5px', marginBottom: '5px'}} onClick={() => this.handleChangeChannel(e.categoryName)}>{e.categoryName}</Button>
                  );
                })}
              </div>
              {topicListInfo.map((e, i) => {
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
                      <Button onClick={this.handleGetMyTopic} style={{ padding: 0, paddingLeft: '10px'}} type='link'>我的发布</Button>
                      <Button  type='link'>我的收藏</Button>
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
                        <a style={{color: 'rgba(0, 0, 0, 0.65)'}} href={`/topicDetail?id=${item._id}`}>{item.topicTitle}</a>
                      </Link>
                    
                    </li>
                  ))}
                </ul>
              </div>
              <div className='ad-container'>广告位招租</div>
             
            </div>
          </div>
          <div className='topic-pagenation-container'>
            {topicListTotal > 10 ? (
              <Pagination
                total={topicListTotal}
                onChange={this.changePagenation}
                showSizeChanger
                showQuickJumper
              />
            ) : (
              <div />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => ({
  channelList: state.channel.list,
  topicChannelInfo: state.topic.categoryName,
  topicListInfo: state.topic.list,
  topicListTotal: state.topic.total,
  userInfo: state.user.userInfo,
}))(Home);
