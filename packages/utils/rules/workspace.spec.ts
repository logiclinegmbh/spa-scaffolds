import { Tree } from '@angular-devkit/schematics';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { readJson } from '../file';
import { PackageJson, PackageJsonDependencies } from '../model';
import { packageJsonPath } from '../paths';
import { addPackageJson, createSchematicTestHelpers } from '../testing';
import { addDependencies } from './workspace';

describe('Workspace', () => {
  const testHelpers = createSchematicTestHelpers();
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
        await testHelpers.callRule(
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
        await testHelpers.callRule(
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
        await testHelpers.callRule(
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
        await testHelpers.callRule(
          addDependencies({
            dependencies
          }),
          tree
        )
      );
      tree = new UnitTestTree(
        await testHelpers.callRule(
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
});
