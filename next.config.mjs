import Anthropic from '@anthropic-ai/sdk';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.clerk.com'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        '@anthropic-ai/sdk': 'commonjs @anthropic-ai/sdk',
        'stripe': 'commonjs stripe',
      });
    }
    return config;
  },
};

export default nextConfig;