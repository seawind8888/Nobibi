import {  PureComponent, Fragment } from 'react';
import { Icon, message } from 'antd';
import PropTypes from 'prop-types';
import NoAvatar from '../components/NoAvatar';
import CommentList from '../components/CommentList';
import { getTopicList, getPraiseInfo, actionPraise } from '../api';
import timer from '../utils/timer';
import Head from 'next/head';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import Router from 'next/router';



class TopicDetail extends PureComponent {
    static propTypes = {
      topicInfo: PropTypes.object.isRequired,
      userInfo: PropTypes.object.isRequired
    };
  
    static async getInitialProps ({ ctx}) {
      const _topic = await getTopicList({
        _id: ctx.query.id
      });
      return {
        topicInfo: _topic.data.list[0]
      };
    }
   
    constructor(props) {
      super(props);
    }
    state = {
      praiseNum: 0
    }
    componentWillMount() {
      this.handleGetPraiseInfo();
    }

    handleGetPraiseInfo = async () => {
      const { topicInfo} = this.props;
      const { data } = await getPraiseInfo({
        topicId: topicInfo._id
      });
      this.setState({
        praiseNum: data
      });
    }
    handleControlPraise = async (type) => {
      if (!Cookies.get('username')){
        Router.push('/login');
        return;
      }
      const { topicInfo, userInfo} = this.props;
      const data = await actionPraise({
        type: type,
        topicId: topicInfo._id,
        userName: userInfo.userName
      });
      if (data.success) {
        message.success(data.message);
        this.handleGetPraiseInfo();
      }
     
   
    }
    render() {
      const { topicInfo} = this.props;
      return (
        <Fragment>
          <Head>
            <title>{topicInfo.topicTitle}</title>
          </Head>
          <div className='main-inside-container topic-detail-container'>
            <h1 className='detail-title'>{topicInfo.topicTitle}</h1>
            <div className='main-info-container'>
              <div className='user-avatar'>
                <NoAvatar
                  avatar={topicInfo.userAvatar}
                  userName={topicInfo.userName}
                ></NoAvatar>
              </div>
              <div>
                <div className='topic-info-container'>{topicInfo.userName} {timer(Date.parse(topicInfo.updateTime))}</div>
                <div className='topic-content-container' dangerouslySetInnerHTML={{__html: topicInfo.content}}></div>
              </div>
              <div className='control-container'>
                <div onClick={() => { this.handleControlPraise('up'); }}>
                  <Icon style={{cursor:'pointer', fontSize: 16}}  type='up' />
                </div>

                <span style={{textAlign:'center', fontSize: 18}}>{this.state.praiseNum}</span>
                <div onClick={() => { this.handleControlPraise('down'); }}>
                  <Icon style={{cursor:'pointer', fontSize: 16}}  type='down' />
                </div>
                
              </div>
            </div>
            <CommentList
              topicTitle={topicInfo.topicTitle}
              topicId={topicInfo._id}
            />
          </div>
        </Fragment>
       
      );
    }
}

export default connect(state => ({
  userInfo: state.user.userInfo
}))(TopicDetail);