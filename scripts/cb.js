/* Author: Chris Brough
 * Date: 5-10-2012
 * ------------------------------------------------------------------------------ */

$(document).ready(function() {

    // Display Full Link for Print Layout
    // Source: http://goo.gl/HqAqk (Steve Losh)
    $('#content p:has(a)').add('#content ol:has(a)').add('#content ul:has(a)').each(function() {
        var printing_links = $(this).find('a')
                                    .not("[href^='#']")
                                    .not(":has(img)")
                                    .clone();
        $(this).after(printing_links);

        printing_links.wrap('<li></li>')
                      .parent()
                      .wrapAll('<ul class="print-links"></ul>');

        printing_links.each(function() {
            var href = $(this).attr('href');
            if (href.match("^/")) {
                href = 'http://chrisbrough.com' + href;
            }
            $(this).after(': ' + href);
        });
    });

    // Open Images in New Tab
    $("#content img").click(function(){
        window.open($(this).attr("src"), $(this).attr("alt"));
        return false;
    });

    $("#content img").css("cursor", "pointer");

    // Generate Table of Contents
    // Use: <ul id="toc"></ul>
    $("ul#toc").tableOfContents($("#wrapper"), { startLevel:2 });

    String.prototype.startsWith = function(str) {
        return (this.match("^"+str)==str)
    }

    // Nav Active Tab
    if(location.pathname != "/"
        && location.pathname.split("/")[1] != "post"
        && !location.pathname.startsWith("/page"))
        $('nav a[href^="/' +
            location.pathname.split("/")[1] + '"]').addClass('active');
    else $('nav a:eq(0)').addClass('active');

    // Code Selection
    // Source: http://goo.gl/879Mk
    //$("pre").delegate("code", "click", function() {
        //var $code = $(this),
            //$pre  = $(this).parent(),
            //$clone= $code.clone(),
            //text  = $code.text(),
            //height= $code.outerHeight();
            //width = $code.outerWidth();

        //$code.replaceWith($('<textarea wrap="off"/>'));

        //var $textarea = $pre.children('textarea');

        //$textarea.height(height).val(text).select();
        //$textarea.one('blur', function() {
            //$textarea.replaceWith($clone);
        //});
    //});
});

// Twitter
getTwitters('tweet', {
      id: 'chrisjbrough',
      count: 1,
      enableLinks: true,
      ignoreReplies: true,
      clearContents: true,
      template: '%text% <br /><a \
        href="http://twitter.com/%user_screen_name%/statuses/%id_str%/" \
        id="tweet-date" target="_blank">%time%</a><br />'
});
