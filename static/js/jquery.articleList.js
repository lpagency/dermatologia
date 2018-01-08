var page=0;

(function( $ ){
   $.fn.infinit_scroll = function(tag, limit) {

    document.addEventListener("touchmove", ScrollStart, false);
    document.addEventListener("scroll", Scroll, false);

    function ScrollStart() {
        //start of scroll event for iOS
        if (page === 0){
          page += 1;
          ajaxArticles()
        }else{
          if($(window).scrollTop() + $(window).height() == $(document).height()) {
            page += 1;
            ajaxArticles()
          }
        }
    }

    function Scroll() {
        if (page === 0){
          page += 1;
          ajaxArticles()
        }else{
          // console.log(($(window).scrollTop()+$(window).height())+"-----"+ ($(document).height()-500));
          // var document_height = $(document).height()-500;
          // var scrollTop = $(window).scrollTop() + $(window).height()
          // console.log(scrollTop +"---------"+document_height);
          if( $(window).scrollTop() + $(window).height() === $(document).height())  {
            $(".loading").removeClass("hidden");
            page += 1;
            ajaxArticles()
          }
        }
      }

    function ajaxArticles(){
            // if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $.post(site_base + "/article/list", { 
                        "tag" : tag, 
                        "limit" : limit,
                        "page" : page
                    }, function(result)
                    {

                        var el = $(result).clone(true, true);
                        for (var i = 0; i < $(el).length; i++) {
                            if ($(el).get(i).outerHTML != undefined){
                                var new_article=  $($(el).get(i).outerHTML).hide();
                                $(destiny).append(new_article);
                                new_article.fadeIn("slow");
                            }
                        }
                        $(".loading").addClass("hidden");
                    });
            // }
    }

  //    $(window).scroll(function() {
  //      if($(window).scrollTop() + $(window).height() == $(document).height()) {
  //           page += 1;
  //           $.post(site_base + "/article/list", { 
  //                       "tag" : tag, 
  //                       "limit" : limit,
  //                       "page" : page
  //                   }, function(result)
  //                   {

  //                       var el = $(result).clone(true, true);
  //                       for (var i = 0; i < $(el).length; i++) {
  //                           if ($(el).get(i).outerHTML != undefined){
  //                               var new_article=  $($(el).get(i).outerHTML).hide();
  //                               $(destiny).append(new_article);
  //                               new_article.fadeIn("slow");
  //                           }
  //                       }
                        
  //                   });
  //           }
  // });
     // window.onscroll = function() {        
     //  if($(window).scrollTop() + $(window).height() == $(document).height()) {
     //        page += 1;
     //        $.post(site_base + "/article/list", { 
     //                    "tag" : tag, 
     //                    "limit" : limit,
     //                    "page" : page
     //                }, function(result)
     //                {

     //                    var el = $(result).clone(true, true);
     //                    for (var i = 0; i < $(el).length; i++) {
     //                        if ($(el).get(i).outerHTML != undefined){
     //                            var new_article=  $($(el).get(i).outerHTML).hide();
     //                            $(destiny).append(new_article);
     //                            new_article.fadeIn("slow");
     //                        }
     //                    }
                        
     //                });
     //        }

     //      };
   }; 
})( jQuery );