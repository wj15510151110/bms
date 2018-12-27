/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Menu, Icon, Layout, Popover} from 'antd';
import screenfull from 'screenfull';
import avater from '../style/imgs/touxiang.jpg';
import SiderCustom from './SiderCustom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {PwaInstaller} from './widget';

const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
  state = {
    user: '',
    visible: false,
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('info'));
    this.setState({
      user,
    });
  };

  screenFull = () => {
    if (screenfull.enabled) {
      screenfull.request();
    }

  };
  menuClick = e => {
    console.log(e);
    e.key === 'logout' && this.logout();
  };
  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('login');
    localStorage.removeItem('info');
    this.props.history.push('/login')
  };
  popoverHide = () => {
    this.setState({
      visible: false,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({visible});
  };

  render() {
    let {user} = this.state
    const {responsive, path} = this.props;
    return (
        <Header className="custom-theme header">
          {
            responsive.data.isMobile ? (
                <Popover content={<SiderCustom path={path} popoverHide={this.popoverHide}/>} trigger="click"
                         placement="bottomLeft" visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
                  <Icon type="bars" className="header__trigger custom-trigger"/>
                </Popover>
            ) : (
                <Icon
                    className="header__trigger custom-trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
            )
          }
          <Menu
              mode="horizontal"
              style={{lineHeight: '64px', float: 'right'}}
              onClick={this.menuClick}
          >
            <Menu.Item key="pwa">
              <PwaInstaller/>
            </Menu.Item>
            <SubMenu
                title={<span className="avatar"><img src={avater} alt="头像"/><i className="on bottom b-white"/></span>}>
              {/*<Menu.Item key="setting:1">你好 - {this.props.user.userName}</Menu.Item>*/}
              <Menu.Item key="setting:2">修改密码</Menu.Item>
              <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
    )
  }
}

const mapStateToProps = state => {
  const {responsive = {data: {}}} = state.httpData;
  return {responsive};
};

export default withRouter(connect(mapStateToProps)(HeaderCustom));
