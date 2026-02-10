/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'hayatleather.com',
      },
      {
        protocol: 'http',
        hostname: 'hayatleather.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
      },
      {
        protocol: 'https',
        hostname: '5.imimg.com',
      },
      {
        protocol: 'https',
        hostname: '4.imimg.com',
      },
    ],

  },
}

module.exports = nextConfig
