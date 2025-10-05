// ============================================
// SHIELDS 2.0 - ARCHITECTURE MODULAIRE MONO-FICHIER
// Production-Ready Badge Service with Animations
// ============================================

const express = require('express');
const app = express();

// ============================================
// SECURITY GATEWAY (Foundation Layer)
// ============================================
class SecurityGateway {
  static DANGEROUS_PATTERNS = {
    xss: /<script|javascript:|on\w+=/gi,
    injection: /eval\(|Function\(|import\(/gi,
    filesystem: /\.\.\/|~\/|file:/gi
  };

  static validateBadgeRequest(config) {
    const { label, message } = config;
    
    if (label?.length > 150 || message?.length > 150) {
      throw new Error('Text exceeds maximum length');
    }
    
    for (const [type, pattern] of Object.entries(this.DANGEROUS_PATTERNS)) {
      if (pattern.test(label) || pattern.test(message)) {
        throw new Error(`Security violation: ${type}`);
      }
    }
    
    return true;
  }

  static auditLog(action, params, result) {
    console.log(`[AUDIT] ${new Date().toISOString()} - ${action}`, {
      params: JSON.stringify(params).slice(0, 100),
      success: result === 'success'
    });
  }
}

// ============================================
// MODULE 1: URL-TO-CONFIG PARSER
// ============================================
class URLParserModule {
  static process(urlPath, queryParams) {
    const cleanPath = urlPath.replace('/badge/', '');
    const parts = cleanPath.split('-');
    
    return {
      label: this._decode(parts[0] || 'badge'),
      message: this._decode(parts[1] || 'unknown'),
      color: parts[2] || 'blue',
      style: queryParams.style || 'flat',
      animate: queryParams.animate || 'none',
      labelColor: queryParams.labelColor || '555',
      glow: queryParams.glow === 'true',
      logoEmoji: queryParams.logo || null
    };
  }

  static _decode(text) {
    return decodeURIComponent(text.replace(/_/g, ' '));
  }

  static getCapabilities() {
    return ['parse-url', 'decode-params'];
  }
}

// ============================================
// MODULE 2: COLOR PROCESSOR
// ============================================
class ColorModule {
  static NAMED_COLORS = {
    brightgreen: '44cc11', green: '97CA00', yellowgreen: 'a4a61d',
    yellow: 'dfb317', orange: 'fe7d37', red: 'e05d44',
    blue: '007ec6', grey: '555', lightgrey: '9f9f9f',
    success: '44cc11', important: 'fe7d37', critical: 'e05d44',
    informational: '007ec6', inactive: '9f9f9f', blueviolet: '8b5cf6'
  };

  static process(colorInput) {
    if (!colorInput) return '007ec6';
    
    colorInput = colorInput.toLowerCase().replace('#', '');
    
    if (this.NAMED_COLORS[colorInput]) {
      return this.NAMED_COLORS[colorInput];
    }
    
    if (/^[0-9a-f]{3,6}$/i.test(colorInput)) {
      return colorInput.length === 3 
        ? colorInput.split('').map(c => c + c).join('')
        : colorInput;
    }
    
    return '007ec6';
  }

  static getCapabilities() {
    return ['resolve-color', 'validate-hex'];
  }
}

// ============================================
// MODULE 3: SVG TEMPLATE ENGINE
// ============================================
class SVGTemplateModule {
  static STYLES = {
    flat: { height: 20, radius: 3, font: 11 },
    'flat-square': { height: 20, radius: 0, font: 11 },
    plastic: { height: 20, radius: 4, font: 11 },
    'for-the-badge': { height: 28, radius: 5, font: 10 },
    social: { height: 20, radius: 3, font: 11 }
  };

  static process(config) {
    const style = this.STYLES[config.style] || this.STYLES.flat;
    const dimensions = this._calculateDimensions(config, style);
    
    return this._generateSVG(config, style, dimensions);
  }

  static _calculateDimensions(config, style) {
    const charWidth = style.font * 0.6;
    const logoWidth = config.logoEmoji ? 16 : 0;
    
    const labelWidth = Math.max(
      (config.label.length * charWidth) + 12 + logoWidth, 
      45
    );
    const messageWidth = Math.max(
      config.message.length * charWidth + 12, 
      40
    );
    
    return {
      labelWidth: Math.ceil(labelWidth),
      messageWidth: Math.ceil(messageWidth),
      totalWidth: Math.ceil(labelWidth + messageWidth)
    };
  }

  static _generateSVG(config, style, dims) {
    const { label, message, labelColor, color, animate, glow, logoEmoji } = config;
    const { labelWidth, messageWidth, totalWidth } = dims;
    
    const animations = this._getAnimationCSS(animate, glow);
    const isUppercase = config.style === 'for-the-badge';
    const displayLabel = isUppercase ? label.toUpperCase() : label;
    const displayMessage = isUppercase ? message.toUpperCase() : message;
    
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${style.height}" role="img" aria-label="${label}: ${message}">
  ${animations ? `<style>${animations}</style>` : ''}
  
  <title>${label}: ${message}</title>
  
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  
  <clipPath id="r">
    <rect width="${totalWidth}" height="${style.height}" rx="${style.radius}" fill="#fff"/>
  </clipPath>
  
  <g clip-path="url(#r)">
    <rect width="${labelWidth}" height="${style.height}" fill="#${labelColor}"/>
    <rect x="${labelWidth}" width="${messageWidth}" height="${style.height}" fill="#${color}" class="badge-message"/>
    <rect width="${totalWidth}" height="${style.height}" fill="url(#s)"/>
  </g>
  
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="${style.font}">
    ${logoEmoji ? `<text x="12" y="${style.height/2 + 4}" font-size="14">${logoEmoji}</text>` : ''}
    <text aria-hidden="true" x="${labelWidth/2 + (logoEmoji ? 8 : 0)}" y="${style.height/2}" fill="#010101" fill-opacity=".3" transform="translate(0,1)">${displayLabel}</text>
    <text x="${labelWidth/2 + (logoEmoji ? 8 : 0)}" y="${style.height/2}" transform="translate(0,-1)">${displayLabel}</text>
    <text aria-hidden="true" x="${labelWidth + messageWidth/2}" y="${style.height/2}" fill="#010101" fill-opacity=".3" transform="translate(0,1)">${displayMessage}</text>
    <text x="${labelWidth + messageWidth/2}" y="${style.height/2}" transform="translate(0,-1)">${displayMessage}</text>
  </g>
</svg>`;
  }

  static _getAnimationCSS(animationType, glow) {
    const animations = {
      pulse: `@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.02); } } .badge-message { animation: pulse 2s ease-in-out infinite; }`,
      
      glow: `@keyframes glow { 0%, 100% { filter: drop-shadow(0 0 2px currentColor); } 50% { filter: drop-shadow(0 0 12px currentColor); } } svg { animation: glow 2s ease-in-out infinite; }`,
      
      gradient: `@keyframes gradient-shift { 0% { opacity: 1; } 50% { opacity: 0.85; } 100% { opacity: 1; } } .badge-message { animation: gradient-shift 3s ease infinite; }`,
      
      shimmer: `@keyframes shimmer { 0% { opacity: 0.3; transform: translateX(-100%); } 50% { opacity: 1; } 100% { opacity: 0.3; transform: translateX(100%); } }`,
      
      bounce: `@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } } svg { animation: bounce 1s ease-in-out infinite; }`,
      
      'color-cycle': `@keyframes colorCycle { 0% { fill: #ef4444; } 25% { fill: #f59e0b; } 50% { fill: #10b981; } 75% { fill: #3b82f6; } 100% { fill: #ef4444; } } .badge-message { animation: colorCycle 5s linear infinite; }`
    };
    
    return animations[animationType] || null;
  }

  static getCapabilities() {
    return ['generate-svg', 'calculate-dimensions', 'apply-animations'];
  }
}

