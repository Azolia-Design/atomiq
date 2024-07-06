const mainScript = () => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

    const lenis = new Lenis()

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf);

    const parseRem = (input) => {
        return input / 10 * parseFloat(window.getComputedStyle(document.querySelector('html')).getPropertyValue("font-size"));
    }

    const childSelect = (parent) => {
        return (child) => child ? $(parent).find(child) : parent;
    }

    function debounce(func, delay = 100){
        let timer;
        return function(event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, delay, event);
        };
    }

    lenis.on('scroll', function (inst) {
        if ($('.header').hasClass('on-open')) {
            $('.header').removeClass('on-open force');
            $('.header-menu').removeClass('active')
            $('.header-toggle-btn').removeClass('active')
        }

        if (inst.direction == 0 && inst.scroll >= $('.header').height()) {
            $('.header').addClass('on-scroll');
        }
        else if (inst.direction == 1) {
            if (inst.scroll >= $('.header').height()) {
                $('.header').addClass('on-hide on-scroll');
            } else {
                $('.header').removeClass('on-hide');
                $('.header').addClass('on-scroll');
            }
        } else if (inst.direction == -1) {
            if (inst.scroll >= $('.header').height()) {
                $('.header').removeClass('on-hide');
                $('.header').addClass('on-scroll');
            } else {
                $('.header').removeClass('on-hide on-scroll');
            }
        }
    })

    function refreshOnBreakpoint() {
        let initialViewportWidth = window.innerWidth || document.documentElement.clientWidth;
        // portrait mobile viewport initial, any change refresh
        if (initialViewportWidth < 480) {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth > 479) {
                    location.reload();
                }
            }))
        }
        // landscape mobile viewport initial, any change refresh
        else if (initialViewportWidth < 768) {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth > 767) {
                    location.reload();
                }
            }))
        }

        // tablet viewport initial, any change refresh
        else if (initialViewportWidth > 767 && initialViewportWidth < 992)  {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth < 768 || newViewportWidth > 991) {
                    location.reload();
                }
            }))
        }
        // web viewport initial, any change refresh
        else if (initialViewportWidth > 991) {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth < 992) {
                    location.reload();
                }
            }))
        }
    }
    refreshOnBreakpoint();

    class Particle {
        constructor(x, y, ctx, textureUrl, pointSize = 24) {
            this.alive = 1;
            this.x = x;
            this.y = y;
            this.radius = gsap.utils.random(parseRem(pointSize) * .65, parseRem(pointSize));
            this.color = 'rgb(255 0 0 / 100%)';
            this.opacity = 1;

            gsap.to(this, {
                alive: 0, // when 0, the particle is considered dead
                x: gsap.utils.random(x - 160, x + 160),
                y: gsap.utils.random(y - 160, y + 160),
                radius: 0,
                opacity: 0,
                duration: Math.random() < 0.5 ? 6 : 3 // 50/50 chance
            });
        }

        draw(ctx) {
            if (!this.alive) return; // Ensure the particle is alive

            // Set up the glow effect
            var radgrad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            radgrad.addColorStop(0, 'rgba(52,255,208,' + this.opacity * .8 + ')'); // Inner color
            radgrad.addColorStop(0.59, 'rgba(66,248,206,' + this.opacity * .46 + ')'); // Middle color
            radgrad.addColorStop(1, 'rgba(79,241,203, .0)'); // Outer color

            // Draw the particle with the gradient blur effect
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = radgrad; // Apply the gradient as the fill style
            ctx.fill();

            // Optionally, reset the shadow properties after drawing the particle
            // This prevents the glow effect from affecting other drawings on the canvas
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
    }

    class CountdownTimer {
        constructor(selector) {
            this.selector = selector;
            this.targetDate = $(this.selector).attr('data-launch-date');

            this.refs = {
                days: $(this.selector).find('[data-countdown="days"]'),
                hours: $(this.selector).find('[data-countdown="hours"]'),
                mins: $(this.selector).find('[data-countdown="mins"]'),
                secs: $(this.selector).find('[data-countdown="secs"]')
            }
        }
        getTimeRemaining(endTime) {
            const total = Date.parse(endTime) - Date.parse(new Date());

            const days = Math.floor(total / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            const hours = Math.floor((total / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
            const mins = Math.floor((total / 1000 / 60) % 60).toString().padStart(2, '0');
            const secs = Math.floor((total / 1000) % 60).toString().padStart(2, '0');

            return { total, days, hours, mins, secs };
        }
        updateTimer({ days, hours, mins, secs }) {
            this.refs.days.text(days);
            this.refs.hours.text(hours);
            this.refs.mins.text(mins);
            this.refs.secs.text(secs);
        }
        starterTime() {
            const timer = this.getTimeRemaining(this.targetDate);
            this.updateTimer(timer);
            setInterval(() => {
                const timer = this.getTimeRemaining(this.targetDate);
                this.updateTimer(timer);
            }, 1000);
        }
    }

    const countDown = new CountdownTimer('[data-countdown="wrap"]')
    countDown.starterTime();

    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    function checkOS() {
        if (typeof window == "undefined") return {};

        if (typeof deviceInfo == "undefined") {
            var unknown = "-";

            // screen
            var screenSize = "";
            if (screen.width) {
                var width = screen.width ? screen.width : "";
                var height = screen.height ? screen.height : "";
                screenSize += "" + width + " x " + height;
            }

            // browser
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var browser = navigator.appName;
            var version = "" + parseFloat(navigator.appVersion);
            var majorVersion = parseInt(navigator.appVersion, 10);
            var nameOffset, verOffset, ix;

            // Opera
            if ((verOffset = nAgt.indexOf("Opera")) != -1) {
                browser = "Opera";
                version = nAgt.substring(verOffset + 6);
                if ((verOffset = nAgt.indexOf("Version")) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }
            // Opera Next
            if ((verOffset = nAgt.indexOf("OPR")) != -1) {
                browser = "Opera";
                version = nAgt.substring(verOffset + 4);
            }
            // Edge
            else if ((verOffset = nAgt.indexOf("Edge")) != -1) {
                browser = "Microsoft Edge";
                version = nAgt.substring(verOffset + 5);
            }
            // MSIE
            else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
                browser = "Microsoft Internet Explorer";
                version = nAgt.substring(verOffset + 5);
            }
            // Chrome
            else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
                browser = "Chrome";
                version = nAgt.substring(verOffset + 7);
            }
            // Safari
            else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
                browser = "Safari";
                version = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf("Version")) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }
            // Firefox
            else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
                browser = "Firefox";
                version = nAgt.substring(verOffset + 8);
            }
            // MSIE 11+
            else if (nAgt.indexOf("Trident/") != -1) {
                browser = "Microsoft Internet Explorer";
                version = nAgt.substring(nAgt.indexOf("rv:") + 3);
            }
            // Other browsers
            else if ((nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/"))) {
                browser = nAgt.substring(nameOffset, verOffset);
                version = nAgt.substring(verOffset + 1);
                if (browser.toLowerCase() == browser.toUpperCase()) {
                    browser = navigator.appName;
                }
            }
            // trim the version string
            if ((ix = version.indexOf(";")) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(" ")) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(")")) != -1) version = version.substring(0, ix);

            majorVersion = parseInt("" + version, 10);
            if (isNaN(majorVersion)) {
                version = "" + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            // mobile version
            var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

            // cookie
            var cookieEnabled = navigator.cookieEnabled ? true : false;

            if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
                document.cookie = "testcookie";
                cookieEnabled = document.cookie.indexOf("testcookie") != -1 ? true : false;
            }

            // system
            var os = unknown;
            var clientStrings = [
                { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
                { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
                { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
                { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
                { s: "Windows Vista", r: /Windows NT 6.0/ },
                { s: "Windows Server 2003", r: /Windows NT 5.2/ },
                { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
                { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
                { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
                { s: "Windows 98", r: /(Windows 98|Win98)/ },
                { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
                { s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
                { s: "Windows CE", r: /Windows CE/ },
                { s: "Windows 3.11", r: /Win16/ },
                { s: "Android", r: /Android/ },
                { s: "Open BSD", r: /OpenBSD/ },
                { s: "Sun OS", r: /SunOS/ },
                { s: "Linux", r: /(Linux|X11)/ },
                { s: "iOS", r: /(iPhone|iPad|iPod)/ },
                { s: "Mac OS X", r: /Mac OS X/ },
                { s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
                { s: "QNX", r: /QNX/ },
                { s: "UNIX", r: /UNIX/ },
                { s: "BeOS", r: /BeOS/ },
                { s: "OS/2", r: /OS\/2/ },
                { s: "Search Bot", r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ },
            ];
            for (var id in clientStrings) {
                var cs = clientStrings[id];
                if (cs.r.test(nAgt)) {
                    os = cs.s;
                    break;
                }
            }

            var osVersion = unknown;

            if (/Windows/.test(os)) {
                const _osv = /Windows (.*)/.exec(os) || [];
                osVersion = _osv[1] || "unknown";
                os = "Windows";
            }

            switch (os) {
                case "Mac OS X":
                    const _osvx = /Mac OS X (10[\.\_\d]+)/.exec(nAgt);
                    osVersion = _osvx?.[1] || "unknown";
                    break;

                case "Android":
                    osVersion = /Android ([\.\_\d]+)/.exec(nAgt)?.[1] || "unknown";
                    break;

                case "iOS":
                    const _osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer) || [0, 0, 0];
                    osVersion = (_osVersion[1] || 0) + "." + (_osVersion[2] || 0) + "." + (_osVersion[3] || 0);
                    break;
            }

            const _deviceInfo = {
                screen: screenSize,
                browser: browser,
                browserVersion: version,
                browserMajorVersion: majorVersion,
                mobile: mobile,
                os: os,
                osVersion: osVersion,
                cookies: cookieEnabled,
            };

            deviceInfo = _deviceInfo;
        }

        return deviceInfo;
    };

    function updateVideoSrc() {
        if (checkOS().browser === 'Safari') {
            $('video[data-os-depend] [data-ext="webm"]').remove()
        } else {
            $('video[data-os-depend] [data-ext="mov"]').remove()
        }
        $('video[data-os-depend]').each(function(index) {
            $(this).get(0).load()
        })
    }
    updateVideoSrc();

    function initParticleAlongPath(triggerOptions, hideWhenComplete = true, reverse = false) {
        const { target: wrapEl } = triggerOptions;

        ScrollTrigger.create({
            trigger: wrapEl,
            start: 'top bottom',
            once: true,
            onEnter: () => onInitParticle()
        })

        function onInitParticle() {
            let device;
            if ($(window).width() > 991) {
                device = 'dk'
            } else if ($(window).width() > 767) {
                device = 'tb'
            } else {
                device = 'mb'
            }

            let isEntered = false;
            gsap.set(`${wrapEl} [data-part-device=${device}] [data-part="target"]`, {
                opacity: 0,
            })
            function setOpacity(isEntered) {
                gsap.to(`${wrapEl} [data-part-device=${device}] [data-part="target"]`, {
                    opacity: isEntered ? 1 : 0,
                    duration: .6,
                })
            }

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapEl,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1,
                    onEnter: () => {
                        isEntered = true;
                        setOpacity(isEntered);
                    },
                    onEnterBack: () => {
                        isEntered = true;
                        setOpacity(isEntered);
                    },
                    onLeave: () => {
                        if (hideWhenComplete) {
                            isEntered = false;
                            setOpacity(isEntered);
                        }
                    },
                    onLeaveBack: () => {
                        isEntered = false;
                        setOpacity(isEntered);
                    },
                    ...triggerOptions,
                },
                defaults: { ease: "none" }
            })
            if (reverse) {
                tl
                    .from(`${wrapEl} [data-part-device=${device}] [data-part="target"]`, {
                        motionPath: {
                            path: `${wrapEl} [data-part-device=${device}] [data-part="path"]`,
                            align: `${wrapEl} [data-part-device=${device}] [data-part="path"]`,
                            alignOrigin: [0.5, 0.5],
                            autoRotate: true
                        }
                    },)
            } else {
                tl
                    .to(`${wrapEl} [data-part-device=${device}] [data-part="target"]`, {
                        motionPath: {
                            path: `${wrapEl} [data-part-device=${device}] [data-part="path"]`,
                            align: `${wrapEl} [data-part-device=${device}] [data-part="path"]`,
                            alignOrigin: [0.5, 0.5],
                            autoRotate: true
                        }
                    },)
            }

            let canvas = $(`${wrapEl} [data-part-device=${device}] [data-part="canvas"]`).get(0);

            let ctx = canvas.getContext("2d");

            function setCanvasSize() {
                ctx.canvas.width = canvas.clientWidth;
                ctx.canvas.height = canvas.clientHeight;
            }
            setCanvasSize()

            $(window).resize(function () {
                setCanvasSize()
            })

            let particles = [];

            let spawnTimer = 0;
            let spawnFreq = 100; // how often should particles spawn (ms)
            let spawnRate = 2; // how many should spawn

            gsap.ticker.add((time, deltaTime) => {

                ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
                // loop in reverse to remove particles that aren't alive
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    if (!p.alive) {
                        // removes dead particle
                        particles.splice(i, 1);
                    } else {
                        p.draw(ctx);
                    }
                }

                // emmitter position
                const x = $(`${wrapEl} [data-part-device=${device}] [data-part="target"]`).offset().left - $(`${wrapEl} [data-part-device=${device}] [data-part="canvas"]`).offset().left + $(`${wrapEl} [data-part-device=${device}] [data-part="target"]`).get(0).getBoundingClientRect().width / 2;
                const y = $(`${wrapEl} [data-part-device=${device}] [data-part="target"]`).offset().top - $(`${wrapEl} [data-part-device=${device}] [data-part="canvas"]`).offset().top + $(`${wrapEl} [data-part-device=${device}] [data-part="target"]`).get(0).getBoundingClientRect().height / 2

                spawnTimer -= deltaTime;

                while (spawnTimer <= 0) {

                    spawnTimer += spawnFreq;

                    let i = spawnRate;
                    while (i--) {
                        if (!isEntered) return;
                        particles.push(new Particle(x, y, ctx));
                    }
                }
            });
        }
    }

    const handleHeader = {
        open: () => {
            $('.header').addClass('on-open force');
            $('.header-menu').addClass('active');
            $('.header-toggle-btn').addClass('active');
        },
        close: () => {
            $('.header').removeClass('on-open force');
            $('.header-menu').removeClass('active')
            $('.header-toggle-btn').removeClass('active')
        }
    }

    $('.header-toggle-btn').on('click', function (e) {
        e.preventDefault()
        if (!$(this).hasClass('active')) {
            handleHeader.open()
        } else {
            handleHeader.close()
        }
    })

    new Swiper('.home-team-listing-inner', {
        slidesPerView: "auto",
        navigation: {
            prevEl: '.home-team-control-arr.prev',
            nextEl: '.home-team-control-arr.next',
            disabledClass: "disabled"
        },
        mousewheel: {
            enabled: true,
            forceToAxis: true,
        }
    })
    initParticleAlongPath({ target: '.home-tech-bg' });

    $('.home-faq-item-body').hide();
    $('.home-faq-item-head').on("click", function (e) {
        e.preventDefault();
        let item = $(this).closest('.home-faq-item');
        let body = $(this).closest('.home-faq-item').find('.home-faq-item-body')
        body.slideToggle();
        item.toggleClass("active");

        $('.home-faq-item-body').not(body).slideUp();
        $('.home-faq-item').not(item).removeClass("active");
    })

    $('.home-article-inner').find('[data-swiper]').each((_, item) => {
        if ($(item).attr('data-swiper') == 'swiper')
            $(item).addClass('swiper')
        else
            $(item).addClass(`swiper-${$(item).attr('data-swiper')}`)
    })

    new Swiper('.home-article-list-cms', {
        slidesPerView: 'auto',
        spaceBetween: 25,
        navigation: {
            prevEl: '.home-article-control-arr.prev',
            nextEl: '.home-article-control-arr.next',
            disabledClass: "disabled"
        },
        mousewheel: {
            enabled: true,
            forceToAxis: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3
            }
        }
    })

    if ($(window).width() <= 767) {
        new Swiper('.home-roadmap-cms', {
            slidesPerView: 1.5,
            spaceBetween: 20,
            initialSlide: 2,
            centeredSlides: true,
            navigation: {
                prevEl: '.home-roadmap-control-arr.prev',
                nextEl: '.home-roadmap-control-arr.next',
                disabledClass: "disabled"
            },
            mousewheel: {
                enabled: true,
                forceToAxis: true,
            }
        })
    }

    function initAnimPath(target, options = {}) {
        const { delay, reverse, fade, ...newOptions } = options;

        $(`${target} [data-anim-path="wrap"]`).each((_, item) => {
            const parent = childSelect(item);
            parent('[data-anim-path="dot"]').each((i, dot) => {
                gsap.set(dot, { opacity: 0 });

                const dotAnim = {
                    duration: 3,
                    ease: "linear",
                    delay: i * (delay || .3),
                    repeat: -1,
                    motionPath: {
                        path: parent('[data-anim-path="line"]').get(0),
                        align: parent('[data-anim-path="line"]').get(0),
                        alignOrigin: [0.5, 0.5],
                        autoRotate: true
                    },
                    onStart: () => gsap.set(dot, { opacity: 1 }),
                    onUpdate: function () {
                        if (!fade) return;
                        if (this.ratio > 0.06) gsap.to(dot, { opacity: 1, duration: 0.4, scale: 1, ease: 'linear' })
                        else gsap.to(dot, { opacity: 0, duration: 0.4, scale: .5,  ease: 'linear' })
                    },
                    ...newOptions
                }
                gsap[reverse ? "from" : "to"](dot, dotAnim);
            })
        })
    }

    initAnimPath('.home-backer-join-ic', {
        duration: 8, delay: 1.5, reverse: true,
        onUpdate: function () {
            const FadingByIndex = (index, { start, end }) => {
                let el = this.targets()[0];
                if (index == el.getAttribute('data-dot-index')) {
                    if (this.ratio > start || this.ratio < end) gsap.to(el, { opacity: 1, duration: 0.3, scale: 1, ease: 'linear' })
                    else gsap.to(el, { opacity: 0, duration: 0.3, scale: 0, ease: 'linear' })
                }
            }
            FadingByIndex(1, { start: .65, end: .4 });
            FadingByIndex(2, { start: .65, end: .4 });
            FadingByIndex(3, { start: .925, end: .65 });
        }}
    );
    initAnimPath('.home-backer-line', { duration: 10, delay: 2, fade: true });
    initAnimPath('.home-app-bg', { duration: 10, delay: 2 });
    initAnimPath('.home-article-bg', { duration: 6, delay: 1.5 });
    initAnimPath('.home-cta-bg', { duration: 6, delay: 1.5 });
    $('.coming-link').on('click',function(e){
        e.preventDefault();
    })
    setTimeout(() => {
        AOS.init({
            offset: parseRem(100),
            duration: 600,
            once: true,
        });
    }, 100);

    lenis.stop();
    $(document).ready(function () { lenis.start(); })
}

window.document.addEventListener('DOMContentLoaded', mainScript);