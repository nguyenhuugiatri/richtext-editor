/** @type {import('next').NextConfig} */

const transpiler = require('next-transpile-modules')
const withImages = require('next-images')
const { cspSecurityHeaders } = require('./csp-config')

const withTranspiler = transpiler([
  '@axieinfinity/matcha-icons',
  '@axieinfinity/matcha',
])

module.exports = withImages(
  withTranspiler({
    output: 'standalone',
    reactStrictMode: false,

    publicRuntimeConfig: {
      MODE: process.env.MODE,
    },

    serverRuntimeConfig: {},

    async headers() {
      return [
        {
          source: '/:path*',
          headers: cspSecurityHeaders,
        },
      ]
    },

    eslint: {
      dirs: ['.'],
    },

    images: {
      disableStaticImages: true,
      formats: ['image/webp'],
    },
    // Note: config of next-images plugin
    fileExtensions: ['jpg', 'jpeg', 'png', 'gif'],

    sassOptions: {
      additionalData: `
        @import "./src/styles/matcha.scss";
      `,
    },

    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /svgr/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: false,
              svgoConfig: {
                plugins: [
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                ],
              },
            },
          },
        ],
      })

      return config
    },
  })
)
