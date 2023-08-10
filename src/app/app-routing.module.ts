import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule, inject } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { environment } from 'src/environments/environment';
import { TranslationUpdaterService } from './core/services/custom-translate-loader/translate-updater.service';
import { AuthGuard } from './core/authentication/services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: `${environment.remotes.mfe1.name}`,
        outlet: 'mfe1',
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: `${environment.remotes.mfe1.frontUrl}/remoteEntry.js`,
            exposedModule: './Module',
          }).then((m) => m.RemoteEntryModule),
        canMatch: [
          () => {
            inject(TranslationUpdaterService).mergeTranslations(
              `${environment.remotes.mfe1.name}`
            );
          },
        ],
      },
      {
        path: `${environment.remotes.mfe2.name}`,
        outlet: 'mfe2',
        resolve: {
          data: () => {
            return { isOpen: true };
          },
        },
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: `${environment.remotes.mfe2.frontUrl}/remoteEntry.js`,
            exposedModule: './Module',
          }).then((m) => m.RemoteEntryModule),
        canMatch: [
          () => {
            inject(TranslationUpdaterService).mergeTranslations(
              `${environment.remotes.mfe2.name}`
            );
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
