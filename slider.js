
/* 繧ｹ繝ｩ繧､繝繝ｼ */
var swiper = new Swiper(".hero-slider", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 12,
  speed: 500,
  loop: true,
  autoHeight: true,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    1200: {
      spaceBetween: 16,
    },
  },
});

/* 最新の記事 */
var swiper = new Swiper(".topics-slider-latest", {
  slidesPerView: 'auto',
  speed: 500,
  freeMode: true,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  breakpoints: {
    1200: {
      freeMode: false,
      slidesPerGroup: 3,
    },
    1501: {
      freeMode: false,
      slidesPerGroup: 4,
    },
    2101: {
      freeMode: false,
      slidesPerGroup: 5,
    }
  },
});

/* 人気記事トップ10 */
var swiper = new Swiper(".topics-slider-ranking", {
  slidesPerView: 'auto',
  speed: 500,
  freeMode: true,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  breakpoints: {
    1200: {
      freeMode: false,
      slidesPerGroup: 3,
    },
    1501: {
      freeMode: false,
      slidesPerGroup: 4,
    },
    2101: {
      freeMode: false,
      slidesPerGroup: 5,
    }
  },
});

/* ツーリングスポット */
var swiper = new Swiper(".touring-slider", {
  slidesPerView: 'auto',
  speed: 500,
  // spaceBetween: 40,
  freeMode: true,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  // pagination: {
  //   el: ".swiper-touring",
  //   clickable: true,
  // },
  breakpoints: {
    1200: {
      freeMode: false,
      slidesPerGroup: 3,
    },
    1501: {
      freeMode: false,
      slidesPerGroup: 4,
    },
    2101: {
      freeMode: false,
      slidesPerGroup: 5,
    }
  },
});

/* バイクの記事 */
var swiper = new Swiper(".topics-slider-bike", {
  slidesPerView: 'auto',
  speed: 500,
  freeMode: true,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  breakpoints: {
    1200: {
      freeMode: false,
      slidesPerGroup: 3,
    },
    1501: {
      freeMode: false,
      slidesPerGroup: 4,
    },
    2101: {
      freeMode: false,
      slidesPerGroup: 5,
    }
  },
});

/* バイクライフの記事 */
var swiper = new Swiper(".topics-slider-life", {
  slidesPerView: 'auto',
  speed: 500,
  freeMode: true,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  breakpoints: {
    1200: {
      freeMode: false,
      slidesPerGroup: 3,
    },
    1501: {
      freeMode: false,
      slidesPerGroup: 4,
    },
    2101: {
      freeMode: false,
      slidesPerGroup: 5,
    }
  },
});

/* イベント・レースの記事 */
var swiper = new Swiper(".topics-slider-event", {
  slidesPerView: 'auto',
  speed: 500,
  freeMode: true,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  breakpoints: {
    1200: {
      freeMode: false,
      slidesPerGroup: 3,
    },
    1501: {
      freeMode: false,
      slidesPerGroup: 4,
    },
    2101: {
      freeMode: false,
      slidesPerGroup: 5,
    }
  },
});

/* 最近チェックした記事 */
var swiper = new Swiper(".topics-slider-viewed", {
  slidesPerView: 'auto',
  speed: 500,
  freeMode: true,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  breakpoints: {
    1200: {
      freeMode: false,
      slidesPerGroup: 3,
    },
    1501: {
      freeMode: false,
      slidesPerGroup: 4,
    },
    2101: {
      freeMode: false,
      slidesPerGroup: 5,
    }
  },
});

/* 関連記事 */
var swiper = new Swiper(".topics-slider-related", {
  slidesPerView: 'auto',
  speed: 500,
  freeMode: true,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  breakpoints: {
    1200: {
      freeMode: false,
      slidesPerGroup: 3,
    },
    1501: {
      freeMode: false,
      slidesPerGroup: 4,
    },
    2101: {
      freeMode: false,
      slidesPerGroup: 5,
    }
  },
});

/* 莠ｺ豌苓ｨ倅ｺ九ヨ繝��10 */
var swiper = new Swiper(".topics-slider-popular", {
  slidesPerView: 'auto',
  speed: 500,
  freeMode: true,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  breakpoints: {
    1200: {
      freeMode: false,
      slidesPerGroup: 3,
    },
    1501: {
      freeMode: false,
      slidesPerGroup: 4,
    },
    2101: {
      freeMode: false,
      slidesPerGroup: 5,
    }
  },
});