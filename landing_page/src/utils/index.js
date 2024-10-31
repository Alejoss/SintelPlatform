// src/utils/index.js
export const cn = (...classes) => classes.filter(Boolean).join(' ');

// If you want to export useOnScreen as well
export { default as useOnScreen } from './useOnScreen';
