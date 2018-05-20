// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const  environment = {
  production: false,
  firebase : {
    apiKey: 'AIzaSyA4rWY5uS1Rww0At9LR4PMgrPwlKh-QQ64',
    authDomain: 'junicorncraft.firebaseapp.com',
    databaseURL: 'https://junicorncraft.firebaseio.com',
    projectId: 'junicorncraft',
    storageBucket: 'junicorncraft.appspot.com',
    messagingSenderId: '803991229137'
  },
  stripe: '123'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
