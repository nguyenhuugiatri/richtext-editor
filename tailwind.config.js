const { fontFamily } = require('tailwindcss/defaultTheme')

const generatePreset = (from, to, cb) => {
  const res = {}
  for (let i = from; i <= to; i += 1) {
    res[i] = cb(i)
  }
  return res
}

const toDangoToken = (token) => `var(--dg-${token})`

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    fontFamily: {
      sans: ['var(--font-sans)', ...fontFamily.sans],
      serif: fontFamily.serif,
      mono: fontFamily.mono,
    },

    spacing: {
      0: '0',
      1: '1px',
      4: '4px',
      8: '8px',
      10: '10px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
      28: '28px',
      32: '32px',
      36: '36px',
      40: '40px',
      44: '44px',
      48: '48px',
      80: '80px',
    },

    lineHeight: {
      0: '0',
      1: '1px',
      4: '4px',
      8: '8px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
      28: '28px',
      32: '32px',
      36: '36px',
      40: '40px',
      44: '44px',
      48: '48px',
    },

    boxShadow: {
      popover:
        '0px 4px 20px 0px rgba(0, 0, 0, 0.40), 0px 4px 4px 0px rgba(0, 0, 0, 0.10)',
      modal: '0px 24px 64px 0px #000, 0px 0px 1px 0px rgba(0, 0, 0, 0.20)',
      'table-right':
        '-1px 0px 0px 0px #272B34 inset, 12px 0px 12px 0px rgba(0, 0, 0, 0.30)',
      'table-left':
        '1px 0px 0px 0px #272B34 inset, -12px 0px 12px 0px rgba(0, 0, 0, 0.30)',
    },

    extend: {
      colors: {
        /* -------------------------------------------- */
        /*               MAP MATCHA COLORS              */
        /* -------------------------------------------- */
        black: {
          DEFAULT: toDangoToken('color-black'),
          'opacity-60': toDangoToken('color-black-opacity-60'),
          'opacity-70': toDangoToken('color-black-opacity-70'),
          ...generatePreset(1, 10, (i) => toDangoToken(`color-black-${i}`)),
        },
        white: {
          DEFAULT: toDangoToken('color-white'),
          'opacity-7': toDangoToken('color-white-opacity-7'),
          'opacity-10': toDangoToken('color-white-opacity-10'),
          'opacity-30': toDangoToken('color-white-opacity-30'),
          'opacity-70': toDangoToken('color-white-opacity-70'),
          'opacity-75': toDangoToken('color-white-opacity-75'),
          ...generatePreset(1, 9, (i) => toDangoToken(`color-white-${i}`)),
        },
        blue: generatePreset(0, 9, (i) => toDangoToken(`color-blue-${i}`)),
        cyan: generatePreset(0, 4, (i) => toDangoToken(`color-cyan-${i}`)),
        green: generatePreset(0, 9, (i) => toDangoToken(`color-green-${i}`)),
        orange: generatePreset(0, 6, (i) => toDangoToken(`color-orange-${i}`)),
        pink: generatePreset(0, 4, (i) => toDangoToken(`color-pink-${i}`)),
        purple: generatePreset(0, 4, (i) => toDangoToken(`color-purple-${i}`)),
        red: generatePreset(1, 9, (i) => toDangoToken(`color-red-${i}`)),
        yellow: generatePreset(0, 10, (i) => toDangoToken(`color-yellow-${i}`)),

        /* -------------------------------------------- */
        /*               MAP MATCHA TOKEN               */
        /* -------------------------------------------- */
        'text-color-disabled': toDangoToken('color-white-opacity-30'),
        'text-color-critical': toDangoToken('color-red-4'),
        'text-color-secondary-plain': toDangoToken('color-blue-5'),
        'text-color-secondary': toDangoToken('color-white-1'),
        'text-color-primary': toDangoToken('color-black-8'),
        'text-color-highlight': toDangoToken('color-blue-4'),
        'text-color-success': toDangoToken('color-green-4'),
        'text-color-warning': toDangoToken('color-yellow-4'),
        'text-color-subdued': toDangoToken('color-white-opacity-75'),
        'text-color-default': toDangoToken('color-white-1'),

        'border-color-highlight-subdued': toDangoToken('color-blue-7'),
        'border-color-highlight': toDangoToken('color-blue-8'),
        'border-color-success-subdued': toDangoToken('color-green-7'),
        'border-color-success': toDangoToken('color-green-8'),
        'border-color-warning-subdued': toDangoToken('color-yellow-7'),
        'border-color-warning': toDangoToken('color-yellow-8'),
        'border-color-critical-subdued': toDangoToken('color-red-7'),
        'border-color-critical': toDangoToken('color-red-8'),
        'border-color-critical-pressing': toDangoToken('color-red-7'),
        'border-color-critical-hover': toDangoToken('color-red-6'),
        'border-color-critical-disabled': toDangoToken(
          'color-white-opacity-10'
        ),
        'border-color-default-subdued': toDangoToken('color-black-5'),
        'border-color-default': toDangoToken('color-black-6'),
        'border-color-outline-disabled': toDangoToken('color-white-opacity-10'),
        'border-color-outline-pressing': toDangoToken('color-white-1'),
        'border-color-outline-hover': toDangoToken('color-white-4'),
        'border-color-outline-default': toDangoToken('color-white-1'),
        'border-color-secondary-disabled': toDangoToken(
          'color-white-opacity-10'
        ),
        'border-color-secondary-pressing': toDangoToken(
          'color-white-opacity-10'
        ),
        'border-color-secondary-hover': toDangoToken('color-white-opacity-30'),
        'border-color-secondary-default': toDangoToken(
          'color-white-opacity-10'
        ),
        'border-color-secondary-critical': toDangoToken('color-red-6'),

        'surface-color-skeleton': toDangoToken('color-white'),
        'surface-color-highlight-subdued': toDangoToken('color-blue-8'),
        'surface-color-highlight': toDangoToken('color-blue-9'),
        'surface-color-success-subdued': toDangoToken('color-green-8'),
        'surface-color-success': toDangoToken('color-green-9'),
        'surface-color-success-opacity': toDangoToken('color-green-0'),
        'surface-color-warning-subdued': toDangoToken('color-yellow-8'),
        'surface-color-warning': toDangoToken('color-yellow-9'),
        'surface-color-warning-opacity': toDangoToken('color-yellow-0'),
        'surface-color-critical-subdued': toDangoToken('color-red-8'),
        'surface-color-critical-default': toDangoToken('color-red-6'),
        'surface-color-critical': toDangoToken('color-red-9'),
        'surface-color-critical-opacity': toDangoToken('color-red-0'),
        'surface-color-critical-disabled': toDangoToken(
          'color-white-opacity-7'
        ),
        'surface-color-critical-pressing': toDangoToken('color-red-8'),
        'surface-color-critical-hover': toDangoToken('color-red-7'),
        'surface-color-default-subdued': toDangoToken('color-black-7'),
        'surface-color-default': toDangoToken('color-black-8'),
        'surface-color-default-pressing': toDangoToken(
          'color-white-opacity-10'
        ),
        'surface-color-default-hover': toDangoToken('color-white-opacity-7'),
        'surface-color-neutral-opacity': toDangoToken('color-black-opacity-60'),
        'surface-color-neutral': toDangoToken('color-black-7'),
        'surface-color-neutral-subdued': toDangoToken('color-black-6'),
        'surface-color-secondary-disabled': toDangoToken(
          'color-white-opacity-7'
        ),
        'surface-color-secondary-pressing': toDangoToken(
          'color-white-opacity-15'
        ),
        'surface-color-secondary-hover': toDangoToken('color-white-opacity-10'),
        'surface-color-secondary-default': toDangoToken(
          'color-white-opacity-7'
        ),
        'surface-color-primary-disabled': toDangoToken('color-white-opacity-7'),
        'surface-color-primary-pressing': toDangoToken('color-white-5'),
        'surface-color-primary-hover': toDangoToken('color-white-3'),
        'surface-color-primary-default': toDangoToken('color-white-1'),
        'surface-color-accent-disabled': toDangoToken('color-white-opacity-7'),
        'surface-color-accent-pressing': toDangoToken('color-blue-7'),
        'surface-color-accent-hover': toDangoToken('color-blue-6'),
        'surface-color-accent-default': toDangoToken('color-blue-5'),

        'background-color-default': toDangoToken('color-black-9'),
        'background-color-overlay': toDangoToken('color-black-opacity-70'),

        'black-color-opacity': toDangoToken('color-black-opacity-60'),
        'white-color-opacity': toDangoToken('color-white-opacity-10'),

        'cyan-color-dark': toDangoToken('color-cyan-4'),
        'cyan-color-bold': toDangoToken('color-cyan-3'),
        'cyan-color-medium': toDangoToken('color-cyan-2'),
        'cyan-color-light': toDangoToken('color-cyan-1'),
        'cyan-color-opacity': toDangoToken('color-cyan-0'),

        'purple-color-dark': toDangoToken('color-purple-4'),
        'purple-color-bold': toDangoToken('color-purple-3'),
        'purple-color-medium': toDangoToken('color-purple-2'),
        'purple-color-light': toDangoToken('color-purple-1'),
        'purple-color-opacity': toDangoToken('color-purple-0'),

        'orange-color-dark': toDangoToken('color-orange-4'),
        'orange-color-bold': toDangoToken('color-orange-3'),
        'orange-color-medium': toDangoToken('color-orange-2'),
        'orange-color-light': toDangoToken('color-orange-1'),
        'orange-color-opacity': toDangoToken('color-orange-0'),

        'pink-color-dark': toDangoToken('color-pink-4'),
        'pink-color-bold': toDangoToken('color-pink-3'),
        'pink-color-medium': toDangoToken('color-pink-2'),
        'pink-color-light': toDangoToken('color-pink-1'),
        'pink-color-opacity': toDangoToken('color-pink-0'),

        'blue-color-dark': toDangoToken('color-blue-8'),
        'blue-color-bold': toDangoToken('color-blue-6'),
        'blue-color-medium': toDangoToken('color-blue-4'),
        'blue-color-light': toDangoToken('color-blue-2'),
        'blue-color-opacity': toDangoToken('color-blue-0'),

        'link-color-mono-disabled': toDangoToken('color-white-opacity-30'),
        'link-color-mono-pressing': toDangoToken('color-white-5'),
        'link-color-mono-hover': toDangoToken('color-white-3'),
        'link-color-mono-subdued': toDangoToken('color-white-8'),
        'link-color-mono-default': toDangoToken('color-white-1'),

        'link-color-blue-disabled': toDangoToken('color-white-opacity-30'),
        'link-color-blue-pressing': toDangoToken('color-blue-6'),
        'link-color-blue-hover': toDangoToken('color-blue-5'),
        'link-color-blue-default': toDangoToken('color-blue-4'),

        'icon-color-mono-disabled': toDangoToken('color-white-opacity-30'),
        'icon-color-mono-pressing': toDangoToken('color-white-1'),
        'icon-color-mono-hover': toDangoToken('color-white-4'),
        'icon-color-mono-subdued': toDangoToken('color-white-8'),
        'icon-color-mono-default': toDangoToken('color-white-1'),

        'icon-color-blue-disabled': toDangoToken('color-white-opacity-30'),
        'icon-color-blue-pressing': toDangoToken('color-blue-5'),
        'icon-color-blue-hover': toDangoToken('color-blue-3'),
        'icon-color-blue-default': toDangoToken('color-blue-'),
      },

      zIndex: {
        negative: -1,
        dialog: toDangoToken('dialog-zindex'),
        popover: toDangoToken('popover-zindex'),
        top: 9999,
      },

      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },

      borderRadius: {
        none: '0px',
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
        32: '32px',
        circle: '50%',
      },

      fontSize: {
        h1: [
          '56px',
          {
            lineHeight: '64px',
            fontWeight: '600',
          },
        ],
        h2: [
          '42px',
          {
            lineHeight: '52px',
            fontWeight: '600',
          },
        ],
        h3: [
          '32px',
          {
            lineHeight: '36px',
            fontWeight: '600',
          },
        ],
        h4: [
          '24px',
          {
            lineHeight: '30px',
            fontWeight: '600',
          },
        ],
        h5: [
          '20px',
          {
            lineHeight: '28px',
            fontWeight: '600',
          },
        ],
        h6: [
          '18px',
          {
            lineHeight: '26px',
            fontWeight: '600',
          },
        ],
        'label-m': [
          '13px',
          {
            lineHeight: '16px',
            fontWeight: '600',
          },
        ],
        'label-s': [
          '11px',
          {
            lineHeight: '14px',
            fontWeight: '500',
          },
        ],
        'body-m': [
          '16px',
          {
            lineHeight: '22px',
            fontWeight: '400',
          },
        ],
        'body-m-strong': [
          '16px',
          {
            lineHeight: '22px',
            fontWeight: '500',
          },
        ],
        'body-s': [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: '400',
          },
        ],
        'body-s-strong': [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: '500',
          },
        ],
        'body-xs': [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: '400',
          },
        ],
      },

      keyframes: {
        'opacity-appear': {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 },
        },
      },

      animation: {
        'opacity-appear': 'opacity-appear .3s ease-in-out',
        'slow-opacity-appear': 'opacity-appear 1s ease-in-out',
      },

      aspectRatio: {
        '3/2': '3 / 2',
      },
    },
  },
}
