/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://riki.edu.vn/**")],
  },
};

export default nextConfig;
