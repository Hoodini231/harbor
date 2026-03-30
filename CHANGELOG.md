# Changelog

All notable changes to Harbour will be documented in this file.

---

## [Unreleased]

### Added
- Complete home page mock-up with placeholder widgets
- Bottom navigation bar with 5 tabs (HOME, PORTFOLIO, NEWS, WATCHLIST, MARKETS)
- Search bar component with trending tags
- Login page with email/password and OAuth (stubbed)
- Authentication API stubs
- Comprehensive documentation suite
  - CONTRIBUTING.md - FSD architecture & styling guide
  - CLAUDE.md - AI assistant system prompt
  - QUICKREF.md - One-page cheat sheet
  - DEVELOPMENT.md - Developer quick reference
  - DOCS_INDEX.md - Documentation hub
- Enhanced preflight script with deep clean (like `flutter clean`)
- Pull request template
- Feature-Sliced Design (FSD) architecture implementation

### Changed
- Renamed `src/app/` to `src/application/` to avoid Expo Router conflict
- Downgraded from Expo 54 to Expo 53 for React 18 compatibility
- Updated README with complete documentation structure

### Fixed
- React 19 `use()` hook error by downgrading to React 18
- Expo Router "unmatched route" issue
- iOS Simulator boot issues (troubleshooting guide)
- Metro bundler cache issues

---

## [0.1.0] - 2026-03-29

### Initial Release

- Project initialized with Expo SDK 53
- Feature-Sliced Design architecture
- Harbour Midnight design system
- Splash screen with auto-navigation
- Login page layout
- Tab-based navigation structure
- Development tooling setup

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backwards compatible manner
- **PATCH** version for backwards compatible bug fixes

---

**Format**: Based on [Keep a Changelog](https://keepachangelog.com/)
**Categories**: Added, Changed, Deprecated, Removed, Fixed, Security
