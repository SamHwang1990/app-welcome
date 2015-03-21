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
    moduleTop = moduleTopBasic + 5 + 20; // 鉴于skyrollr 参数设置的是5px

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
