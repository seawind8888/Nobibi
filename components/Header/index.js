import { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Dropdown, Button } from 'antd';
const { SubMenu } = Menu;
import Link from 'next/link';
import './index.less';

// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.


class Header extends Component {
  static propTypes = {
    onToggle: PropTypes.func.isRequired,
    channelList: PropTypes.array.isRequired,
    onMenuClick: PropTypes.func.isRequired,
    onUserClick: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
    isCollapsed: PropTypes.bool.isRequired
  };
  constructor(props) {
    super(props);
  }
  

  

  render() {
    const {onToggle, onMenuClick, isCollapsed, onUserClick, channelList, userInfo} = this.props;
    const menu = (
      <Menu
        onClick={onUserClick}>
        <Menu.Item
          key='changeUserInfo'>
          修改资料
        </Menu.Item>
        <Menu.Item
          key='changePass'>
          修改密码
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key='signOut'>
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <div className='header-outside'>
        <div className='header-main'>
          <Icon
            className='toggle-button'
            type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={onToggle}
          />
          <h1 className='header-title'>
            Nobibi
          </h1>
          <Menu 
            className='menu-group-header'
            onClick={onMenuClick} 
            mode='horizontal'>
            <Menu.Item 
              key='home'
            >
              <Icon type='home' />
              <span>
                首页
              </span>
            </Menu.Item>
            <SubMenu
              key='topic'
              title={
                <span>
                  <Icon type='notification' />
                  <span>主题</span>
                </span>
              }>
              {
                channelList.map(e => {
                  return (
                    <Menu.Item 
                      onClick={onMenuClick}
                      key={e.categoryName}>{e.categoryName}</Menu.Item>
                  );
                })
              }
            </SubMenu>
            
          </Menu>
          {userInfo.userName ?
            <section className='button-group'>
              <Dropdown overlay={menu}>
                <a className='ant-dropdown-link' href='#'>
                  {userInfo.userName} <Icon type='down' />
                </a>
              </Dropdown>
              <Button style={{marginLeft: '10px'}} type='primary' href='/topicEdit'>Bibi一下</Button>
            </section> :
            <section className='button-group'>
              <Link href='/login'>
                <a>登录</a>
              </Link>
              <div className='text-button-container'>
                <Link href='/register'>
                  <a>注册</a>
                </Link>
              </div>
            </section>
          }

        </div>
      </div>
    );
  }
}

export default Header;


