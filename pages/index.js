import { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Button, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import Link from 'next/link';
import TopicItem from '../components/TopicItem';
import { getTopicList } from '../api'; 
import { fetchTopiclList } from '../redux/actions/topic';
import Router from 'next/router';


import NoAvatar from '../components/NoAvatar';

class Home extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    topicInfo: PropTypes.object,
    userInfo: PropTypes.object,
    channelList: PropTypes.array,
    breadCrumbList: PropTypes.array,
    router: PropTypes.object.isRequired
  };
  static defaultProps = {
    topicInfo: {
      list: [],
      categoryName: '',
      total: 0
    },
    channelList: [],
    userInfo: {},
    breadCrumbList: []
  };
  static async getInitialProps({ctx}) {
    const {store, query} = ctx;
    store.dispatch(fetchTopiclList(query));
    
    return {
      breadCrumbList: Object.keys(query).filter(e => !!query[e] && e !== 'page').map(e => {
        return query[e];
      })
    };
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
  handleGetTopicList = async ({
    showAll = false,
    type = '',
    categoryName = '',
    page = 1
  }) => {
    const { dispatch, topicInfo } = this.props;
    const _type = type || topicInfo.type;
    let _categoryName = categoryName || topicInfo.categoryName;
    if (showAll) {
      _categoryName = '';
    }
    if (!type && categoryName && categoryName  === topicInfo.categoryName) return;
    const params = {_type, _categoryName, page};
    Router.push(`/?type=${_type}&categoryName=${_categoryName}&page=${page}`, {shallow: true });
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
    const {  userInfo, channelList, topicInfo, breadCrumbList } = this.props;
    const {  hotTopicList} = this.state;
    return (
      <Fragment>
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
              <div style={{marginTop:'10px'}}>
                <Button shape='round' style={{marginRight: '5px', marginBottom: '5px'}} onClick={() => this.handleGetTopicList({showAll: true})}>全部</Button>
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
                      <Button onClick={() => this.handleGetTopicList({type: '我的发布'})} style={{ padding: 0, paddingLeft: '10px'}} type='link'>我的发布</Button>
                      <Button onClick={() => this.handleGetTopicList({type: '我的收藏'})} type='link'>我的收藏</Button>
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
