# Contributing to Shields Creative

First off, thank you for considering contributing to Shields Creative! 🎨

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment** (browser, OS, device)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title** and description
- **Use case** explaining why this would be useful
- **Examples** or mockups if possible

### Pull Requests

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Test thoroughly (see Testing section)
4. Update documentation if needed
5. Commit with clear messages
6. Push to your fork and submit a pull request

## Development Setup

```bash
git clone https://github.com/Tryboy869/shields-creative.git
cd shields-creative
npm install
npm run dev
Server runs on http://localhost:3000
Adding New Features
Adding a Style
// In app.js → VisualStylesModule.MODERN_STYLES
mystyle: {
  height: 28,
  radius: 8,
  font: 11,
  template: (config, dims) => `
    <!-- Your SVG template -->
  `
}
Adding an Animation
// In app.js → CreativeAnimationsModule.ANIMATIONS
'my-animation': `
  @keyframes my-animation {
    0% { /* start state */ }
    100% { /* end state */ }
  }
  svg { animation: my-animation 2s ease infinite; }
`
Code Style
Use 2 spaces for indentation
Semicolons required
Clear variable names
Comment complex logic
Keep functions small and focused
Testing
Before submitting PR, test:
# Test all styles
curl http://localhost:3000/badge/Test/Glass/blue?style=glass
curl http://localhost:3000/badge/Test/Neon/red?style=neon
# etc...

# Test all animations
curl http://localhost:3000/badge/Test/Pulse/green?animate=pulse-scale
# etc...

# Test named colors
curl http://localhost:3000/badge/Test/Success/success
curl http://localhost:3000/badge/Test/Warning/warning
curl http://localhost:3000/badge/Test/Error/error
Commit Messages
Use present tense ("Add feature" not "Added feature")
Use imperative mood ("Move cursor to..." not "Moves cursor to...")
Limit first line to 72 characters
Reference issues and PRs when relevant
Examples:
Add cyberpunk style with neon effects
Fix shimmer animation on Safari
Update README with new examples
Questions?
Open an issue or reach out at nexusstudio100@gmail.com
Thank you for contributing! 🚀
---

## 3. .gitignore
Dependencies
node_modules/ npm-debug.log* yarn-debug.log* yarn-error.log*
Environment
.env .env.local .env.production
Build
dist/ build/ *.tgz
OS
.DS_Store Thumbs.db
IDE
.vscode/ .idea/ *.swp *.swo
Vercel
.vercel
Logs
logs/ *.log
Testing
coverage/ .nyc_output/
Cache
.cache/ .temp/
---

## 4. package.json (updated)

```json
{
  "name": "shields-creative",
  "version": "1.2.0",
  "description": "Modern animated badge service with stunning visual styles",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "badges",
    "shields",
    "animated-badges",
    "svg",
    "creative",
    "visual-design",
    "glassmorphism",
    "neon-effects",
    "modern-badges"
  ],
  "author": "Tryboy869 <nexusstudio100@gmail.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Tryboy869/shields-creative.git"
  },
  "bugs": {
    "url": "https://github.com/Tryboy869/shields-creative/issues"
  },
  "homepage": "https://shields-2-0.vercel.app",
  "dependencies": {
    "express": "^4.19.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
Checklist Avant Publication
[ ] README.md complet avec exemples
[ ] LICENSE file (MIT)
[ ] CONTRIBUTING.md avec guidelines
[ ] .gitignore configuré
[ ] package.json avec infos complètes
[ ] Code v1.2 avec tous les fixes
[ ] Service déployé sur Vercel
[ ] Repository public sur GitHub
Commandes Git
# Initialiser si pas déjà fait
git init
git add .
git commit -m "Initial commit - Shields Creative v1.2"

# Créer repo sur GitHub puis
git remote add origin https://github.com/Tryboy869/shields-creative.git
git branch -M main
git push -u origin main