/* COMMON JS */

// scroll header
$(function () {
    //caches a jQuery object containing the header element
    var header = $("html");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $(header).addClass("is-fixed");
        } else {
            $(header).removeClass("is-fixed");
        }
    });
});

// navigation search and to top
$(document).ready(function () {
    $('.menu-button').on('click', function () {
        $('html').toggleClass('nav-open');
    });
    $('.menu-overlay').on('click', function () {
        $('html').removeClass('nav-open');
    });

    $('.header-search-button').on('click', function () {
        $('html').toggleClass('search-open');
    });

    $("#to-top").on("click", function () {
        $("html").animate({ scrollTop: 0 }, "slow");
    });
});

// show return top button
// let topBtn = $('#to-top');
// let snsBtn = $('#sns-box');
// $(window).scroll(function () {
//     var scrTop = $(this).scrollTop();
//     if (scrTop > 100) {
//         topBtn.stop().fadeIn('slow');
//         snsBtn.stop().fadeIn('slow');
//         snsBtn.removeClass('hide');
//     } else {
//         topBtn.stop().fadeOut();
//         snsBtn.stop().fadeOut();
//         snsBtn.addClass('hide');
//     }
// });

//sp menu
$('.menu-sp').click(function () {
    toggle_sp();
});
function toggle_sp() {
    if ($(window).width() <= 1200) {
        close_search();
        $('#m-middle, #m-top').toggleClass('fs');
        if (!$('ul#m-top').hasClass('fs')) { // Menu Closed
            $('ul#m-top').find('span.submenu_button').removeClass('open');
            $('ul#m-top').find('span.submenu_button').next().slideUp();
        }
    }
}
$('span.submenu_button').click(function () {
    $(this).toggleClass('open');
    $(this).next().slideToggle();
});
// mobile toggle header search
$('.search_button').on('click', function () {
    close_menu();
    $('#search').toggleClass('fs');
    return false;
});
function close_menu() {
    if ($('#m-top').hasClass('fs')) {
        $('#m-top').removeClass('fs');
    }
}
function close_search() {
    if ($('#search').hasClass('fs')) {
        $('#search').removeClass('fs');
    }
}

// header search select
$('.box-search select').chosen({ width: '100%', disable_search: true });
$('.box-search select').on('chosen:showing_dropdown', function (event, obj) {
    obj.chosen.dropdown.stop().css({ opacity: 0, height: 'auto', clip: 'auto' })
    var h = obj.chosen.dropdown.outerHeight();
    obj.chosen.dropdown.css({ height: 0 }).animate({ opacity: 1, height: h }, 300);
});
$('.box-search select').on('chosen:hiding_dropdown', function (event, obj) {
    obj.chosen.dropdown.stop().animate({ opacity: 0, height: 0 }, 300, function () {
        obj.chosen.dropdown.find('.chosen-results').html('');
    });
});

// header search and/or
$('ul.search_keywords_operator').show();
$('ul.search_keywords_operator li').click(function () {
    $(this).blur();
    var operator = $(this).text();
    if (operator != 'and' && operator != 'or') return;
    $(this).siblings('li').removeClass('active');
    $(this).addClass('active');
    $('input[name=search_keywords_operator]').val(operator);
});

//share button sp
if ($(".dp-footer-bar-share").length) {
    $(".dp-footer-bar-share, #modal-overlay").on("click", function () {
        $("#modal-content, #modal-overlay").toggleClass("hide");
        return false;
    });
    $("#modal-overlay, #modal-content").on("touchmove", function (e) {
        e.preventDefault();
    });
}
if ($(".dp-footer-bar").length) {
    var footerBar = $(".dp-footer-bar");
    var footerBarHeight = footerBar.height() || 55;
    footerBar.hide();
    $('body').css('paddingBottom', footerBarHeight);
    $('#return_top').css('bottom', footerBarHeight);
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            footerBar.stop().fadeIn("slow");
        } else {
            footerBar.stop().fadeOut();
        }
    });
}
$('.dp-footer-bar-share-2').click(function () {
    window.location = $(this).data('href');
});

//tab post_widget
$('ul.list_tab li label').click(function () {
    let tab_val = $(this).attr('for');
    $('ul.list_tab li').removeClass('active');
    $('ul.recent_post').hide();
    $('ul.recommended_post').hide();
    $('#tab_' + tab_val).addClass('active');
    $('.' + tab_val).show();
});

/**
 * Get recent posts stored for user.
 */
function bike_get_recent_posts() {
    localStorage.removeItem('bike_recent_view_posts');
    var data = localStorage.getItem(bike_rvp_settings.ls_name);
    if (!data) {
        return [];
    }

    try {
        data = JSON.parse(data);
    } catch (error) {
        localStorage.removeItem(bike_rvp_settings.ls_name);
        return [];
    }

    if (data.expiry < Date.now()) {
        localStorage.removeItem(bike_rvp_settings.ls_name);
        return [];
    }

    return data.posts;
}

function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '.' + (m <= 9 ? '0' + m : m) + '.' + (d <= 9 ? '0' + d : d);
}

