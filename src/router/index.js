import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {path: "/", redirect: '/index'},

    {
        path: "/index",
        components: {home_view: () => import('../views/single_pages/Index.vue')},
        children: [
            {path: '', components: {content_view: () => import('../views/single_pages/Introduction.vue')},},
        ]
    },
    {
        path: "/about",
        components: {home_view: () => import('../views/single_pages/AboutHuillo.vue')},
    },

    {path: "/login", components: {home_view: () => import('../views/user_pages/user_login.vue')}},
    {path: "/register", components: {home_view: () => import('../views/user_pages/user_register.vue')}},
    {path: '/survey', components: {home_view: () => import('../views/survey_pages/survey_create.vue')}},
    {
        path: "/management",
        components: {home_view: () => import('../views/single_pages/Manager.vue')},
        redirect: '/management/surveys',
        children: [
            {
                path: 'surveys',
                components: {manager_view: () => import('../views/survey_pages/survey_list.vue')},
            },
            {
                path: 'surveys/:id',
                props: {manager_view: true},
                components: {manager_view: () => import('../views/survey_pages/survey_statistics.vue')}
            },
            {
                path: 'surveys/analysis/:id',
                props: {manager_view: true},
                components: {manager_view: () => import('../views/survey_pages/survey_analysis.vue')}
            },
            {
                path: 'submissions',
                components: {manager_view: () => import('../views/survey_pages/survey_submission.vue')}
            },

            {
                path: 'submissions/:id',
                props: {manager_view: true},
                components: {manager_view: () => import('../views/survey_pages/survey_submission_detail.vue')}
            },

            {
                path: 'groups',
                components: {manager_view: () => import('../views/group_pages/group_list.vue')}
            },
            {
                path: 'file-space',
                components: {manager_view: () => import('../views/user_pages/user_filespace.vue')}
            },
            {
                path: 'setting',
                components: {manager_view: () => import('../views/user_pages/user_setting.vue')}
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router
