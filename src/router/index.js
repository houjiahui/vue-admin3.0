import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden:true,
    meta:{
      name:'主页'
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden:true,
    meta:{
      name:'登录'
    },
    component: () => import( "../views/login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect:"index",
    meta:{
      name:'控制台',
      icon:'console'
    },
    component: () => import( "../views/Layout/index.vue"),
    children: [
      {
        path: "/index",
        name: "index",
        meta:{
          name:'首页'
        },
        component: () => import( "../views/Console/index.vue")
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    meta:{
      name:'信息管理',
      icon:'info'
    },
    component: () => import( "../views/Layout/index.vue"),
    children: [
      {
        path: "/indexInfo",
        name: "indexInfo",
        meta:{
          name:'信息列表'
        },
        component: () => import( "../views/Info/index.vue")
      },
      {
        path: "/indexCategory",
        name: "indexCategory",
        meta:{
          name:'信息分类'
        },
        component: () => import( "../views/Info/category.vue")
      },
      {
        path: "/indexDetail",
        name: "indexDetail",
        meta:{
          name:'信息详情'
        },
        component: () => import( "../views/Info/detail.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    meta:{
      name:'用户管理',
      icon:'user'
    },
    component: () => import( "../views/Layout/index.vue"),
    children: [
      {
        path: "/userIndex",
        name: "userIndex",
        meta:{
          name:'用户列表'
        },
        component: () => import( "../views/User/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
