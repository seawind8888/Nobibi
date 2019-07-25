import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import NoHeader from '../NoHeader';
import NoFooter from '../NoFooter';
import {  message,  } from 'antd';
import { userLogOut } from '../../api';
import { connect } from 'react-redux';
import Router from 'next/router';
import './index.less';
import { getUserInfo } from '../../redux/actions/user';
import { fetchChannelList } from '../../redux/actions/channel';


class NoLayout extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
  }
  state = {
    collapsed: false,
  };
  async componentDidMount() {
    const {dispatch} = this.props;
    dispatch(getUserInfo());
    const _userCode = window.localStorage.getItem('username');
    if (_userCode) {
      dispatch(fetchChannelList());
    }
  }
  handleChangeCollapsed = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed,
    }));
  }
  handleSelectMenu = (key) => {
    Router.push(key);
  }
  handleSelectUserItem = async e => {
    const { dispatch } = this.props;
    switch (e.key) {
      case 'signOut':
        var res = await userLogOut();
        if (res.success) {
          message.success(res.message);
          dispatch({
            type: 'USER_SIGN_OUT',
          });
        }
        window.localStorage.removeItem('Token');
        window.localStorage.removeItem('username');
        break;
      case 'changePass':
        Router.push('/changePass');
        break;
      case 'changeUserInfo':
        Router.push('/modifyUser');
        break;
    }
  };

  render() {
    return (
      <Fragment>
        <div style={{ display: 'flex' }}>
          {/* <Drawer
            placement='left'
            closable={false}
            onClose={this.handleChangeCollapsed}
            visible={this.state.collapsed}
            style={{ padding: 0 }}
          >
            <Menu
              className='menu-group-left'
              onClick={this.handleSelectMenu}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode='inline'
              theme='light'
            >
              <Menu.Item key='/'>
                <Icon type='home' />
                <span>首页</span>
              </Menu.Item>
            </Menu>
          </Drawer> */}

          <div style={{ width: '100%' }}>
            <NoHeader
              title={this.props.title}
              onToggle={this.handleChangeCollapsed}
              isCollapsed={this.state.collapsed}
              userInfo={this.props.userInfo}
              onUserClick={this.handleSelectUserItem}
            />
            <div className='main-container'>{this.props.children}</div>
            <NoFooter />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => ({
  userInfo: state.user.userInfo,
  channelList: state.channel.list,
}))(NoLayout);
