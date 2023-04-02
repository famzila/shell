import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mfe',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `http://localhost:4000/remoteEntry.js`,
        exposedModule: './Module',
      }).then((m) => m.RemoteEntryModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
