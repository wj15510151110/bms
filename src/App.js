import React, { Component } from 'react';
import { Layout, notification, Icon } from 'antd';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { receiveData } from './action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes';
import { ThemePicker } from './components/widget';

const { Content, Footer } = Layout;

class App extends Component {
    state = {
        collapsed: false,
    };
    componentWillMount() {
        const { receiveData } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        user && receiveData(user, 'auth');
        // receiveData({a: 213}, 'auth');
        // fetchData({funcName: 'admin', stateName: 'auth'});
        this.getClientWidth();
        window.onresize = () => {
            this.getClientWidth();
        }
    }

    getClientWidth = () => { // 获取当前浏览器宽度并设置responsive管理响应式
        const { receiveData } = this.props;
        const clientWidth = window.innerWidth;
        receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const { auth, responsive ,login} = this.props;
        return (
            <Layout>
                {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} />}
                <ThemePicker />
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}} />
                    <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                        <Routes auth={auth} login={login}/>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        麒麟会 ©{new Date().getFullYear()}
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const { auth = {data: {}}, login, responsive = {data: {}} } = state.httpData;
    return {auth, login,responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
