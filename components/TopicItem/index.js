
import {  Tag } from 'antd';
import NoAvatar from '../NoAvatar';
import Link from 'next/link';
import PropTypes from 'prop-types';
import timer from '../../utils/timer';

const TopicItem = (props) => {
  return (
    <div className='topic-container'>
      <div className='left-item'>
        <NoAvatar
          avatar={props.avatar}
          userName={props.userName}
        >
        </NoAvatar>
      </div>
      <div className='right-item'>
        <h1>
          <Link 
            as={`/topicDetail/${props.id}`}
            href={`/topicDetail?id=${props.id}`}>
            <a>
              {props.title}
            </a>
          
          </Link>
        </h1>
        <div className='bottom-info'>
          <Tag color={props.categoryColor}>{props.categoryName}</Tag>·
          <span className='info-item'>{props.userName}</span>·
          <span className='info-item'>{timer(Date.parse(props.updateTime))}</span>
        </div>
      </div>
    </div>
  );
};
  
TopicItem.propTypes = {
  id:PropTypes.string.isRequired,
  avatar:PropTypes.string,
  title: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  categoryColor: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  updateTime: PropTypes.string.isRequired
};

TopicItem.defaultProps = {
  avatar: ''
};


export default TopicItem;