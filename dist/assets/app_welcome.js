/*! app_welcome - v0.0.1 - 2015-03-17
 * https://github.com/SamHwang1990/app-welcome
 * Copyright (c) 2015 samhwang1990@gmail.com;
 * Licensed 
 */
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


/**
 * Created by sam on 15-3-12.
 */

define(
  'windowProperty',
  ['jquery'],
  function($){
    var windowSize = {
    };

    // get window width and height
    windowSize.width = $(window).width();
    windowSize.height = $(window).height();

    return windowSize;
});
