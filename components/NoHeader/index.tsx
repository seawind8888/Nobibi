
import { NextPage } from 'next';
import { ClickParam } from 'antd/es/menu';
import { DownOutlined } from '@ant-design/icons';
import { Menu,  Dropdown, Button, Input } from 'antd';
const { Search } = Input;
import Router from 'next/router';
import { User } from '../../@types'
// const { SubMenu } = Menu;
import Link from 'next/link';
import './index.less';


// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.

interface NoHeaderProps {
  onToggle?: () => void,
  onUserClick?: (e: ClickParam) => Promise<void>,
  userInfo?: User,
  isCollapsed?: boolean
}

const NoHeader: NextPage<NoHeaderProps> = (props) => {
  const { onUserClick, userInfo } = props;
  const handleGotoHome = () => {
    Router.push('/');
  }

  const menu = () => (
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
        {/* <Icon
            className='toggle-button'
            type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={onToggle}
          /> */}
        <h1 className='header-title' onClick={handleGotoHome}>
          Nobibi
          </h1>
        <Search
          placeholder='搜搜bibi'
          size='small'
          onSearch={value => console.log(value)}
          className='header-search-container'
        />

        {userInfo.userName ?
          <section className='button-group'>
            <Dropdown overlay={menu}>
              <a className='ant-dropdown-link' href='#'>
                {userInfo.userName} <DownOutlined />
              </a>
            </Dropdown>
            <Button style={{ marginLeft: '10px' }} type='primary' href='/topicEdit'>Bibi一下</Button>
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


export default NoHeader;


