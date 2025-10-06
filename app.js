// ============================================
// SHIELDS CREATIVE - Badge Service Visuel
// Version 1.2 - Corrections Couleurs & Animations
// ============================================

const express = require('express');
const app = express();

// ============================================
// MODULE : COULEURS (CORRIGÉ)
// ============================================
class ColorModule {
  static NAMED_COLORS = {
    // Couleurs statut
    'success': '44cc11',
    'warning': 'f59e0b', 
    'error': 'ef4444',
    'info': '3b82f6',
    
    // Couleurs standard
    'brightgreen': '44cc11',
    'green': '97CA00',
    'yellowgreen': 'a4a61d',
    'yellow': 'dfb317',
    'orange': 'fe7d37',
    'red': 'e05d44',
    'blue': '007ec6',
    'grey': '555',
    'lightgrey': '9f9f9f',
    'blueviolet': '8b5cf6',
    'purple': '8b5cf6',
    'pink': 'ec4899',
    'gold': 'fbbf24'
  };

  static resolve(colorInput) {
    if (!colorInput) return '8b5cf6';
    
    const normalized = colorInput.toLowerCase().replace('#', '');
    
    // Check named colors first
    if (this.NAMED_COLORS[normalized]) {
      return this.NAMED_COLORS[normalized];
    }
    
    // Validate hex
    if (/^[0-9a-f]{6}$/i.test(normalized)) {
      return normalized;
    }
    if (/^[0-9a-f]{3}$/i.test(normalized)) {
      return normalized.split('').map(c => c + c).join('');
    }
    
    return '8b5cf6'; // Fallback
  }
}

// ============================================
// MODULE : STYLES VISUELS AVANCÉS
// ============================================
class VisualStylesModule {
  static MODERN_STYLES = {
    glass: {
      height: 32,
      radius: 12,
      font: 12,
      template: (config, dims) => `
        <defs>
          <linearGradient id="glass-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgba(255,255,255,0.25)"/>
            <stop offset="100%" style="stop-color:rgba(255,255,255,0.05)"/>
          </linearGradient>
        </defs>
        <rect width="${dims.totalWidth}" height="32" rx="12" fill="url(#glass-grad)" 
              stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
      `
    },

    neon: {
      height: 28,
      radius: 8,
      font: 11,
      template: (config, dims) => `
        <defs>
          <filter id="neon-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect class="neon-rect" width="${dims.totalWidth}" height="28" rx="8" 
              fill="none" stroke="#${config.color}" stroke-width="2.5"
              filter="url(#neon-glow)"/>
      `
    },

    depth: {
      height: 30,
      radius: 6,
      font: 11,
      template: (config, dims) => `
        <defs>
          <filter id="depth-shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.3"/>
          </filter>
        </defs>
        <rect width="${dims.totalWidth}" height="30" rx="6" 
              fill="#${config.color}" filter="url(#depth-shadow)"/>
      `
    },

    gradient: {
      height: 26,
      radius: 13,
      font: 11,
      template: (config, dims) => `
        <defs>
          <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#${config.color}">
              <animate attributeName="stop-color" 
                values="#${config.color};#${config.color}dd;#${config.color}" 
                dur="3s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" style="stop-color:#${config.color}66"/>
          </linearGradient>
        </defs>
        <rect width="${dims.totalWidth}" height="26" rx="13" fill="url(#flow-grad)"/>
      `
    },

    minimal: {
      height: 24,
      radius: 6,
      font: 10,
      template: (config, dims) => `
        <rect width="${dims.totalWidth}" height="24" rx="6" 
              fill="#${config.color}" opacity="0.12"/>
        <rect x="1" y="1" width="${dims.totalWidth-2}" height="22" rx="5" 
              fill="none" stroke="#${config.color}" stroke-width="1.5"/>
      `
    }
  };

  static process(styleName, config, dimensions) {
    const style = this.MODERN_STYLES[styleName] || this.MODERN_STYLES.glass;
    return {
      ...style,
      background: style.template(config, dimensions)
    };
  }
}

