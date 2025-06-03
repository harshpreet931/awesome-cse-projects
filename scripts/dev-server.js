const path = require('path');
const express = require('express');
const chokidar = require('chokidar');
const { exec } = require('child_process');

// Paths
const distDir = path.join(__dirname, '..', 'dist');
const srcDir = path.join(__dirname, '..');

// Function to rebuild the site
function build() {
  console.log('🔄 Rebuilding site...');
  exec('npm run build', (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
    } else {
      console.log(stdout);
    }
  });
}

// Initial build and watch for changes
build();
chokidar.watch([
  path.join(srcDir, 'README.md'),
  path.join(srcDir, '*.md'),
  path.join(srcDir, 'scripts/**/*.js')
]).on('change', build);

// Serve the dist directory
const app = express();
app.use(express.static(distDir));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚧 Dev server running at http://localhost:${PORT}`));
