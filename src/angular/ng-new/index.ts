import { externalSchematic, Rule } from '@angular-devkit/schematics';

export const init = (options: any): Rule => externalSchematic('@schematics/angular', 'ng-new', options);
