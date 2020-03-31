import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux'
import NoHeader from '../NoHeader';
import NoFooter from '../NoFooter';
import { message, } from 'antd';
import { userLogOut } from '../../api';
import { connect } from 'react-redux';
import Router from 'next/router';
import './index.less';
import { getUserInfo } from '../../redux/actions/user';
import { fetchChannelList } from '../../redux/actions/channel';
import { User } from '../../@types'
import { AppStateType } from '../../redux/reducers'

interface initProps {
  title?: string,
  children?: React.ReactNode,
  userInfo: User,
  dispatch: Dispatch
}

const NoLayout = (props: initProps) => {
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    const { dispatch } = props;
    dispatch(fetchChannelList());
    const _userCode = window.localStorage.getItem('username');
    if (_userCode) {
      dispatch(getUserInfo({
        username: _userCode
      }));

    }
  }, [])
  const handleChangeCollapsed = () => {
    setCollapsed(!collapsed)
  }
  // const handleSelectMenu = (key: any) => {
  //   Router.push(key);
  // }
  const handleSelectUserItem = async e => {
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

  return (
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
          onToggle={handleChangeCollapsed}
          isCollapsed={collapsed}
          userInfo={props.userInfo}
          onUserClick={handleSelectUserItem}
        />
        <div className='main-container'>{props.children}</div>
        <NoFooter />
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppStateType) => ({
  channelList: state.channel.list,
  userInfo: state.user,
});

export default connect(mapStateToProps)(NoLayout);
