// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import "../node_modules/element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import axios from 'axios';
Vue.prototype.$http = axios.create({
    baseURL: ApiConfig.baseURL
});

Vue.config.productionTip = false

//通过路由去验证登陆页面
router.beforeEach((to, from, next) => {
    if (to.meta.hasLogin == true) {
        if (sessionStorage.getItem("s_id") != null && sessionStorage.getItem("s_id") != undefined) {
            next();
        } else {
            next({ name: "Login" })
        }
    } else {
        next();
    }

})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    created() {
        document.getElementById("first_loading").remove();
    }
})