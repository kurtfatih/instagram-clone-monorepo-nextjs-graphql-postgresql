/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["www.instagram.com", "upload.wikimedia.org"]
  },
  webpack5: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
      // {
      //   test: /\.(ts|js)x?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: [
      //         "@babel/preset-env",
      //         "@babel/preset-react",
      //         "@babel/preset-typescript"
      //       ]
      //     }
      //   }
      // }
    )

    config.module.rules.push()

    // Important: return the modified config

    return config
  }
}

module.exports = nextConfig
