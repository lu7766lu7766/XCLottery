export default [
	{
		path: 'sys-setting',
		label: '系统设置',
		icon: 'fas fa-cog',
		component: () => import('pages/SysSetting'),
		children: [
			{
				path: 'role-manage',
				name: 'role-manage',
				label: '角色管理',
				hasMenu: 'ROLE_MG',
				component: () => import('pages/SysSetting/RoleSetting'),
			},
			{
				path: 'account-manage',
				name: 'account-manage',
				label: '帐号管理',
				hasMenu: 'ACCOUNT_MG',
				component: () => import('pages/SysSetting/AccountManage'),
			},
		],
	},
	{
		path: 'history',
		label: '历程记录',
		icon: 'fa fa-history',
		component: () => import('pages/HistoryRecord'),
		children: [
			{
				path: 'account-login',
				name: 'account-login-history',
				label: '帐号登入历程',
				hasMenu: 'ACCOUNT_LOGIN_HISTORY',
				component: () => import('pages/HistoryRecord/AccountLogin'),
			},
		],
	},
]
