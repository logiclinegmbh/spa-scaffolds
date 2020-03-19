import { Tree } from '@angular-devkit/schematics/src/tree/interface';

export const readString = (path: string, tree: Tree): string => {
  const fileBuffer = tree.read(path);
  if (!fileBuffer) {
    throw new Error('File not found');
  }

  return fileBuffer.toString('utf-8');
};

export const readJson = <File>(path: string, tree: Tree): File => {
  if (!tree.exists(path)) {
    throw new Error('File not found');
  }

  try {
    return JSON.parse(readString(path, tree));
  } catch (e) {
    throw new Error('File could not be parsed');
  }
};

export const writeString = (path: string, content: string, tree: Tree): void => {
  tree.overwrite(path, content);
};

export const writeJson = <File>(path: string, content: File, tree: Tree): void =>
  writeString(path, JSON.stringify(content, null, 2), tree);

export const removeFile = (path: string, tree: Tree): void => {
  if (tree.exists(path)) {
    tree.delete(path);
  }
};

export const removeDir = (path: string, tree: Tree): void => {
  try {
    tree.getDir(path).visit(file => removeFile(file, tree));
  } catch (e) {
    console.log(e);
  }
};

export const withTmpl = <Options>(options: Options): Options & { tmpl: '' } => ({
  ...options,
  tmpl: ''
});
