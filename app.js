// ============================================
// SHIELDS CREATIVE - Badge Service Visuel
// Focus : Animations Avancées & Styles Modernes
// ============================================

const express = require('express');
const app = express();

// ============================================
// MODULE : STYLES VISUELS AVANCÉS
// ============================================
class VisualStylesModule {
  static MODERN_STYLES = {
    // Style Glassmorphism
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
          <filter id="glass-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
          </filter>
        </defs>
        <rect width="${dims.totalWidth}" height="32" rx="12" fill="url(#glass-grad)" 
              stroke="rgba(255,255,255,0.2)" stroke-width="1.5" 
              style="backdrop-filter: blur(10px);"/>
      `
    },

    // Style Neon
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
        <rect width="${dims.totalWidth}" height="28" rx="8" 
              fill="none" stroke="#${config.color}" stroke-width="2"
              filter="url(#neon-glow)" class="neon-rect"/>
      `
    },

    // Style 3D Depth
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
        <rect width="${dims.totalWidth}" height="30" rx="6" 
              fill="url(#depth-highlight)" opacity="0.3"/>
      `
    },

    // Style Gradient Flow
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

    // Style Minimal Modern
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
// MODULE : ANIMATIONS CRÉATIVES
// ============================================
class CreativeAnimationsModule {
  static ANIMATIONS = {
    // Animation Pulse avec Scale
    'pulse-scale': `
      @keyframes pulse-scale {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.9; }
      }
      svg { animation: pulse-scale 2s ease-in-out infinite; }
    `,

    // Animation Glow Intense
    'neon-glow': `
      @keyframes neon-pulse {
        0%, 100% { 
          filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 10px currentColor); 
        }
        50% { 
          filter: drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor); 
        }
      }
      .neon-rect { animation: neon-pulse 1.5s ease-in-out infinite; }
    `,

    // Animation Wave
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

    // Animation Shimmer
    shimmer: `
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      .shimmer-overlay {
        background: linear-gradient(90deg, 
          transparent, 
          rgba(255,255,255,0.5), 
          transparent);
        background-size: 1000px 100%;
        animation: shimmer 3s infinite;
      }
    `,

    // Animation Rotate 3D
    'rotate-3d': `
      @keyframes rotate-3d {
        0% { transform: perspective(400px) rotateY(0deg); }
        50% { transform: perspective(400px) rotateY(10deg); }
        100% { transform: perspective(400px) rotateY(0deg); }
      }
      svg { animation: rotate-3d 4s ease-in-out infinite; }
    `,

    // Animation Color Shift
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

    // Animation Bounce Elastic
    'bounce-elastic': `
      @keyframes bounce-elastic {
        0%, 100% { transform: translateY(0) scale(1); }
        25% { transform: translateY(-8px) scale(1.02, 0.98); }
        50% { transform: translateY(0) scale(0.98, 1.02); }
        75% { transform: translateY(-4px) scale(1.01, 0.99); }
      }
      svg { animation: bounce-elastic 2s ease-in-out infinite; }
    `,

    // Animation Typing Effect (simulation)
    typing: `
      @keyframes typing {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
      }
      .typing-cursor { animation: typing 1s step-end infinite; }
    `,

    // Animation Glitch
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

    // Animation Breathing
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
  
  ${config.animate === 'shimmer' ? '<rect class="shimmer-overlay" width="100%" height="100%"/>' : ''}
</svg>`;
  }

  static _calculateDimensions(config) {
    const baseCharWidth = 7;
    const iconPadding = config.icon ? 30 : 20;
    
    const labelWidth = (config.label.length * baseCharWidth) + iconPadding;
    const messageWidth = (config.message.length * baseCharWidth) + 20;
    const totalWidth = labelWidth + messageWidth;
    
    return {
      labelWidth,
      messageWidth,
      totalWidth,
      labelX: labelWidth / 2 + (config.icon ? 10 : 0),
      messageX: labelWidth + (messageWidth / 2)
    };
  }
}

// ============================================
// ORCHESTRATEUR SIMPLIFIÉ
// ============================================
class CreativeOrchestrator {
  constructor() {
    this.cache = new Map();
    this.stats = { generated: 0, cached: 0 };
  }

  async generate(params) {
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
  }

  _parseParams(params) {
    return {
      label: params.label || 'Label',
      message: params.message || 'Message',
      color: params.color || '8b5cf6',
      style: params.style || 'glass',
      animate: params.animate || 'none',
      icon: params.icon || null,
      textColor: params.textColor || null,
      messageColor: params.messageColor || null
    };
  }

  getStats() {
    return {
      ...this.stats,
      cacheSize: this.cache.size,
      hitRate: this.stats.cached / (this.stats.generated + this.stats.cached)
    };
  }
}

