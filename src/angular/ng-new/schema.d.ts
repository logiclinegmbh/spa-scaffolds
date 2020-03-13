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
   * When true, includes styles inline in the component TS file. By default, an external styles file is created and referenced in the component TS file.
   */
  inlineStyle?: boolean;
  /**
   * When true, includes template inline in the component TS file. By default, an external template file is created and referenced in the component TS file.
   */
  inlineTemplate?: boolean;
  /**
   * The view encapsulation strategy to use in the initial project.
   */
  viewEncapsulation?: 'Emulated' | 'Native' | 'None' | 'ShadowDom';
  /**
   * The version of the Angular CLI to use.
   */
  version: string;
  /**
   * When true, generates a routing module for the initial project.
   */
  routing?: boolean;
  /**
   * The prefix to apply to generated selectors for the initial project.
   */
  prefix?: string; // html-selector
  /**
   * The file extension or preprocessor to use for style files.
   */
  style?: 'css' | 'scss' | 'sass' | 'less' | 'styl';
  /**
   * When true, does not generate "spec.ts" test files for the new project.
   */
  skipTests?: boolean;
  /**
   * When true (the default), creates a new initial app project in the src folder of the new workspace. When false, creates an empty workspace with no initial app. You can then use the generate application command so that all apps are created in the projects folder.
   */
  createApplication?: boolean;
  /**
   * When true, creates a project without any testing frameworks. (Use for learning purposes only.)
   */
  minimal?: boolean;
  /**
   * Creates a workspace with stricter TypeScript compiler options.
   */
  strict?: boolean;
  /**
   * The package manager used to install dependencies.
   */
  packageManager?: 'npm' | 'yarn' | 'pnpm' | 'cnpm';
}
