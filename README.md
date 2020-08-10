# sc-common

sc-common contains common helpers, middlewware and utils

## Installation

```sh
$ npm install sc-common
```

## How to use
### Logger

```js
import { logger } from 'sc-common';

logger.start({sentryUrl: 'https://examplePublicKey@o0.ingest.sentry.io/0', env: 'Local', sentryRelease: '', logIdentifier:''})
```

## License