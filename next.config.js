/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceSwcTransforms: true,
      },
    images:{
      formats:['image/avif', 'image/webp'],
      remotePatterns: [
        { 
          protocol: 'https',
          hostname: 'cdn.sanity.io',
          port: '',
          pathname: '/images/ry4c3w9f/production/**'
        }
      ]
    }
}

module.exports = nextConfig
