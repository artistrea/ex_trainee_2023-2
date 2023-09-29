/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.google.com", "uploaddeimagens.com.br", "cdn.dribbble.com"],
  },
};

module.exports = nextConfig;
