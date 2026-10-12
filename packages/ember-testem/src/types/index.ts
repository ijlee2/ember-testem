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
    testModule: string | undefined;
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
    testModule: string | undefined;
  };
};

export type { CodemodOptions, Options };
