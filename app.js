// ============================================
// SHIELDS CREATIVE - Badge Service Visuel
// Version 2.1 - FIXED pour GitHub README
// ============================================

const express = require('express');
const app = express();

// ============================================
// SECURITY GATEWAY
// ============================================
class SecurityGateway {
  static validate(text) {
    if (!text) return '';
    if (text.length > 150) throw new Error('Text too long');
    if (/<script|javascript:/i.test(text)) throw new Error('XSS attempt');
    return text;
  }
}

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
    if (/^[0-9a-f]{3}$/i.test(normalized)) {
      return normalized.split('').map(c => c + c).join('');
    }
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
      
      if (this.cache.size > 200) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }
      
      return svg;
    } catch (error) {
      this.stats.errors++;
      throw error;
    }
  }

  _parseParams(params) {
    return {
      label: SecurityGateway.validate(params.label) || 'Label',
      message: SecurityGateway.validate(params.message) || 'Message',
      color: ColorModule.resolve(params.color),
      style: this._validateStyle(params.style),
      animate: params.animate || null,
      icon: params.icon || null,
      textColor: params.textColor || '#fff',
      messageColor: params.messageColor || '#fff'
    };
  }

  _validateStyle(style) {
    return ['glass','neon','depth','gradient','minimal'].includes(style) ? style : 'glass';
  }

  getStats() {
    return { ...this.stats, cacheSize: this.cache.size };
  }
}

// ============================================
// API ROUTES
// ============================================
const orchestrator = new CreativeOrchestrator();

// ROUTE PRINCIPALE : Compatible GitHub (format label-message-color)
app.get('/badge/:badgeContent*', async (req, res) => {
  try {
    // Parse le format shields.io : label-message-color
    const badgeContent = req.path.replace('/badge/', '');
    const parts = badgeContent.split('-');
    
    // Extraction intelligente (dernière partie = couleur si valide)
    let color = req.query.color;
    let message, label;
    
    if (parts.length >= 3) {
      // Vérifier si dernière partie est une couleur
      const lastPart = parts[parts.length - 1];
      const isColor = ColorModule.NAMED_COLORS[lastPart.toLowerCase()] || /^[0-9a-f]{3,6}$/i.test(lastPart);
      
      if (isColor) {
        color = lastPart;
        message = parts[parts.length - 2];
        label = parts.slice(0, -2).join(' ');
      } else {
        message = parts[parts.length - 1];
        label = parts.slice(0, -1).join(' ');
      }
    } else if (parts.length === 2) {
      label = parts[0];
      message = parts[1];
    } else {
      label = badgeContent;
      message = 'badge';
    }
    
    const svg = await orchestrator.generate({
      label: decodeURIComponent(label.replace(/_/g, ' ')),
      message: decodeURIComponent(message.replace(/_/g, ' ')),
      color: color,
      style: req.query.style,
      animate: req.query.animate,
      icon: req.query.icon ? decodeURIComponent(req.query.icon) : null
    });
    
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(svg);
    
  } catch (error) {
    console.error('Badge generation error:', error);
    res.status(400).setHeader('Content-Type', 'image/svg+xml').send(
      `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="20"><rect fill="#e05d44" width="120" height="20"/><text x="60" y="14" text-anchor="middle" fill="#fff" font-size="11">Error</text></svg>`
    );
  }
});

// Route alternative : Format slash (compatibilité)
app.get('/b/:label/:message/:color?', async (req, res) => {
  try {
    const svg = await orchestrator.generate({
      label: decodeURIComponent(req.params.label),
      message: decodeURIComponent(req.params.message),
      color: req.params.color || req.query.color,
      style: req.query.style,
      animate: req.query.animate,
      icon: req.query.icon ? decodeURIComponent(req.query.icon) : null
    });
    
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(svg);
  } catch (error) {
    res.status(400).send(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="20"><rect fill="#e05d44" width="120" height="20"/><text x="60" y="14" text-anchor="middle" fill="#fff" font-size="11">Error</text></svg>`);
  }
});

// Homepage
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
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 60px 20px;
      text-align: center;
    }
    .header h1 { font-size: 3em; margin-bottom: 10px; color: #fff; }
    .header p { font-size: 1.3em; color: rgba(255,255,255,0.9); margin-bottom: 30px; }
    .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
    .section { margin-bottom: 60px; }
    .section h2 { font-size: 2em; margin-bottom: 20px; color: var(--primary); }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 30px;
      margin-bottom: 20px;
    }
    .examples { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
    .example { background: var(--bg); padding: 20px; border-radius: 8px; }
    .example img { margin: 10px 0; }
    .code { 
      background: var(--bg);
      padding: 15px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 0.9em;
      color: #a5b4fc;
      overflow-x: auto;
      margin-top: 10px;
    }
    .footer {
      background: var(--card);
      border-top: 1px solid var(--border);
      padding: 40px 20px;
      text-align: center;
      margin-top: 60px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎨 Shields Creative</h1>
    <p>Modern animated badges for your projects</p>
    <div>
      <img src="/badge/Status-Online-success?style=glass" alt="Online">
      <img src="/badge/Style-Neon-ef4444?style=neon&animate=neon-glow" alt="Neon">
      <img src="/badge/Premium-Active-8b5cf6?style=gradient" alt="Premium">
    </div>
  </div>

  <div class="container">
    <div class="section">
      <h2>GitHub README Usage</h2>
      <div class="card">
        <h3>Format 1 : Shields.io Compatible</h3>
        <div class="code">![Badge](https://your-domain.vercel.app/badge/Label-Message-Color?style=glass)</div>
        <div class="example">
          <img src="/badge/Build-Passing-success?style=glass" alt="Build">
        </div>
        
        <h3 style="margin-top: 30px;">Format 2 : Alternative (slash)</h3>
        <div class="code">![Badge](https://your-domain.vercel.app/b/Label/Message/Color?style=neon)</div>
        <div class="example">
          <img src="/b/Deploy/Success/green?style=neon" alt="Deploy">
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Examples</h2>
      <div class="examples">
        <div class="example">
          <h4>Glass Style</h4>
          <img src="/badge/Status-Active-success?style=glass" alt="Glass">
          <div class="code">/badge/Status-Active-success?style=glass</div>
        </div>
        <div class="example">
          <h4>Neon Animated</h4>
          <img src="/badge/Live-Streaming-error?style=neon&animate=neon-glow" alt="Live">
          <div class="code">/badge/Live-Streaming-error?style=neon&animate=neon-glow</div>
        </div>
        <div class="example">
          <h4>Gradient</h4>
          <img src="/badge/Premium-Member-purple?style=gradient" alt="Premium">
          <div class="code">/badge/Premium-Member-purple?style=gradient</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Parameters</h2>
      <div class="card">
        <p><strong>Styles:</strong> glass, neon, depth, gradient, minimal</p>
        <p><strong>Animations:</strong> pulse-scale, neon-glow, wave, shimmer, breathing</p>
        <p><strong>Colors:</strong> success, warning, error, info, gold, purple, pink, blue, green, red</p>
      </div>
    </div>
  </div>

  <div class="footer">
    <p>Made with ❤️ by <a href="https://github.com/Tryboy869" style="color: var(--primary);">Tryboy869</a></p>
  </div>
</body>
</html>
  `);
});

// Stats endpoint
app.get('/stats', (req, res) => {
  res.json({
    service: 'Shields Creative',
    version: '2.1.0',
    stats: orchestrator.getStats()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Shields Creative v2.1 running on port ${PORT}`);
  console.log(`📖 Visit http://localhost:${PORT} for documentation`);
});

module.exports = app;