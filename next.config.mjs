/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'dkstatics-public.digikala.com',
        protocol: 'https'
      }
    ]
  }
}

export default nextConfig
