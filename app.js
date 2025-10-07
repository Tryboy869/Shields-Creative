// ============================================
// SHIELDS CREATIVE - Badge Service Visuel
// Version 2.0 - Interface Complète Style Shields.io
// ============================================

const express = require('express');
const app = express();

// ============================================
// MODULE : COULEURS
// ============================================
class ColorModule {
  static NAMED_COLORS = {
    'success': '44cc11', 'warning': 'f59e0b', 'error': 'ef4444', 'info': '3b82f6',
    'brightgreen': '44cc11', 'green': '97CA00', 'yellowgreen': 'a4a61d',
    'yellow': 'dfb317', 'orange': 'fe7d37', 'red': 'e05d44', 'blue': '007ec6',
    'grey': '555', 'lightgrey': '9f9f9f', 'blueviolet': '8b5cf6',
    'purple': '8b5cf6', 'pink': 'ec4899', 'gold': 'fbbf24'
  };

  static resolve(colorInput) {
    if (!colorInput) return '8b5cf6';
    const normalized = colorInput.toLowerCase().replace('#', '');
    if (this.NAMED_COLORS[normalized]) return this.NAMED_COLORS[normalized];
    if (/^[0-9a-f]{6}$/i.test(normalized)) return normalized;
    if (/^[0-9a-f]{3}$/i.test(normalized)) return normalized.split('').map(c => c + c).join('');
    return '8b5cf6';
  }
}

// ============================================
// MODULE : STYLES VISUELS
// ============================================
class VisualStylesModule {
  static MODERN_STYLES = {
    glass: {
      height: 32, radius: 12, font: 12,
      template: (config, dims) => `
        <defs>
          <linearGradient id="glass-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgba(255,255,255,0.25)"/>
            <stop offset="100%" style="stop-color:rgba(255,255,255,0.05)"/>
          </linearGradient>
        </defs>
        <rect width="${dims.totalWidth}" height="32" rx="12" fill="#${config.color}"/>
        <rect width="${dims.totalWidth}" height="32" rx="12" fill="url(#glass-grad)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
      `
    },
    neon: {
      height: 28, radius: 8, font: 11,
      template: (config, dims) => `
        <rect class="neon-rect" width="${dims.totalWidth}" height="28" rx="8" fill="none" stroke="#${config.color}" stroke-width="2.5" style="filter: drop-shadow(0 0 8px #${config.color});"/>
      `
    },
    depth: {
      height: 30, radius: 6, font: 11,
      template: (config, dims) => `
        <rect width="${dims.totalWidth}" height="30" rx="6" fill="#${config.color}" style="filter: drop-shadow(0 4px 3px rgba(0,0,0,0.3));"/>
      `
    },
    gradient: {
      height: 26, radius: 13, font: 11,
      template: (config, dims) => `
        <defs>
          <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#${config.color}"/>
            <stop offset="100%" stop-color="#${config.color}99"/>
          </linearGradient>
        </defs>
        <rect width="${dims.totalWidth}" height="26" rx="13" fill="url(#flow-grad)"/>
      `
    },
    minimal: {
      height: 24, radius: 6, font: 10,
      template: (config, dims) => `
        <rect width="${dims.totalWidth}" height="24" rx="6" fill="#${config.color}" opacity="0.12"/>
        <rect x="1" y="1" width="${dims.totalWidth-2}" height="22" rx="5" fill="none" stroke="#${config.color}" stroke-width="1.5"/>
      `
    }
  };

  static process(styleName, config, dimensions) {
    const style = this.MODERN_STYLES[styleName] || this.MODERN_STYLES.glass;
    return { ...style, background: style.template(config, dimensions) };
  }
}

// ============================================
// MODULE : ANIMATIONS
// ============================================
class CreativeAnimationsModule {
  static ANIMATIONS = {
    'pulse-scale': `@keyframes p { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } } svg { animation: p 2s ease-in-out infinite; }`,
    'neon-glow': `@keyframes n { 0%, 100% { filter: drop-shadow(0 0 5px currentColor); } 50% { filter: drop-shadow(0 0 15px currentColor); } } .neon-rect { animation: n 1.5s ease-in-out infinite; }`,
    'wave': `@keyframes w { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px) rotate(2deg); } } svg { animation: w 3s ease-in-out infinite; }`,
    'shimmer': `@keyframes s { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } } .shimmer-rect { animation: s 3s ease-in-out infinite; }`,
    'breathing': `@keyframes b { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } } svg { animation: b 4s ease-in-out infinite; }`
  };

  static process(animationName) {
    return this.ANIMATIONS[animationName] || '';
  }

  static getAvailableAnimations() {
    return Object.keys(this.ANIMATIONS);
  }
}

