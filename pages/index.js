import { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import TopicItem from '../components/TopicItem';
import {connect} from 'react-redux';
import { Pagination } from 'antd';

class Home extends PureComponent {
  static propTypes = {
    topicListInfo: PropTypes.array.isRequired,
    topicListTotal: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  static async getInitialProps ({ctx}) {
    const { store } = ctx;
    store.dispatch({
      type: 'FETCH_TOPIC_LIST',
      payload: {
        page: 1
      }
    });
    return {};
  }


  
  constructor (props) {
    super(props);
  }
  changePagenation = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'FETCH_TOPIC_LIST',
      payload: {
        page: e
      }
    });
  }
  
  render() {
    const {topicListInfo, topicListTotal} = this.props;
    return (
      <Fragment>
        <div className='main-inside-container home-container'>
          <div className='home-container'>
            <div className='list-item-container'>
              {topicListInfo.map((e, i) => {
                return (
                  <TopicItem
                    topicInfo={e}
                    key={i}
                    // avatar={e.userAvatar}
                    // id={e._id}
                    // title={e.topicTitle}
                    // userName={e.userName}
                    // updateTime={e.updateTime}
                    // categoryName={e.categoryName}
                    // praiseNum={e.praiseNum}
                  ></TopicItem>
                );
              })
              }
            
           
            </div>
            <div className='home-right-container'>
              <div className='ad-container'>
              广告位招租
              </div>
            </div>
          </div>
          <div className='topic-pagenation-container'>
            {
              topicListTotal > 10 ? <Pagination total={topicListTotal} onChange={this.changePagenation} showSizeChanger showQuickJumper /> : <div/>
            }
          </div>
          
        </div>
      </Fragment>
    );
  }
}



export default connect(state => ({
  topicListInfo: state.topic.list,
  topicListTotal: state.topic.total
}))(Home);

