export default function buildSvgLoader() {
    return {
        test: /\.svg$/i,
        use: [{
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true,
                            }
                        },
                    ],
                },
            },
        }],
        exclude: /node_modules/,
    };
}
