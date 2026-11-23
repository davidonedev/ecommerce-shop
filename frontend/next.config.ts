import type { NextConfig } from 'next'

// Endereço do back-end Spring Boot usado pelo proxy de /api (em dev e no container).
const apiProxyTarget = process.env.API_PROXY_TARGET ?? 'http://localhost:8080'

const nextConfig: NextConfig = {
  output: 'standalone',
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${apiProxyTarget}/api/:path*` }]
  },
}

export default nextConfig
