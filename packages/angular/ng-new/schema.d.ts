/**
 * Angular Ng New Options Schema
 */
declare interface NgNewSchema {
  /**
   * The directory name to create the workspace in.
   */
  directory?: string;
  /**
   * The name of the new workspace and initial project.
   */
  name: string; // html-selector
  /**
   * When true, does not install dependency packages.
   */
  skipInstall?: boolean;
  /**
   * When true, links the CLI to the global version (internal development only).
   */
  linkCli?: boolean;
  /**
   * When true, does not initialize a git repository.
   */
  skipGit?: boolean;
  /**
   * Initial git repository commit information.
   */
  commit?:
    | boolean
    | {
        name: string;
        email: string; // email
        message?: string;
      };
  /**
   * The path where new projects will be created, relative to the new workspace root.
   */
  newProjectRoot?: string;
  /**
   * The package manager used to install dependencies.
   */
  packageManager?: 'npm' | 'yarn' | 'pnpm' | 'cnpm';
}
