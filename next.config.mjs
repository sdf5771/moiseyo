/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mov|mp4)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: '/_next/static/videos',
          outputPath: 'static/videos',
          esModule: false,
        },
      },
    });

    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
