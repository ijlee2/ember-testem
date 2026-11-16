type CodemodOptions = {
  buildPath: string;
  parallelization: {
    partition: number | undefined;
    split: number | undefined;
  };
  port: number | undefined;
  projectRoot: string;
  qunit: {
    filter: string | undefined;
    module: string | undefined;
    random: string | undefined;
  };
  server: boolean | undefined;
};

type Options = {
  buildPath: string;
  launchBrowser: boolean;
  parallelization: {
    partition: number | undefined;
    split: number | undefined;
  };
  port: number | undefined;
  projectRoot: string;
  qunit: {
    filter: string | undefined;
    module: string | undefined;
    seed: string | undefined;
  };
};

export type { CodemodOptions, Options };
