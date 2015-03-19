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
