// https://nuxt.com/docs/api/configuration/nuxt-config

// export default defineNuxtConfig({
//   app: {
//     head: {
//       charset: 'utf-8',
//       viewport: 'width=device-width, initial-scale=1',
//       link: [
//         {
//           rel: 'stylesheet',
//           href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
//           integrity: 'sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==',
//           crossorigin: 'anonymous',
//           referrerpolicy: 'no-referrer'
//         }
//       ]
//     }
//   },
//   devtools: { enabled: true },
//   alias: {
//     assets: "/<rootDir>/assets",
//   },
//   css:["~/assets/main.css"],
// });


export default {
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
          integrity: 'sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==',
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer'
        }
      ]
    }
  },
  devtools: { enabled: true },
  alias: {
    assets: "/<rootDir>/assets",
  },
  css: ["~/assets/main.css"],
  // Extend routes with proper typing
  extendRoutes(routes: any[], resolve: (...pathSegments: string[]) => string) {
    routes.push({
      name: 'info',
      path: '/info/:id',
      component: resolve(__dirname, 'pages/info.vue')
    });
  }
}
