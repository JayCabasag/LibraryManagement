/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  images: {
    domains: ['tcu.taguig.gov.ph', 'pbs.twimg.com', 'upload.wikimedia.org', 'firebasestorage.googleapis.com', 'tcumobilelibrary.appspot.com'],
  },
}

module.exports = nextConfig
