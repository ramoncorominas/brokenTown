# GitHub Copilot Instructions

## Project Overview
This is a workshop repository for learning automated accessibility testing with **@axe-core/cli** (the free, open-source command-line tool). The goal is to create educational materials demonstrating how to find and fix accessibility violations.

## Key Architecture Decisions

### Two Distinct Axe Products
- **@axe-core/cli**: Free/open-source tool we use - accepts URLs directly via command line
- **Axe DevTools CLI**: Commercial product - uses JSON script files (in `sample-scripts/`)
- The JSON scripts are for **reference only** - they don't work with @axe-core/cli

### Repository Structure
- `test-pages/`: HTML files with intentional accessibility issues for testing
- `sample-scripts/`: JSON examples from Deque docs (for commercial product reference)
- `results.json`: Output from axe CLI scans
- `links.md`: Resource links categorized by free vs commercial tools
- `.github/workflows/copilot-setup-steps.yml`: Pre-configures environment for GitHub Copilot coding agent
- `.github/workflows/accessibility-testing.yml`: Automated testing on push/PR

### Development Environment
- **GitHub Copilot Coding Agent**: When working via GitHub's coding agent, @axe-core/cli is pre-installed in the environment
- **Local Development**: Requires manual installation of @axe-core/cli (`npm install -g @axe-core/cli`)
- **Branch Protection**: Direct commits to `main` are blocked - all changes must go through PRs

## Critical Workflows

### Testing Accessibility
```bash
# Test local HTML file
axe file:///$(pwd)/test-pages/contact-form.html

# Save results to JSON
axe file:///$(pwd)/test-pages/contact-form.html --save results.json
```

### Understanding Test Results
Results are categorized into:
- **violations**: WCAG issues that must be fixed
- **passes**: Rules that passed
- **inapplicable**: Rules that don't apply to the page
- **incomplete**: Needs manual review

Each violation includes `impact` level (critical, serious, moderate, minor) and `tags` (wcag2a, wcag412, best-practice, etc.)

## Project Conventions

### Issue Handling Rule
- **Violations** (WCAG requirements): Ask whether to fix them
- **Best practices** (recommendations): Mention them and suggest review
- Always check issue `tags` to determine if it's a WCAG requirement vs best practice

### HTML Test Pages
- CSS should be in separate files (see `test-pages/styles.css`)
- Include intentional accessibility violations for workshop demonstrations
- Example: `contact-form.html` originally had unlabeled phone field (now fixed)

### File Paths
- Always use absolute paths with `file:///$(pwd)/` when testing local files
- Relative paths don't work reliably with axe CLI

### GitHub Actions Integration
- Automated testing runs on every push and PR to `main`
- Tests all HTML files in `test-pages/` directory
- Build **fails only on WCAG violations** (not best-practice issues)
- PR checks must pass before merging (branch protection enabled)
- Test results available as downloadable artifacts

## Workshop Context
This material is being developed for an accessibility conference workshop. Keep examples simple, educational, and focused on demonstrating automated testing capabilities and limitations.