// ============================================
// MODULE : ANIMATIONS CRÉATIVES (CORRIGÉ)
// ============================================
class CreativeAnimationsModule {
  static ANIMATIONS = {
    'pulse-scale': `
      @keyframes pulse-scale {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.9; }
      }
      svg { animation: pulse-scale 2s ease-in-out infinite; }
    `,

    'neon-glow': `
      @keyframes neon-pulse {
        0%, 100% { 
          filter: drop-shadow(0 0 8px currentColor) drop-shadow(0 0 15px currentColor); 
        }
        50% { 
          filter: drop-shadow(0 0 15px currentColor) drop-shadow(0 0 25px currentColor); 
        }
      }
      .neon-rect { animation: neon-pulse 1.5s ease-in-out infinite; }
    `,

    wave: `
      @keyframes wave {
        0% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-5px) rotate(2deg); }
        50% { transform: translateY(0px) rotate(0deg); }
        75% { transform: translateY(5px) rotate(-2deg); }
        100% { transform: translateY(0px) rotate(0deg); }
      }
      svg { animation: wave 3s ease-in-out infinite; }
    `,

    shimmer: `
      @keyframes shimmer-slide {
        0% { transform: translateX(-100%); opacity: 0.3; }
        50% { opacity: 1; }
        100% { transform: translateX(100%); opacity: 0.3; }
      }
      .shimmer-rect { animation: shimmer-slide 3s ease-in-out infinite; }
    `,

    'rotate-3d': `
      @keyframes rotate-3d {
        0%, 100% { transform: perspective(600px) rotateY(0deg); }
        50% { transform: perspective(600px) rotateY(15deg); }
      }
      svg { 
        animation: rotate-3d 4s ease-in-out infinite;
        transform-style: preserve-3d;
      }
    `,

    'color-shift': `
      @keyframes color-shift {
        0% { fill: #ef4444; }
        20% { fill: #f59e0b; }
        40% { fill: #10b981; }
        60% { fill: #3b82f6; }
        80% { fill: #8b5cf6; }
        100% { fill: #ef4444; }
      }
      .animated-fill { animation: color-shift 5s linear infinite; }
    `,

    'bounce-elastic': `
      @keyframes bounce-elastic {
        0%, 100% { transform: translateY(0) scale(1); }
        25% { transform: translateY(-8px) scale(1.02, 0.98); }
        50% { transform: translateY(0) scale(0.98, 1.02); }
        75% { transform: translateY(-4px) scale(1.01, 0.99); }
      }
      svg { animation: bounce-elastic 2s ease-in-out infinite; }
    `,

    glitch: `
      @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(2px, -2px); }
        60% { transform: translate(-2px, -2px); }
        80% { transform: translate(2px, 2px); }
      }
      svg { animation: glitch 0.3s infinite; }
    `,

    breathing: `
      @keyframes breathing {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.03); opacity: 0.85; }
      }
      svg { animation: breathing 4s ease-in-out infinite; }
    `
  };

  static process(animationName) {
    return this.ANIMATIONS[animationName] || '';
  }

  static getAvailableAnimations() {
    return Object.keys(this.ANIMATIONS);
  }
}

// ============================================
// MODULE : GÉNÉRATEUR SVG CRÉATIF
// ============================================
class CreativeSVGGenerator {
  static generate(config) {
    const dimensions = this._calculateDimensions(config);
    const style = VisualStylesModule.process(config.style, config, dimensions);
    const animation = CreativeAnimationsModule.process(config.animate);

    return `<svg xmlns="http://www.w3.org/2000/svg" 
            width="${dimensions.totalWidth}" 
            height="${style.height}" 
            role="img" 
            aria-label="${config.label}: ${config.message}">
  ${animation ? `<style>${animation}</style>` : ''}
  
  <title>${config.label}: ${config.message}</title>
  
  ${style.background}
  
  <g fill="${config.textColor || '#fff'}" 
     text-anchor="middle" 
     font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
     text-rendering="geometricPrecision" 
     font-size="${style.font}"
     font-weight="500">
    
    ${config.icon ? `<text x="20" y="${style.height/2 + 4}" font-size="16">${config.icon}</text>` : ''}
    
    <text x="${dimensions.labelX}" 
          y="${style.height/2}" 
          dominant-baseline="central"
          class="animated-fill">
      ${config.label}
    </text>
    
    <text x="${dimensions.messageX}" 
          y="${style.height/2}" 
          dominant-baseline="central"
          fill="${config.messageColor || '#fff'}"
          font-weight="600">
      ${config.message}
    </text>
  </g>
  
  ${this._getShimmerOverlay(config, dimensions, style)}
</svg>`;
  }

  static _getShimmerOverlay(config, dimensions, style) {
    if (config.animate !== 'shimmer') return '';
    
    return `
      <rect class="shimmer-rect" 
            x="0" y="0" 
            width="${dimensions.totalWidth * 0.3}" 
            height="${style.height}" 
            fill="rgba(255,255,255,0.4)"
            opacity="0.3"/>
    `;
  }

  static _calculateDimensions(config) {
    const baseCharWidth = 7.5;
    const iconPadding = config.icon ? 35 : 20;
    
    const labelWidth = Math.max(
      (config.label.length * baseCharWidth) + iconPadding,
      50
    );
    const messageWidth = Math.max(
      (config.message.length * baseCharWidth) + 20,
      45
    );
    const totalWidth = labelWidth + messageWidth;
    
    return {
      labelWidth,
      messageWidth,
      totalWidth,
      labelX: labelWidth / 2 + (config.icon ? 12 : 0),
      messageX: labelWidth + (messageWidth / 2)
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
      label: this._sanitize(params.label) || 'Label',
      message: this._sanitize(params.message) || 'Message',
      color: ColorModule.resolve(params.color),
      style: this._validateStyle(params.style),
      animate: this._validateAnimation(params.animate),
      icon: params.icon || null,
      textColor: params.textColor || null,
      messageColor: params.messageColor || null
    };
  }

