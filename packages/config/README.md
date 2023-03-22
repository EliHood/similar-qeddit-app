# Shared config

This package is used to store write and read shared configuration.

It stores the config in the global variable and it's used by other packages to read the config.

## Change config schema

To change the config schema, you need to edit `config` const in the `./src/config.ts` file.

We use [zod](https://zod.dev/?id=primitives) to make the config type-safe and to validate in runtime.

## Change global variable name where config is stored

Unlikely you'll need it, but you can do it by changing the value of `globalVarName` const in the `./src/index.ts` file.

## Writing config

This function should be called once in the frontend app that uses other packages.

```ts
import { writeConfig } from 'config';

writeConfig({
  // your config values
});
```

## Reading config

```ts
import { readConfig } from 'config';

const config = readConfig();
```
