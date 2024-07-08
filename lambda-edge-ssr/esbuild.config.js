const fs = require('fs')

const source = 'dist/app'
const dest = '../lambda-ssr/dist/app'

require('esbuild').build({
  logLevel: 'info',
  entryPoints: ['./lambda.js'],
  bundle: true,
  platform: 'node',
  outfile: '../lambda-ssr/lambda.js',
  target: 'node20',
  // minify: true,
  metafile: true
  // external: Object.keys(require('./package.json').dependencies),
}).then(
  result => {
    // fs.writeFileSync('meta.json', JSON.stringify(result.metafile))
    // fs.cp(source, dest, { recursive: true }, (err) => {/* callback */ })
  }).catch(() => process.exit(1));

