import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import AdminIndex from "../views/AdminIndex.vue";
import addTask from "../views/addTask.vue";
import taskList from "../views/taskList.vue";

Vue.use(Router)

export default new Router({
    routes: [{
        path: "/",
        redirect: "/Login"
    }, {
        name: "Login",
        path: "/Login",
        component: Login
    }, {
        name: "Register",
        path: "/Register",
        component: Register
    }, {
        name: "AdminIndex",
        path: "/AdminIndex",
        component: AdminIndex,
        meta: {
            hasLogin: true
        },
        children: [{
            path: "addTask",
            name: "addTask",
            component: addTask,
            meta: {
                hasLogin: true
            }
        }, {
            path: "taskList",
            name: "taskList",
            component: taskList,
            meta: {
                hasLogin: true
            }
        }]
    }]
})