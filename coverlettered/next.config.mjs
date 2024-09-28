/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.clerk.com'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@anthropic-ai/sdk');
      config.externals.push('stripe');
    }
    return config;
  },
};

export default nextConfig;