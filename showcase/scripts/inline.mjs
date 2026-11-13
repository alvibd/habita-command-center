// Folds dist/habita.js and dist/habita.css into one artifact page,
// dist/habita.html, with React and ReactDOM loaded from cdnjs (pinned).
import { readFileSync, writeFileSync } from 'node:fs'

const dist = new URL('../dist/', import.meta.url)
const js = readFileSync(new URL('habita.js', dist), 'utf8').replace(/<\/script/gi, '<\\/script')
const css = readFileSync(new URL('habita.css', dist), 'utf8').replace(/<\/style/gi, '<\\/style')

const html = `<title>Habita</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=Inter:wght@400;500;600&display=swap">
<style>
${css}
</style>
<div id="root"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>
${js}
</script>
`
writeFileSync(new URL('habita.html', dist), html)
console.log(`dist/habita.html ${(html.length / 1024).toFixed(1)} KB`)
