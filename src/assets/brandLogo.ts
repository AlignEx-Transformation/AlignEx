/**
 * Official ALIGNEX Brand Logo Asset
 * High-definition executive vector wordmark & emblem matching the official ALIGNEX identity.
 * Colors: Platinum Silver Gradient, Obsidian Navy (#080d16), Royal Gold Accent (#e5c07b / #d4af37).
 */

// Master vector SVG for the full ALIGNEX banner wordmark
export const ALIGNEX_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 180" width="800" height="180">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070c14"/>
      <stop offset="50%" stop-color="#0a121f"/>
      <stop offset="100%" stop-color="#05080f"/>
    </linearGradient>

    <!-- Platinum Silver Metallic Gradient for ALIGNE -->
    <linearGradient id="silverPlat" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#f1f5f9"/>
      <stop offset="60%" stop-color="#cbd5e1"/>
      <stop offset="90%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#64748b"/>
    </linearGradient>

    <!-- Silver Metallic for X blades -->
    <linearGradient id="silverBlade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>

    <!-- Executive Gold Gradient for Spear Arrow and Divider Line -->
    <linearGradient id="goldSpear" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c59a27"/>
      <stop offset="35%" stop-color="#e5c07b"/>
      <stop offset="70%" stop-color="#f5e1a4"/>
      <stop offset="100%" stop-color="#fff0c2"/>
    </linearGradient>

    <!-- Subtle Gold Horizon Line Gradient -->
    <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c59a27" stop-opacity="0"/>
      <stop offset="30%" stop-color="#e5c07b" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#fef08a" stop-opacity="1"/>
      <stop offset="70%" stop-color="#e5c07b" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#c59a27" stop-opacity="0"/>
    </linearGradient>

    <filter id="spearGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Base Canvas -->
  <rect width="800" height="180" rx="14" fill="url(#bgGrad)"/>

  <!-- Letter A -->
  <g fill="url(#silverPlat)">
    <path d="M 172 120 L 205 38 L 222 38 L 255 120 L 235 120 L 227 101 L 199 101 L 191 120 Z M 204 84 L 223 84 L 213 58 Z"/>
  </g>

  <!-- Letter L -->
  <g fill="url(#silverPlat)">
    <path d="M 276 38 L 295 38 L 295 103 L 340 103 L 340 120 L 276 120 Z"/>
  </g>

  <!-- Letter I -->
  <g fill="url(#silverPlat)">
    <path d="M 360 38 L 379 38 L 379 120 L 360 120 Z"/>
  </g>

  <!-- Letter G -->
  <g fill="url(#silverPlat)">
    <path d="M 454 44 C 444 38 431 34 416 34 C 388 34 368 53 368 79 C 368 105 388 124 417 124 C 434 124 447 119 457 110 L 457 85 L 420 85 L 420 68 L 476 68 L 476 121 C 460 133 440 140 417 140 C 378 140 348 113 348 79 C 348 45 378 18 416 18 C 438 18 456 24 468 33 Z" transform="translate(42, 0)"/>
  </g>

  <!-- Letter N -->
  <g fill="url(#silverPlat)">
    <path d="M 498 38 L 517 38 L 553 96 L 553 38 L 571 38 L 571 120 L 553 120 L 516 61 L 516 120 L 498 120 Z"/>
  </g>

  <!-- Letter E -->
  <g fill="url(#silverPlat)">
    <path d="M 590 38 L 650 38 L 650 55 L 610 55 L 610 70 L 644 70 L 644 87 L 610 87 L 610 103 L 652 103 L 652 120 L 590 120 Z"/>
  </g>

  <!-- Stylized Letter X with Ascending Spear Arrow & Silver Double Blades -->
  <g id="stylized-x">
    <!-- Top-Left to Bottom-Right Upper Parallel Blade -->
    <polygon points="665,36 682,36 740,118 723,118" fill="url(#silverBlade)"/>
    
    <!-- Top-Left to Bottom-Right Lower Parallel Blade -->
    <polygon points="682,56 697,56 742,120 727,120" fill="url(#silverBlade)"/>

    <!-- Dynamic Ascending Gold Arrow Spear (Bottom-Left to Top-Right) -->
    <!-- Spear Shaft -->
    <polygon points="668,124 661,120 765,22 772,26" fill="url(#goldSpear)" filter="url(#spearGlow)"/>

    <!-- Barbed Spearhead at Top-Right Apex -->
    <path d="M 770 12 L 778 30 L 766 28 L 761 36 Z" fill="url(#goldSpear)" filter="url(#spearGlow)"/>
  </g>

  <!-- Elegant Gold Underline & Center Divider Pips -->
  <!-- Left Hairline -->
  <path d="M 180 148 L 380 148" stroke="url(#goldLine)" stroke-width="1.8" stroke-linecap="round"/>
  
  <!-- Center Notch Bracket Accents -->
  <line x1="392" y1="142" x2="392" y2="154" stroke="#e5c07b" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="404" y1="142" x2="404" y2="154" stroke="#e5c07b" stroke-width="2.2" stroke-linecap="round"/>

  <!-- Right Hairline -->
  <path d="M 416 148 L 640 148" stroke="url(#goldLine)" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;

