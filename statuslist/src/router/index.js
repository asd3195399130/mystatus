import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/logon/PageView.vue"),
    redirect: "/main/students",
    children: [
      {
        path: "/main/students",
        name: "students",
        component: () => import("../views/students/studentsView.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes
})
import { MessageBox } from "element-ui";
router.beforeEach((to,from,next)=>{
  if(to.path === "/"){
    next()
  } else if(localStorage.getItem("data")){
    next()
  }else{
    MessageBox.alert("请先登录", "提示", {
      confirmButtonText: "确定",
      callback: (action) => {
        console.log(action);
        MessageBox({
          type: "info",
        });
        next("/"); // 点击确定后跳转到登录页面
      },
    });
  }
})
export default router
