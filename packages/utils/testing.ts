import { Rule, Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { createPackageJson } from './fixture';
import { UnitTestTree } from '@angular-devkit/schematics/testing/schematic-test-runner';

const collectionPath = path.join(__dirname, '../collection.json');

export const testRunner = new SchematicTestRunner('schematics', collectionPath);

export const addPackageJson = (
  tree: Tree,
  { packageJson = createPackageJson() } = { packageJson: createPackageJson() }
): void => {
  tree.create('package.json', JSON.stringify(packageJson));
};

export const runSchematicAsync = <Options>(schematicName: string, options?: Options): Promise<UnitTestTree> =>
  testRunner.runSchematicAsync(schematicName, options).toPromise();

export const callRule = (rule: Rule, tree: Tree): Promise<Tree> => testRunner.callRule(rule, tree).toPromise();
