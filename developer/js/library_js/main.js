// $(function () {

// });
//Start customs ecma javascript////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    "use strict";
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
    (() => {
        let range = document.getElementById('r'), //rng - это Input
            div = document.getElementById('test'), // div - блок test
            i1 = document.getElementById('i1'); // i1 - input
        range.addEventListener('input', () => { // или поставить change
            i1.value = range.value;
            // div.innerHTML = rng.value;
            div.style.width = range.value + 'px';
        });
    })();
    //закончился ползунок////
    //start show_menu_to_click_span////////////////////////////////////
    (() => {
        const nav = document.getElementById('header_menu'),
            button = document.getElementById('click_show_menu'),
            burger = button.getElementsByTagName('SPAN'),
            single = nav.getElementsByClassName('single');
        button.addEventListener('click', toggle_menu, false);
        for (let i = 0; i < single.length; i++) {
            single[i].addEventListener('click', toggle_menu, false);
        }

        function toggle_menu() {
            let show = document.getElementsByClassName('menu');
            for (let i = 0; i < burger.length; i++) {
                burger[i].classList.toggle('active');
                break;
            }
            for (let i = 0; i < show.length; i++) {
                show[i].classList.toggle('active');
                break;
            }
        };
    })();
    //end show_menu_to_click_span/////////////////////////////////////
    //start pop_up_teleport/////////////////////////////////////////////////////////////////////
    (() => {
        const layout = document.getElementById('pop_up_teleport'),
            div = layout.getElementsByTagName('div'),
            button = document.getElementById('button_pop_up_teleport');
        button.addEventListener('click', () => {
            layout.style.opacity = '1';
            layout.style.visibility = 'visible';
            for (let i = 0; i < div.length; i++) {
                div[i].style.opacity = '1';
                break;
            }
            setTimeout(() => {
                layout.addEventListener('click', () => {
                    layout.style.opacity = '0';
                    layout.style.visibility = 'hidden';
                    for (let i = 0; i < div.length; i++) {
                        div[i].style.opacity = '0';
                        break;
                    }
                });
            }, 505);
        });
    })();
    //end pop_up_teleport///////////////////////////////////////////////////////////////////////
    //start pop_up_shift/////////////////////////////////////////////////////////////////////
    (() => {
        const layout = document.getElementById('pop_up_shift'),
            div = layout.getElementsByTagName('div'),
            button = document.getElementById('button_pop_up_shift');
        button.addEventListener('click', () => {
            layout.style.opacity = '1';
            layout.style.visibility = 'visible';
            for (let i = 0; i < div.length; i++) {
                div[i].style.right = '1vw';
                break;
            }
            setTimeout(() => {
                layout.addEventListener('click', () => {
                    layout.style.opacity = '0';
                    layout.style.visibility = 'hidden';
                    for (let i = 0; i < div.length; i++) {
                        div[i].style.right = '-21vw';
                        break;
                    }
                });
            }, 505);
        });
    })();
    //end pop_up_shift///////////////////////////////////////////////////////////////////////
    //tabs//////////////////////////////////////////////////////////////////////////////////////
    (() => {
        // let all_tabs = document.getElementsByClassName('tab');
        // for (let i = 0; i < all_tabs.length; i++) {
        //     let tab = document.getElementsByClassName('("tab"+"_"+i)');
        //     // alert(tab);
        //     for (let i = 0; i < tab.length; i++) {
        //         tab[i].style.opacity = '0';
        //         alert(tab[i]);
        //     }
        // }
        const tab = document.getElementById('tab_0'),
            links = tab.querySelectorAll('.tab_links li'),
            tabs = tab.querySelectorAll('.tab_content li');
        //start active tab
        let index = 0;
        tabs[index].classList.add('active');
        links[index].classList.add('active');

        function add_active(index) {
            tabs[index].classList.add('active');
            links[index].classList.add('active');
        }

        function remove_active() {
            for (let i = 0; i < links.length; i++) {
                links[i].classList.remove('active');
            }
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove('active');
            }
        }
        //if click start events and search index in array
        for (let i = 0; i < links.length; i++) {
            let link = links[i];
            link.addEventListener(
                'click',
                () => {
                    remove_active();
                    add_active(i);
                },
                false
            );
        }
    })();
    //end tabs//////////////////////////////////////////////////////////////////////////////////////
    //start show copyright year in footer/////////////////////////////////////////////////////////////////////
    (() => {
        let date = new Date(),
            copyright_year = date.getUTCFullYear(),
            where_show = document.getElementById('copyright');
        where_show.innerHTML = copyright_year + ' ' + '©';
        console.log(date);
    })();
    //end show copyright//////////////////////////////////////////////////////////////////////////////////////
});