import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const docsDir = path.join(__dirname, '..', 'docs')
const indexPath = path.join(docsDir, 'index.html')
const notFoundPath = path.join(docsDir, '404.html')

try {
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8')
    
    // Add GitHub Pages SPA redirect script before the closing head tag
    const redirectScript = `
    <script>
      // GitHub Pages SPA redirect - keep repository name segment
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>`
    
    // Insert script before closing </head> tag
    indexContent = indexContent.replace('</head>', redirectScript + '\n  </head>')
    
    fs.writeFileSync(notFoundPath, indexContent, 'utf8')
    console.log('✓ Created 404.html with GitHub Pages redirect for GitHub Pages')
  } else {
    console.warn('⚠ index.html not found in docs folder')
  }
} catch (error) {
  console.error('Error creating 404.html:', error)
  process.exit(1)
}
