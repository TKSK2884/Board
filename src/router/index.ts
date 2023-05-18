import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import JoinView from "../views/JoinView.vue";
import BoardView from "../views/BoardView.vue";
import WritePostView from "../views/WritePostView.vue";
import ReadPostView from "../views/ReadPostView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/member/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/member/join",
        name: "join",
        component: JoinView,
    },
    {
        path: "/board", // "/board/category"
        name: "board",
        component: BoardView,
    },
    {
        path: "/board/write",
        name: "write",
        component: WritePostView,
    },
    {
        path: "/board/read",
        name: "read",
        component: ReadPostView,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
