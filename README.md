# sc-common

sc-common contains common helpers, middlewares and utils

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

### Middlewares
#### Database

```js
import mongoose from 'mongoose';
import { middlewares } from 'sc-common';

await middlewares.database.configureDatabase(
    mongoose, 
    {
        url: 'mongodb://localhost:27017', 
        options: {
            dbName: 'minigame',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        }
    });
```

## License