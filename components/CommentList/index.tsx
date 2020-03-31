import React, { useState, useEffect } from 'react';
import { Comment, List, message } from 'antd';
import Router from 'next/router';
import Editor from '../Editor';
import { fetchCommentList, addComment } from '../../api';
import PropTypes from 'prop-types';
import timer from '../../utils/timer';
import { connect } from 'react-redux';
import NoAvatar from '../NoAvatar';

import { AppStateType } from '../../redux/reducers'
import { User } from '../../@types'

interface initProps {
  topicTitle: string,
  topicId: string,
  userInfo: User
}

const CommentList = (props: initProps) => {
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
    const { topicTitle, topicId, userInfo } = this.props;
    if (!this.state.content) {
      return;
    }
    setSubmitting(true)

    const { success } = await addComment({
      topicTitle: topicTitle,
      topicId: topicId,
      userName: userInfo.userName,
      userAvatar: userInfo.avatar,
      content: this.state.content,
    });
    setSubmitting(false)
    if (success) {
      message.success('bibi成功啦!');
      this.getCommentList();
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
