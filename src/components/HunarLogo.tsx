import React from 'react';

export type LogoVariant = 'primary' | 'horizontal' | 'vertical' | 'icon' | 'badge' | 'text' | 'full' | 'mark';
export type LogoTheme = 'color' | 'dark' | 'light' | 'emerald' | 'monochrome' | 'inverted';
export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface HunarLogoProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: LogoSize;
  showTagline?: boolean;
  transparentBg?: boolean;
  className?: string;
}

/**
 * Enhanced Full Emblem:
 * 5 Graduating Professionals cohort standing in solidarity,
 * framed by victory laurels and topped with the Star of Achievement.
 * Balanced optical weights, scalable geometry, and pristine contrast.
 */
export const HunarEmblem: React.FC<{
  className?: string;
  color?: string;
  theme?: LogoTheme;
}> = ({
  className = 'w-10 h-10',
  color,
  theme = 'color',
}) => {
  // Determine color assignments based on theme
  let mainColor = color || '#062E22';

  if (theme === 'monochrome') {
    mainColor = '#000000';
  } else if (theme === 'inverted' || theme === 'light') {
    mainColor = '#FFFFFF';
  } else if (theme === 'emerald') {
    mainColor = '#10B981';
  }

  return (
    <svg
      viewBox="0 0 170 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="HUNAR Official 5 Graduates Emblem"
    >
      {/* 5 Graduating Professionals Standing in Solidarity (Official Symbol) */}

      {/* Far Left Graduate (1) */}
      <g>
        {/* Diamond Mortarboard Cap */}
        <polygon points="18,34 29,39 18,44 7,39" fill={mainColor} />
        <rect x="15" y="42" width="6" height="2.5" rx="0.8" fill={mainColor} />
        {/* Tassel */}
        <path d="M18 39L27 43L27 49" stroke={mainColor} strokeWidth="1.2" strokeLinecap="round" />
        {/* Head */}
        <circle cx="18" cy="52" r="4.5" fill={mainColor} />
        {/* Torso & Legs */}
        <path
          d="M12 59C12 57.5 14 57 18 57C22 57 24 57.5 24 59L23.5 86L20 86L20 108C20 109 19 110 18 110C17 110 16 109 16 108L16 86L12.5 86L12 59Z"
          fill={mainColor}
        />
      </g>

      {/* Far Right Graduate (5) */}
      <g>
        {/* Diamond Mortarboard Cap */}
        <polygon points="152,34 163,39 152,44 141,39" fill={mainColor} />
        <rect x="149" y="42" width="6" height="2.5" rx="0.8" fill={mainColor} />
        {/* Tassel */}
        <path d="M152 39L161 43L161 49" stroke={mainColor} strokeWidth="1.2" strokeLinecap="round" />
        {/* Head */}
        <circle cx="152" cy="52" r="4.5" fill={mainColor} />
        {/* Torso & Legs */}
        <path
          d="M146 59C146 57.5 148 57 152 57C156 57 158 57.5 158 59L157.5 86L154 86L154 108C154 109 153 110 152 110C151 110 150 109 150 108L150 86L146.5 86L146 59Z"
          fill={mainColor}
        />
      </g>

      {/* Inner Left Graduate (2) */}
      <g>
        {/* Diamond Mortarboard Cap */}
        <polygon points="48,22 62,28 48,34 34,28" fill={mainColor} />
        <rect x="44" y="32" width="8" height="3" rx="1" fill={mainColor} />
        {/* Tassel */}
        <path d="M48 28L59 33L59 40" stroke={mainColor} strokeWidth="1.4" strokeLinecap="round" />
        {/* Head */}
        <circle cx="48" cy="42" r="5.5" fill={mainColor} />
        {/* Torso & Legs */}
        <path
          d="M40 50C40 48 43 47.5 48 47.5C53 47.5 56 48 56 50L55.5 84L51.5 84L51.5 110C51.5 111.2 50 112 48 112C46 112 44.5 111.2 44.5 110L44.5 84L40.5 84L40 50Z"
          fill={mainColor}
        />
      </g>

      {/* Inner Right Graduate (4) */}
      <g>
        {/* Diamond Mortarboard Cap */}
        <polygon points="122,22 136,28 122,34 108,28" fill={mainColor} />
        <rect x="118" y="32" width="8" height="3" rx="1" fill={mainColor} />
        {/* Tassel */}
        <path d="M122 28L133 33L133 40" stroke={mainColor} strokeWidth="1.4" strokeLinecap="round" />
        {/* Head */}
        <circle cx="122" cy="42" r="5.5" fill={mainColor} />
        {/* Torso & Legs */}
        <path
          d="M114 50C114 48 117 47.5 122 47.5C127 47.5 130 48 130 50L129.5 84L125.5 84L125.5 110C125.5 111.2 124 112 122 112C120 112 118.5 111.2 118.5 110L118.5 84L114.5 84L114 50Z"
          fill={mainColor}
        />
      </g>

      {/* Center Lead Graduate (3) - Primus */}
      <g>
        {/* Diamond Mortarboard Cap */}
        <polygon points="85,6 103,14 85,22 67,14" fill={mainColor} />
        <rect x="80" y="19" width="10" height="3.8" rx="1.2" fill={mainColor} />
        {/* Tassel */}
        <path d="M85 14L99 21L99 30" stroke={mainColor} strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="99" cy="30.5" r="1.2" fill={mainColor} />
        {/* Head */}
        <circle cx="85" cy="31" r="7" fill={mainColor} />
        {/* Torso & Legs */}
        <path
          d="M75 40C75 37.5 79 37 85 37C91 37 95 37.5 95 40L94 82L89.5 82L89.5 114C89.5 115.5 87.5 116.5 85 116.5C82.5 116.5 80.5 115.5 80.5 114L80.5 82L76 82L75 40Z"
          fill={mainColor}
        />
      </g>
    </svg>
  );
};

