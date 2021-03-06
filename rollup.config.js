import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import {terser} from 'rollup-plugin-terser';
import includePaths from 'rollup-plugin-includepaths';
import imagemin from 'rollup-plugin-imagemin';
import image from 'rollup-plugin-image';
import postcssUrl from 'postcss-url';
import pkg from './package.json';


const manifest = {};

/**
 * A Rollup plugin to generate a manifest of chunk names to their filenames
 * (including their content hash). This manifest is then used by the template
 * to point to the currect URL.
 * @return {Object}
 */
function manifestPlugin() {
  return {
    name: 'manifest',
    generateBundle(options, bundle) {
      for (const [name, assetInfo] of Object.entries(bundle)) {
        manifest[assetInfo.name] = name;
      }

      this.emitFile({
        type: 'asset',
        fileName: 'manifest.json',
        source: JSON.stringify(manifest, null, 2),
      });
    },
  };
}

/**
 * A Rollup plugin to generate a list of import dependencies for each entry
 * point in the module graph. This is then used by the template to generate
 * the necessary `<link rel="modulepreload">` tags.
 * @return {Object}
 */
function modulepreloadPlugin() {
  return {
    name: 'modulepreload',
    generateBundle(options, bundle) {
      // A mapping of entry chunk names to their full dependency list.
      const modulepreloadMap = {};

      // Loop through all the chunks to detect entries.
      for (const [fileName, chunkInfo] of Object.entries(bundle)) {
        if (chunkInfo.isEntry || chunkInfo.isDynamicEntry) {
          modulepreloadMap[chunkInfo.name] = [fileName, ...chunkInfo.imports];
        }
      }

      this.emitFile({
        type: 'asset',
        fileName: 'modulepreload.json',
        source: JSON.stringify(modulepreloadMap, null, 2),
      });
    },
  };
}


function basePlugins({nomodule = false} = {}) {
  const browsers = nomodule ? ['ie 11'] : [
    // NOTE: I'm not using the `esmodules` target due to this issue:
    // https://github.com/babel/babel/issues/8809
    'last 2 Chrome versions',
    'last 2 Safari versions',
    'last 2 iOS versions',
    'last 2 Edge versions',
    'Firefox ESR',
  ];

  const plugins = [
    includePaths({paths: ['src']}),
    imagemin(),
    image(),
    nodeResolve(),
    commonjs({
      include: [
        'node_modules/**',
      ],
      namedExports: {
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render'],
        'node_modules/react-is/index.js': ['isValidElementType'],
      },
    }),
    babel({
      exclude: /node_modules/,
      presets: [['@babel/preset-env', {
        targets: {browsers},
        useBuiltIns: 'usage',
        // debug: true,
        corejs: 3,
      }]],
      plugins: [['@babel/plugin-transform-react-jsx']],
    }),
    postcss({modules: true, plugins: [
      postcssUrl({
        url: 'copy',
        basePath: path.join(__dirname, 'src'),
        useHash: true,
        assetsPath: pkg.config.publicDir,
      }),
      postcssUrl({
        url(asset) {
          return path.basename(asset.absolutePath);
        },
      }),
    ]}),
    replace({'process.env.NODE_ENV': JSON.stringify('production')}),
    manifestPlugin(),
  ];
  // Only add minification in production and when not running on Glitch.
  if (process.env.NODE_ENV === 'production' && !process.env.GLITCH) {
    // TODO: enable if actually deploying this to production, but I have
    // minification off for now so it's easier to view the demo source.
    plugins.push(terser({module: !nomodule}));
  }
  return plugins;
}

// Module config for <script type="module">
const moduleConfig = {
  input: {
    'main': 'src/main-module.mjs',
  },
  output: {
    dir: pkg.config.publicDir,
    format: 'esm',
    entryFileNames: '[name]-[hash].mjs',
    chunkFileNames: '[name]-[hash].mjs',
    dynamicImportFunction: '__import__',
  },
  plugins: [
    ...basePlugins(),
    modulepreloadPlugin(),
  ],
  manualChunks(id) {
    if (id.includes('node_modules')) {
      // The directory name following the last `node_modules`.
      // Usually this is the package, but it could also be the scope.
      const directories = id.split(path.sep);
      const name = directories[directories.lastIndexOf('node_modules') + 1];

      // Group `tslib` and `dynamic-import-polyfill` into the default bundle.
      // NOTE: This isn't strictly necessary for this app, but it's include
      // to show how it's done.
      if (name === 'tslib' || name === 'dynamic-import-polyfill') {
        return;
      }

      // Otherwise just return the name.
      return name;
    }
  },
  watch: {
    clearScreen: false,
  },
};

// Legacy config for <script nomodule>
const nomoduleConfig = {
  input: {
    'nomodule': 'src/main-nomodule.mjs',
  },
  output: {
    dir: pkg.config.publicDir,
    format: 'iife',
    entryFileNames: '[name]-[hash].js',
  },
  plugins: basePlugins({nomodule: true}),
  inlineDynamicImports: true,
  watch: {
    clearScreen: false,
  },
};

const configs = [moduleConfig];
if (process.env.NODE_ENV === 'production') {
  configs.push(nomoduleConfig);
}

export default configs;
