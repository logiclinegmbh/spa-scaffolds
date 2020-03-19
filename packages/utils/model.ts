export type PackageJsonDependencies = { [key: string]: string };
export type PackageJson = {
  dependencies: PackageJsonDependencies;
  devDependencies: PackageJsonDependencies;
};
