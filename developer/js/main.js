"use strict";

// $(function () {
// });
//Start customs ecma javascript////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  // "use strict";
  //функция=код функции+доступные данные!
  // function click() {
  // 	let c = 0;
  // 	return () => {
  // 		c++;
  // 		console.log(c);
  // 	};
  // }
  // const nav = document.getElementById('header_menu');
  // let d = click();
  // d();
  // d();
  //ползунок///////////////
  (function () {
    var range = document.getElementById('r'),
        //rng - это Input
    div = document.getElementById('test'),
        // div - блок test
    i1 = document.getElementById('i1'); // i1 - input

    range.addEventListener('input', function () {
      // или поставить change
      i1.value = range.value; // div.innerHTML = rng.value;

      div.style.width = range.value + 'px';
    });
  })(); //закончился ползунок////
  //start show_menu_to_click_span////////////////////////////////////


  (function () {
    var nav = document.getElementById('header_menu'),
        button = document.getElementById('click_show_menu'),
        burger = button.getElementsByTagName('SPAN'),
        single = nav.getElementsByClassName('single');
    button.addEventListener('click', toggle_menu, false);

    for (var i = 0; i < single.length; i++) {
      single[i].addEventListener('click', toggle_menu, false);
    }

    function toggle_menu() {
      var show = document.getElementsByClassName('menu');

      for (var _i = 0; _i < burger.length; _i++) {
        burger[_i].classList.toggle('active');

        break;
      }

      for (var _i2 = 0; _i2 < show.length; _i2++) {
        show[_i2].classList.toggle('active');

        break;
      }
    }

    ;
  })(); //end show_menu_to_click_span/////////////////////////////////////
  //start pop_up_teleport/////////////////////////////////////////////////////////////////////


  (function () {
    var layout = document.getElementById('pop_up_teleport'),
        div = layout.getElementsByTagName('div'),
        button = document.getElementById('button_pop_up_teleport');
    button.addEventListener('click', function () {
      layout.style.opacity = '1';
      layout.style.visibility = 'visible';

      for (var i = 0; i < div.length; i++) {
        div[i].style.opacity = '1';
        break;
      }

      setTimeout(function () {
        layout.addEventListener('click', function () {
          layout.style.opacity = '0';
          layout.style.visibility = 'hidden';

          for (var _i3 = 0; _i3 < div.length; _i3++) {
            div[_i3].style.opacity = '0';
            break;
          }
        });
      }, 505);
    });
  })(); //end pop_up_teleport///////////////////////////////////////////////////////////////////////
  //start pop_up_shift/////////////////////////////////////////////////////////////////////


  (function () {
    var layout = document.getElementById('pop_up_shift'),
        div = layout.getElementsByTagName('div'),
        button = document.getElementById('button_pop_up_shift');
    button.addEventListener('click', function () {
      layout.style.opacity = '1';
      layout.style.visibility = 'visible';

      for (var i = 0; i < div.length; i++) {
        div[i].style.right = '1vw';
        break;
      }

      setTimeout(function () {
        layout.addEventListener('click', function () {
          layout.style.opacity = '0';
          layout.style.visibility = 'hidden';

          for (var _i4 = 0; _i4 < div.length; _i4++) {
            div[_i4].style.right = '-21vw';
            break;
          }
        });
      }, 505);
    });
  })(); //end pop_up_shift///////////////////////////////////////////////////////////////////////
  //tabs//////////////////////////////////////////////////////////////////////////////////////


  (function () {
    var all_tabs = document.getElementsByClassName('tab');

    for (var i = 0; i < all_tabs.length; i++) {
      var _tab = document.getElementsByClassName('("tab"+"_"+i)'); // alert(tab);


      for (var _i5 = 0; _i5 < _tab.length; _i5++) {
        _tab[_i5].style.opacity = '0';
        alert(_tab[_i5]);
      }
    }

    var tab = document.getElementById('tab_0'),
        links = tab.querySelectorAll('.tab_links li'),
        tabs = tab.querySelectorAll('.tab_content li'); //start active tab

    var index = 0;
    tabs[index].classList.add('active');
    links[index].classList.add('active');

    function add_active(index) {
      tabs[index].classList.add('active');
      links[index].classList.add('active');
    }

    function remove_active() {
      for (var _i6 = 0; _i6 < links.length; _i6++) {
        links[_i6].classList.remove('active');
      }

      for (var _i7 = 0; _i7 < tabs.length; _i7++) {
        tabs[_i7].classList.remove('active');
      }
    } //if click start events and search index in array


    var _loop = function _loop(_i8) {
      var link = links[_i8];
      link.addEventListener('click', function () {
        remove_active();
        add_active(_i8);
      }, false);
    };

    for (var _i8 = 0; _i8 < links.length; _i8++) {
      _loop(_i8);
    }
  })(); //end tabs//////////////////////////////////////////////////////////////////////////////////////
  //start show copyright year in footer/////////////////////////////////////////////////////////////////////


  (function () {
    var date = new Date(),
        copyright_year = date.getUTCFullYear(),
        where_show = document.getElementById('copyright');
    where_show.innerHTML = copyright_year + ' ' + '©';
    console.log(date);
  })(); //end show copyright//////////////////////////////////////////////////////////////////////////////////////

});