import { Avatar } from 'antd';
import PropTypes from 'prop-types';

interface initProps {
  avatar: string,
  userName: string
  size: number | "small" | "large" | "default"
}

const NoAvatar = (props: initProps) => {
  if (!props.avatar) {
    return (
      <Avatar icon='user' size={props.size} />
    );
  } 
  if (props.avatar.length > 7) {
    return (
      <Avatar icon='user' src={props.avatar} size={props.size} />
    );
  } 
  return (
    <Avatar 
      style={{
        backgroundColor: props.avatar,
        verticalAlign: 'middle', 
        textTransform: 'capitalize',
        fontSize: 32
      }}
      size={props.size}
    >{props.userName.slice(0, 1)}</Avatar>
  );
};

export default NoAvatar;