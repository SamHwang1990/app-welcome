/*! app_welcome - v0.0.1 - 2015-03-20
 * https://github.com/SamHwang1990/app-welcome
 * Copyright (c) 2015 samhwang1990@gmail.com;
 * Licensed 
 */
/**
 * Created by sam on 15-3-20.
 */

define('awHeroConfig', ['awHero_aoName', 'awHero_size'], function(aoName, size){
  return {
    aoName: aoName,
    size: size
  }
});

/**
 * Created by sam on 15-3-20.
 */

define('awHero_aoName', ['malarkey'], function(malarkey){

  var el = document.querySelector('#aw_aoDo_name');

  return function(){
    if (!el) return;
    var initialText = el.textContent;
    var pause = 800;
    var opts = {
      speed: 40,
      loop: false,
      postfix: ''
    };
    var typist = malarkey(el, opts);
    typist
      .pause(2400).delete(initialText.length)
      .type('Tracy').pause(pause).delete(5)
      .type('Becky').pause(pause).delete(5)
      .type('Lisa').pause(pause).delete(5)
      .type('Steve').pause(pause).delete(5)
      .type('Carlos').pause(pause).delete(6)
      .type('Foster').pause(pause).delete(6)
      .type('Kendrick').pause(pause).delete(8)
      .type('Anita').pause(pause).delete(5)
      .type('Winifred').pause(pause).delete(8)
      .type('Charles.').pause(1200)
      .call(function() {
        $(el).addClass("disabled")
      });
  };
});

/**
 * Created by sam on 15-3-20.
 */

define('awHero_size', ['jquery'], function($){

  var $awHero, $awPage1Intro, $awPage1Data;
  var awHero_PERCENT = 0.95;

  $awHero = $('.aw_hero');
  $awPage1Intro = $awHero.find('.aw_page1_intro').eq(0);
  $awPage1Data = $awHero.find('.aw_page1_data').eq(0);

  // 配置模块.aw_hero 的高度
  var setHeroSize = function(windowHeight){
    $awHero.height(windowHeight * awHero_PERCENT);
    return $awHero.height();
  };

  // 配置模块 .aw_page1_intro 的top 位置
  var setIntroSize = function(awHeroHeight){
    var moduleTop;
    var moduleHeight = $awPage1Intro.height();

    var moduleTopBasic = (awHeroHeight - moduleHeight)/2;

    moduleTop = moduleTopBasic;
    setTop(moduleTop, $awPage1Intro, awHeroHeight);
    return moduleTop;
  };

  // 配置模块 .aw_page1_data 的top 位置
  var setDataSize = function(awHeroHeight){
    var moduleTop;
    var moduleHeight = $awPage1Data.height();

    var moduleTopBasic = (awHeroHeight - moduleHeight)/ 2;
    moduleTop = moduleTopBasic;

    setTop(moduleTop, $awPage1Data, awHeroHeight);
    return moduleTop;
  };

  /*
  * 用于检测元素高度以及top 的位置是否超出参考高度值
  *
  * @param top: 元素的top 位置
  * @param elementHeight: 元素的高度
  * @param relHeight: 参考高度值
  * return: 符合规则的元素top 位置
  *
  * 如果top + elementHeight > relHeight，则将top 减去5px 再进行检测
  * */
  var checkAndReturnSize = function(top, elementHeight, relHeight){
    if((top + elementHeight) > relHeight){
      return checkAndReturnSize(top-5, elementHeight, relHeight);
    }else{
      return top;
    }
  };

  /*
  * 用于配置给定元素的top 位置
  *
  * @param: 给定的top 值
  * @param: 给定元素
  * @param: 模块.aw_hero 模块的高度
  *
  * */
  var setTop = function(moduleTop, $element, awHeroHeight){
    var elementHeight = $element.height();
    moduleTop = checkAndReturnSize(moduleTop, elementHeight, awHeroHeight);
    $element.css('top', moduleTop + 'px');
  };

  var initSize = function(done){
    var $window = $(window);
    var awHeroHeight = setHeroSize($window.height());
    setIntroSize(awHeroHeight);
    setDataSize(awHeroHeight);
    if(done instanceof Function){
      return done();
    }
    return;
  };

  var resetSize = function(done){
    return initSize(done);
  };

  return {
    initSize: initSize,
    resetSize: resetSize
  }

});

/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
 window: false, clearInterval: false, document: false,
 self: false, setInterval: false */


