import { RouteRecordRaw, createMemoryHistory, createRouter } from "vue-router";

import HomeView from "../views/homeView/HomeView.vue";
import Me from "../views/me/Me.vue";
import Message from "../views/message/Message.vue";
import Shop from "../views/shop/Shop.vue";

const routes: Array<RouteRecordRaw> = [
    {
        name: "home",
        path: "/",
        component: HomeView,
        meta: { showFooter: true },
    },
    { name: "me", path: "/me", component: Me, meta: { showFooter: true } },
    {
        name: "message",
        path: "/message",
        component: Message,
        meta: { showFooter: true },
    },
    {
        name: "shop",
        path: "/shop",
        component: Shop,
        meta: { showFooter: true },
    },

    // me
    // 懒加载
    {
        path: "/me/for-update",
        component: () => import("../views/me/children/ForUpdate.vue"),
    },
    {
        path: "/me/visitor",
        component: () => import("../views/me/children/Visitor.vue"),
    },
    {
        path: "/me/edit-userinfo",
        component: () => import("../views/me/children/EditUserinfo.vue"),
    },
    {
        path: "/me/search",
        component: () => import("../views/me/children/Search.vue"),
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
