// @ts-expect-error: TS7015: Element implicitly has an 'any' type because index expression is not of type 'number'.
if (window['env'] === undefined) {
  // @ts-expect-error: TS7015: Element implicitly has an 'any' type because index expression is not of type 'number'.
  window['env'] = window['env'] || {};
}

export const environment = {
  production: false,

  remotes: {
    mfe1: {
      // @ts-expect-error: TS7015: Element implicitly has an 'any' type because index expression is not of type 'number'.
      frontUrl: window['env']['mfe1'] || 'variable-not-configured',
    },
    mfe2: {
      // @ts-expect-error: TS7015: Element implicitly has an 'any' type because index expression is not of type 'number'.
      frontUrl: window['env']['mfe2'] || 'variable-not-configured',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
