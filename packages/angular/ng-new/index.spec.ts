import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('ng-new', () => {
  const options = {
    name: 'testing',
    version: '9.0.6'
  };
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematicAsync('ng-new', options, Tree.empty()).toPromise();

    expect(tree.files).toBeDefined();
  });
});
