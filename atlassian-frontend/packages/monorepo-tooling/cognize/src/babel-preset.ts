import plugin from './babel-plugin';

export default function (_: any, options: any) {
  const { ignoreDirs, ...rest } = options;
  return {
    overrides: [
      {
        exclude: ignoreDirs,
        presets: ['@babel/preset-react', '@babel/preset-typescript'],
        plugins: [[plugin, rest]],
      },
    ],
  };
}
