import { Tree } from '@angular-devkit/schematics';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { readJson } from '../file';
import { PackageJson, PackageJsonDependencies } from '../model';
import { appTemplatePath, packageJsonPath } from '../paths';
import { addPackageJson, callRule } from '../testing';
import { addDependencies, removeAppTemplates } from './workspace';

describe('Workspace', () => {
  let tree: UnitTestTree;
  const dependencies: PackageJsonDependencies = {
    dep1: 'version',
    dep2: 'version'
  };

  beforeEach(() => {
    tree = new UnitTestTree(Tree.empty());
    addPackageJson(tree);
  });
  describe('addDependencies', () => {
    it('should add dependencies', async () => {
      tree = new UnitTestTree(
        await callRule(
          addDependencies({
            dependencies
          }),
          tree
        )
      );
      const packageJson = readJson<PackageJson>(packageJsonPath, tree);

      expect(packageJson.dependencies).toEqual(dependencies);
      expect(packageJson.devDependencies).toEqual({});
    });
    it('should add dev dependencies', async () => {
      tree = new UnitTestTree(
        await callRule(
          addDependencies({
            devDependencies: dependencies
          }),
          tree
        )
      );
      const packageJson = readJson<PackageJson>(packageJsonPath, tree);

      expect(packageJson.devDependencies).toEqual(dependencies);
      expect(packageJson.dependencies).toEqual({});
    });
    it('should add both dependencies', async () => {
      tree = new UnitTestTree(
        await callRule(
          addDependencies({
            dependencies,
            devDependencies: dependencies
          }),
          tree
        )
      );
      const packageJson = readJson<PackageJson>(packageJsonPath, tree);

      expect(packageJson.dependencies).toEqual(dependencies);
      expect(packageJson.devDependencies).toEqual(dependencies);
    });
    it('should be idempotent', async () => {
      new UnitTestTree(
        await callRule(
          addDependencies({
            dependencies
          }),
          tree
        )
      );
      tree = new UnitTestTree(
        await callRule(
          addDependencies({
            dependencies
          }),
          tree
        )
      );
      const packageJson = readJson<PackageJson>(packageJsonPath, tree);

      expect(packageJson.dependencies).toEqual(dependencies);
      expect(packageJson.devDependencies).toEqual({});
    });
  });

  describe('removeAppTemplates', () => {
    const textFile = 'Testproject';
    const appTemplateFilePath = `${appTemplatePath}/file.txt`;
    beforeEach(() => {
      tree.create(appTemplateFilePath, textFile);
    });
    it('should remove app templates in case exist', async () => {
      expect(tree.exists(appTemplateFilePath)).toEqual(true);
      tree = new UnitTestTree(await callRule(removeAppTemplates(), tree));

      expect(tree.exists(appTemplateFilePath)).toEqual(false);
    });
  });
});
