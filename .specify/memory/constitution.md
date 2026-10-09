<!--
Sync Impact Report
- Version change: seed -> 1.0.0
- Modified principles: new constitution baseline
- Added sections: Core Principles, Engineering Standards, Delivery Workflow
- Removed sections: none
- Deferred items:
  - TODO(RATIFICATION_DATE): original adoption date is not recorded; set once governance approval is confirmed.
  - Review note: no project-wide test framework is currently declared in package.json; the constitution requires evidence-driven validation without prescribing a test technology here.
-->

# IWasHere Constitution

## Core Principles

### I. Requirements Before Implementation
All work must begin from clear, traceable requirements, user needs, or accepted design decisions. If requirements are missing, ambiguous, or conflicting, the team must clarify them before implementation proceeds.

This principle keeps the project aligned with the SDLC and prevents speculative work. It also supports traceability from product intent to implementation and verification.

### II. Simplicity, Clarity, and Maintainability
The project must favor simple, readable, and maintainable solutions over cleverness or unnecessary abstraction. Reuse existing patterns and components when they fit the requirement; do not add structural complexity without a clear reason.

This is especially important in a React + TypeScript + Vite codebase, where maintainability depends on clear component boundaries, understandable state flow, and minimal indirection.

### III. Quality Through Verification
Every change must be validated with the appropriate evidence before it is considered ready. For this project, that means TypeScript compilation, ESLint validation, and any project-specific UI or behavior checks that apply to the changed area.

We do not treat intent as evidence. Build health, lint health, and targeted verification are required to support release readiness.

### IV. Secure by Default
The project must treat user input, external data, and environment configuration as untrusted until validated. Secrets, credentials, and local configuration must not be committed or exposed in application output.

This principle applies to browser-based front-end work as well. For a Leaflet and React application, it means validating map-related inputs, guarding against unsafe assumptions in data rendering, and avoiding the accidental exposure of secrets or environment values in client code.

### V. Accessibility and User-Centered Design
User-facing features must remain accessible, understandable, and operable in real use. Keyboard interaction, visible state, clear labels, sensible error handling, and resilient interface behavior are required for a release-quality UI.

This principle is not a separate compliance checklist; it is part of the required quality bar for the application experience.

### VI. Review and Traceability
Every meaningful change must be reviewable and traceable to a requirement, acceptance criterion, or documented rationale. Unexplained changes, unrelated refactors, and undocumented exceptions are not acceptable.

This constitution sets the minimum project-level standard. Detailed implementation guidance, testing patterns, and security practices remain in the repository's instruction files under .github/instructions and should be followed as the working standard for day-to-day delivery.

## Engineering Standards

The following standards govern all work in this repository unless a justified exception is documented and approved.

- TypeScript code must compile cleanly in the configured frontend toolchain.
- React components and hooks must preserve predictable behavior, clear state boundaries, and minimal unnecessary re-rendering.
- Leaflet and browser-map integrations must be treated as user-facing features that require correct fallback and error handling.
- UI changes must handle empty states, invalid input, and failure states before release.
- Code changes must remain consistent with the existing project structure and naming conventions.
- Secrets and environment-specific values must stay out of source control.
- Validation and sanitization must be applied to untrusted input before it is rendered, processed, or persisted.
- The project must keep documentation aligned with user-facing behavior and setup requirements when they change.

These rules are intentionally project-level and universal. Detailed rules for implementation patterns, test design, security controls, and review workflow remain in the project instruction files rather than being duplicated here.

## Delivery Workflow

All work must proceed through the following minimum workflow:

1. Confirm the requirement, expected behavior, or user need before implementation.
2. Review the relevant project instructions and existing patterns before making a change.
3. Keep the scope focused and avoid unrelated refactoring in the same change.
4. Implement the smallest correct solution that satisfies the requirement.
5. Validate the change with the relevant checks, including build, lint, and targeted verification when needed.
6. Review the result for correctness, accessibility, security, and compliance with this constitution before merge.

Changes that are not ready to verify are not ready to merge.

## Governance

This constitution defines the non-negotiable operating principles for the project. It is intended to complement the repository's working guidance in .github/instructions rather than replace the detailed stack-specific standards maintained there.

Amendments require a documented rationale, a clear version update, and explicit review by the project owner or designated maintainer before the new terms become effective. A change that affects quality, security, release readiness, or architecture must include the migration or remediation steps needed for ongoing work.

The project maintains the following review expectations:

- Every pull request or change set must be reviewed for compliance with the current constitution.
- Unsupported exceptions or undocumented policy deviations must be disclosed before merge.
- Material changes to behavior, architecture, or delivery workflow require a recorded rationale.
- Documentation and implementation must stay aligned with the current governance baseline.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date is not recorded; confirm the date when governance approval is formalized. | **Last Amended**: 2026-10-09
