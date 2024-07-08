import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import Login from '@/views/login.vue'; // Importez le composant Login

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/auth/login'
        },
        {
            path: '/uikit',
            component: AppLayout,
            children: [
                {
                    path: 'list_bien',
                    name: 'list_bien',
                    component: () => import('@/views/uikit/Bien.vue')
                },
                {
                    path: 'formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: 'input',
                    name: 'input',
                    component: () => import('@/views/uikit/Input.vue')
                },
                {
                    path: 'floatlabel',
                    name: 'floatlabel',
                    component: () => import('@/views/uikit/FloatLabel.vue')
                },
                {
                    path: 'invalidstate',
                    name: 'invalidstate',
                    component: () => import('@/views/uikit/InvalidState.vue')
                },
                {
                    path: 'button',
                    name: 'button',
                    component: () => import('@/views/uikit/Button.vue')
                },
                {
                    path: 'list_bien',
                    name: 'list_bien',
                    component: () => import('@/views/uikit/Bien.vue')
                },
                {
                    path: 'list_Inv',
                    name: 'list_Inv',
                    component: () => import('@/views/uikit/Inventaire.vue')
                },
                {
                    path: 'list_Cmp',
                    name: 'list_Cmp',
                    component: () => import('@/views/uikit/Comptage.vue')
                },
                {
                    path: 'biencomptage',
                    name: 'biencomptage',
                    component: () => import('@/views/uikit/bien comptage.vue')
                },
                {
                    path: 'list_equipe',
                    name: 'list_equipe',
                    component: () => import('@/views/uikit/Equipe.vue')
                },
                {
                    path: 'list_zone',
                    name: 'list_zone',
                    component: () => import('@/views/uikit/Zone.vue')
                },
                {
                    path: 'list_dprt',
                    name: 'list_dprt',
                    component: () => import('@/views/uikit/Departement.vue')
                },
                {
                    path: 'list_mbr',
                    name: 'list_mbr',
                    component: () => import('@/views/uikit/Membre.vue')
                },
                {
                    path: 'role',
                    name: 'role',
                    component: () => import('@/views/uikit/Role.vue')
                },
                {
                    path: 'user',
                    name: 'user',
                    component: () => import('@/views/uikit/Utilisateur.vue')
                },
                {
                    path: 'list',
                    name: 'list',
                    component: () => import('@/views/uikit/List.vue')
                },
                {
                    path: 'tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/Tree.vue')
                },
                {
                    path: 'panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/Panels.vue')
                },
                {
                    path: 'overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/Overlay.vue')
                },
                {
                    path: 'media',
                    name: 'media',
                    component: () => import('@/views/uikit/Media.vue')
                },
                {
                    path: 'menu',
                    component: () => import('@/views/uikit/Menu.vue'),
                    children: [
                        {
                            path: '',
                            component: () => import('@/views/uikit/menu/PersonalDemo.vue')
                        },
                        {
                            path: 'seat',
                            component: () => import('@/views/uikit/menu/SeatDemo.vue')
                        },
                        {
                            path: 'payment',
                            component: () => import('@/views/uikit/menu/PaymentDemo.vue')
                        },
                        {
                            path: 'confirmation',
                            component: () => import('@/views/uikit/menu/ConfirmationDemo.vue')
                        }
                    ]
                },
                {
                    path: 'message',
                    name: 'message',
                    component: () => import('@/views/uikit/Messages.vue')
                },
                {
                    path: 'file',
                    name: 'file',
                    component: () => import('@/views/uikit/File.vue')
                },
                {
                    path: 'charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/Chart.vue')
                },
                {
                    path: 'misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/Misc.vue')
                },
                {
                    path: '/blocks',
                    name: 'blocks',
                    component: () => import('@/views/utilities/Blocks.vue')
                },
                {
                    path: '/utilities/icons',
                    name: 'icons',
                    component: () => import('@/views/utilities/Icons.vue')
                },
                {
                    path: '/pages/timeline',
                    name: 'timeline',
                    component: () => import('@/views/pages/Timeline.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/utilities/Documentation.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },
        {
            path: '/auth/login',
            name: 'login',
            component: Login
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