// Render data to HTML
function bike_display_recently_viewed() {
    const sliderViewedSection = document.querySelector('.topics-slider-viewed')
    if (sliderViewedSection) {
        const slierWrapper = sliderViewedSection.querySelector('.swiper-wrapper')
        slierWrapper.innerHTML = ""
        let posts = bike_get_recent_posts()
        if (!posts.length) {
            // No posts, nothing to display.
            sliderViewedSection.closest('.section').style.display = "none";
            return;
        }

        let pl = posts.length;
        let item, link, title, imageWrap, image, meta, date, time;

        $.ajax({
            type: 'GET',
            url: `wp-json/wp/v2/posts/?include=${posts.map(e => e.id)}&_fields=id,title,link,date,featured_media,fimg_url,label_new&per_page=30&_embed`,
            dataType: 'json',
            async: true
        }).done(function (json) {
            for (let index = 0; index < posts.length; index++) {
                json.forEach(post => {
                    if (posts[index].id == post.id) {
                        var current_time = new Date().getTime();
                        var post_date = new Date(post.date);
                        var post_time = post_date.getTime();
                        if (current_time >= post_time) {
                            item = document.createElement('div')
                            item.className = 'swiper-slide'
                            link = document.createElement('a')
                            link.className = 'topics-link'
                            link.setAttribute('href', post.link)
                            link.setAttribute('title', post.title.rendered)

                            // Image Wrapper
                            imageWrap = document.createElement('div')
                            imageWrap.className = 'topics-img'

                            // Image
                            image = document.createElement('img')
                            image.src = post.fimg_url
                            // image.src = "https://demo7s.com/test/gmo/hondago2/wp-content/uploads/2022/11/top_thumnail_dax.webp"
                            image.width = 720
                            image.height = 405
                            imageWrap.appendChild(image)
                            link.appendChild(imageWrap)

                            contentWrap = document.createElement('div')
                            contentWrap.className = 'topics-inner'
                            link.appendChild(contentWrap)

                            if (post?.label_new) {
                                topicsNew = document.createElement('span')
                                topicsNew.className = 'topics-new'
                                contentWrap.appendChild(topicsNew)
                            }

                            title = document.createElement('h3')
                            title.className = 'topics-title'
                            title.textContent = post.title.rendered
                            contentWrap.appendChild(title)

                            // Date
                            date = document.createElement('p')
                            date.className = 'topics-date'
                            date.textContent = dateToYMD(post_date)
                            contentWrap.appendChild(date)

                            item.appendChild(link)

                            posts[index].element = item;
                            slierWrapper.appendChild(posts[index].element.cloneNode(true));
                        }
                    }
                });
            }
        }).fail(function (json) {
            console.error('最近チェックした記事の取得に失敗しました。')
        });
        // for (var i = 0; i < pl; i++) {

        // Check status and publish date with wordpress API
        // $.ajax({
        //     type: 'GET',
        //     url: 'wp-json/wp/v2/posts/' + posts[i].id,
        //     dataType: 'json',
        //     async: true
        // }).done(function (json) {
        //     var current_time = new Date().getTime();
        //     var post_time = new Date(json.date).getTime();
        //     if (current_time >= post_time && json.status == 'publish') {
        //         item = document.createElement('div')
        //         item.className = 'swiper-slide'
        //         link = document.createElement('a')
        //         link.className = 'topics-link'
        //         link.setAttribute('href', posts[i].url)
        //         link.setAttribute('title', posts[i].title)

        //         // Image Wrapper
        //         imageWrap = document.createElement('div')
        //         imageWrap.className = 'topics-img'

        //         // Image
        //         image = document.createElement('img')
        //         image.src = posts[i].image
        //         // image.src = "https://demo7s.com/test/gmo/hondago2/wp-content/uploads/2022/11/top_thumnail_dax.webp"
        //         image.width = 720
        //         image.height = 405
        //         imageWrap.appendChild(image)
        //         link.appendChild(imageWrap)

        //         contentWrap = document.createElement('div')
        //         contentWrap.className = 'topics-inner'
        //         link.appendChild(contentWrap)

        //         if (posts[i]?.label_new) {
        //             topicsNew = document.createElement('span')
        //             topicsNew.className = 'topics-new'
        //             contentWrap.appendChild(topicsNew)
        //         }

        //         title = document.createElement('h3')
        //         title.className = 'topics-title'
        //         title.textContent = posts[i].title
        //         contentWrap.appendChild(title)

        //         // Date
        //         date = document.createElement('p')
        //         date.className = 'topics-date'
        //         date.textContent = posts[i].date
        //         contentWrap.appendChild(date)

        //         item.appendChild(link)
        //         posts[i].element = item;

        //         slierWrapper.appendChild(posts[i].element.cloneNode(true));
        //     }
        // }).fail(function (json) {
        //     console.error('最近チェックした記事の取得に失敗しました。')
        // });
        // }
    }
}
if (!document.querySelector('.article-detail')) {
    bike_display_recently_viewed()
}

$(document).ready(function () {
    var previousActiveTabIndex = 0;
    var openMap = false;
    $(".tab-switcher").on('click keypress', function (event) {
        // event.which === 13 means the "Enter" key is pressed
        $(".tab-switcher").removeClass("active");
        $(this).addClass("active");
        if ((event.type === "keypress" && event.which === 13) || event.type === "click") {

            var tabClicked = $(this).data("tab-index");
            var tabName = $(this).data("tab-name");

            if (tabClicked != previousActiveTabIndex) {
                $("#allTabsContainer .tab-container").each(function () {
                    if ($(this).data("tab-index") == tabClicked) {
                        $(".tab-container").hide();
                        $(this).show();
                        previousActiveTabIndex = $(this).data("tab-index");
                        return;
                    }
                });
                if (tabName == 'map' && openMap === false) {
                    initMap();
                    openMap = true;
                }
            }
        }
    });
});

$(function () {

    $(".accordion_arrow").on("click", function (e) {

        // e.preventDefault();
        var $accordion_title = $(this).closest('.accordion_title');

        if (!$accordion_title.hasClass("accordion-active")) {
            $(".accordion_content").slideUp(400);
            $(".accordion_title").removeClass("accordion-active");
            $('.accordion_arrow').removeClass('accordion_rotate');
        }

        $accordion_title.toggleClass("accordion-active");
        $accordion_title.next().slideToggle();
        $(this).toggleClass('accordion_rotate');
    });

});