/**
 * Simplified Icon Version:
 * Purpose-built for high-legibility at micro-scales (16px to 64px)
 * such as browser favicons, mobile app headers, avatar badges, and buttons.
 * Combines the bold academic Mortarboard, the Achievement Star,
 * and the Victory Laurel Shield in a modern, razor-sharp mark.
 */
export const HunarSimplifiedIcon: React.FC<{
  className?: string;
  theme?: LogoTheme;
  variant?: 'flat' | 'rounded-squircle' | 'shield';
}> = ({ className = 'w-10 h-10', theme = 'color', variant = 'flat' }) => {
  let mainColor = '#062E22';
  let accentColor = '#10B981';
  let starColor = '#F59E0B';
  let bgColor = '#FFFFFF';

  if (theme === 'monochrome') {
    mainColor = '#000000';
    accentColor = '#000000';
    starColor = '#000000';
    bgColor = '#FFFFFF';
  } else if (theme === 'inverted' || theme === 'light') {
    mainColor = '#FFFFFF';
    accentColor = theme === 'light' ? '#6EE7B7' : '#FFFFFF';
    starColor = theme === 'light' ? '#FCD34D' : '#FFFFFF';
    bgColor = '#062E22';
  } else if (theme === 'emerald') {
    mainColor = '#10B981';
    accentColor = '#059669';
    starColor = '#FBBF24';
  }

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="HUNAR Simplified Icon"
    >
      {variant === 'rounded-squircle' && (
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="22"
          fill={theme === 'inverted' || theme === 'light' ? '#062E22' : '#F0FDF4'}
          stroke={accentColor}
          strokeWidth="3"
        />
      )}

      {/* Beacon Achievement Star */}
      <path
        d="M50 8L52 14.5L58.5 16.5L52 18.5L50 25L48 18.5L41.5 16.5L48 14.5L50 8Z"
        fill={starColor}
      />

      {/* Bold Graduation Cap (Dominant Anchor) */}
      <polygon points="50,22 84,36 50,50 16,36" fill={mainColor} />
      <path
        d="M32 44L32 54C32 58 41 62 50 62C59 62 68 58 68 54L68 44"
        stroke={mainColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Dynamic Golden Tassel */}
      <path
        d="M50 36L78 47L78 62"
        stroke={starColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="78" cy="64" r="3.5" fill={starColor} />

      {/* Laurel Victory Arc Framing the Base */}
      <path
        d="M20 72C24 84 36 90 50 90C64 90 76 84 80 72"
        stroke={accentColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Stylized Leaf Accents */}
      <path
        d="M20 72C16 68 15 62 20 59C23 63 23 69 20 72Z"
        fill={accentColor}
      />
      <path
        d="M80 72C84 68 85 62 80 59C77 63 77 69 80 72Z"
        fill={accentColor}
      />

      {/* Core "H" (Hunar) & Upward Stepping Pedestal */}
      <path
        d="M44 68L44 82M56 68L56 82M44 75L56 75"
        stroke={mainColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Official Circular Achievement Seal / Crest Badge:
 * Academic & corporate verification stamp variation,
 * ideal for verified diplomas, talent accreditation certificates, and official partner documents.
 */
export const HunarBadgeCrest: React.FC<{
  className?: string;
  theme?: LogoTheme;
}> = ({ className = 'w-16 h-16', theme = 'color' }) => {
  let mainColor = '#062E22';
  let accentColor = '#10B981';
  let starColor = '#F59E0B';

  if (theme === 'monochrome') {
    mainColor = '#000000';
    accentColor = '#000000';
    starColor = '#000000';
  } else if (theme === 'inverted' || theme === 'light') {
    mainColor = '#FFFFFF';
    accentColor = '#6EE7B7';
    starColor = '#FCD34D';
  }

  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="HUNAR Official Crest Seal"
    >
      {/* Outer Ring & Decorative Beaded Border */}
      <circle cx="80" cy="80" r="76" stroke={mainColor} strokeWidth="3" />
      <circle cx="80" cy="80" r="70" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="80" cy="80" r="54" stroke={mainColor} strokeWidth="1.5" />

      {/* Top Arc Curved Text */}
      <path id="crestUpperArc" d="M26 80 A54 54 0 0 1 134 80" fill="none" />
      <text fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="9" fontWeight="800" fill={mainColor} letterSpacing="3">
        <textPath href="#crestUpperArc" startOffset="50%" textAnchor="middle">
          ★ HUNAR ACCREDITED ★
        </textPath>
      </text>

      {/* Bottom Arc Curved Text */}
      <path id="crestLowerArc" d="M134 80 A54 54 0 0 1 26 80" fill="none" />
      <text fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="7.5" fontWeight="700" fill={accentColor} letterSpacing="2">
        <textPath href="#crestLowerArc" startOffset="50%" textAnchor="middle">
          WHERE SKILLS MEET OPPORTUNITY
        </textPath>
      </text>

      {/* Central Emblem Representation */}
      <g transform="translate(30, 32) scale(0.5)">
        <HunarEmblem theme={theme} color={mainColor} />
      </g>

      {/* Center Year Tag */}
      <text
        x="80"
        y="112"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="7"
        fontWeight="800"
        fill={starColor}
        letterSpacing="1"
      >
        EST. 2026
      </text>
    </svg>
  );
};

/**
 * Universal HunarLogo Component:
 * Fully supports all variations:
 * - primary: Balanced horizontal with emblem + bold HUNAR + tagline
 * - horizontal: Compact navbar lockup
 * - vertical: Centered stacked logo for headers/posters
 * - icon: Scalable simplified icon mark
 * - badge: Circular accreditation seal
 * - text: Pure typographic wordmark
 *
 * Fully supports all themes & backgrounds:
 * - color: Rich heritage forest green (#062E22) + emerald (#10B981) + gold (#F59E0B)
 * - monochrome: Pure solid black (#000000) for print & official stamps
 * - inverted: Crisp pure white (#FFFFFF) on dark/black backgrounds
 * - light: High-contrast white + mint for forest green containers
 * - emerald: Vibrant tech green
 * - transparentBg: No background container, overlays on any surface
 */
export const HunarLogo: React.FC<HunarLogoProps> = ({
  variant = 'horizontal',
  theme = 'dark',
  size = 'md',
  showTagline = false,
  transparentBg = true,
  className = '',
}) => {
  // Normalize theme mapped to our internal color rules
  const effectiveTheme: LogoTheme =
    theme === 'monochrome'
      ? 'monochrome'
      : theme === 'inverted'
      ? 'inverted'
      : theme === 'light'
      ? 'light'
      : theme === 'emerald'
      ? 'emerald'
      : 'color';

  const primaryTextColor =
    effectiveTheme === 'monochrome'
      ? '#000000'
      : effectiveTheme === 'inverted' || effectiveTheme === 'light'
      ? '#FFFFFF'
      : effectiveTheme === 'emerald'
      ? '#10B981'
      : '#062E22';

  const secondaryTextColor =
    effectiveTheme === 'monochrome'
      ? '#333333'
      : effectiveTheme === 'inverted'
      ? 'rgba(255, 255, 255, 0.9)'
      : effectiveTheme === 'light'
      ? '#A7F3D0'
      : effectiveTheme === 'emerald'
      ? '#059669'
      : '#0B3B2C';

  // Size specifications
  const sizeConfig = {
    xs: {
      emblem: 'w-6 h-6',
      icon: 'w-6 h-6',
      badge: 'w-10 h-10',
      title: 'text-base tracking-wider',
      tagline: 'text-[8.5px] tracking-[0.18em]',
      gap: 'gap-2',
    },
    sm: {
      emblem: 'w-8 h-8',
      icon: 'w-8 h-8',
      badge: 'w-12 h-12',
      title: 'text-lg sm:text-xl tracking-wider',
      tagline: 'text-[9.5px] sm:text-[10px] tracking-[0.2em]',
      gap: 'gap-2.5',
    },
    md: {
      emblem: 'w-10 h-10',
      icon: 'w-10 h-10',
      badge: 'w-16 h-16',
      title: 'text-2xl tracking-wider',
      tagline: 'text-xs tracking-[0.22em]',
      gap: 'gap-3',
    },
    lg: {
      emblem: 'w-14 h-14',
      icon: 'w-14 h-14',
      badge: 'w-24 h-24',
      title: 'text-3xl sm:text-4xl tracking-wider',
      tagline: 'text-xs sm:text-sm tracking-[0.26em]',
      gap: 'gap-4',
    },
    xl: {
      emblem: 'w-20 h-20',
      icon: 'w-20 h-20',
      badge: 'w-32 h-32',
      title: 'text-5xl sm:text-6xl tracking-wider',
      tagline: 'text-sm sm:text-base tracking-[0.3em]',
      gap: 'gap-5',
    },
    '2xl': {
      emblem: 'w-28 h-28',
      icon: 'w-28 h-28',
      badge: 'w-44 h-44',
      title: 'text-6xl sm:text-7xl tracking-wider',
      tagline: 'text-base sm:text-lg tracking-[0.35em]',
      gap: 'gap-6',
    },
  }[size];

  // Simplified Icon Variation
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <HunarSimplifiedIcon
          className={sizeConfig.icon}
          theme={effectiveTheme}
          variant="flat"
        />
      </div>
    );
  }

  // Standalone Cohort Emblem Mark Variation
  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <HunarEmblem
          className={sizeConfig.emblem}
          theme={effectiveTheme}
        />
      </div>
    );
  }

  // Circular Badge Variation
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <HunarBadgeCrest
          className={sizeConfig.badge}
          theme={effectiveTheme}
        />
      </div>
    );
  }

  // Pure Text Wordmark Variation
  if (variant === 'text') {
    return (
      <div className={`inline-flex flex-col ${className}`}>
        <span
          className={`font-black font-sans leading-none ${sizeConfig.title}`}
          style={{ color: primaryTextColor }}
        >
          HUNAR
        </span>
        {showTagline && (
          <span
            className={`font-bold uppercase mt-1 whitespace-nowrap ${sizeConfig.tagline}`}
            style={{ color: secondaryTextColor }}
          >
            Where Skills Meet Opportunity
          </span>
        )}
      </div>
    );
  }

  // Vertical Stacked Variation
  if (variant === 'vertical') {
    return (
      <div
        className={`inline-flex flex-col items-center text-center ${sizeConfig.gap} ${className}`}
      >
        <HunarEmblem
          className={sizeConfig.emblem}
          theme={effectiveTheme}
        />
        <div className="flex flex-col items-center">
          <span
            className={`font-black font-sans leading-none ${sizeConfig.title}`}
            style={{ color: primaryTextColor }}
          >
            HUNAR
          </span>
          {showTagline && (
            <span
              className={`font-bold uppercase mt-1 text-center whitespace-nowrap ${sizeConfig.tagline}`}
              style={{ color: secondaryTextColor }}
            >
              Where Skills Meet Opportunity
            </span>
          )}
        </div>
      </div>
    );
  }

  // Primary / Horizontal Lockup Variation (Default)
  return (
    <div className={`inline-flex items-center ${sizeConfig.gap} ${className}`}>
      <HunarEmblem
        className={sizeConfig.emblem}
        theme={effectiveTheme}
      />
      <div className="flex flex-col justify-center">
        <span
          className={`font-black font-sans leading-none ${sizeConfig.title}`}
          style={{ color: primaryTextColor }}
        >
          HUNAR
        </span>
        {(showTagline || variant === 'primary') && (
          <span
            className={`font-bold uppercase tracking-wider mt-1 whitespace-nowrap ${sizeConfig.tagline}`}
            style={{ color: secondaryTextColor }}
          >
            Where Skills Meet Opportunity
          </span>
        )}
      </div>
    </div>
  );
};
