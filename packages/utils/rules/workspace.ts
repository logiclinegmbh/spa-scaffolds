import { Rule, Tree } from '@angular-devkit/schematics';
import { readJson, writeJson } from '../file';
import { PackageJson } from '../model';
import { packageJsonPath } from '../paths';

export const addDependencies = (
  { dependencies = {}, devDependencies = {} } = {
    dependencies: {},
    devDependencies: {}
  }
): Rule => (tree: Tree): void => {
  const packageJson = readJson<PackageJson>(packageJsonPath, tree);
  writeJson(
    packageJsonPath,
    {
      ...packageJson,
      dependencies: { ...packageJson.dependencies, ...dependencies },
      devDependencies: { ...packageJson.devDependencies, ...devDependencies }
    },
    tree
  );
};
