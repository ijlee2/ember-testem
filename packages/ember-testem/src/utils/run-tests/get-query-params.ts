import type { Options } from '../../types/index.js';

export function getQueryParams(
  options: Pick<Options, 'parallelization' | 'qunit'>,
): string {
  const { parallelization, qunit } = options;
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

  if (parallelization.split && parallelization.split > 1) {
    params.push(`split=${parallelization.split}`);

    if (parallelization.partition) {
      params.push(`partition=${parallelization.partition}`);
    }
  }

  return params.sort().join('&');
}
