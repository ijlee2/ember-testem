[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-testem/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/ember-testem/actions/workflows/ci.yml)

# ember-testem

_Backward- and forward-compatible testing for Ember projects_


## Why?

Until now, testing Ember apps and addons required `ember-cli`, a monolith package that is written in JavaScript and has less relevance in v2 apps and v2 addons. Production projects may be at risk because tools like `ember-exam` and `@percy/ember` are built on `ember-cli`.

`ember-testem` project aims to show that:

- The fix is minimal on the consumer's side. It is backward- and forward-compatible (apps with strict resolver, apps without `ember-cli`).
- We can keep using `qunit` and `testem`, plus all the battle-tested packages like `@percy/ember`, `ember-a11y-testing`, `ember-qunit`, `ember-test-selectors`, `ember-try` (`@embroider/try`), `miragejs`, and `qunit-dom`. No need to switch to another test framework and rewrite tests (possibly under different assumptions about routing and settledness).
- When the project setup is solid, we can develop advanced features more easily: Measuring code coverage accurately, and running tests at random, in parallel, and partially based on code change.


## Quickstart

From the root of your Ember app or addon, run `install-ember-testem` to set up `ember-testem`.

```sh
pnpx install-ember-testem
```


## Package overview

- [ember-testem](./packages/ember-testem/README.md)
- [install-ember-testem](./packages/install-ember-testem/README.md)


## Compatibility

- Node.js v22 or above


## Contributing

See the [Contributing](./CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](./LICENSE.md).
