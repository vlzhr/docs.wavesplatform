const path = require('path');
const fs = require('fs');
// const beforeDevServer = require('./beforeDevServer/');

const enLocaleConfig = require('./locales/en');
const ruLocaleConfig = require('./locales/ru');

const destDirectory = path.join(__dirname, '../../../vuepress');

module.exports = (ctx) => {
    console.log('ctx:', ctx);
    return {
        serviceWorker: false,
        // beforeDevServer: beforeDevServer(ctx),
        dest: destDirectory,
        port: 3083,
        locales: {
            '/en/': {
                lang: 'en-US',
                title: 'Waves documentation',
                description: 'Waves documentation in English'
            },
            '/ru/': {
                lang: 'ru-RU',
                title: 'Документация Waves',
                description: 'Документация Waves на русском',
            }
        },
        head: [
            ['link', { rel: 'icon', href: `/favicon-32x32.png` }],
            ['link', { rel: 'manifest', href: '/manifest.json' }],
            ['meta', { name: 'theme-color', content: '#1f5af6' }],
            ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
            ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
            ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
            ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#1f5af6' }],
            ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
            ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
        ],
        theme: '../../../@vuepress/theme-default',
        themeConfig: {
            buildDate: new Date(),
            env: {
                adminServerUrl: process.env.adminServerUrl
            },
            logo: '/waves-docs-logo.svg',
            repo: 'vuejs/vuepress',
            editLinks: true,
            docsDir: 'packages/docs/docs',
            locales: {
                '/en/': enLocaleConfig,

                '/ru/': ruLocaleConfig,
            }
        },
        plugins: [
            '../../@vuepress/last-updated',
            ['../../@vuepress/back-to-top', true],
            // ['../../@vuepress/pwa', {
            //     serviceWorker: true,
            //     updatePopup: true
            // }],
            ['../../@vuepress/medium-zoom', true],
            // ['../../@vuepress/google-analytics', {
            //     ga: 'UA-128189152-1'
            // }],
            ['container', {
                type: 'vue',
                before: '<pre class="vue-container"><code>',
                after: '</code></pre>'
            }],
            ['container', {
                type: 'upgrade',
                before: info => `<UpgradePath title="${info}">`,
                after: '</UpgradePath>'
            }],
        ],
        extraWatchFiles: [
            '.vuepress/locales/**',
        ],
        configureWebpack(config, isServer) {
            // console.log('configureWebpack config:', config, isServer)

            if (!isServer) {
                config.plugins.push({
                    apply: (compiler) => {
                        compiler.hooks.done.tap('compilationDone', (compilation) => {

                            const pageListJson = JSON.stringify(
                                ctx.pages.map(page => {
                                    // console.log(page);
                                    return {
                                        title: page.title,
                                        regularPath: page.regularPath,
                                        localePath: page._localePath,
                                    };
                                })
                            );

                            fs.writeFile(`${destDirectory}/documentation-files-map.json`, pageListJson, 'utf8', () => {
                                console.log('documentation-files-map.json done');
                            });

                        });
                    }
                })
            }
        },
        chainWebpack: (config, isServer) => {
            // console.log('chainWebpack config:', config, isServer)
        },

        chainMarkdown (config) {
            // console.log('chainMarkdown config:', config)
            // require('@vuepress/markdown').removeAllBuiltInPlugins(config)
        },
    }
};

// setInterval(() => {
//
// }, 5000);