/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zahabico.com",
        port: "",
      },
    ],
    domains: ["146.190.41.37", "zahabico.com", "www.zahabico.com"],
    // domains: ['*'],
  },
}

module.exports = nextConfig
