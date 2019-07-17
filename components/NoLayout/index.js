import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import NoFooter from '../NoFooter';
import { Menu, Icon, message, Drawer } from 'antd';
const { SubMenu } = Menu;
import { userLogOut } from '../../api';
import {connect} from 'react-redux';
import Router from 'next/router';
import Cookies from 'js-cookie';
import './index.less';



class NoLayout extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    channelList: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired
  };
  
  static defaultProps = {
    channelList: []
  }
  constructor(props){
    super(props);
    this.handleChangeCollapsed = this.handleChangeCollapsed.bind(this);
    this.handleSelectMenu = this.handleSelectMenu.bind(this);
    this.state = {
      collapsed: false
    };
  }
  async componentWillMount () {
    
    this.props.dispatch({type:'FETCH_CHANNEL_LIST'});
    const _userCode = Cookies.get('username');
    if (_userCode) {
      this.props.dispatch({
        type: 'GET_USER_INFO',
        payload: {
          username: _userCode
        }
      });
    }
   
    
  }
  handleChangeCollapsed() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  }
  handleSelectMenu(e) {
    const {dispatch} = this.props;
    Router.push('/');
    dispatch({
      type: 'FETCH_TOPIC_LIST',
      payload: {categoryName: e.key}
    });
   
  }
  handleSelectUserItem = async (e) => {
    const { dispatch } = this.props;
    switch (e.key) {
      case 'signOut':
      
        var res = await userLogOut();
        if (res.success) {
          message.success(res.message);
          dispatch({
            type: 'USER_SIGN_OUT'
          });
        }
        Cookies.remove('username');
        break;
      case 'changePass':
        Router.push('/changePass');
        break;
      case 'changeUserInfo':
        Router.push('/modifyUser');
        break;
      
    }
  }
  
  
  render() {
    const { channelList } = this.props;
    return (
      <Fragment>
        <div style={{display: 'flex'}}>
          <Drawer
            placement='left'
            closable={false}
            onClose={this.handleChangeCollapsed}
            visible={this.state.collapsed}
            style={{padding:0}}
          >
            <Menu 
              className='menu-group-left'
              onClick={this.handleSelectMenu} 
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode='inline'
              theme='light'
            >
              <Menu.Item 
                key='home'>
                <Icon type='home' />
                <span>首页</span>
              </Menu.Item>
              <SubMenu
                key='topic'
                title={
                  <span>
                    <Icon type='notification' />
                    <span>频道</span>
                  </span>
                }>
                {
                  channelList.map(e => {
                    return (
                      <Menu.Item  
                        key={e.categoryName}
                      >{e.categoryName}</Menu.Item>
                    );
                  })
                }

              </SubMenu>
            </Menu>
          </Drawer>
         
          
          <div style={{width: '100%'}}>
            <Header 
              title={this.props.title} 
              onToggle={this.handleChangeCollapsed}
              isCollapsed={this.state.collapsed}
              channelList={channelList}
              userInfo={this.props.userInfo}
              onMenuClick={this.handleSelectMenu}
              onUserClick={this.handleSelectUserItem}/>
            <div className='main-container'>
              {this.props.children}
            </div>
            <NoFooter />
          </div>
        </div>
      </Fragment>
    );
  }
}



export default connect(state => ({
  userInfo: state.user.userInfo,
  channelList: state.channel.list
}))(NoLayout);
