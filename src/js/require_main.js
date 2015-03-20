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

require(['domReady', 'jquery', 'responsiveBoundary', 'skrollr', 'malarkey'], function(domReady, $, responsiveBoundary, skrollr, malarkey){

  var $awHero, $window, $awPage1Intro, $awPage1Data;

  var viewPortHeight, halfViewPortHeight, viewPortWidth, awHeroHeight;

  var MIN_awPage1IntroTop = 0.04;

  $window = $(window);
  $awHero = $('.aw_hero');
  $awPage1Intro = $awHero.find('.aw_page1_intro').eq(0);
  $awPage1Data = $awHero.find('.aw_page1_data').eq(0);

  viewPortHeight = $window.height();
  halfViewPortHeight = viewPortHeight/2;
  viewPortWidth = $(window).width();
  // 故意不把模块.aw_hero 覆盖整个屏幕，留有空地，让读者觉得底下还有内容
  awHeroHeight = viewPortHeight * 0.95;

  var init = {
    init_awHero: function(){
      /* 计算相关模块的位置*/

      // 模块.aw_page1_intro 的Top 是父元素中间靠上一点
      var awPage1IntroTop = (awHeroHeight - $awPage1Intro.height())/2 - awHeroHeight * 0.16;
      if(awPage1IntroTop <=0){
        awPage1IntroTop = awHeroHeight * MIN_awPage1IntroTop;
      }

      // 以sm 为临界点，模块.aw_page1_data 的Top 是父元素中间靠上或靠下一点
      var awPage1DataTopBasic = (awHeroHeight - $awPage1Data.height())/ 2, awPage1DataTop;
      if(viewPortWidth <= responsiveBoundary.smMax){
        awPage1DataTop = awPage1DataTopBasic - awHeroHeight * 0.16;
      }else{
        awPage1DataTop = awPage1DataTopBasic + awHeroHeight * 0.1;
      }

      // 设置相关模块的位置和大小
      $awHero.height(awHeroHeight);
      $awPage1Intro.css('top', awPage1IntroTop + 'px');
      $awPage1Data.css('top', awPage1DataTop + 'px');
    },
    init_awHero_aoName: function(){
      var el = document.querySelector('#aw_aoDo_name');
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
    }
  };

  domReady(function(){
    init.init_awHero();
    skrollr.init({
      easing: 'linear'
    });
    init.init_awHero_aoName();
  });



});