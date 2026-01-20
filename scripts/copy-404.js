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
    const indexContent = fs.readFileSync(indexPath, 'utf8')
    fs.writeFileSync(notFoundPath, indexContent, 'utf8')
    console.log('✓ Copied index.html to 404.html for GitHub Pages')
  } else {
    console.warn('⚠ index.html not found in docs folder')
  }
} catch (error) {
  console.error('Error copying 404.html:', error)
  process.exit(1)
}
