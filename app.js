// ============================================
// SHIELDS CREATIVE - Badge Service Visuel
// Version 1.3 - Stabilité Emojis & Couleurs
// ============================================

const express = require('express');
const app = express();

// ============================================
// MODULE : COULEURS
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
    
    if (this.NAMED_COLORS[normalized]) {
      return this.NAMED_COLORS[normalized];
    }
    
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
        <rect width="${dims.totalWidth}" height="32" rx="12" fill="#${config.color}"/>
        <rect width="${dims.totalWidth}" height="32" rx="12" fill="url(#glass-grad)"
              stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
      `
    },
    neon: {
      height: 28,
      radius: 8,
      font: 11,
      template: (config, dims) => `
        <rect class="neon-rect" width="${dims.totalWidth}" height="28" rx="8"
              fill="none" stroke="#${config.color}" stroke-width="2.5"
              style="filter: drop-shadow(0 0 4px #${config.color}99);"/>
      `
    },
    depth: {
      height: 30,
      radius: 6,
      font: 11,
      template: (config, dims) => `
        <rect width="${dims.totalWidth}" height="30" rx="6"
              fill="#${config.color}" style="filter: drop-shadow(0 4px 3px rgba(0,0,0,0.3));"/>
      `
    },
    gradient: {
      height: 26,
      radius: 13,
      font: 11,
      template: (config, dims) => `
        <defs>
          <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#${config.color}" />
            <stop offset="100%" stop-color="#${config.color}99"/>
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
// MODULE : ANIMATIONS CRÉATIVES
// ============================================
class CreativeAnimationsModule {
  static ANIMATIONS = {
    'pulse-scale': `
      @keyframes p { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
      svg { animation: p 2s ease-in-out infinite; }`,
    'neon-glow': `
      @keyframes n { 0%, 100% { filter: drop-shadow(0 0 3px currentColor); } 50% { filter: drop-shadow(0 0 6px currentColor); } }
      .neon-rect { color: #${(props) => props.color}; animation: n 1.5s ease-in-out infinite; }`,
    'wave': `
      @keyframes w { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px) rotate(2deg); } }
      svg { animation: w 3s ease-in-out infinite; }`,
    'shimmer': `
      @keyframes s { 100% { transform: translateX(100%); } }
      .shimmer-rect { animation: s 2s ease-in-out infinite; }`,
    'rotate-3d': `
      @keyframes r { 0%, 100% { transform: perspective(800px) rotateY(0deg); } 50% { transform: perspective(800px) rotateY(20deg); } }
      svg { animation: r 4s ease-in-out infinite; }`,
  };

  static process(animationName, config) {
    if (!this.ANIMATIONS[animationName]) return '';
    return (this.ANIMATIONS[animationName]).replace(/\${(props) => props.color}/g, config.color);
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
    const animation = CreativeAnimationsModule.process(config.animate, config);

    return `<svg xmlns="http://www.w3.org/2000/svg"
            width="${dimensions.totalWidth}"
            height="${style.height}"
            role="img"
            aria-label="${config.label}: ${config.message}">
  ${animation ? `<style>${animation}</style>` : ''}
  <title>${config.label}: ${config.message}</title>
  ${style.background}
  ${this._getShimmerOverlay(config, dimensions, style)}
  <g fill="${config.textColor || '#ffffff'}"
     text-anchor="middle"
     font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
     font-weight="500"
     font-size="${style.font}px">
    ${config.icon ? `<text x="${dimensions.iconX}" y="${style.height / 2}" dominant-baseline="central" font-size="14px">${config.icon}</text>` : ''}
    <text x="${dimensions.labelX}" y="${style.height / 2}" dominant-baseline="central" fill-opacity="0.8">${config.label}</text>
    <text x="${dimensions.messageX}" y="${style.height / 2}" dominant-baseline="central" font-weight="600" fill="${config.messageColor || '#ffffff'}">${config.message}</text>
  </g>
</svg>`;
  }
  
  static _getShimmerOverlay(config, dimensions, style) {
    if (config.animate !== 'shimmer') return '';
    return `<mask id="m"><rect width="${dimensions.totalWidth}" height="${style.height}" rx="${style.radius}" ry="${style.radius}" fill="#fff"/></mask>
     <g mask="url(#m)">
       <rect class="shimmer-rect" x="0" y="0" width="${dimensions.totalWidth * 0.5}" height="${style.height}" fill="rgba(255,255,255,0.5)" transform="translateX(-100%)"/>
     </g>`;
  }

  // 👈 CORRECTION: Logique de calcul de largeur revue pour les emojis
  static _calculateDimensions(config) {
    const charWidth = 7.5; // Largeur moyenne d'un caractère
    const emojiWidth = 14; // Largeur pour un emoji
    const padding = 15;
    const iconPadding = 22;

    // Utilise Array.from pour compter correctement les caractères Unicode (emojis)
    const countChars = (str) => Array.from(str).length;

    let labelWidth = countChars(config.label) * charWidth + padding;
    if (config.icon) {
      labelWidth += iconPadding;
    }

    const messageWidth = countChars(config.message) * charWidth + padding;
    const totalWidth = labelWidth + messageWidth;

    const iconX = padding / 2 + emojiWidth / 2;
    const labelX = config.icon ? iconX + iconPadding : labelWidth / 2;

    return {
      totalWidth,
      labelX,
      messageX: labelWidth + messageWidth / 2,
      iconX
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
      return this._generateErrorSVG(error.message);
    }
  }