// ============================================
// API ROUTES
// ============================================
const orchestrator = new CreativeOrchestrator();

// Badge endpoint simplifié
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
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=7200');
    res.send(svg);
  } catch (error) {
    res.status(400).send(`<svg><text>Error: ${error.message}</text></svg>`);
  }
});

// Playground/Documentation
app.get('/', (req, res) => {
  const animations = CreativeAnimationsModule.getAvailableAnimations();
  const styles = Object.keys(VisualStylesModule.MODERN_STYLES);
  
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Shields Creative - Badge Visuel Service</title>
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
    .feature-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }
    .feature {
      background: rgba(255, 255, 255, 0.05);
      padding: 15px;
      border-radius: 10px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 Shields Creative</h1>
    <p class="tagline">Service de badges visuels avec animations avancées - Alternative créative à Shields.io</p>
    
    <div class="card">
      <h2>Différenciateur Clé</h2>
      <p style="font-size: 1.1em; line-height: 1.8;">
        <strong>Shields.io</strong> = Badges informatifs statiques pour métriques techniques<br>
        <strong>Shields Creative</strong> = Badges visuels animés pour impact et créativité
      </p>
    </div>

    <div class="card">
      <h2>Styles Disponibles</h2>
      <div class="feature-list">
        ${styles.map(s => `<div class="feature"><strong>${s}</strong></div>`).join('')}
      </div>
    </div>

    <div class="card">
      <h2>Animations Disponibles</h2>
      <div class="feature-list">
        ${animations.map(a => `<div class="feature">${a}</div>`).join('')}
      </div>
    </div>
    
    <div class="card">
      <h2>Exemples Visuels</h2>
      <div class="grid">
        <div class="example">
          <h3>Glass + Pulse Scale</h3>
          <div class="badge-preview">
            <img src="/badge/Premium/Member/8b5cf6?style=glass&animate=pulse-scale" alt="Glass badge">
          </div>
          <code>/badge/Premium/Member/8b5cf6?style=glass&animate=pulse-scale</code>
        </div>
        
        <div class="example">
          <h3>Neon + Neon Glow</h3>
          <div class="badge-preview">
            <img src="/badge/Live/Streaming/ef4444?style=neon&animate=neon-glow" alt="Neon badge">
          </div>
          <code>/badge/Live/Streaming/ef4444?style=neon&animate=neon-glow</code>
        </div>
        
        <div class="example">
          <h3>Depth + Breathing</h3>
          <div class="badge-preview">
            <img src="/badge/Status/Active/10b981?style=depth&animate=breathing" alt="Depth badge">
          </div>
          <code>/badge/Status/Active/10b981?style=depth&animate=breathing</code>
        </div>
        
        <div class="example">
          <h3>Gradient + Color Shift</h3>
          <div class="badge-preview">
            <img src="/badge/Rainbow/Mode/3b82f6?style=gradient&animate=color-shift" alt="Gradient badge">
          </div>
          <code>/badge/Rainbow/Mode/3b82f6?style=gradient&animate=color-shift</code>
        </div>
        
        <div class="example">
          <h3>Minimal + Wave</h3>
          <div class="badge-preview">
            <img src="/badge/Design/System/6366f1?style=minimal&animate=wave" alt="Minimal badge">
          </div>
          <code>/badge/Design/System/6366f1?style=minimal&animate=wave</code>
        </div>
        
        <div class="example">
          <h3>Glass + Icon</h3>
          <div class="badge-preview">
            <img src="/badge/Rocket/Launch/f59e0b?style=glass&icon=🚀" alt="Icon badge">
          </div>
          <code>/badge/Rocket/Launch/f59e0b?style=glass&icon=🚀</code>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h2>Usage</h2>
      <code style="display: block; text-align: center; font-size: 1.1em; padding: 15px;">
        /badge/{label}/{message}/{color}?style={style}&animate={animation}&icon={emoji}
      </code>
    </div>

    <div class="card">
      <h2>Use Cases Idéaux</h2>
      <ul style="line-height: 2.5; font-size: 1.1em;">
        <li>✨ Portfolios créatifs</li>
        <li>🎨 Landing pages modernes</li>
        <li>🚀 Projets personnels/side-projects</li>
        <li>💼 Présentations visuelles</li>
        <li>🎮 Projets gaming/entertainment</li>
        <li>📱 Apps avec strong visual identity</li>
      </ul>
    </div>
  </div>
</body>
</html>
  `);
});

// Stats endpoint
app.get('/stats', (req, res) => {
  res.json({
    service: 'Shields Creative',
    version: '1.0.0',
    stats: orchestrator.getStats(),
    availableStyles: Object.keys(VisualStylesModule.MODERN_STYLES),
    availableAnimations: CreativeAnimationsModule.getAvailableAnimations()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎨 Shields Creative running on port ${PORT}`);
});

module.exports = app;