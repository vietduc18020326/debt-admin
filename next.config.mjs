/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      include: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            // Appropriate options here
            transpileOnly: true,
            experimentalWatchApi: true,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
