import {ProcessUtils} from './fi/cs/core/ProcessUtils';

ProcessUtils.initEnvFromDefaultFiles();

import {main} from './main';

main(process.argv)
  .then((status: number) => {
    process.exit(status);
  })
  .catch((err: unknown) => {
    console.error('Error: ', err);
    process.exit(1);
  });
