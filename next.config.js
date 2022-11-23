/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  images: {
    domains: ['tcu.taguig.gov.ph', 'pbs.twimg.com', 'upload.wikimedia.org', 'firebasestorage.googleapis.com', 'tcumobilelibrary.appspot.com'],
  },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID
  }
}

module.exports = nextConfig