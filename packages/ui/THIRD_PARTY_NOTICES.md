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

The existing Progressive Blur and perceptual gradient effects remain PzHown-owned code and are intentionally separate from the iOS 27 component layer.