  _sanitize(text) {
    if (!text) return null;
    return text.slice(0, 100).replace(/[<>]/g, '');
  }

  _validateStyle(style) {
    const validStyles = ['glass', 'neon', 'depth', 'gradient', 'minimal'];
    return validStyles.includes(style) ? style : 'glass';
  }

  _validateAnimation(animation) {
    const validAnimations = CreativeAnimationsModule.getAvailableAnimations();
    return validAnimations.includes(animation) ? animation : 'none';
  }

  getStats() {
    return {
      ...this.stats,
      cacheSize: this.cache.size,
      hitRate: this.stats.cached / (this.stats.generated + this.stats.cached) || 0
    };
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
      color: req.params.color?.replace('#', '') || req.query.color,
      style: req.query.style,
      animate: req.query.animate,
      icon: req.query.icon,
      textColor: req.query.textColor,
      messageColor: req.query.messageColor
    });
    
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=7200');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(svg);
  } catch (error) {
    res.status(400).setHeader('Content-Type', 'image/svg+xml').send(`
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="20">
        <rect width="120" height="20" fill="#e05d44"/>
        <text x="60" y="14" text-anchor="middle" fill="#fff" 
              font-family="Verdana" font-size="11">
          Error: ${error.message.slice(0, 20)}
        </text>
      </svg>
    `);
  }
});

app.get('/', (req, res) => {
  const animations = CreativeAnimationsModule.getAvailableAnimations();
  const styles = Object.keys(VisualStylesModule.MODERN_STYLES);
  
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Shields Creative</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      padding: 40px 20px;
      min-height: 100vh;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { font-size: 3.5em; margin-bottom: 10px; }
    .tagline { font-size: 1.3em; opacity: 0.95; margin-bottom: 50px; }
    .card { 
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 40px;
      margin-bottom: 30px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
      gap: 20px; 
      margin-top: 20px;
    }
    .example {
      background: rgba(0, 0, 0, 0.2);
      padding: 20px;
      border-radius: 12px;
      text-align: center;
    }
    .badge-preview { 
      margin: 15px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60px;
    }
    code {
      background: rgba(0, 0, 0, 0.3);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.9em;
      display: inline-block;
      margin: 5px 0;
    }
    h2 { margin-bottom: 20px; font-size: 2em; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Shields Creative v1.2</h1>
    <p class="tagline">Service de badges visuels avec animations</p>
    
    <div class="card">
      <h2>Exemples</h2>
      <div class="grid">
        <div class="example">
          <h3>Success Color</h3>
          <div class="badge-preview">
            <img src="/badge/Test/Success/success" alt="Success">
          </div>
          <code>/badge/Test/Success/success</code>
        </div>
        
        <div class="example">
          <h3>Warning Color</h3>
          <div class="badge-preview">
            <img src="/badge/Test/Warning/warning" alt="Warning">
          </div>
          <code>/badge/Test/Warning/warning</code>
        </div>
        
        <div class="example">
          <h3>Error Color</h3>
          <div class="badge-preview">
            <img src="/badge/Test/Error/error" alt="Error">
          </div>
          <code>/badge/Test/Error/error</code>
        </div>
        
        <div class="example">
          <h3>Neon Glow (Fixed)</h3>
          <div class="badge-preview">
            <img src="/badge/Status/Gold/gold?style=neon&animate=neon-glow" alt="Neon">
          </div>
          <code>/badge/Status/Gold/gold?style=neon&animate=neon-glow</code>
        </div>
        
        <div class="example">
          <h3>Rotate 3D (Enhanced)</h3>
          <div class="badge-preview">
            <img src="/badge/Spin/Around/purple?animate=rotate-3d" alt="3D">
          </div>
          <code>/badge/Spin/Around/purple?animate=rotate-3d</code>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h2>Changelog v1.2</h2>
      <ul style="line-height: 2;">
        <li>✅ Fix couleurs nommées (success, warning, error, gold, etc.)</li>
        <li>✅ Fix animation neon-glow (ajout classe .neon-rect)</li>
        <li>✅ Amélioration rotate-3d (perspective augmentée)</li>
        <li>✅ Module ColorModule dédié</li>
      </ul>
    </div>
  </div>
</body>
</html>
  `);
});

app.get('/stats', (req, res) => {
  res.json({
    service: 'Shields Creative',
    version: '1.2.0',
    status: 'operational',
    stats: orchestrator.getStats(),
    availableStyles: Object.keys(VisualStylesModule.MODERN_STYLES),
    availableAnimations: CreativeAnimationsModule.getAvailableAnimations()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Shields Creative v1.2 on port ${PORT}`);
});

module.exports = app;