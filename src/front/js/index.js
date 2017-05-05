requirejs.config({
  baseUrl: 'front/js',
  paths: {
    backbone: 'vendor/backbone',
    underscore: 'vendor/underscore',
    jquery: 'vendor/jquery'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: '$'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

requirejs(['./app/nameSpace']);