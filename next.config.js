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
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  // Configuration pour exclure certaines pages de la génération statique
  experimental: {
    // Options expérimentales valides
  },
  // Exclude account pages from the build
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack: (config, { isServer }) => {
    // Fix for useSession during build time
    if (isServer) {
      config.externals = [...config.externals, 'next-auth/react'];
    }
    return config;
  },
}

module.exports = nextConfig
