# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WebdriverIO-based test automation framework for testing the Syncfusion Appointment Planner application. The project uses the Page Object Model (POM) pattern with a component-based architecture.

## Commands

### Running Tests
```bash
npm test                    # Run all tests using WebdriverIO
wdio run ./wdio.conf.cjs    # Run tests directly with wdio
````

### Linting

```bash
npm run lint               # Run ESLint with auto-fix on all files
npx eslint ./ --fix       # Direct ESLint command
```

### Reporting

```bash
npm run report            # Generate consolidated HTML report from test results
```

### Installation

```bash
npm install               # Install dependencies (also triggers husky install via prepare script)
```

### CI/CD

* Jenkins pipeline executes: `npm install` → `npm run test` → `npm run report`
* Test results archived as XML and HTML reports

## Architecture

### Page Object Model Structure

The framework implements a three-tier POM architecture:

**Base Classes:**

* `src/po/pages/base.page.js` - Base class for all page objects, includes common elements (HeaderSection, SideMenu) and `open()` method
* `src/po/components/common/base.component.js` - Base class for all components with `rootSelector` and `rootEl` getter

**Pages Layer** (`src/po/pages/`):

* Extend `BasePage` and represent full application pages
* Define page-specific URL in constructor
* Compose page-specific components
* Access via factory function: `pages('dashboard')` or `pages('doctors')`

**Components Layer** (`src/po/components/`):

* Extend `BaseComponent` and represent reusable UI elements
* Organized into domain-specific folders (common, doctors)
* Components can be shared across pages or specific to a page

**Tests Layer** (`src/tests/`):

* Mocha specs following BDD style (`describe`, `it`, `beforeEach`)
* Import pages via: `const { pages } = require('../po/index')`
* Use factory pattern: `await pages('doctors').doctorListHeader.addDoctorBtn.click()`

### Key Patterns

**Factory Function:**

```javascript
// src/po/pages/index.js exports pages() function
await pages('dashboard').open();
await pages('doctors').sideMenu.item('doctors').click();
```

**Dynamic Components:**

```javascript
// Components can accept parameters for dynamic elements
specialistCard(id) {
    return new SpecialistCard(id);
}
// Usage: pages('doctors').specialistCard(8).name
```

## Configuration

### WebdriverIO (`wdio.conf.cjs`)

* **Base URL:** `https://ej2.syncfusion.com`
* **Framework:** Mocha with 60s timeout
* **Browser:** Chrome with `acceptInsecureCerts: true`
* **Specs:** `./src/tests/*.spec.js`
* **Reporters:** spec, junit (results-.xml), html-nice-reporter (reports/html-reports/)
* **Max Instances:** 10 parallel, 5 per capability

### ESLint (`.eslintrc.json`)

* Rules have `no-undef`, `no-unused-vars`, and `no-useless-escape` disabled
* Extends `eslint:recommended`
* Targets ES2021 with Node environment

### Git Hooks (Husky + lint-staged)

* Pre-commit hook runs `npx lint-staged`
* lint-staged config in package.json runs ESLint on `**/*.+(js|feature)` files
* Prevents commits with linting errors

## Test Development

### Adding a New Page Object

1. Create page class in `src/po/pages/` extending `BasePage`
2. Pass URL to `super()` constructor
3. Instantiate page-specific components in constructor
4. Export from `src/po/pages/index.js`
5. Add to factory function items object

### Adding a New Component

1. Create component in `src/po/components/` extending `BaseComponent`
2. Pass root selector to `super()` constructor
3. Define getters for child elements
4. Export from `src/po/components/index.js`

### Writing Tests

* Place specs in `src/tests/` with `.spec.js` suffix
* Use `beforeEach` for navigation/setup
* Access pages via `pages()` factory function
* Use WebdriverIO's built-in expect/assertions
* Tests run automatically via `npm test`

## Naming Conventions

* **Page classes:** `PascalCasePage`
* **Components:** `PascalCaseComponent`
* **Locators/selectors:** `camelCase`
* **Test files (.spec.js):** `should_<action>_<result>.spec.js`
* **Functions inside page objects:** verbs, e.g., `clickAddDoctorBtn()`, `getDoctorName()`

## Test Writing Rules

* Each test must be **independent and repeatable**
* Use **only the factory function `pages()`** to access pages
* Do **not use selectors directly in tests** — only via components
* Limit to **15 steps per `it` block** for readability
* Always use **async/await**, avoid `.then()`

## File & Folder Organization

* **Pages:** `src/po/pages/<module>/`
* **Components:** `src/po/components/<module>/`
* **Tests:** `src/tests/<module>/`
* **Local components** (for a single page) go inside the page folder

## Documentation / Comments

* Each new component/page must have **jsdoc** with description:

```javascript
/**
 * Doctor page class
 * Methods:
 * - open(): opens the page
 * - addDoctor(): adds a new doctor
 */
```

* For tests, provide a brief description of what is tested and why

## Output

* **Test Results:** `results-.xml` (JUnit format)
* **HTML Reports:** `reports/html-reports/` (includes master-report.html and individual test reports)
* **Logs:** Generated in `logs/` directory

---

## Security & Compliance (EPAM Requirements)

### Blocked Commands

The following commands are explicitly **DENIED** by security policy and will not execute:

* `rm -rf` - Recursive force deletion
* `git push --force` / `git push -f` - Force push operations
* `kubectl delete` - Kubernetes resource deletion
* `terraform destroy` - Infrastructure destruction
* `npm publish` - Package publishing
* `docker system prune` - Docker cleanup operations
* `docker rmi` - Docker image removal

### Sensitive Data Handling

**NEVER share these with Claude Code:**
- API keys, tokens, or credentials
- Passwords or private keys
- PII (Personally Identifiable Information)
- EPAM proprietary or client confidential data
- Production database connection strings

**Safe Practices:**
- Use environment variable references (`${VARIABLE_NAME}`)
- Keep credentials in `.env` (already in `.gitignore` and `.claudeignore`)
- Review all generated code before committing
- All AI-generated code must pass standard code review

### Permission Policy

- **Default Mode**: Human approval required for write operations
- **Auto-Approved**: Read-only operations (git status, npm test, linting)
- **Require Approval**: All write operations (commits, pushes, deployments)
- **Blocked**: Destructive operations (see Blocked Commands above)

### Files Excluded from Claude Context

The `.claudeignore` file prevents Claude Code from accessing:
- `.env` and `.env.*` - Environment variables with secrets
- `*.pem`, `*.key` - Private keys and certificates
- `secrets/`, `credentials/` - Credential directories
- `node_modules/`, `.git/` - Large directories
- `dist/`, `build/` - Build artifacts

### Security Checklist

Before using Claude Code in this repository:
- ✅ `.claudeignore` exists and excludes sensitive paths
- ✅ `settings.local.json` has blocked commands configured
- ✅ No API keys or credentials in CLAUDE.md or settings files
- ✅ All secrets stored in `.env` (which is gitignored)
- ✅ Permission mode set to require approval for write operations
- ⚠️ All AI-generated code reviewed before merge

### Audit & Compliance

- All Claude Code sessions should be reviewed for security compliance
- Generated code must pass standard EPAM code review process
- Report any security concerns to your team lead immediately
- Follow EPAM's AI usage guidelines and policies
