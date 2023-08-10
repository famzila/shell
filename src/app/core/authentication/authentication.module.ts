import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';

import { AuthenticationRoutingModule } from './authentication-routing.module';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'mfe',
        clientId: 'shellApp'
      },
      initOptions: {
        // onLoad: 'check-sso',
        onLoad: 'login-required',
        checkLoginIframe: false
      }
    });
}

@NgModule({
  declarations: [],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService]
    // },
  ],
  imports: [
    CommonModule,
    KeycloakAngularModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
