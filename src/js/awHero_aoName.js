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
