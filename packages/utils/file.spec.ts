import { Tree } from '@angular-devkit/schematics';
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { readJson, readString, removeDir, removeFile, withTmpl, writeJson, writeString } from './file';

describe('File', () => {
  let tree: Tree;
  const textFile = 'Testproject';
  const textFilePath = './file.txt';
  const jsonFile = {
    prop1: 'prop1'
  };
  const jsonFilePath = './test.json';
  const invalidJson = '{Ä';

  beforeEach(() => {
    tree = new UnitTestTree(Tree.empty());
  });

  describe('readString', () => {
    it('should read file', () => {
      tree.create(textFilePath, textFile);

      const readTextFileReturned = readString(textFilePath, tree);

      expect(readTextFileReturned).not.toBeUndefined();
      expect(readTextFileReturned).toEqual(textFile);
    });

    it('should throw error if file does no exist', () => {
      try {
        readString(textFilePath, tree);
      } catch (e) {
        expect(e).not.toBeUndefined();
      }
    });
  });

  describe('readJson', () => {
    it('should read json file', () => {
      tree.create(jsonFilePath, JSON.stringify(jsonFile));

      const jsonFileReturned = readJson(jsonFilePath, tree);

      expect(jsonFileReturned).not.toBeUndefined();
      expect(jsonFileReturned).toEqual(jsonFile);
    });

    it('should throw error in case file cannot be found', () => {
      try {
        readJson(jsonFilePath, tree);
        fail('should throw');
      } catch (e) {
        expect(e).not.toBeUndefined();
      }
    });

    it('should throw when it is an invalid json file', () => {
      tree.create(jsonFilePath, invalidJson);

      try {
        readJson(jsonFilePath, tree);
        fail('should throw');
      } catch (e) {
        expect(e).not.toBeUndefined();
      }
    });
  });

  describe('writeString', () => {
    const updatedTextFile = 'newContent';

    beforeEach(() => {
      tree.create(textFilePath, textFile);
    });
    it('should write/update string to path', () => {
      writeString(textFilePath, updatedTextFile, tree);

      expect(readString(textFilePath, tree)).toEqual(updatedTextFile);
    });
    it('should throw in case file does not exists', () => {
      const emptyTree = new UnitTestTree(Tree.empty());

      try {
        writeString(textFilePath, updatedTextFile, emptyTree);
        fail('Should throw');
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });

  describe('writeJson', () => {
    beforeEach(() => {
      tree.create(jsonFilePath, JSON.stringify(jsonFile));
    });
    it('should write json file', () => {
      const updatedJson = {
        ...jsonFile,
        newProp: 'newProp'
      };

      writeJson(jsonFilePath, updatedJson, tree);

      expect(readJson(jsonFilePath, tree)).toEqual(updatedJson);
    });
  });

  describe('removeFile', () => {
    beforeEach(() => {
      tree.create(textFilePath, textFile);
    });

    it('should remove in case existing', () => {
      expect(tree.exists(textFilePath)).toEqual(true);
      removeFile(textFilePath, tree);

      expect(tree.exists(textFilePath)).toEqual(false);
    });
    it('should do nothing in case not existing', () => {
      tree = new UnitTestTree(Tree.empty());
      removeFile(textFilePath, tree);

      expect(tree.exists(textFilePath)).toEqual(false);
    });
  });

  describe('removeDirectory', () => {
    const directoryPath = './src/';
    const fileInDirectoryPath = `${directoryPath}test.txt`;
    beforeEach(() => {
      tree.create(fileInDirectoryPath, textFile);
    });
    it('should remove directory', () => {
      expect(tree.exists(fileInDirectoryPath)).toEqual(true);
      removeDir(directoryPath, tree);

      expect(tree.exists(fileInDirectoryPath)).toEqual(false);
    });
    it('should do nothing in case directory does not exist', () => {
      removeDir(directoryPath, tree);

      expect(tree.exists(directoryPath)).toEqual(false);
    });
  });

  describe('withTmpl', () => {
    const options = {
      prop1: 'test'
    };
    it('should add empty string for tmpl option', () => {
      const optionsExpected = {
        ...options,
        tmpl: ''
      };

      expect(withTmpl(options)).toEqual(optionsExpected);
    });
  });
});
