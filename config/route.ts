const route = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/businessAdm/enter',
          },
          {
            path: '/commodityAdm',
            name: '商品管理',
            icon: 'shop',
            routes: [
              {
                path: 'management',
                name: '商品列表',
                component: './commodity/commodityAdm/CommodityAdm.tsx',
              },
              {
                path: 'classification',
                name: '商品分类',
                component: './commodity/commodityClassify/commodityCas.tsx',
              },
              {
                path: 'management/chooseProducts',
                name: '选择商品',
                component: './commodity/commodityAdm/chooseProducts.tsx',
                hideInMenu: true,
              },
              {
                path: 'management/particulars',
                name: '查看详情',
                component: './commodity/commodityAdm/CommodityDet.tsx',
                hideInMenu: true,
              },
              {
                path: 'management/edit',
                name: '新建产品',
                component: './commodity/commodityAdm/CommodityEdit.tsx',
                hideInMenu: true,
              },
            ],
          },
          {
            path: '/businessAdm',
            name: '订单管理',
            icon: 'home',
            routes: [
              {
                path: '/businessAdm/enter',
                name: '订单管理 ',
                component: './businessAdm/businessEnter',
              },
              // {
              //   path: 'examine',
              //   name: '入驻审核',
              //   component: './commodity/commodityAdm/CommodityAdm.tsx',
              // },
              {
                path: '/businessAdm/enter/particulars',
                name: '查看详情',
                component: './businessAdm/particulars',
                hideInMenu: true,
              },
              {
                path: '/businessAdm/enter/edit',
                name: '编辑资料',
                component: './businessAdm/businessEdit',
                hideInMenu: true,
              },
            ],
          },
          // 运营工具模块
          {
            path: '/operTool',
            name: '运营工具',
            icon: 'tool',
            routes: [
              {
                path: '/operTool/findCommodity',
                name: '快速找药',
                component: './operTool/findCommodity/findList.tsx',
              },
              {
                path: '/operTool/findCommodity/newCategory',
                name: '添加分类',
                component: './operTool/findCommodity/findItem.tsx',
                hideInMenu: true,
              },
            ],
          },
          // 用户
          // {
          //   path: '/admin',
          //   name: 'admin',
          //   icon: 'crown',
          //   component: './Admin',
          //   authority: ['admin'],
          // },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },

  {
    component: './404',
  },
];
export default route;
