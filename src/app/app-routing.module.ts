import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from 'src/environments/environment';
import { TranslationUpdaterService } from './core/services/custom-translate-loader/custom-translate-loader.service';

const routes: Routes = [
  {
    path: 'mfe1',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.remotes.mfe1.frontUrl}/remoteEntry.js`,
        exposedModule: './Module',
      }).then((m) => m.RemoteEntryModule),
    canMatch: [() => {
      const translateLoader = inject(TranslationUpdaterService);
      if (!translateLoader.isMfe1Loaded) {
        translateLoader.mergeTranslations('mfe1');
        translateLoader.isMfe1Loaded = true;
      }
    }]
  },
  {
    path: 'mfe2',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.remotes.mfe2.frontUrl}/remoteEntry.js`,
        exposedModule: './Module',
      }).then(m => m.Module),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
