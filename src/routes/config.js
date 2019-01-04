export default {
  menus: [ // 菜单相关路由
    {key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'MemberList'},
    {
      key: '/app/member', title: '会员管理', icon: 'edit',
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
      key: '/app/system', title: '系统设置', icon: 'area-chart',
      subs: [
        {key: '/app/system/shortmessage', title: '短信设置', component: 'ShortMessage'},
        {key: '/app/system/mailbox', title: '邮箱设置', component: 'MailBox'},
        {key: '/app/system/setup', title: '系统信息', component: 'SetUp'},
        {key: '/app/system/categoryList', title: '类别列表', component: 'CategoryList'},
        {key: '/app/system/categoryAdd', title: '新增类别', component: 'CategoryAdd'},
        {key: '/app/system/identityList', title: '身份列表', component: 'IdentityList'},
        {key: '/app/system/identityAdd', title: '新增身份', component: 'IdentityAdd'},
        {key: '/app/system/changePassword', title: '修改密码', component: 'ChangePassword'},
      ],
    },
  ],
  others: [] // 非菜单相关路由
}