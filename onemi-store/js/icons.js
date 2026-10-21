/* أيقونات SVG بخط واحد لكل فئة - تُستخدم بدلاً من صور خارجية */
const ONEMI_ICONS = {
  phones: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="6" width="28" height="52" rx="5" stroke="currentColor" stroke-width="2.2"/>
    <line x1="18" y1="48" x2="46" y2="48" stroke="currentColor" stroke-width="2.2"/>
    <circle cx="32" cy="53" r="1.8" fill="currentColor"/>
  </svg>`,
  laptops: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="12" width="40" height="26" rx="2.5" stroke="currentColor" stroke-width="2.2"/>
    <path d="M6 46h52l-4 8H10l-4-8Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
  </svg>`,
  headphones: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 36v-4a22 22 0 0 1 44 0v4" stroke="currentColor" stroke-width="2.2"/>
    <rect x="6" y="34" width="12" height="18" rx="4" stroke="currentColor" stroke-width="2.2"/>
    <rect x="46" y="34" width="12" height="18" rx="4" stroke="currentColor" stroke-width="2.2"/>
  </svg>`,
  watches: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="18" width="24" height="28" rx="6" stroke="currentColor" stroke-width="2.2"/>
    <path d="M26 18V9h12v9M26 46v9h12v-9" stroke="currentColor" stroke-width="2.2"/>
    <path d="M32 26v7l5 3" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`,
  cameras: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="20" width="52" height="34" rx="5" stroke="currentColor" stroke-width="2.2"/>
    <path d="M22 20l4-8h12l4 8" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="32" cy="37" r="11" stroke="currentColor" stroke-width="2.2"/>
    <circle cx="32" cy="37" r="4" stroke="currentColor" stroke-width="2"/>
  </svg>`,
  accessories: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="6" stroke="currentColor" stroke-width="2.2"/>
    <path d="M32 10v8M32 46v8M10 32h8M46 32h8M17 17l5.5 5.5M41.5 41.5 47 47M47 17l-5.5 5.5M22.5 41.5 17 47" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`
};

function onemiIcon(categoryKey) {
  return ONEMI_ICONS[categoryKey] || ONEMI_ICONS.accessories;
}