// ============================================
// INTELLIGENT ORCHESTRATOR
// ============================================
class IntelligentOrchestrator {
  constructor() {
    this.modules = {
      parser: URLParserModule,
      color: ColorModule,
      svg: SVGTemplateModule
    };
    this.cache = new Map();
    this.metrics = { requests: 0, cached: 0, errors: 0 };
  }

  async execute(request) {
    this.metrics.requests++;
    
    try {
      // 1. Parse request
      const config = this.modules.parser.process(
        request.path,
        request.query
      );
      
      // 2. Security validation
      SecurityGateway.validateBadgeRequest(config);
      
      // 3. Cache check
      const cacheKey = JSON.stringify(config);
      if (this.cache.has(cacheKey)) {
        this.metrics.cached++;
        return this.cache.get(cacheKey);
      }
      
      // 4. Process colors
      config.color = this.modules.color.process(config.color);
      config.labelColor = this.modules.color.process(config.labelColor);
      
      // 5. Generate SVG
      const svg = this.modules.svg.process(config);
      
      // 6. Cache result
      this.cache.set(cacheKey, svg);
      if (this.cache.size > 100) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }
      
      // 7. Audit
      SecurityGateway.auditLog('badge-generated', config, 'success');
      
      return svg;
      
    } catch (error) {
      this.metrics.errors++;
      SecurityGateway.auditLog('badge-error', request, error.message);
      throw error;
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      cacheSize: this.cache.size,
      hitRate: this.metrics.cached / this.metrics.requests
    };
  }

  hotReplaceModule(moduleName, newModule) {
    if (this.modules[moduleName] && newModule.getCapabilities) {
      this.modules[moduleName] = newModule;
      this.cache.clear();
      return true;
    }
    return false;
  }
}

