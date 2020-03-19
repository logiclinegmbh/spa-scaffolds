import { strings } from '@angular-devkit/core';
import { apply, mergeWith, Rule, template, Tree, url } from '@angular-devkit/schematics';
import { readJson, removeDir, withTmpl, writeJson } from '../file';
import { PackageJson } from '../model';
import { appTemplatePath, fileFolderPath, packageJsonPath } from '../paths';

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

export const removeAppTemplates = (path: string = appTemplatePath): Rule => (tree: Tree) => removeDir(path, tree);

export const addFiles = <Options>(options: Options, source = url(fileFolderPath)): Rule => {
  const sourceParametrizedTemplates = apply(source, [
    template(
      withTmpl({
        ...options,
        ...strings
      })
    )
  ]);

  return mergeWith(sourceParametrizedTemplates);
};
