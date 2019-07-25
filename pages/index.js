import { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Button } from 'antd';
import { connect } from 'react-redux';
import Link from 'next/link';
import TopicItem from '../components/TopicItem';
import { getTopicList } from '../api'; 
import { fetchTopiclList } from '../redux/actions/topic';


import NoAvatar from '../components/NoAvatar';

class Home extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    topicInfo: PropTypes.object,
    userInfo: PropTypes.object,
    channelList: PropTypes.array
  };
  static defaultProps = {
    topicInfo: {
      list: [],
      categoryName: '',
      total: 0
    },
    channelList: [],
    userInfo: {}
  };
  static async getInitialProps({ctx}) {
    ctx.store.dispatch(fetchTopiclList());
  }

  constructor(props) {
    super(props);
  }
  state = {
    hotTopicList: [],
  }
  componentDidMount() {
    this.handleGetHotTopicList();
  }
  handleGetTopicList = async (params = {}) => {
    const { dispatch, topicInfo} = this.props; 
    if (params.categoryName && topicInfo.categoryName === params.categoryName) return;
    dispatch(fetchTopiclList(params));
  }
  handleGetHotTopicList = async () => {
    const { data } = await getTopicList({
      hot: true
    });
    this.setState({
      hotTopicList: data.list
    });
  }

  render() {
    const {  userInfo, channelList, topicInfo } = this.props;
    const {  hotTopicList } = this.state;
    return (
      <Fragment>
        <div className='main-inside-container'>
          <div className='home-container'>
            <div className='list-item-container'>
              <div>
                <Button shape='round' style={{marginRight: '5px', marginBottom: '5px'}} onClick={() => this.handleGetTopicList()}>全部</Button>
                {channelList.map(e => {
                  return (
                    <Button shape='round' key={e._id} style={{marginRight: '5px', marginBottom: '5px'}} onClick={() => this.handleGetTopicList({categoryName: e.categoryName})}>{e.categoryName}</Button>
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
                      <Button onClick={() => this.handleGetTopicList({getMyTopic: true})} style={{ padding: 0, paddingLeft: '10px'}} type='link'>我的发布</Button>
                      <Button onClick={() => this.handleGetTopicList({favorite: true})} type='link'>我的收藏</Button>
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
            {topicInfo.total > 10 ? (
              <Pagination
                total={topicInfo.total}
                current={topicInfo.page}
                onChange={(e) => this.handleGetTopicList({page: e})}
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
  topicInfo: state.topic,
  channelList: state.channel.list,
  userInfo: state.user.userInfo,
}))(Home);
