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
            redirect: '/dashboard/dashboard',
          },
          {
            path: '/index',
            redirect: '/dashboard/dashboard',
          },
          {
            path: '/commodityAdm',
            name: '商品管理',
            icon: 'shop',
            routes: [
              {
                path: 'management',
                name: '商城商品管理',
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
              {
                path: '/businessAdm/enter/particulars',
                name: '查看详情',
                component: './businessAdm/particulars',
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
              {
                path: '/operTool/banner',
                name: 'banner管理',
                component: './operTool/banner/bannerList.tsx',
              },
              {
                path: '/operTool/banner/newBanner',
                name: '新增banner',
                component: './operTool/banner/bannerItem.tsx',
                hideInMenu: true,
              },
            ],
          },
          // 交易设置模块
          {
            path: '/tradeSetting',
            name: '交易设置',
            icon: 'car',
            routes: [
              {
                path: '/tradeSetting/selfDelivery',
                name: '到店自提',
                component: './tradeSetting/selfDelivery/selfDelivery.tsx',
              },
              {
                path: '/tradeSetting/selfDelivery/newSelfDelivery',
                name: '开通到店自提',
                component: './tradeSetting/selfDelivery/newSelfDelivery.tsx',
                hideInMenu: true,
              },
              {
                path: '/tradeSetting/noDistribute',
                name: '不可配送区域',
                component: './tradeSetting/noDistribute/noDistribute.tsx',
                // hideInMenu: true,
              },
              {
                path: '/tradeSetting/freight',
                name: '运费设置',
                component: './tradeSetting/freight/freight.tsx',
              },
              {
                path: '/tradeSetting/freight/newFreight',
                name: '新增运费模版',
                component: './tradeSetting/freight/newFreight.tsx',
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
          // 欢迎页
          {
            path: '/dashboard',
            routes: [
              {
                name: 'dashboard',
                path: '/dashboard/dashboard',
                component: './dashboard/dashboard.tsx',
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
    ],
  },

  {
    component: './404',
  },
];
export default route;
