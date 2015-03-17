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
