/*! app_welcome - v0.0.1 - 2015-03-12
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


require(['jquery'], function($){
  console.log($('<span>dfdf</span>'));
});