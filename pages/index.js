import { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import TopicItem from '../components/TopicItem';
import {connect} from 'react-redux';

class Home extends PureComponent {
  static propTypes = {
    topicListInfo: PropTypes.array.isRequired
  }
  static async getInitialProps ({ctx}) {
    const { store } = ctx;
    store.dispatch({
      type: 'FETCH_TOPIC_LIST'
    });
    return {};
  }

  
  constructor (props) {
    super(props);
  }
  
  render() {
    const {topicListInfo} = this.props;
    return (
      <Fragment>
        <div className='main-inside-container home-container'>
          <div className='list-item-container'>
            {topicListInfo.map((e, i) => {
              return (
                <TopicItem
                  key={i}
                  avatar={e.userAvatar}
                  id={e._id}
                  title={e.topicTitle}
                  category={e.category}
                  userName={e.userName}
                  updateTime={e.updateTime}
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
      </Fragment>
    );
  }
}



export default connect(state => ({
  topicListInfo: state.topic.list
}))(Home);

