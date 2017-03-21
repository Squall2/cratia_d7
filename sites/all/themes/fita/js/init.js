(function ($, D) {
  D.behaviors.inputUI = {
    attach : function (context) {
      $('input[type=radio], input[type=checkbox]', context).once('inputUI',
        function () {
          $(this).wrap('<span class=inputUI-wrap></span>').after('<a class=ui-' + this.type + '></a>');
        })
    }
  };

//  D.behaviors.numerateMenu = {
//    attach : function (context) {
//      $('.menu', context).once('numerate', function () {
//        $(this)
//          .addClass('level-' + $(this).parents('.menu').length)
//          .children().each(function (i) { $(this).addClass('element-' + i); });
//      });
//    }
//  };

//  $.fn.button && (D.behaviors.uiButton = {
//    attach : function (context) {
//      $('input[type=submit], .button, button', context)
//        .not('.not-ui').not(':disabled')
//        .button()
//        .filter("[value='" + D.t('Delete') + "'], [value='" + D.t('Remove') + "']").button({icons : {primary : 'ui-icon-trash'}}).end()
//        .filter("[value='" + D.t('Upload') + "']").button({icons : {primary : 'ui-icon-circle-arrow-n'}}).end()
//        .filter("[value='" + D.t('Save') + "']").button({icons : {primary : 'ui-icon-disk'}}).end()
//        .filter("[value='" + D.t('Preview') + "']").button({icons : {primary : 'ui-icon-arrowrefresh-1-s'}}).end()
//        .filter("[value='" + D.t('Log in') + "']").button({icons : {primary : 'ui-icon-person'}}).end();
//    }
//  });

  $.fn.customFileInput && (D.behaviors.customFileInput = {
    attach : function (context) {
      $('input[type=file]', context).once('customfile-input').customFileInput();
    }
  });

    function BlockHeaderInsert(){
        if($(window).width() < 640){
            if(!$('.header .pane-bean-logo').prev().hasClass('.pane-locale-language')){
                $('.pane-locale-language').insertBefore('.header .pane-bean-logo');
            }
            if($('.header .wrap-menu-block .pane-bean-kontakty').length){
                $('.header .pane-bean-kontakty').insertBefore('.header .wrap-menu-block');
            }
            if($('.two-colums-content-block').length){
                if($('.two-colums-content-block .panels-flexible-region-2-center').prev('.panels-flexible-region-2-left_column_block')){
                    $('.two-colums-content-block .panels-flexible-region-2-left_column_block').insertAfter('.two-colums-content-block .panels-flexible-region-2-center');
                }
                if(!$('.two-colums-content-block .panels-flexible-region-2-center .pane-views-country-block').length){
                    $('.two-colums-content-block .pane-views-country-block').insertAfter('.two-colums-content-block .panels-flexible-region-2-center .pane-page-title');
                }
                if(!$('.two-colums-content-block .panels-flexible-region-2-center .pane-views-country-block-1').length){
                    $('.two-colums-content-block .pane-views-country-block-1').insertAfter('.two-colums-content-block .panels-flexible-region-2-center .pane-page-title');
                }
            }
        }else{
            if(!$('.header .pane-locale-language').prev().hasClass('.wrap-menu-block')){
                $('.pane-locale-language').insertAfter('.header .wrap-menu-block');
            }
            if(!$('.header .wrap-menu-block .pane-bean-kontakty').length){
                $('.header .pane-bean-kontakty').prependTo('.header .wrap-menu-block');
            }
            if($('.two-colums-content-block').length){
                if($('.panels-flexible-region-2-left_column_block').prev('.panels-flexible-region-2-center')){
                    $('.panels-flexible-region-2-left_column_block').insertBefore('.panels-flexible-region-2-center');
                }
                if($('.two-colums-content-block .panels-flexible-region-2-center .pane-page-title').next('.pane-views-country-block')){
                    $('.two-colums-content-block .pane-views-country-block').prependTo('.two-colums-content-block .panels-flexible-region-2-left_column_block >.inside');
                }
                if($('.two-colums-content-block .panels-flexible-region-2-center .pane-page-title').next('.pane-views-country-block-1')){
                    $('.two-colums-content-block .pane-views-country-block-1').prependTo('.two-colums-content-block .panels-flexible-region-2-left_column_block >.inside');
                }
            }
        }
    }
   function CountryTitleClick(){
       if($(window).width() < 640){
           $('.view-country .country-menu-title-block').on('click', function(){
               var obj = $(this);
               if(obj.closest('.views-field-nothing').hasClass('visible')){
                   obj.closest('.views-field-nothing').removeClass('visible');
               }else{
                   obj.closest('.views-field-nothing').addClass('visible');
               }
               return false;
           });
       }
   }

  $(function () {

      $('.header .pane-bean-kontakty,.header .pane-system-main-menu').wrapAll('<div class="wrap-menu-block"></div>');

      $('.pane-locale-language .language-switcher-locale-url li').each(function(){
          var obj = $(this),
              text = obj.find('a').text(),
              newText = text.slice(0,2);
          obj.find('a').text(newText);
      });
      BlockHeaderInsert();
      CountryTitleClick();

      if($('html').attr('lang') == 'ru'){
          $('.pane-search-form .search-block-form input[name="search_block_form"]').attr('placeholder','Поиск');
      }
      if($('html').attr('lang') == 'en'){
          $('.pane-search-form .search-block-form input[name="search_block_form"]').attr('placeholder','Search');
      }

      var menuItems = $('.view-country-list >.view-content >.views-row').length;
      $('.view-country-list >.view-content').addClass('menu-'+menuItems+'th');

      $('.search-bar').on('click',function(){
          $('.pane-search-form').toggleClass('visible');
          $(this).toggleClass('active');
      });

      function menuDrag(){
          if($(window).width() < 640){
              $( ".pane-system-main-menu .menu" ).draggable({
                  axis: "x",
                  containment: ".pane-system-main-menu",
                  scroll: false
              });
          }
      }
     // menuDrag();

      $('.view-country-list .view-header').on('click',function(){
          $(this).toggleClass('visible-menu');
      });
      $('.view-country-list >.view-content >.views-row >.views-field-name').on('click',function(){
         $(this).toggleClass('active');
      });

      if($('.view-country').length){
          var this_page = document.location.href;
          $('.view-country .views-row').each(function(){
              if(this_page == $(this).find('.views-field-name a').attr('href')){
                  $(this).addClass('active');
              }
          });
      }

      $('.view-front-country-menu .views-field-nothing a').hover(function(){
          var country = $(this).attr('data-country-code');
          $('.map-svg path[data-country="'+country+'"]').attr('data-hover','true');
      },function(){
          var country = $(this).attr('data-country-code');
          $('.map-svg path[data-country="'+country+'"]').removeAttr('data-hover');
      });


      $('.map-svg path').hover(function(){
          var obj = $(this);
          if(obj.attr('data-country')){
              var country = $(this).attr('data-country');
              $('.view-front-country-menu .views-field-nothing a[data-country-code="'+country+'"]').addClass('hover');
          }
      },function(){
          var country = $(this).attr('data-country');
          $('.view-front-country-menu .views-field-nothing a[data-country-code="'+country+'"]').removeClass('hover');
      });

      $('.map-svg path').on('click',function(){
          var obj = $(this);
          if(obj.attr('data-country')){
              var code_country = obj.attr('data-country'),
                  link = $('.view-front-country-menu .views-field-nothing a[data-country-code="'+code_country+'"]').attr('href');
              document.location.href = link;
          }
      });

  });
    $(window).resize(function(){
        BlockHeaderInsert();
        CountryTitleClick();
       // menuDrag();
    });
})(jQuery, Drupal);