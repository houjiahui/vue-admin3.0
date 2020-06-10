import router from "./index";
import store from "@/store/index";
import { getToken, removeToKen, removeUsername } from "@/utils/app";

const whiteRouter = ['/login'];
router.beforeEach((to,from,next) => {
    if(getToken()){
        if(to.path === '/login'){
            removeToKen();
            removeUsername();
            store.commit('app/SET_TOKEN','');
            store.commit('app/SET_USERNAME','');
            next();
        }else{
            next();
        }
        // 路由动态添加，根据角色分配菜单
    }else{
        if(whiteRouter.indexOf(to.path) !== -1){
            next();
        }else{
            next('/login');
        }
    }
  })