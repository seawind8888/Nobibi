import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useDispatch } from 'react-redux'
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

interface NoLayoutProps {
  title?: string,
  children?: React.ReactNode,
  userInfo: User
}

const NoLayout: NextPage<NoLayoutProps> = (props) => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
   
    dispatch(fetchChannelList());
    const _userCode = window.localStorage.getItem('userName');
    if (_userCode) {
      dispatch(getUserInfo({
        userName: _userCode
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
        window.localStorage.removeItem('userName');
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
