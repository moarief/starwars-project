/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/films?page=1", permanent: false }];
  },
};

module.exports = nextConfig;
