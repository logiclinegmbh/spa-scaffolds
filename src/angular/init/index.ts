import { Rule, Tree } from '@angular-devkit/schematics';

export const init = (): Rule => {
  return (tree: Tree): Tree => {
    console.log('running schematics');
    return tree;
  };
};