// ============================================
// MODULE : GÉNÉRATEUR SVG
// ============================================
class CreativeSVGGenerator {
  static generate(config) {
    const dimensions = this._calculateDimensions(config);
    const style = VisualStylesModule.process(config.style, config, dimensions);
    const animation = CreativeAnimationsModule.process(config.animate);

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${dimensions.totalWidth}" height="${style.height}" role="img" aria-label="${config.label}: ${config.message}">
  ${animation ? `<style>${animation}</style>` : ''}
  <title>${config.label}: ${config.message}</title>
  ${style.background}
  ${this._getShimmerOverlay(config, dimensions, style)}
  <g fill="${config.textColor || '#fff'}" text-anchor="middle" font-family="Verdana,sans-serif" font-size="${style.font}">
    ${config.icon ? `<text x="${dimensions.iconX}" y="${style.height/2}" dominant-baseline="central" font-size="14">${config.icon}</text>` : ''}
    <text x="${dimensions.labelX}" y="${style.height/2}" dominant-baseline="central">${config.label}</text>
    <text x="${dimensions.messageX}" y="${style.height/2}" dominant-baseline="central" font-weight="600" fill="${config.messageColor || '#fff'}">${config.message}</text>
  </g>
</svg>`;
  }

  static _getShimmerOverlay(config, dimensions, style) {
    if (config.animate !== 'shimmer') return '';
    return `<rect class="shimmer-rect" x="0" y="0" width="${dimensions.totalWidth * 0.3}" height="${style.height}" fill="rgba(255,255,255,0.4)" opacity="0.5"/>`;
  }

  static _calculateDimensions(config) {
    const charWidth = 7.5, padding = 15, iconPadding = 25;
    const labelWidth = config.label.length * charWidth + padding + (config.icon ? iconPadding : 0);
    const messageWidth = config.message.length * charWidth + padding;
    return {
      totalWidth: labelWidth + messageWidth,
      labelX: config.icon ? labelWidth/2 + 10 : labelWidth/2,
      messageX: labelWidth + messageWidth/2,
      iconX: 15
    };
  }
}

// ============================================
// ORCHESTRATEUR
// ============================================
class CreativeOrchestrator {
  constructor() {
    this.cache = new Map();
    this.stats = { generated: 0, cached: 0, errors: 0 };
  }

  async generate(params) {
    try {
      const config = this._parseParams(params);
      const cacheKey = JSON.stringify(config);
      if (this.cache.has(cacheKey)) {
        this.stats.cached++;
        return this.cache.get(cacheKey);
      }
      const svg = CreativeSVGGenerator.generate(config);
      this.cache.set(cacheKey, svg);
      this.stats.generated++;
      if (this.cache.size > 200) this.cache.delete(this.cache.keys().next().value);
      return svg;
    } catch (error) {
      this.stats.errors++;
      throw error;
    }
  }

  _parseParams(params) {
    return {
      label: this._sanitize(params.label) || 'Label',
      message: this._sanitize(params.message) || 'Message',
      color: ColorModule.resolve(params.color || params.queryColor),
      style: this._validateStyle(params.style),
      animate: this._validateAnimation(params.animate),
      icon: params.icon || null,
      textColor: params.textColor || '#fff',
      messageColor: params.messageColor || '#fff'
    };
  }

  _sanitize(text) {
    if (!text) return null;
    return text.slice(0, 100).replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
  }

  _validateStyle(style) {
    return ['glass','neon','depth','gradient','minimal'].includes(style) ? style : 'glass';
  }

  _validateAnimation(animation) {
    return CreativeAnimationsModule.getAvailableAnimations().includes(animation) ? animation : null;
  }

  getStats() {
    return { ...this.stats, cacheSize: this.cache.size };
  }
}

// ============================================
// API ROUTES
// ============================================
const orchestrator = new CreativeOrchestrator();

app.get('/badge/:label/:message/:color?', async (req, res) => {
  try {
    const svg = await orchestrator.generate({
      label: decodeURIComponent(req.params.label),
      message: decodeURIComponent(req.params.message),
      color: req.params.color,
      queryColor: req.query.color,
      style: req.query.style,
      animate: req.query.animate,
      icon: req.query.icon ? decodeURIComponent(req.query.icon) : null
    });
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=7200');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(svg);
  } catch (error) {
    res.status(400).send(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="20"><rect fill="#e05d44" width="120" height="20"/><text x="60" y="14" text-anchor="middle" fill="#fff" font-size="11">Error</text></svg>`);
  }
});

