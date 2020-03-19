import { PackageJson } from './model';

export const createPackageJson = (
  { dependencies = {}, devDependencies = {} } = {
    dependencies: {},
    devDependencies: {}
  }
): PackageJson => ({
  dependencies,
  devDependencies
});
