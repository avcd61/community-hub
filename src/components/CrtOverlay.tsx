/**
 * Fixed scanline + subtle sweep overlay. Sits above everything at z-60 but is
 * `pointer-events: none` so it never blocks clicks. Kept as a single fixed
 * layer so the browser can cache it and it doesn't thrash layout.
 */
const CrtOverlay = () => <div aria-hidden="true" className="crt-overlay" />;

export default CrtOverlay;
