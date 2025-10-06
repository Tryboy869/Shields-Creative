# Status Dashboard Example

> Clean, professional status indicators for project READMEs

---

## The Result

### Build Status
![Build](https://shields-2-0.vercel.app/badge/Build-Passing-success?style=minimal)
![Tests](https://shields-2-0.vercel.app/badge/Tests-245%20passed-success?style=minimal)
![Coverage](https://shields-2-0.vercel.app/badge/Coverage-94%25-success?style=minimal)

### Code Quality
![Code Quality](https://shields-2-0.vercel.app/badge/Code%20Quality-A+-10b981?style=depth)
![Maintainability](https://shields-2-0.vercel.app/badge/Maintainability-95%2F100-info?style=depth)
![Tech Debt](https://shields-2-0.vercel.app/badge/Tech%20Debt-2h-warning?style=depth)

### Dependencies
![Dependencies](https://shields-2-0.vercel.app/badge/Dependencies-Up%20to%20date-success?style=glass)
![Security](https://shields-2-0.vercel.app/badge/Security-0%20vulnerabilities-success?style=glass)
![License](https://shields-2-0.vercel.app/badge/License-MIT-info?style=glass)

---

## How to Use

```markdown
### Build Status
![Build](https://shields-2-0.vercel.app/badge/Build-Passing-success?style=minimal)
![Tests](https://shields-2-0.vercel.app/badge/Tests-245%20passed-success?style=minimal)
![Coverage](https://shields-2-0.vercel.app/badge/Coverage-94%25-success?style=minimal)

### Code Quality
![Code Quality](https://shields-2-0.vercel.app/badge/Code%20Quality-A+-10b981?style=depth)
![Maintainability](https://shields-2-0.vercel.app/badge/Maintainability-95%2F100-info?style=depth)
![Tech Debt](https://shields-2-0.vercel.app/badge/Tech%20Debt-2h-warning?style=depth)

### Dependencies
![Dependencies](https://shields-2-0.vercel.app/badge/Dependencies-Up%20to%20date-success?style=glass)
![Security](https://shields-2-0.vercel.app/badge/Security-0%20vulnerabilities-success?style=glass)
![License](https://shields-2-0.vercel.app/badge/License-MIT-info?style=glass)
```

---

## Customization Guide

### Update Your Metrics

**Build status:**
```markdown
![Build](https://shields-2-0.vercel.app/badge/Build-YOUR_STATUS-success?style=minimal)
```

**Test results:**
```markdown
![Tests](https://shields-2-0.vercel.app/badge/Tests-YOUR_COUNT%20passed-success?style=minimal)
```

**Coverage percentage:**
```markdown
![Coverage](https://shields-2-0.vercel.app/badge/Coverage-YOUR_PERCENT%25-success?style=minimal)
```

### Named Colors for Status

- `success` - Green (passing, good, safe)
- `warning` - Orange (attention needed, caution)
- `error` - Red (failing, critical, danger)
- `info` - Blue (informational, neutral)

### Style Recommendations by Section

**Build Status → Minimal**
- Clean and professional
- Easy to scan quickly
- Doesn't distract from content

**Code Quality → Depth**
- Adds visual weight to important metrics
- Shadow effect highlights quality scores
- More prominent than build badges

**Dependencies → Glass**
- Modern and trendy
- Indicates secondary information
- Softer visual hierarchy

---

## Advanced: Animated Critical Alerts

For critical issues that need attention:

```markdown
![Critical](https://shields-2-0.vercel.app/badge/⚠️%20Security-2%20vulnerabilities-error?style=neon&animate=neon-glow)
```

Result:
![Critical](https://shields-2-0.vercel.app/badge/⚠️%20Security-2%20vulnerabilities-error?style=neon&animate=neon-glow)

---

## Why This Layout Works

1. **Visual hierarchy**: Minimal → Depth → Glass creates natural information layers
2. **Grouped by purpose**: Build, Quality, Dependencies are logically separated
3. **Color coding**: Success/Warning/Error colors communicate instantly
4. **Scannable**: Developers can assess project health in 3 seconds

---

**Perfect for:** Open-source projects, CI/CD dashboards, technical documentation