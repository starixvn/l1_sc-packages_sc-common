# sc-common

sc-common contains common helpers, middlewares and utils

## Installation

```sh
$ npm install sc-common
```

## How to use

### Logger

```js
import { logger } from "sc-common";

logger.start({ sentryUrl: "https://examplePublicKey@o0.ingest.sentry.io/0", env: "Local", sentryRelease: "", logIdentifier: "" });
```

### Middlewares

#### Database

```js
import mongoose from "mongoose";
import { middlewares } from "sc-common";

await middlewares.database.configureDatabase(mongoose, {
    url: "mongodb://localhost:27017",
    options: {
        dbName: "minigame",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auto_reconnect: true,
    },
});
```

## Development

### Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) v9.1.7 to manage Git hooks and [commitlint](https://commitlint.js.org/) to enforce conventional commit messages.

#### Setup

The Git hooks are automatically set up when you install dependencies:

```sh
npm install
```

#### Commit Message Format

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Examples:

-   `feat: add new authentication middleware`
-   `fix(auth): resolve JWT token validation issue`
-   `docs: update README with installation instructions`
-   `chore: update dependencies`

#### Available Hooks

-   **pre-commit**: Runs before each commit (currently empty, can be extended with linting, testing, etc.)
-   **commit-msg**: Validates commit message format using commitlint
-   **prepare-commit-msg**: Provides commit message template (optional)

#### Adding Custom Hooks

To add custom pre-commit checks (like linting or testing), edit `.husky/pre-commit`:

```sh
# Add any pre-commit checks here
npm run lint
npm run test
```

## License
