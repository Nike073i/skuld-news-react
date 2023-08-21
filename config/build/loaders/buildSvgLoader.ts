export default function buildSvgLoader() {
    return {
        test: /\.svg$/i,
        loader: '@svgr/webpack',
        exclude: /node_modules/,
    };
}
