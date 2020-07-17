import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/home'


Vue.use(Router)
export const RouterMap=[
  {
    path: '',  
    component: Layout,
    redirect: '/login',
    hidden:true
  },
  {
    path:'/login', 
    name:"login",
    meta:{
      title:'登录'
    },
    component: () => import('@/components/login'),
  },
  {
    path: '/userManagement',
    name: 'userManagement',
    component:Layout,
    meta:{
      title:'用户管理',
      icon: 'icondashboard',
    },
    children:[ 
      {
        path:'airdrop', 
        meta:{
          title:'空投用户管理', 
          icon:'icondashboard'
        },
        component: () => import('@/page/airdrop'),
      }
    ]
  },
  {
    path: '/financialManagement',
    name: 'financialManagement',
    component:Layout,
    meta:{
      title:'财务管理',
    },
    children:[ 
      {
        path:'AMYDetail', 
        meta:{
          title:'AMY转账流水'
        },
        component: () => import('@/page/AMYDetail'),
      }
    ]
  },
  {
    path: '/WebsiteManagement',
    name: 'WebsiteManagement',
    component:Layout,
    meta:{
      title:'官网管理',
    },
    children:[ 
      {
        path:'emailManagement', 
        meta:{
          title:'订阅邮箱管理'
        },
        component: () => import('@/page/emailManagement'),
      },
      {
        path:'companyManagement', 
        meta:{
          title:'企业服务申请管理'
        },
        component: () => import('@/page/companyManagement'),
      }
    ]
  }
]
export default new Router({
  mode:'history', // 默认为'hash'模式
	// base: '/permission/', // 添加跟目录,对应服务器部署子目录
	routes: RouterMap
})
