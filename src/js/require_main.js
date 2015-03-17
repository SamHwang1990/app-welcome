/**
 * Created by sam on 15-3-12.
 */

requirejs.config({
  paths: {
    jquery: "vendor/jquery.min"
  },
  shim: {
    jquery: {
      exports: ['$']
    }
  }
});

