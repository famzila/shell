import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from 'src/environments/environment';
import { TranslationUpdaterService } from './core/services/custom-translate-loader/translate-updater.service';

const routes: Routes = [
  {
    path: `${environment.remotes.mfe1.name}`,
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        // remoteEntry: `https://mfe1-five.vercel.app/remoteEntry.js`,
        remoteEntry: `${environment.remotes.mfe1.frontUrl}/remoteEntry.js`,
        exposedModule: './Module',
      }).then((m) => m.RemoteEntryModule),
    canMatch: [
      () => {
        inject(TranslationUpdaterService).mergeTranslations(`${environment.remotes.mfe1.name}`);
      },
    ],
  },
  {
    path: `${environment.remotes.mfe2.name}`,
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        // remoteEntry: `https://mfe2.vercel.app/remoteEntry.js`,
        remoteEntry: `${environment.remotes.mfe2.frontUrl}/remoteEntry.js`,
        exposedModule: './Module',
      }).then((m) => m.RemoteEntryModule),
    canMatch: [
      () => {
        inject(TranslationUpdaterService).mergeTranslations(`${environment.remotes.mfe2.name}`);
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
