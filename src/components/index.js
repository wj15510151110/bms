/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import BasicForm from './forms/BasicForm';
import BasicTable from './tables/BasicTables';
import AdvancedTable from './tables/AdvancedTables';
import AsynchronousTable from './tables/AsynchronousTable';
import Echarts from './charts/Echarts';
import Recharts from './charts/Recharts';
import Icons from './ui/Icons';
import Buttons from './ui/Buttons';
import Spins from './ui/Spins';
import Modals from './ui/Modals';
import Notifications from './ui/Notifications';
import Tabs from './ui/Tabs';
import Banners from './ui/banners';
import Drags from './ui/Draggable';
import Dashboard from './dashboard/Dashboard';
import Gallery from './ui/Gallery';
import BasicAnimations from './animation/BasicAnimations';
import ExampleAnimations from './animation/ExampleAnimations';
import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import Cssmodule from './cssmodule';
import MapUi from './ui/map';
import QueryParams from './extension/QueryParams';
//新增路由
import MemberList from './BMScomponent/member/MemberList'
import MemberAdd from './BMScomponent/member/MemberAdd'

import AdminList from './BMScomponent/admin/AdminList'
import AdminAdd from './BMScomponent/admin/AdminAdd'
import MailBox from './BMScomponent/system/MailBox'


import CategoryList from './BMScomponent/system/CategoryList'
import CategoryAdd from './BMScomponent/system/CategoryAdd'
import IdentityList from './BMScomponent/system/IdentityList'
import IdentityAdd from './BMScomponent/system/IdentityAdd'

import SetUp from './BMScomponent/system/SetUp'
import ChangePassword from './BMScomponent/system/ChangePassword'

import ShortMessage from './BMScomponent/system/ShortMessage'


const WysiwygBundle = Loadable({ // 按需加载富文本配置
  loader: () => import('./ui/Wysiwyg'),
  loading: Loading,
});

export default {
  MemberList,
  MemberAdd,

  CategoryList,
  CategoryAdd,
  IdentityList,
  IdentityAdd,

  AdminList,
  AdminAdd,

  MailBox,
  SetUp,
  ShortMessage,
  ChangePassword,
  RouterEnter,
}