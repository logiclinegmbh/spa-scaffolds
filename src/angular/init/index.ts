import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

export const init = (_options: any): Rule => {
  return (tree: Tree, _context: SchematicContext) => {
    console.log("running schematics");
    return tree;
  };
};
