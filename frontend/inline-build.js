import fs from 'fs'
import path from 'path'

const distDir = './dist'
const indexPath = path.join(distDir, 'index.html')

// Read index.html
let html = fs.readFileSync(indexPath, 'utf-8')

// Inline all CSS files
const cssRegex = /<link[^>]*href="([^"]+\.css)"[^>]*>/g
html = html.replace(cssRegex, (match, href) => {
  const cssFile = path.join(distDir, href)
  if (fs.existsSync(cssFile)) {
    const css = fs.readFileSync(cssFile, 'utf-8')
    return `<style>${css}</style>`
  }
  return match
})

// Inline all JS files
const jsRegex = /<script[^>]*src="([^"]+\.js)"[^>]*><\/script>/g
html = html.replace(jsRegex, (match, src) => {
  const jsFile = path.join(distDir, src)
  if (fs.existsSync(jsFile)) {
    const js = fs.readFileSync(jsFile, 'utf-8')
    return `<script type="module">${js}</script>`
  }
  return match
})

// Write bundled HTML
fs.writeFileSync(indexPath, html, 'utf-8')
console.log('✓ Bundled HTML created with inline CSS and JS')
