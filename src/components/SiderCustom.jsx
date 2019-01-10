import React, {Component} from 'react';
import {Layout} from 'antd';
import {withRouter} from 'react-router-dom';
import routes from '../routes/config';
import SiderMenu from './SiderMenu';

const {Sider} = Layout;

class SiderCustom extends Component {

  state = {
    collapsed: false,
    mode: 'inline',
    openKey: '',
    selectedKey: '',
    firstHide: true, // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
  };

  static getDerivedStateFromProps(props, state) {

    if (props.collapsed !== state.collapsed) {
      const state1 = SiderCustom.setMenuOpen(props);
      const state2 = SiderCustom.onCollapse(props.collapsed);
      return {
        ...state2,
        firstHide: state.collapsed !== props.collapsed && props.collapsed, // 两个不等时赋值props属性值否则为false
        openKey: state.openKey || (!props.collapsed && state1.openKey)
      }
    }

    if(props.location && state.selectedKey){
      if(props.location.pathname !== state.selectedKey){
        let  state =  SiderCustom.setMenuOpen(props);
        return {
          ...state
        }
      }
    }

    return null;
  }

  static setMenuOpen = props => {
    const {pathname} = props.location
    return {
      openKey: pathname.substr(0, pathname.lastIndexOf('/')),
      selectedKey: pathname
    };


  };

  static onCollapse = (collapsed) => {
    return {
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    };
  };


  componentDidMount() {
    const state = SiderCustom.setMenuOpen(this.props);
    this.setState(state);
  }

  menuClick = e => {
    this.setState({
      selectedKey: e.key
    });
    const {popoverHide} = this.props; // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
    popoverHide && popoverHide();
  };

  openMenu = v => {
    this.setState({
      openKey: v[v.length - 1],
      firstHide: false,
    })
  };

  render() {
    return (
        <Sider
            trigger={null}
            breakpoint="lg"
            collapsed={this.props.collapsed}
            style={{overflowY: 'auto'}}
        >
          <div className="logo"/>
          <SiderMenu
              menus={routes.menus}
              onClick={this.menuClick}
              mode="inline"
              selectedKeys={[this.state.selectedKey]}
              openKeys={[this.state.openKey]}
              onOpenChange={this.openMenu}
          />
          <style>
            {`
              #nprogress .spinner{
                  left: ${this.state.collapsed ? '70px' : '206px'};
                  right: 0 !important;
              }
            `}
          </style>
        </Sider>
    )
  }
}

export default withRouter(SiderCustom);