/**
 * Created by sam on 15-3-24.
 */

define('init53kf', ['jquery'], function($){
  var url53 = 'http://tb.53kf.com/kf.php?arg=10053922&style=1';
  return function(){

    $.ajax({
      url: url53,

      // The name of the callback parameter, as specified by the YQL service
      jsonp: "callback",

      // Tell jQuery we're expecting JSONP
      dataType: "jsonp",

      // Work with the response
      success: function( response ) {
        console.log( response ); // server response
      }
    });
  };
});
