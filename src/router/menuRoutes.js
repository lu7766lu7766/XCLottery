export default [
	{
		path: 'sys-setting',
		label: '系统设置',
		icon: 'fas fa-cog',
		component: () => import('pages/SysSetting'),
		children: [
			{
				path: 'role-manage',
				name: 'ROLE_MG',
				label: '角色管理',
				component: () => import('pages/SysSetting/RoleSetting'),
			},
			{
				path: 'account-manage',
				name: 'ACCOUNT_MG',
				label: '帐号管理',
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
				name: 'ACCOUNT_LOGIN_HISTORY',
				label: '帐号登入历程',
				component: () => import('pages/HistoryRecord/AccountLogin'),
			},
		],
	},
]