// ============================================
// HOMEPAGE - STYLE SHIELDS.IO
// ============================================
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shields Creative - Modern Animated Badges</title>
  <style>
    :root {
      --primary: #8b5cf6;
      --bg: #0f172a;
      --card: #1e293b;
      --border: #334155;
      --text: #e2e8f0;
      --text-muted: #94a3b8;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }
    
    /* Header */
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 60px 20px;
      text-align: center;
    }
    .header h1 { font-size: 3em; margin-bottom: 10px; color: #fff; }
    .header p { font-size: 1.3em; color: rgba(255,255,255,0.9); margin-bottom: 30px; }
    .header .demo-badges { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
    
    /* Container */
    .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
    
    /* Section */
    .section { margin-bottom: 60px; }
    .section h2 { font-size: 2em; margin-bottom: 20px; color: var(--primary); }
    .section p { color: var(--text-muted); margin-bottom: 20px; }
    
    /* Badge Builder */
    .builder {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 30px;
      margin-bottom: 40px;
    }
    .builder h3 { margin-bottom: 20px; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px; }
    .form-group { display: flex; flex-direction: column; }
    .form-group label { font-size: 0.9em; color: var(--text-muted); margin-bottom: 5px; }
    .form-group input, .form-group select {
      padding: 10px;
      border: 1px solid var(--border);
      border-radius: 6px;
      background: var(--bg);
      color: var(--text);
      font-size: 1em;
    }
    .preview { 
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 30px;
      text-align: center;
      margin: 20px 0;
    }
    .code-output {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 15px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      color: #a5b4fc;
      overflow-x: auto;
      margin-top: 20px;
    }
    .btn {
      background: var(--primary);
      color: #fff;
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1em;
      margin-top: 10px;
    }
    .btn:hover { opacity: 0.9; }
    
    /* Examples Grid */
    .examples-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    .example-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 25px;
    }
    .example-card h4 { margin-bottom: 15px; color: var(--primary); }
    .example-preview {
      background: var(--bg);
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin: 15px 0;
    }
    .example-code {
      background: var(--bg);
      padding: 10px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 0.85em;
      color: #a5b4fc;
      word-break: break-all;
    }
    
    /* Footer */
    .footer {
      background: var(--card);
      border-top: 1px solid var(--border);
      padding: 40px 20px;
      text-align: center;
      margin-top: 60px;
    }
    .footer a { color: var(--primary); text-decoration: none; }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <h1>🎨 Shields Creative</h1>
    <p>Modern animated badges with stunning visual styles</p>
    <div class="demo-badges">
      <img src="/badge/Style-Glass-8b5cf6?style=glass" alt="Glass">
      <img src="/badge/Style-Neon-ef4444?style=neon&animate=neon-glow" alt="Neon">
      <img src="/badge/Style-Depth-10b981?style=depth" alt="Depth">
      <img src="/badge/Style-Gradient-3b82f6?style=gradient" alt="Gradient">
      <img src="/badge/Style-Minimal-6366f1?style=minimal" alt="Minimal">
    </div>
  </div>

  <div class="container">
    <!-- Badge Builder -->
    <div class="section">
      <h2>Badge Builder</h2>
      <p>Create your custom animated badge</p>
      
      <div class="builder">
        <h3>Configure Your Badge</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>Label</label>
            <input type="text" id="label" value="Build" placeholder="Left text">
          </div>
          <div class="form-group">
            <label>Message</label>
            <input type="text" id="message" value="Passing" placeholder="Right text">
          </div>
          <div class="form-group">
            <label>Color</label>
            <input type="text" id="color" value="success" placeholder="success, 8b5cf6, etc.">
          </div>
          <div class="form-group">
            <label>Style</label>
            <select id="style">
              <option value="glass">Glass</option>
              <option value="neon">Neon</option>
              <option value="depth">Depth</option>
              <option value="gradient">Gradient</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
          <div class="form-group">
            <label>Animation</label>
            <select id="animate">
              <option value="">None</option>
              <option value="pulse-scale">Pulse Scale</option>
              <option value="neon-glow">Neon Glow</option>
              <option value="wave">Wave</option>
              <option value="shimmer">Shimmer</option>
              <option value="breathing">Breathing</option>
            </select>
          </div>
          <div class="form-group">
            <label>Icon (emoji)</label>
            <input type="text" id="icon" placeholder="🚀" maxlength="2">
          </div>
        </div>
        
        <div class="preview">
          <img id="preview-img" src="/badge/Build/Passing/success?style=glass" alt="Preview">
        </div>
        
        <div class="code-output" id="code-output">
![Badge](https://shields-2-0.vercel.app/badge/Build/Passing/success?style=glass)
        </div>
        
        <button class="btn" onclick="copyCode()">📋 Copy Markdown</button>
      </div>
    </div>

    <!-- Examples -->
    <div class="section">
      <h2>Examples</h2>
      <p>Ready-to-use badge examples</p>
      
      <div class="examples-grid">
        <div class="example-card">
          <h4>Portfolio Hero</h4>
          <div class="example-preview">
            <img src="/badge/Welcome/Portfolio-8b5cf6?style=glass&animate=pulse-scale" alt="Hero">
          </div>
          <div class="example-code">/badge/Welcome/Portfolio/8b5cf6?style=glass&animate=pulse-scale</div>
        </div>
        
        <div class="example-card">
          <h4>Status Badge</h4>
          <div class="example-preview">
            <img src="/badge/Build/Passing/success?style=minimal" alt="Status">
          </div>
          <div class="example-code">/badge/Build/Passing/success?style=minimal</div>
        </div>
        
        <div class="example-card">
          <h4>Social Proof</h4>
          <div class="example-preview">
            <img src="/badge/⭐%20Stars/2.5K/gold?style=depth&animate=shimmer" alt="Stars">
          </div>
          <div class="example-code">/badge/⭐%20Stars/2.5K/gold?style=depth&animate=shimmer</div>
        </div>
        
        <div class="example-card">
          <h4>Tech Stack</h4>
          <div class="example-preview">
            <img src="/badge/TypeScript/Ready/007ACC?style=glass" alt="TS">
          </div>
          <div class="example-code">/badge/TypeScript/Ready/007ACC?style=glass</div>
        </div>
        
        <div class="example-card">
          <h4>Neon Effect</h4>
          <div class="example-preview">
            <img src="/badge/Live/Streaming/ef4444?style=neon&animate=neon-glow" alt="Live">
          </div>
          <div class="example-code">/badge/Live/Streaming/ef4444?style=neon&animate=neon-glow</div>
        </div>
        
        <div class="example-card">
          <h4>Gradient Flow</h4>
          <div class="example-preview">
            <img src="/badge/Premium/Member/8b5cf6?style=gradient&animate=breathing" alt="Premium">
          </div>
          <div class="example-code">/badge/Premium/Member/8b5cf6?style=gradient&animate=breathing</div>
        </div>
      </div>
    </div>

    <!-- Documentation -->
    <div class="section">
      <h2>Usage</h2>
      <div class="builder">
        <h3>URL Format</h3>
        <div class="code-output">
https://shields-2-0.vercel.app/badge/{label}/{message}/{color}?style={style}&animate={animation}
        </div>
        
        <h3 style="margin-top: 30px;">Named Colors</h3>
        <p>success, warning, error, info, gold, purple, pink, blue, green, red, orange, yellow</p>
        
        <h3 style="margin-top: 30px;">Styles</h3>
        <p>glass, neon, depth, gradient, minimal</p>
        
        <h3 style="margin-top: 30px;">Animations</h3>
        <p>pulse-scale, neon-glow, wave, shimmer, breathing</p>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>Made with ❤️ by <a href="https://github.com/Tryboy869" target="_blank">Tryboy869</a></p>
    <p><a href="https://github.com/Tryboy869/shields-creative" target="_blank">GitHub</a> • <a href="/stats">Stats</a></p>
  </div>

  <script>
    const inputs = ['label', 'message', 'color', 'style', 'animate', 'icon'];
    inputs.forEach(id => {
      document.getElementById(id).addEventListener('input', updateBadge);
    });

    function updateBadge() {
      const label = encodeURIComponent(document.getElementById('label').value || 'Label');
      const message = encodeURIComponent(document.getElementById('message').value || 'Message');
      const color = document.getElementById('color').value || 'success';
      const style = document.getElementById('style').value;
      const animate = document.getElementById('animate').value;
      const icon = document.getElementById('icon').value;
      
      let url = \`/badge/\${label}/\${message}/\${color}?style=\${style}\`;
      if (animate) url += \`&animate=\${animate}\`;
      if (icon) url += \`&icon=\${encodeURIComponent(icon)}\`;
      
      document.getElementById('preview-img').src = url;
      document.getElementById('code-output').textContent = \`![Badge](https://shields-2-0.vercel.app\${url})\`;
    }

    function copyCode() {
      const code = document.getElementById('code-output').textContent;
      navigator.clipboard.writeText(code).then(() => {
        alert('✅ Copied to clipboard!');
      });
    }
  </script>
</body>
</html>
  `);
});

app.get('/stats', (req, res) => {
  res.json({
    service: 'Shields Creative',
    version: '2.0.0',
    stats: orchestrator.getStats(),
    availableStyles: Object.keys(VisualStylesModule.MODERN_STYLES),
    availableAnimations: CreativeAnimationsModule.getAvailableAnimations()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Shields Creative v2.0 running on port ' + PORT);
});

module.exports = app;