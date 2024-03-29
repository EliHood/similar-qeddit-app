# Shared config

This package is used to store write and read shared configuration.

It stores the config in the global variable and it's used by other packages to read the config.

## Change config schema

To change the config schema, you need to edit `config` const in the `./src/config.ts` file.

We use [zod](https://zod.dev/?id=primitives) to make the config type-safe and to validate in runtime.

## Change global variable name where config is stored

Unlikely you'll need it, but you can do it by changing the value of `globalVarName` const in the `./src/index.ts` file.

## Using config in other packages

### Install

Just add the `config` package as a dependency to your package.

`repo_root/packages/my-package/package.json`:

```json
{
  ...
  "dependencies": {
    "config": "0.0.0"
  }
  ...
}
```

Then run `npx lerna build` or `yarn run build` in the repo root.

### Setting config

This function should be called once in the frontend app that uses other packages.

```ts
import { setConfig } from 'config';

setConfig({
  // your config values
});
```

### Reading config

```ts
import { readConfig } from 'config';

const config = readConfig();
```
