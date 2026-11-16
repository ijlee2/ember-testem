import type { Options } from '../../types/index.js';

export function getQueryParams(options: Pick<Options, 'qunit'>): string {
  const { qunit } = options;
  const params: string[] = [];

  if (qunit.filter) {
    params.push(`filter=${qunit.filter}`);
  }

  if (qunit.module) {
    params.push(`module=${qunit.module}`);
  }

  if (qunit.seed) {
    params.push(`seed=${qunit.seed}`);
  }

  return params.sort().join('&');
}
