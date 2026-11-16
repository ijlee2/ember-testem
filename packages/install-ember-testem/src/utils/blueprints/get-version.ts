const latestVersions = new Map([
  ['@ember/test-helpers', '5.8.0'],
  ['@embroider/macros', '1.21.4'],
  ['@embroider/vite', '1.8.0'],
  ['@types/qunit', '2.19.14'],
  ['ember-qunit', '9.2.0'],
  ['ember-strict-application-resolver', '0.1.1'],
  ['ember-testem', '1.0.0'],
  ['qunit', '3.0.0'],
  ['qunit-dom', '3.6.0'],
  ['vite', '8.3.8'],
]);

export function getLatestVersion(packageName: string): string {
  if (!latestVersions.has(packageName)) {
    throw new RangeError(
      `ERROR: The latest version of \`${packageName}\` is unknown.\n`,
    );
  }

  return `^${latestVersions.get(packageName)}`;
}
