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
  // Ajouter cette configuration pour résoudre les problèmes de webpack
  webpack: (config, { isServer }) => {
    // Résoudre les problèmes de modules non trouvés
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
  // Augmenter le timeout pour les builds longs
  serverExternalPackages: ['@prisma/client'],
  // Ignorer les erreurs de type ESLint pendant le build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignorer les erreurs de type TypeScript pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
