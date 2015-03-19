/**
 * Created by sam on 15-3-12.
 */

requirejs.config({
  paths: {
    jquery: "vendor/jquery.min",
    skrollr: "vendor/skrollr.min"
  },
  shim: {
    jquery: {
      exports: ['$']
    },
    skrollr: {
      exports: ['skrollr']
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

require(['domReady', 'jquery', 'responsiveBoundary', 'skrollr'], function(domReady, $, responsiveBoundary, skrollr){

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
    }
  };

  domReady(function(){
    init.init_awHero();
    skrollr.init({
      easing: 'linear'
    });
  });



});