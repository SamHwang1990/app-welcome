/**
 * Created by sam on 15-3-22.
 */

define('awAO_size', ['jquery', 'responsiveBoundary'], function($, responsiveBoundary){
  var $awAO, $awAOStatement, $awAOWrap, $window;
  var $awHero, $awPage1Intro, $awPage1Data;
  var awAO_size;

  $awHero = $('.aw_hero');
  $awPage1Intro = $awHero.find('.aw_page1_intro').eq(0);
  $awPage1Data = $awHero.find('.aw_page1_data').eq(0);

  $awAO = $('.aw_ao').eq(0);
  $awAOStatement = $awAO.find('.aw_ao_statement').eq(0);
  $awAOWrap = $awAO.find('.aw_ao_wrap').eq(0);
  $window = $(window);

  var setModuleSize = function(){
    var moduleHeight = $awAOWrap.height();
    var moduleWidth = $awAOWrap.width();
    var windowWidth = $window.width();
    var awHeroHeight = $awHero.height();
    var awPage1Intro_offsetBottom = parseInt($awPage1Intro.css('top'), 10) + $awPage1Intro.height();
    var awPage1Data_offsetBottom = parseInt($awPage1Data.css('top'), 10) + $awPage1Data.height();

    var awHero_bottomLeft =
      (awPage1Data_offsetBottom > awPage1Intro_offsetBottom)
        ? (awHeroHeight - awPage1Data_offsetBottom)
        : (awHeroHeight - awPage1Intro_offsetBottom);

    if((windowWidth >= responsiveBoundary.lgMin) && (awHero_bottomLeft) > moduleHeight){
      $awAOWrap.css({position: 'absolute', bottom: 0, left: (windowWidth - moduleWidth)/2});
      $awAOStatement.css({display: 'none'});
    }else{
      $awAOWrap.css({position: 'relative', bottom: 0, left: 0});
      $awAOStatement.css({display: 'block'});
    }
  };

  awAO_size = {
    initSize: setModuleSize,
    resetSize: function(){
      return setModuleSize();
    }
  };

  return awAO_size;
});
