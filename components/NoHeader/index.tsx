import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { ClickParam } from 'antd/es/menu';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Input, Drawer, Divider } from 'antd';
import NoAvatar from '../../components/NoAvatar';
import Router from 'next/router';
import { User } from '../../@types';
// const { SubMenu } = Menu;
import Link from 'next/link';
import './index.less';

const { Search } = Input;

// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.

interface NoHeaderProps {
  onToggle?: () => void;
  selectMenu?: (type: String) => void;
  userInfo?: User;
  isCollapsed?: boolean;
}

const data = [
  { title: '修改资料' },
  { title: '修改密码' },
  { title: '退出登录' },
];

const NoHeader: NextPage<NoHeaderProps> = props => {
  const router = useRouter();
  const { selectMenu, userInfo } = props;
  const [collapse, setCollapse] = useState(false);

  const handleToggleMenu = (visible = false) => {
    setCollapse(visible);
  };

  const renderUserInfo = () => (
    <div className="drawer-user-info-container">
      <NoAvatar
        avatar={userInfo.avatar}
        userName={userInfo.userName}
        size={56}
      />
      <div className="user-info">
        {userInfo ? userInfo.userName : '点击登录'}
      </div>
    </div>
  );

  const renderMenu = () => (
    <Menu onClick={e => selectMenu(e.key)}>
      <Menu.Item key="changeUserInfo">修改资料</Menu.Item>
      <Menu.Item key="changePass">修改密码</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="signOut">退出登录</Menu.Item>
    </Menu>
  );

  const handleGotoPage = path => {
    router.push(path);
  };

  const onDrawerItemClick = type => {
    setCollapse(false);
    selectMenu(type);
  };

  return (
    <div className="header-outside">
      <div className="header-main">
        <MenuOutlined
          className="header-mobile-toggle"
          onClick={() => handleToggleMenu(true)}
        />
        <Drawer
          title={renderUserInfo()}
          placement="left"
          closable={false}
          visible={collapse}
          onClose={() => handleToggleMenu(false)}
        >
          {renderMenu()}
          {/* {userInfo.userName &&   <div className='drawer-cell-list'>
            <div onClick={() => onDrawerItemClick('changeUserInfo')} className='drawer-cell-item'>修改资料</div>
            <Divider className='drawer-cell-item-dashed' />
            <div onClick={() => onDrawerItemClick('changePass')} className='drawer-cell-item'>修改密码</div>
            <Divider className='drawer-cell-item-dashed' />
            <div onClick={() => onDrawerItemClick('signOut')} className='drawer-cell-item'>退出登录</div>
          </div>} */}
        </Drawer>
        <h1 className="header-title" onClick={() => handleGotoPage('/')}>
          Nobibi
        </h1>
        <div className="header-menu"></div>
        <Search
          placeholder="搜搜bibi"
          size="small"
          onSearch={value => console.log(value)}
          className="header-search-container"
        />

        {userInfo.userName ? (
          <section className="button-group">
            <Dropdown overlay={renderMenu}>
              <a className="ant-dropdown-link" href="#">
                {userInfo.userName} <DownOutlined />
              </a>
            </Dropdown>
          </section>
        ) : (
          <section className="button-group">
            <Link href="/login">
              <a>登录</a>
            </Link>
            <div className="text-button-container">
              <Link href="/register">
                <a>注册</a>
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default NoHeader;