// ============================================
// PRODUCTION API
// ============================================
const orchestrator = new IntelligentOrchestrator();

// Badge endpoint
app.get('/badge/:badgeContent*', async (req, res) => {
  try {
    const svg = await orchestrator.execute({
      path: req.path,
      query: req.query
    });
    
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=7200');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(svg);
    
  } catch (error) {
    res.status(400).send(`
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="20">
        <rect width="120" height="20" fill="#e05d44"/>
        <text x="60" y="14" text-anchor="middle" fill="#fff" font-family="Verdana" font-size="11">
          Error: ${error.message}
        </text>
      </svg>
    `);
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '2.0.0',
    metrics: orchestrator.getMetrics(),
    modules: Object.keys(orchestrator.modules).map(name => ({
      name,
      capabilities: orchestrator.modules[name].getCapabilities()
    }))
  });
});

// Documentation page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shields 2.0 - Animated Badge Service</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      padding: 40px 20px;
    }
    .container { max-width: 900px; margin: 0 auto; }
    h1 { font-size: 3em; margin-bottom: 10px; }
    .subtitle { font-size: 1.2em; opacity: 0.9; margin-bottom: 40px; }
    .card { 
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 30px;
      margin-bottom: 30px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    h2 { margin-bottom: 15px; }
    code { 
      background: rgba(0, 0, 0, 0.3);
      padding: 2px 8px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }
    .examples { display: grid; gap: 15px; }
    .example { 
      background: rgba(0, 0, 0, 0.2);
      padding: 15px;
      border-radius: 8px;
    }
    .badge-preview { margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 Shields 2.0</h1>
    <p class="subtitle">Architecture Modulaire Mono-Fichier - Animated Badge Service</p>
    
    <div class="card">
      <h2>Usage</h2>
      <code>GET /badge/Label-Message-Color?style=flat&animate=pulse</code>
    </div>
    
    <div class="card">
      <h2>Parameters</h2>
      <ul style="line-height: 2;">
        <li><strong>style</strong>: flat, flat-square, plastic, for-the-badge, social</li>
        <li><strong>animate</strong>: pulse, glow, gradient, shimmer, bounce, color-cycle</li>
        <li><strong>labelColor</strong>: hex color (without #)</li>
        <li><strong>glow</strong>: true/false</li>
        <li><strong>logo</strong>: emoji character</li>
      </ul>
    </div>
    
    <div class="card">
      <h2>Examples</h2>
      <div class="examples">
        <div class="example">
          <code>/badge/Build-Passing-green?animate=pulse</code>
          <div class="badge-preview">
            <img src="/badge/Build-Passing-green?animate=pulse" alt="Pulse badge">
          </div>
        </div>
        
        <div class="example">
          <code>/badge/Status-Gold-yellow?animate=glow</code>
          <div class="badge-preview">
            <img src="/badge/Status-Gold-yellow?animate=glow" alt="Glow badge">
          </div>
        </div>
        
        <div class="example">
          <code>/badge/Premium-Active-blueviolet?style=for-the-badge&animate=gradient</code>
          <div class="badge-preview">
            <img src="/badge/Premium-Active-blueviolet?style=for-the-badge&animate=gradient" alt="Gradient badge">
          </div>
        </div>
        
        <div class="example">
          <code>/badge/Deploy-Success-green?logo=🚀&animate=bounce</code>
          <div class="badge-preview">
            <img src="/badge/Deploy-Success-green?logo=🚀&animate=bounce" alt="Bounce badge">
          </div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h2>System Status</h2>
      <p>Check <a href="/health" style="color: #fbbf24;">/health</a> endpoint for metrics and module status</p>
    </div>
  </div>
</body>
</html>
  `);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Shields 2.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📖 Documentation: http://localhost:${PORT}/`);
});

module.exports = app;