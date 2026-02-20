# Code Quality Notes

## Intentional Exceptions

### Inline Styles
**File:** `src/app/components/GlassCard.tsx`

The `GlassCard` component uses an inline style for `animationDelay` because:
- The delay value is computed dynamically based on array indices and varies per component instance
- CSS custom properties alone cannot handle this use case without inline styles
- The warning is suppressed with `eslint-disable-next-line` as this is intentional

### CSS Compatibility Warnings
**File:** `src/styles/tailwind.css`

Modern CSS properties like `scrollbar-width` and `scrollbar-color` show compatibility warnings for older browsers:
- These are used for progressive enhancement
- Webkit fallbacks (`::-webkit-scrollbar`) are provided for Safari and older Chrome
- The functionality gracefully degrades in unsupported browsers
- AutoPrefixer is configured to add necessary vendor prefixes

## Browser Support

This project targets:
- Modern browsers (last 2 versions)
- Chrome 54+
- Safari 9+
- iOS 9+
- Firefox ESR
- >1% market share

Older browsers receive functional alternatives through progressive enhancement.