define('domReady', function () {
  'use strict';

  var isTop, testDiv, scrollIntervalId,
    isBrowser = typeof window !== "undefined" && window.document,
    isPageLoaded = !isBrowser,
    doc = isBrowser ? document : null,
    readyCalls = [];

  function runCallbacks(callbacks) {
    var i;
    for (i = 0; i < callbacks.length; i += 1) {
      callbacks[i](doc);
    }
  }

  function callReady() {
    var callbacks = readyCalls;

    if (isPageLoaded) {
      //Call the DOM ready callbacks
      if (callbacks.length) {
        readyCalls = [];
        runCallbacks(callbacks);
      }
    }
  }

  /**
   * Sets the page as loaded.
   */
  function pageLoaded() {
    if (!isPageLoaded) {
      isPageLoaded = true;
      if (scrollIntervalId) {
        clearInterval(scrollIntervalId);
      }

      callReady();
    }
  }

  if (isBrowser) {
    if (document.addEventListener) {
      //Standards. Hooray! Assumption here that if standards based,
      //it knows about DOMContentLoaded.
      document.addEventListener("DOMContentLoaded", pageLoaded, false);
      window.addEventListener("load", pageLoaded, false);
    } else if (window.attachEvent) {
      window.attachEvent("onload", pageLoaded);

      testDiv = document.createElement('div');
      try {
        isTop = window.frameElement === null;
      } catch (e) {}

      //DOMContentLoaded approximation that uses a doScroll, as found by
      //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
      //but modified by other contributors, including jdalton
      if (testDiv.doScroll && isTop && window.external) {
        scrollIntervalId = setInterval(function () {
          try {
            testDiv.doScroll();
            pageLoaded();
          } catch (e) {}
        }, 30);
      }
    }

    //Check if document already complete, and if so, just trigger page load
    //listeners. Latest webkit browsers also use "interactive", and
    //will fire the onDOMContentLoaded before "interactive" but not after
    //entering "interactive" or "complete". More details:
    //http://dev.w3.org/html5/spec/the-end.html#the-end
    //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
    //Hmm, this is more complicated on further use, see "firing too early"
    //bug: https://github.com/requirejs/domReady/issues/1
    //so removing the || document.readyState === "interactive" test.
    //There is still a window.onload binding that should get fired if
    //DOMContentLoaded is missed.
    if (document.readyState === "complete") {
      pageLoaded();
    }
  }

  /** START OF PUBLIC API **/

  /**
   * Registers a callback for DOM ready. If DOM is already ready, the
   * callback is called immediately.
   * @param {Function} callback
   */
  function domReady(callback) {
    if (isPageLoaded) {
      callback(doc);
    } else {
      readyCalls.push(callback);
    }
    return domReady;
  }

  domReady.version = '2.0.1';

  /**
   * Loader Plugin API method
   */
  domReady.load = function (name, req, onLoad, config) {
    if (config.isBuild) {
      onLoad(null);
    } else {
      domReady(onLoad);
    }
  };

  /** END OF PUBLIC API **/

  return domReady;
});
/**
 * Created by sam on 15-3-20.
 */

define('responsiveBoundary',[] , function(){
  var XS = 480, SM = 768, MD = 992, LG = 1200;
  return {
    xs: XS,
    xsMin: XS,
    xsMax: SM -1,
    sm: SM,
    smMin: SM,
    smMax: MD -1,
    md: MD,
    mdMin: MD,
    mdMax: LG -1,
    lg: LG,
    lgMin: LG
  };
});
/**
 * Created by sam on 15-3-12.
 */

requirejs.config({
  paths: {
    jquery: "vendor/jquery.min",
    skrollr: "vendor/skrollr.min",
    malarkey: "vendor/malarkey.min"
  },
  shim: {
    jquery: {
      exports: ['$']
    },
    skrollr: {
      exports: ['skrollr']
    },
    malarkey: {
      exports: ['malarkey']
    }
  }
});

require(['domReady', 'jquery', 'responsiveBoundary', 'skrollr', 'awHeroConfig'],
  function(domReady, $, responsiveBoundary, skrollr, awHeroConfig){

  var init = {
    init_awHero: function(){
      awHeroConfig.size.initSize(function(){
        awHeroConfig.aoName();
      });
    }
  };

  domReady(function(){
    init.init_awHero();
    skrollr.init({
      easing: 'linear'
    });
  });
});
/**
 * Created by sam on 15-3-12.
 */

define(
  'windowSize',
  ['jquery'],
  function($){
    var $window = $(window);
    var windowSize = {
      width: $window.width(),
      height: $window.height()
    };
    return windowSize;
});
