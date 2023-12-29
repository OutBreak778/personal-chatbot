/** @type {import('next').NextConfig} */
const nextConfig = {
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
    },
    // Specifies the maximum allowed duration for this function to execute (in seconds)
    maxDuration: 5,
  }

module.exports = nextConfig
