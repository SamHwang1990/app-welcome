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

require(['domReady', 'jquery', 'responsiveBoundary', 'skrollr', 'awHeroConfig', 'awAO_size', 'init53kf'],
  function(domReady, $, responsiveBoundary, skrollr, awHeroConfig, awAOSize, init53kf){
    var init = {
      init_awHero: function(){
        awHeroConfig.size.initSize(function(){
          awHeroConfig.aoName();
          awAOSize.initSize();
        });
      },
      init_53kf: function(){
        init53kf();
      }
    };

    var reset = {
      reset_awHero: function(){
        return awHeroConfig.size.resetSize();
      },
      reset_awAO: function(){
        return awAOSize.resetSize();
      }
    };

    domReady(function(){
      init.init_awHero();
      skrollr.init({
        easing: 'linear'
      });
      init.init_53kf();
    });

    $(window).resize(function(){
      reset.reset_awHero();
      reset.reset_awAO();
    });

});