// Icon / Monogram version of the Alignex Logo (for compact avatars, favicon, and square tiles)
export const ALIGNEX_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bgGradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070c14"/>
      <stop offset="50%" stop-color="#0a121f"/>
      <stop offset="100%" stop-color="#05080f"/>
    </linearGradient>
    <linearGradient id="silverPlatIcon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
    <linearGradient id="goldSpearIcon" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c59a27"/>
      <stop offset="50%" stop-color="#e5c07b"/>
      <stop offset="100%" stop-color="#fff0c2"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="44" fill="url(#bgGradIcon)"/>
  <rect x="4" y="4" width="192" height="192" rx="40" fill="none" stroke="#1e293b" stroke-width="2" opacity="0.6"/>

  <!-- Parallel Silver Blades -->
  <polygon points="45,45 65,45 145,155 125,155" fill="url(#silverPlatIcon)"/>
  <polygon points="68,68 85,68 152,160 135,160" fill="url(#silverPlatIcon)"/>

  <!-- Gold Spear Arrow -->
  <polygon points="46,160 38,154 165,36 173,42" fill="url(#goldSpearIcon)"/>
  <!-- Spearhead -->
  <path d="M 172 20 L 182 42 L 168 39 L 162 48 Z" fill="url(#goldSpearIcon)"/>

  <!-- Subtle Gold Baseline Accent -->
  <line x1="50" y1="180" x2="150" y2="180" stroke="#e5c07b" stroke-width="1.8" stroke-linecap="round" opacity="0.8"/>
  <line x1="96" y1="175" x2="96" y2="185" stroke="#e5c07b" stroke-width="2"/>
  <line x1="104" y1="175" x2="104" y2="185" stroke="#e5c07b" stroke-width="2"/>
</svg>`;

export const DEFAULT_ALIGNEX_LOGO_SVG_URI = `data:image/svg+xml;utf8,${encodeURIComponent(ALIGNEX_LOGO_SVG)}`;
export const DEFAULT_ALIGNEX_ICON_SVG_URI = `data:image/svg+xml;utf8,${encodeURIComponent(ALIGNEX_ICON_SVG)}`;

/**
 * Creates a high-definition JPEG / PNG Data URL for the official Alignex logo
 */
export function getAlignexJpegDataUrl(): string {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return DEFAULT_ALIGNEX_LOGO_SVG_URI;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 180;
    const ctx = canvas.getContext('2d');
    if (!ctx) return DEFAULT_ALIGNEX_LOGO_SVG_URI;

    // Deep Obsidian Navy Background
    const bgGrad = ctx.createLinearGradient(0, 0, 800, 180);
    bgGrad.addColorStop(0, '#070c14');
    bgGrad.addColorStop(0.5, '#0a121f');
    bgGrad.addColorStop(1, '#05080f');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 180);

    // Border
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, 796, 176);

    // Lettering Gradient
    const silverGrad = ctx.createLinearGradient(0, 30, 0, 130);
    silverGrad.addColorStop(0, '#ffffff');
    silverGrad.addColorStop(0.3, '#f1f5f9');
    silverGrad.addColorStop(0.7, '#cbd5e1');
    silverGrad.addColorStop(1, '#94a3b8');

    ctx.fillStyle = silverGrad;
    ctx.font = '900 82px "Cinzel", "Trajan Pro", "Times New Roman", serif, sans-serif';
    ctx.letterSpacing = '12px';
    ctx.textBaseline = 'middle';
    ctx.fillText('ALIGNE', 160, 84);

    // Gold Spear Gradient
    const goldGrad = ctx.createLinearGradient(660, 140, 775, 20);
    goldGrad.addColorStop(0, '#c59a27');
    goldGrad.addColorStop(0.5, '#e5c07b');
    goldGrad.addColorStop(1, '#fff0c2');

    // Silver Parallel Blades for X
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(665, 36);
    ctx.lineTo(682, 36);
    ctx.lineTo(740, 118);
    ctx.lineTo(723, 118);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(682, 56);
    ctx.lineTo(697, 56);
    ctx.lineTo(742, 120);
    ctx.lineTo(727, 120);
    ctx.closePath();
    ctx.fill();

    // Gold Spear Shaft
    ctx.fillStyle = goldGrad;
    ctx.beginPath();
    ctx.moveTo(668, 124);
    ctx.lineTo(661, 120);
    ctx.lineTo(765, 22);
    ctx.lineTo(772, 26);
    ctx.closePath();
    ctx.fill();

    // Gold Spearhead
    ctx.beginPath();
    ctx.moveTo(770, 12);
    ctx.lineTo(778, 30);
    ctx.lineTo(766, 28);
    ctx.lineTo(761, 36);
    ctx.closePath();
    ctx.fill();

    // Underline
    ctx.strokeStyle = '#e5c07b';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(180, 148);
    ctx.lineTo(380, 148);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(416, 148);
    ctx.lineTo(640, 148);
    ctx.stroke();

    // Ticks
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(392, 142);
    ctx.lineTo(392, 154);
    ctx.moveTo(404, 142);
    ctx.lineTo(404, 154);
    ctx.stroke();

    return canvas.toDataURL('image/jpeg', 0.98);
  } catch (err) {
    console.error('Error generating Alignex JPEG logo:', err);
    return DEFAULT_ALIGNEX_LOGO_SVG_URI;
  }
}
