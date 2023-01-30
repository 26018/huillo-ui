import {createRouter, createWebHistory} from "vue-router"
import index from '../views/Index.vue'
import about from '../views/AboutHuillo.vue'
import introduction from '../views/Introduction.vue'
import login from "../views/Login.vue";
import register from "../views/Register.vue";
import create from "../views/Create.vue";
import submit from "../views/Submit.vue";
import manager from "../views/Manager.vue";
import collections from "../views/Collections.vue";
import submission from "../views/Submission.vue";
import groups from "../views/Groups.vue";
import recycle from "../views/Recycle.vue";
import detail from '../views/CollectionDetail.vue';
import analysis from '../views/Analysis.vue';
import commitDetail from "../views/CommitDetail.vue";
import userSettings from "../views/UserSettings.vue";
const routes = [
    {path: "/", redirect: '/index'},

    {
        path: "/index",
        components: {home_view: index},
        children: [
            {path: '', components: {content_view: introduction},},
        ]
    },
    {path: "/login", components: {home_view: login}},
    {path: "/register", components: {home_view: register}},
    {path: "/create", components: {home_view: create}},
    {path: "/submit/:id", components: {home_view: submit}},
    {path: "/about", components: {home_view: about}},
    {
        path: "/manager", components: {home_view: manager}, redirect: '/manager/collections', children: [
            {path: "collections", components: {manager_view: collections}},
            {path: "collections/detail/:id", props: {manager_view: true}, components: {manager_view: detail}},
            {path: "collections/analysis/:id", props: {manager_view: true}, components: {manager_view: analysis}},
            {path: "collections/committed/detail/:id", props: {manager_view: true}, components: {manager_view: commitDetail}},
            {path: "submission", components: {manager_view: submission}},
            {path: "groups", components: {manager_view: groups}},
            {path: "recycle", components: {manager_view: recycle}},
            {path: "user-settings", components: {manager_view: userSettings}},
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router
