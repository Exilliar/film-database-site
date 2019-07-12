// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: "0.5.0", // version of the site
  firebase: {
    apiKey: "AIzaSyAzOGedb7dY24y9mr_IFH4aVx9eEm-j0SI",
    authDomain: "film-database-ac9d2.firebaseapp.com",
    databaseURL: "https://film-database-ac9d2.firebaseio.com",
    projectId: "film-database-ac9d2",
    storageBucket: "film-database-ac9d2.appspot.com",
    messagingSenderId: "823089225843"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
