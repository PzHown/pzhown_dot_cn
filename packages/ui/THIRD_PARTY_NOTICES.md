# Third-Party Design References

## seunghan91/ios27-design-system

- Repository: https://github.com/seunghan91/ios27-design-system
- License: MIT
- Role in this repository: canonical visual reference for iOS 27 Web tokens, typography, system colors, material values, component geometry and motion timings.
- Integration policy: values and behavior are adapted into PzHown-owned source files; the upstream package is not required at runtime.

## Andersonlimahw/react-cupertino-ui

- Repository: https://github.com/Andersonlimahw/react-cupertino-ui
- License: MIT
- Role in this repository: structural/anatomy reference for component composition and state ownership.
- Integration policy: its visual theme is not used. PzHown components are independently implemented and styled exclusively against the iOS 27 reference above.

## PallavAg/liquid-glass-web-react

- Repository: https://github.com/PallavAg/liquid-glass-web-react
- Package: `liquid-glass-web-react` (`^0.1.1`)
- License: MIT
- Role in this repository: optional live-DOM optical lens engine using generated displacement maps, SVG `feDisplacementMap`, chromatic aberration and specular edge treatment.
- Integration policy: PallavAg does **not** define the default appearance of iOS 27 controls. Standard Button / Toolbar / TabBar / modal surfaces continue to follow `ios27-design-system` material recipes (tint + backdrop blur + shadow). PallavAg is exposed only through `LiquidGlassSurface` for places where real displacement is intentionally requested.
- Browser policy: the upstream engine is designed for Chrome, Safari and Firefox. It contains iOS-specific filter-region handling and works on live DOM content; Safari video remains an upstream WebKit limitation.

The existing Progressive Blur and perceptual gradient effects remain PzHown-owned code and are intentionally separate from the iOS 27 component layer.
