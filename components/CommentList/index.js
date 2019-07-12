import {  PureComponent } from 'react';
import { Comment,  List,  message} from 'antd';
import Editor from '../Editor';
import { getCommentList, addComment } from '../../api';
import PropTypes from 'prop-types';
import timer from '../../utils/timer';
import {connect} from 'react-redux';
import NoAvatar from '../NoAvatar';

class CommentList extends PureComponent {
  static propTypes = {
    topicTitle: PropTypes.string.isRequired,
    topicId: PropTypes.string.isRequired,
    userInfo: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  }

  state = {
    comments: [],
    submitting: false,
    content: '',
  };
  componentDidMount() {
   
    this.getCommentList();
  
  }
  getCommentList = async () => {
    const { topicId } = this.props;
    const { data } = await getCommentList({
      topicId: topicId
    });
    if (data.list.length)
      this.setState({
        comments: this.initComment(data.list)
      });
  }
 

  handleSubmit = async () => {
    const { topicTitle, topicId, userInfo } = this.props;
    if (!this.state.content) {
      return;
    }

    this.setState({
      submitting: true,
    });

    const { success } = await addComment({
      topicTitle: topicTitle,
      topicId: topicId,
      userName: userInfo.userName,
      userAvatar: userInfo.avatar,
      content: this.state.content
    });
    this.setState({
      submitting: false
    });
    if (success) {
      message.success('bibi成功啦!');
      this.getCommentList();
    }
  };

  initComment = (list) => {
    return list.map(e => {
      return {
        author: e.userName,
        avatar: e.userAvatar,
        content: e.content,
        datetime: timer(Date.parse(e.updateTime))
      };
    });
  }



  handleChange = e => {
    this.setState({
      content: e.target.value,
    });
  };

  render() {
    const { comments, submitting, content } = this.state;
    const { userInfo } = this.props;

    return (
      <div>
        {comments.length > 0 && <List
          dataSource={comments}
          header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout='horizontal'
          renderItem={item => 
            <Comment 
              avatar={
                <NoAvatar
                  avatar={item.avatar}
                  userName={item.author}
                  size={32}
                />
              }
              author={item.author}
              content={item.content}
              datetime={item.datetime}
            />}
        />}
        <Comment
          avatar={
            <NoAvatar
              avatar={userInfo.avatar}
              userName={userInfo.userName}
              size={32}
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={content}
            />
          }
        />
      </div>
    );
  }
}

export default connect(state => ({
  userInfo: state.user.userInfo
}))(CommentList);