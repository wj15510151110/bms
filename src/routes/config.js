export default {
  menus: [ // 菜单相关路由
    {key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'MemberList'},
    {
      key: '/app/member', title: '会员管理', icon: 'scan',
      subs: [
        {key: '/app/member/list', title: '会员列表', component: 'MemberList'},
        {key: '/app/member/add', title: '新增会员', component: 'MemberAdd'},
      ],
    },
    {
      key: '/app/admin', title: '管理员', icon: 'scan',
      subs: [
        {key: '/app/admin/list', title: '人员列表', component: 'AdminList'},
        {key: '/app/admin/add', title: '新增人员', component: 'AdminAdd'},
      ],
    },
    {
      key: '/app/system', title: '系统设置', icon: 'scan',
      subs: [
        {key: '/app/system/shortmessage', title: '短信设置', component: 'ShortMessage'},
        {key: '/app/system/mailbox', title: '邮箱设置', component: 'MailBox'},
        {key: '/app/system/setup', title: '系统设置', component: 'SetUp'},
        {key: '/app/system/categoryList', title: '类别列表', component: 'CategoryList'},
        {key: '/app/system/categoryAdd', title: '新增类别', component: 'CategoryAdd'},
        {key: '/app/system/identityList', title: '身份列表', component: 'IdentityList'},
        {key: '/app/system/identityAdd', title: '新增身份', component: 'IdentityAdd'},
      ],
    },
    {
      key: '/subs4', title: '页面', icon: 'switcher',
      subs: [
        {key: '/login', title: '登录'},
        {key: '/404', title: '404'},
      ],
    },
    {
      key: '/app/auth', title: '权限管理', icon: 'safety',
      subs: [
        {key: '/app/auth/basic', title: '基础演示', component: 'AuthBasic'},
        {key: '/app/auth/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage'},
      ],
    },
  /*  {
      key: '/app/cssModule', title: 'cssModule', icon: 'star', component: 'Cssmodule'
    },
    {
      key: '/app/extension', title: '功能扩展', icon: 'bars',
      subs: [
        {key: '/app/extension/queryParams', title: '问号形式参数', component: 'QueryParams', query: '?param1=1&param2=2'},
      ],
    },*/
    /* {
     key: '/app/animation', title: '动画', icon: 'rocket',
     subs: [
       {key: '/app/animation/basicAnimations', title: '基础动画', component: 'BasicAnimations'},
       {key: '/app/animation/exampleAnimations', title: '动画案例', component: 'ExampleAnimations'},
     ],
   },*/
    /*  {
     key: '/app/ui', title: 'UI', icon: 'scan',
     subs: [
       {key: '/app/ui/buttons', title: '按钮', component: 'Buttons'},
       {key: '/app/ui/icons', title: '图标', component: 'Icons'},
       {key: '/app/ui/spins', title: '加载中', component: 'Spins'},
       {key: '/app/ui/modals', title: '对话框', component: 'Modals'},
       {key: '/app/ui/notifications', title: '通知提醒框', component: 'Notifications'},
       {key: '/app/ui/tabs', title: '标签页', component: 'Tabs'},
       {key: '/app/ui/banners', title: '轮播图', component: 'Banners'},
       {key: '/app/ui/wysiwyg', title: '富文本', component: 'WysiwygBundle'},
       {key: '/app/ui/drags', title: '拖拽', component: 'Drags'},
       {key: '/app/ui/gallery', title: '画廊', component: 'Gallery'},
       {key: '/app/ui/map', title: '地图', component: 'MapUi'},
     ],
   },*/
    /*{key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard'},*/
    /*  {
  key: '/app/table', title: '表格', icon: 'copy',
  subs: [
    {key: '/app/table/basicTable', title: '基础表格', component: 'BasicTable'},
    {key: '/app/table/advancedTable', title: '高级表格', component: 'AdvancedTable'},
    {key: '/app/table/asynchronousTable', title: '异步表格', component: 'AsynchronousTable'},
  ],
},
{
  key: '/app/form', title: '表单', icon: 'edit',
  subs: [
    {key: '/app/form/basicForm', title: '基础表单', component: 'BasicForm'},
  ],
},
{
  key: '/app/chart', title: '图表', icon: 'area-chart',
  subs: [
    {key: '/app/chart/echarts', title: 'echarts', component: 'Echarts'},
    {key: '/app/chart/recharts', title: 'recharts', component: 'Recharts'},
  ],
},*/
  ],
  others: [] // 非菜单相关路由
}