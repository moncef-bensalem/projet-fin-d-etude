/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'qallh5vref.ufs.sh',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
      },
    ],
  },
}

module.exports = nextConfig
