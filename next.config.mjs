/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fbcdn.net", // This covers all subdomains of fbcdn.net
        port: "", // Empty string means any port
        pathname: "/v/**", // This pattern matches any URL path that starts with "/v/"
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
