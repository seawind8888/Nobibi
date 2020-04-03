import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Comment, List, message } from 'antd';
import Router from 'next/router';
import Editor from '../Editor';
import { fetchCommentList, addComment } from '../../api';
import timer from '../../utils/timer';
import { connect } from 'react-redux';
import NoAvatar from '../NoAvatar';

import { AppStateType } from '../../redux/reducers'
import { User } from '../../@types'

interface CommentListProps {
  topicTitle: string,
  topicId: string,
  userInfo: User
}

const CommentList: NextPage<CommentListProps> = (props) => {
  const [comments, setComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [content, setContent] = useState('')
  const { userInfo } = props;

  useEffect(() => {
    getCommentList();
  }, [])

  const getCommentList = async () => {
    const { topicId } = props;
    const { data } = await fetchCommentList({
      topicId: topicId,
    });
    if (data.list.length) setComments(initComment(data.list))
  }

  const handleSubmit = async () => {
    if (
      typeof window !== 'undefined' &&
      !window.localStorage.getItem('Token')
    ) {
      Router.push('/login');
      return;
    }
    const { topicTitle, topicId, userInfo } = props;
    if (!content) {
      return;
    }
    setSubmitting(true)

    const { success } = await addComment({
      topicTitle: topicTitle,
      topicId: topicId,
      userName: userInfo.userName,
      userAvatar: userInfo.avatar,
      content: content
    });
    setSubmitting(false)
    if (success) {
      message.success('bibi成功啦!');
      getCommentList();
    }
  };

  const initComment = list => {
    return list.map(e => {
      return {
        author: e.userName,
        avatar: e.userAvatar,
        content: e.content,
        datetime: timer(Date.parse(e.updateTime)),
      };
    });
  };

  const handleChange = e => {
    setContent(e.target.value)
  };


  return (
    <div>
      {comments.length > 0 && (
        <List
          dataSource={comments}
          header='回复'
          itemLayout='horizontal'
          renderItem={item => (
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
            />
          )}
        />
      )}
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
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={content}
          />
        }
      />
    </div>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  userInfo: state.user,
});

export default connect(mapStateToProps)(CommentList);
