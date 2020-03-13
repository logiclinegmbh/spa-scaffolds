import { externalSchematic, Rule } from '@angular-devkit/schematics';

export const init = (options: NgNewSchema): Rule => externalSchematic('@schematics/angular', 'ng-new', options);
