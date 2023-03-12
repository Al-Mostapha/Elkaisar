$(document).ready(function(){
     
      // Fill header size when reload

      $("body").niceScroll({  // Nice Scroll
        cursorwidth: '3px',
        cursorborder: 'none',
        cursorborderradius:'0px',
        cursorcolor:"#d55656",
        autohidemode: false, 
        background:"#999999"
     });
     

        // Add Css Attr To Nav Bar When Scrolling ( Background-Color)
        // When Scroll Set Css Attr to NavBar
          $(window).scroll(function() {
              
              if ($(window).scrollTop() >= 50 ) {
                  $('.navBar').css({
                    backgroundColor:"#f5f5f5",
                    transition:"all .7s ease",
                    boxShadow: '0px 0px 14px -7px black',
                  });
                  $('.navBar').css('box-shadow', '0px 0px 14px -7px black');
                  $('.menu ul a').css('color', '#525252');
                  $('.navBar .barIcon').css('color', 'black');
              }else{
                  $('.navBar').css({
                    backgroundColor:"transparent",
                    transition:"all .7s eases",
                  });
                  $('.navBar').css('box-shadow', 'none');
                  $('.menu ul a').css('color', 'white');
                  $('.navBar .barIcon').css('color', '#f5f5f5');
              }

          })


        // Margin Writer From Top
        $('.header .writerBox').css({
          marginTop:($(window).height() - $('.header .writerBox').height() - 0) / 2 ,
        })



                  /*
          * The Portfolio Section 
          * Filter Sections
          * Active Class 
          */
            $(".button").click(function() {
              var value = $(this).attr('data-filter');
              if (value == 'all') {
                $(".filterBox").show("1000");
              }else{
                  $(".filterBox").not("." + value).hide("1000");
                  $(".filterBox").filter("." + value).show("1000");
              }
              
              $("ul li").click(function() {
                $(this).addClass('active').siblings().removeClass('active');
              })
            })


});





         /* Start Writer Section */
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.11em solid white}";
        document.body.appendChild(css);
    };