  _parseParams(params) {
    return {
      // 👈 CORRECTION: Utilise la fonction d'échappement robuste
      label: this._escapeXml(params.label) || 'Label',
      message: this._escapeXml(params.message) || 'Message',
      // 👈 CORRECTION: Gestion plus fiable de la couleur depuis les params ou query
      color: ColorModule.resolve((params.color || params.queryColor)),
      style: this._validateStyle(params.style),
      animate: this._validateAnimation(params.animate),
      icon: params.icon ? this._escapeXml(params.icon) : null,
      textColor: params.textColor ? ColorModule.resolve(params.textColor) : 'ffffff',
      messageColor: params.messageColor ? ColorModule.resolve(params.messageColor) : 'ffffff'
    };
  }

  // 👈 CORRECTION: Fonction robuste pour échapper les caractères spéciaux en XML/SVG
  _escapeXml(text) {
    if (!text) return null;
    return text.slice(0, 100)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  _validateStyle(style) {
    const validStyles = ['glass', 'neon', 'depth', 'gradient', 'minimal'];
    return validStyles.includes(style) ? style : 'glass';
  }

  _validateAnimation(animation) {
    const validAnimations = CreativeAnimationsModule.getAvailableAnimations();
    return validAnimations.includes(animation) ? animation : null;
  }

  getStats() {
    return {
      ...this.stats,
      cacheSize: this.cache.size,
      hitRate: this.stats.cached / (this.stats.generated + this.stats.cached) || 0
    };
  }
  
  _generateErrorSVG(message) {
    const cleanMessage = this._escapeXml(message.slice(0, 30));
    return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="28" role="img">
     <rect width="200" height="28" rx="6" fill="#ef4444"/>
     <text x="100" y="14" dominant-baseline="central" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="11px" font-weight="600">
       Error: ${cleanMessage}
     </text>
    </svg>`;
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
      queryColor: req.query.color, // Passe la couleur de la query séparément
      style: req.query.style,
      animate: req.query.animate,
      icon: req.query.icon ? decodeURIComponent(req.query.icon) : null,
      textColor: req.query.textColor,
      messageColor: req.query.messageColor
    });
    
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(svg);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Shields Creative</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #111827; color: #e5e7eb; padding: 40px 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { font-size: 3em; margin-bottom: 10px; color: #fff; }
    .tagline { font-size: 1.2em; color: #9ca3af; margin-bottom: 40px; }
    .card { background: #1f2937; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #374151; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px; }
    .example { background: #374151; padding: 20px; border-radius: 8px; text-align: center; }
    .badge-preview { margin: 15px 0; display: flex; justify-content: center; align-items: center; min-height: 50px; }
    code { background: #111827; padding: 4px 10px; border-radius: 6px; font-size: 0.85em; display: inline-block; margin-top: 10px; color: #a5b4fc; word-break: break-all;}
    h2 { margin-bottom: 20px; font-size: 1.8em; color: #fff; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Shields Creative v1.3</h1>
    <p class="tagline">Service de badges SVG stables avec emojis et animations.</p>
    
    <div class="card">
      <h2>Exemples Corrigés</h2>
      <div class="grid">
        <div class="example">
          <h3>Couleur Nommée (Success)</h3>
          <div class="badge-preview"><img src="/badge/build/passing/success" alt="Success"></div>
          <code>/badge/build/passing/success</code>
        </div>
        <div class="example">
          <h3>Couleur Hexadécimale (sans #)</h3>
          <div class="badge-preview"><img src="/badge/coverage/98%25/fbbf24" alt="Coverage"></div>
          <code>/badge/coverage/98%25/fbbf24</code>
        </div>
        <div class="example">
          <h3>Emoji dans le Label (URL-encodé)</h3>
          <div class="badge-preview"><img src="/badge/Tests%20%E2%9C%85/124%20passed/success" alt="Emoji Test"></div>
          <code>/badge/Tests%20%E2%9C%85/124%20passed/success</code>
        </div>
        <div class="example">
          <h3>Icône Emoji (Query Param)</h3>
          <div class="badge-preview"><img src="/badge/Likes/99k/pink?icon=%F0%9F%92%96" alt="Icon Emoji"></div>
          <code>/badge/Likes/99k/pink?icon=%F0%9F%92%96</code>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`);
});

app.get('/stats', (req, res) => {
  res.json({
    service: 'Shields Creative',
    version: '1.3.0',
    status: 'operational',
    stats: orchestrator.getStats(),
    availableStyles: Object.keys(VisualStylesModule.MODERN_STYLES),
    availableAnimations: CreativeAnimationsModule.getAvailableAnimations()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Shields Creative v1.3 listening on port ${PORT}`);
});
