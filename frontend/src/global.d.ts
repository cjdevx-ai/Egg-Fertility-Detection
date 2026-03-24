// Ensure this file is treated as a global declaration file (no imports/exports at the top level)
// This is necessary to augment the global JSX namespace for custom elements like <iconify-icon>

declare namespace JSX {
  interface IntrinsicElements {
    'iconify-icon': any;
  }
}

// Augment React namespace as well for newer React versions
declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': any;
    }
  }
}
