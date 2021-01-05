/**
 * Nuxt Config
 */

module.exports = {
    router: {
        //自定义路由表规则
        extendRoutes(routes, resolve) {
            //清除默认的路由表规则
            routes.splice(0)

            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout'),
                    children: [
                        {
                            path: '',
                            name: 'home',
                            component: resolve(__dirname, 'pages/home')
                        },
                        {
                            path: '/login',
                            name: 'login',
                            component: resolve(__dirname, 'pages/login')
                        },
                        {
                            path: 'register',
                            name: 'register',
                            component: resolve(__dirname, 'pages/login')
                        },
                        {
                            path: '/profile/:username',
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile')
                        },
                        {
                            path: '/profile/:username/:tag',
                            name: 'favoriteProfile',
                            component: resolve(__dirname, 'pages/profile')
                        },
                        {
                            path: '/settings',
                            name: 'settings',
                            component: resolve(__dirname, 'pages/settings')
                        },
                        {
                            path: '/editor',
                            name: 'editor',
                            component: resolve(__dirname, 'pages/editor')
                        },
                        {
                            path: '/editor/:slug',
                            name: 'updateEditor',
                            component: resolve(__dirname, 'pages/editor')
                        },
                        {
                            path: '/article/:slug',
                            name: 'article',
                            component: resolve(__dirname, 'pages/article')
                        }
                    ]
                }
            ])
        },
        linkActiveClass: 'active'
    },

    server: {
        host: '0.0.0.0',
        port: 3000
    },

    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ]
}