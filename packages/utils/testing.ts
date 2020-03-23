import { Rule, Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createPackageJson } from './fixture';
import { UnitTestTree } from '@angular-devkit/schematics/testing/schematic-test-runner';
import * as path from 'path';

export const addPackageJson = (
  tree: Tree,
  { packageJson = createPackageJson() } = { packageJson: createPackageJson() }
): void => {
  tree.create('package.json', JSON.stringify(packageJson));
};

export const runSchematicAsync = <Options>(
  testRunner: SchematicTestRunner,
  schematicName: string,
  options?: Options
): Promise<UnitTestTree> => testRunner.runSchematicAsync(schematicName, options).toPromise();

export const callRule = (testRunner: SchematicTestRunner, rule: Rule, tree: Tree): Promise<Tree> =>
  testRunner.callRule(rule, tree).toPromise();

export const createSchematicTestHelpers = (
  { collectionName = 'schematics', collectionPath = path.join(__dirname, './testing-collection.json') } = {
    collectionName: 'schematics',
    collectionPath: path.join(__dirname, './testing-collection.json')
  }
) => {
  const testRunner = new SchematicTestRunner(collectionName, collectionPath);
  return {
    runSchematicAsync: <Options>(schematicName: string, options?: Options): Promise<UnitTestTree> =>
      runSchematicAsync(testRunner, schematicName, options),
    callRule: (rule: Rule, tree: Tree): Promise<Tree> => callRule(testRunner, rule, tree)
  };
};
