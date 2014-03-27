(function() {

  "use strict";

  if (location.hostname === 'brandonkboswell.com') {
    //Load Production Mixpanel
    mixpanel.init("9533aac1a8f825170969375395ceb5d9");
  } else {
    //Otherwise Load Dev Mixpanel
    mixpanel.init("15bbf05ada9846690646543886c8ac2b");
  }

  //Track The Pageload
  mixpanel.track('pageload');

  $(function () {
    $('.connectionsSection li a, .github-repo-link').click(function(evt) {
      //Get The Event Name From The Button That Was Clicked
      var $btn      = $(evt.target);
      var eventName = $btn.attr('data-event');

      mixpanel.track(eventName);
    });
  });

  //If We're On Mobile, Disable The Tooltips
  if (!window.matchMedia || !(window.matchMedia("(max-width: 767px)").matches)) {
    $(function () {
      $('.connectionsSection li a').each(function() {

        var message = $(this).attr('data-message');

        //Generate The Drop Card
        var drop = new Drop({
          target   : this,
          content  : message,
          position : 'top center',
          openOn   : 'hover',
          classes  : 'drop-theme-arrows-bounce connectionDrop'
        });
      });
    });
  }
})();