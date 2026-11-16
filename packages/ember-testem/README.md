# ember-testem

_Backward- and forward-compatible testing for Ember projects_


## Why?

Until now, testing Ember apps and addons required `ember-cli`, a monolith package that is written in JavaScript and has less relevance in v2 apps and v2 addons. Production projects may be at risk because tools like `ember-exam` and `@percy/ember` are built on `ember-cli`.

`ember-testem` is a CLI that allows you to keep running tests with `qunit` and `testem`.


## Quickstart

> [!TIP]
>
> From the root of your Ember app or addon, run `install-ember-testem` to set up `ember-testem`.
>
> ```sh
> pnpx install-ember-testem
> ```

1\. Install `ember-testem` as a development dependency. The package provides an executable named `ember-test`.

```sh
pnpm add -D ember-testem
```

You can uninstall `testem` if it is listed in `package.json`.

2\. Configure `testem` in `testem.{mjs,mts}`.

<details>

<summary>Starter code</summary>

```ts
export default {
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env['CI'] ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900',
      ].filter(Boolean),
    },
  },
  browser_start_timeout: 120,
  disable_watching: true,
  launch_in_ci: ['Chrome'],
  launch_in_dev: ['Chrome'],
  test_page: 'tests/index.html?hidepassed&nolint',
};
```

</details>

3\. Update the `test` script in `package.json` so that it builds the test app, then runs the app (the tests).

```diff
{
  "scripts": {
    "build": "..."
+     "build:test": "...",
-     "test": "ember test"
+     "test": "pnpm build:test && ember-test"
+     "test:watch": "concurrently \"pnpm build:test --watch\" && \"pnpm ember-test --server\" --names build,test"
  },
  "devDependencies": {
    "concurrently": "...",
+     "ember-testem": "..."
  }
}
```

Note, `test:watch` may encounter race conditions. Once the build is complete, refresh the test browser to see the latest results.

<details>

<summary>V1 addons</summary>

See [my-v1-addon](../../tests/my-v1-addon) for an example.

```json
{
  "scripts": {
    "build": "ember build --environment production",
    "build:test": "ember build --environment test"
  }
}
```

</details>

<details>

<summary>V1 apps</summary>

See [my-v1-app](../../tests/my-v1-app) for an example.

```json
{
  "scripts": {
    "build": "ember build --environment production",
    "build:test": "ember build --environment test"
  }
}
```

</details>

<details>

<summary>V2 addons</summary>

See [my-v2-addon](../../tests/my-v2-addon) for an example.

In general, I recommend creating a test app as a separate package (using workspaces). This way, you can separate dependencies for source code and testing (avoid past issues with v1 addons). You would set up `ember-testem` by following the steps for v2 apps.

If you still want to create the test app in the same package, you will need to install and configure additional dependencies. You can use `install-ember-testem` to get started.

```json
{
  "scripts": {
    "build": "rollup --config",
    "build:test": "NODE_ENV=development vite build --config vite.test.config.mts --mode development"
  }
}
```

</details>

<details>

<summary>V2 apps</summary>

See [my-v2-app](../../tests/my-v2-app) for an example.

```json
{
  "scripts": {
    "build": "vite build",
    "build:test": "NODE_ENV=development vite build --config vite.test.config.mts --mode development"
  }
}
```

```ts
/* vite.test.config.mts */
import { defineConfig } from 'vite';

import baseConfiguration from './vite.config.mts';

export default defineConfig({
  ...baseConfiguration,
  build: {
    minify: false,
    sourcemap: true,
  },
});
```

</details>


### Arguments

<details>

<summary>Optional: Launch test browser</summary>

Pass `--server` (`-s`) to launch a browser. This may be useful for debugging (e.g. with `debugger` or `await this.pauseTest()`) and re-running the tests after a code change (don't forget to pass `--watch` to `build:test`).

```sh
ember-test --server
```

</details>

<details>

<summary>Optional: Specify filters for QUnit</summary>

The `--module` (`-m`) option allows you to select a module—a group of tests inside a `module()`.

```sh
ember-test --module "Integration | Component | ui/form/input"
```

The `--filter` (`-f`) is more versatile. You can provide a keyword to match against the modules and test descriptions. A test description is what appears in `test()`.

```sh
ember-test --filter integration
ember-test --filter ui/form
# Exclude acceptance tests
ember-test --filter \!acceptance
```

</details>

<details>

<summary>Optional: Specify path to test build</summary>

By default, `ember-testem` assumes `dist` to be the path to the test build.

Pass `--path` to indicate otherwise. This may be useful if you want to create the production and test builds in different locations.

```sh
ember-test --path dist-for-testing
```

</details>

<details>

<summary>Optional: Specify test port</summary>

By default, `ember-testem` runs tests on port `7357`.

Pass `--port` to pick a different port. You can pass `0` to pick any available port (useful for testing multiple projects in parallel).

```sh
ember-test --port 0
```

</details>

<details>

<summary>Optional: Randomize tests</summary>

Pass `--random` to randomize the order of tests. This helps you guarantee that your tests are independent of one another.

```sh
ember-test --random
```

You can also pass a seed to run tests in a particular random order.

```sh
ember-test --random gflqlwrm59j
```

</details>

> [!NOTE]
>
> `ember-testem` provides a limited API on purpose.
>
> For `ember-cli` options like `--host`, `--launch`, `--query`, `--reporter`, `--ssl`, `--ssl-cert`, `--ssl-key`, `--test-page`, `--testem-debug`), [configure `testem` in `testem.{mjs,mts}` instead](https://github.com/ember-cli/ember-cli/blob/v7.3.0-ember-cli/lib/tasks/test.js#L54-L71).


## Compatibility

- Node.js v22 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](./LICENSE.md).
