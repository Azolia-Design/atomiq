const mainScript = () => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
    console.log('Mintlayer script loaded');

    const parseRem = (input) => {
        return input / 10 * parseFloat(window.getComputedStyle(document.querySelector('html')).getPropertyValue("font-size"));
    }
    const childSelect = (parent) => {
        return (child) => child ? $(parent).find(child) : parent;
    }
    const lenis = new Lenis()
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', function (inst) {
        $('.header-menu-item-drop').removeClass('active');

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

    if ($('.accord-item-wrap').length >=1) {
        $('.accord-item-body').slideUp()
        $('.accord-item-wrap').each(function() {
            const $this = $(this);
            const $accordHead = $this.find('.accord-item-head');
            const $accordContent = $this.find('.accord-item-body');
            $accordHead.on('click', function() {
                if ($this.hasClass('active')) {
                    $this.removeClass('active');
                    $accordContent.slideUp();
                } else {
                    $('.accord-item-wrap').removeClass('active');
                    $('.accord-item-body').slideUp()
                    $this.addClass('active');
                    $accordContent.slideDown();
                }
            })
        })
    }

    const handleHeader = {
        open: () => {
            $('.header-ham-link').addClass('active');
            $('.header').addClass('on-open');
            $('.header-menu').addClass('active');
        },
        close: () => {
            $('.header-ham-link').removeClass('active')
            $('.header').removeClass('on-open');
            $('.header-menu').removeClass('active')
        }
    }
    $('.header-ham-link').on('click', function(e) {
        e.preventDefault()
        if (!$(this).hasClass('active')) {
            handleHeader.open()
        } else {
            handleHeader.close()
        }
    })

    const headerDropdown = () => {
        $('.header-menu-item-drop').each((idx, el) => {
            let rowCount = $(el).find('.header-menu-item-drop-link').length;
            if (rowCount < 5) {
                $(el).css('grid-template-rows', `repeat(${rowCount}, minmax(1px, 1fr))`)
            }
        })
        $('.header-menu-item-link, .header-act .btn.btn-purple').on('click', function(e) {
            e.preventDefault();
            let target = $(this).closest('.header-menu-item').find('.header-menu-item-drop')
            target.toggleClass('active');
            $('.header-menu-item-drop').not(target).removeClass('active');
        })
        $(window).on('click', function() {
            if (!$('.header-menu-item-link:hover').length)
                if (!$('.header-menu-item-drop:hover').length)
                    if (!$('.header-act .btn.btn-purple:hover').length)
                        $('.header-menu-item-drop').removeClass('active');
        })
    }

    const headerDropdownAccordion = () => {
        $('.header-menu-item-drop').hide();

        function activeAccordion(index) {
            $('.header-menu-item-drop').eq(index).slideToggle();
            $('.header-menu-item-link').eq(index).toggleClass("active");

            $('.header-menu-item-drop').not($('.header-menu-item-drop').eq(index)).slideUp();
            $('.header-menu-item-link').not( $('.header-menu-item-link').eq(index)).removeClass("active");
        };

        $('.header-menu-item-link, .header-act .btn.btn-purple').on("click", function (e) {
            e.preventDefault();
            let parent = $(this).closest('.header-menu-item');
            let dropdowns = parent.find('.header-menu-item-drop');
            dropdowns.slideToggle();
            parent.toggleClass("active");

            $('.header-menu-item-drop').not(dropdowns).slideUp();
            $('.header-menu-item').not(parent).removeClass("active");
        })
    }
    if ($(window).width() <= 767) {
        headerDropdownAccordion();
    } else {
        headerDropdown();
    }

    gsap.to('.footer-ic-main', { rotation: 360, duration: 4, repeat: -1, ease: 'power3.inOut' })

    let currSec = $('section').eq(0);
    $(window).on("scroll", function () {
        let scrollPos = $(window).scrollTop();
        $('section').each((idx, el) => {
            if (scrollPos > $(el).offset().top && scrollPos < $(el).offset().top + $(el).height()) {
                currSec = $(el);
            }
        })
        if (currSec.attr('data-section') == 'dark') {
            $('.header').addClass('on-dark');
        } else {
            $('.header').removeClass('on-dark');
        }
        lastPos = $(window).scrollTop();
    });

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
            radgrad.addColorStop(0, 'rgba(105,238,150,' + this.opacity * .8 + ')'); // Inner color
            radgrad.addColorStop(0.55, 'rgba(186,255,132,' + this.opacity * .55 + ')'); // Middle color
            radgrad.addColorStop(1, 'rgba(227,255,199, .0)'); // Outer color

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
                defaults: {ease: "none"}
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

            let canvas = $(`${wrapEl} [data-part-device=${device}]`).find('[data-part="canvas"]').get(0);

            let ctx = canvas.getContext("2d");

            function setCanvasSize(){
                ctx.canvas.width = canvas.clientWidth;
                ctx.canvas.height= canvas.clientHeight;
            }
            setCanvasSize()

            $(window).resize(function(){
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
                    if  (!p.alive) {
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

    function initAnimPath(target, options = {}) {
        const { delay, reverse, fade, ...newOptions } = options;

        let canvas = $(`${target} [data-part="canvas"]`).get(0);
        let ctx;

        let particles = [];
        let spawnTimer = 0;
        let spawnFreq = 100; // how often should particles spawn (ms)
        let spawnRate = 2; // how many should spawn

        function setCanvasSize(ctx) {
            ctx.canvas.width = canvas.clientWidth;
            ctx.canvas.height= canvas.clientHeight;
        }

        if (canvas) {
            ctx = canvas.getContext("2d");
            setCanvasSize(ctx);

            $(window).resize(function(){
                setCanvasSize();
            })
        }

        $(`${target} [data-anim-path="wrap"]`).each((_, item) => {
            const parent = childSelect(item);

            parent('[data-anim-path="dot"]').each((i, dot) => {
                gsap.set(dot, { opacity: 0 });

                if (canvas) {
                    gsap.ticker.add((time, deltaTime) => {
                        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
                        // loop in reverse to remove particles that aren't alive
                        for (let i = particles.length - 1; i >= 0; i--) {
                            const p = particles[i];
                            if  (!p.alive) {
                                // removes dead particle
                                particles.splice(i, 1);
                            } else {
                                p.draw(ctx);
                            }
                        }

                        // emmitter position
                        const x = $(dot).offset().left - $(`${target} [data-part="canvas"]`).offset().left + $(dot).get(0).getBoundingClientRect().width / 2;
                        const y = $(dot).offset().top - $(`${target} [data-part="canvas"]`).offset().top + $(dot).get(0).getBoundingClientRect().height / 2

                        spawnTimer -= deltaTime;

                        while (spawnTimer <= 0) {

                            spawnTimer += spawnFreq;

                            let i = spawnRate;
                            while (i--) {
                                particles.push(new Particle(x, y, ctx));
                            }
                        }
                    });
                }

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
                        if (this.ratio > 0.02 && this.ratio < 0.96) gsap.to(dot, { opacity: 1, duration: 0.4, scale: 1, ease: 'linear' })
                        else gsap.to(dot, { opacity: 0, duration: 0.4, scale: .3,  ease: 'linear' })
                    },
                    ...newOptions
                }
                gsap[reverse ? "from" : "to"](dot, dotAnim);
            })
        })
    }

    const SCRIPT = {};
    SCRIPT.homeScript = () => {
        let videoPlayed = false
        $('.home-hero-vid-inner').on('click', function(e) {
            e.preventDefault();
            if (!videoPlayed) {
                $(this).find('video').attr('controls','true').removeAttr('muted').css('pointer-events', 'auto')
                $(this).removeClass('hover-img').css('pointer-events', 'none')
                $(this).find('.stake-wrallet-vid-ic').addClass('de-active')
                $(this).find('video').get(0).volume = 0.8;
                $(this).find('video').get(0).muted = !$(this).find('video').get(0).muted;
                videoPlayed = true;
            }
        })
        if ( $(window).width() > 767 ) {
            const homeNewsSwiper = new Swiper('.home-news-cms', {
                slidesPerView: 2,
                spaceBetween: parseRem(16),
                navigation: {
                    prevEl: '.home-news-nav-prev',
                    nextEl: '.home-news-nav-next',
                },
            })
        }
        initParticleAlongPath({ target: '.home-token-bg' }, true, true);
        initParticleAlongPath({ target: '.home-tech-bg' }, false);

        $('.home-token-bg-wrap svg circle').each((_, item) => {
            gsap.set(item, { opacity: 0 })
            gsap.to(item, {
                opacity: 1, duration: .3, ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1
                } })
        })

        $('.home-cta-main').addClass('default')
        ScrollTrigger.create({
            trigger: '.home-cta-main',
            start: 'top center',
            end: 'bottom center',
            onEnter: () => $('.home-cta-main').removeClass('default'),
            onEnterBack: () => $('.home-cta-main').removeClass('default'),
            onLeave: () => $('.home-cta-main').addClass('default'),
            onLeaveBack: () => $('.home-cta-main').addClass('default'),
            scrub: true
        })

        gsap.set('.home-tech', {"background-color": '#454646'})
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-tech',
                start: 'top center',
                end: 'bottom bottom',
                scrub: 1,
            },
            defaults: {ease: "none"}
        })
        tl
        .to('.home-tech', {
            "background-color": '#202120'
        })
        .to('.home-tech', {
            "background-color": '#000000'
        })

        const joinCommunityMode = {
            dark: () => {
                if ($('.home-join').hasClass('dark-mode')) {
                    $('.home-join').removeClass('dark-mode');
                    $('.home-news').removeClass('dark-mode');
                    $('.home-news-main-grad').removeClass('dark-mode');
                    $('.home-news-item-title-link').removeClass('dark-mode');
                    $('.home-news-item-sub').removeClass('dark-mode');
                    $('.btn-ic-grey-light').removeClass('dark-mode')
                    $('.footer-custom-bg').removeClass('bg-black');
                    $('.home-tech').addClass('light-mode');
                }
            },
            light: () => {
                if (!$('.home-join').hasClass('dark-mode')) {
                    $('.home-join').addClass('dark-mode');
                    $('.home-news').addClass('dark-mode');
                    $('.home-news-main-grad').addClass('dark-mode');
                    $('.home-news-item-title-link').addClass('dark-mode');
                    $('.home-news-item-sub').addClass('dark-mode');
                    $('.btn-ic-grey-light').addClass('dark-mode')
                    $('.footer-custom-bg').addClass('bg-black');
                    $('.home-tech').removeClass('light-mode');
                }
            }
        }

        ScrollTrigger.create({
            trigger: '.home-join',
            start: 'top center',
            end: 'bottom center',
            endTrigger: '.footer',
            scrub: true,
            onEnter: joinCommunityMode.dark,
            onEnterBack: joinCommunityMode.dark,
            onLeave: joinCommunityMode.light,
            onLeaveBack: joinCommunityMode.light
        })

        let all = $('.home-val-cus-ic-inner')
        gsap.to(all,{rotation: 360, duration: 3, stagger: .15, repeat: -1, ease: 'expo.inOut'})

        let doneInit = false;
        function initLoop() {
            console.log('checking')
            if ($('.home-hero-title').hasClass('anim-inside')) {
                setTimeout(() => {
                    // console.log('anim')
                    // let tl = gsap.timeline({
                    //     repeat: -1
                    // })
                    // tl
                    // .fromTo($('.home-hero-title .ic-lock path').eq(1), {x: 0, rotation: '0deg'}, {x: -1, rotation: '29deg', duration: .5})

                }, 1000);
            } else {
                requestAnimationFrame(initLoop)
            }
        }
        requestAnimationFrame(initLoop)
    }
    SCRIPT.aboutScript = () => {
        initAnimPath('.abt-hero-bg', { duration: 8, delay: 2 });
        initAnimPath('.abt-abt-bg', { duration: 8, delay: 1.5 });
        initAnimPath('.abt-ques-bg', { duration: 6, delay: 1.5 });

        function particleIllus() {
            let canvas = $(`.abt-abt-illu [data-part="canvas"]`).get(0);
            let ctx = canvas.getContext("2d");

            function setCanvasSize(){
                ctx.canvas.width = canvas.clientWidth;
                ctx.canvas.height= canvas.clientHeight;
            }
            setCanvasSize()

            $(window).resize(function(){
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
                    if  (!p.alive) {
                        // removes dead particle
                        particles.splice(i, 1);
                    } else {
                        p.draw(ctx);
                    }
                }

                // emmitter position
                const x = $(`.abt-abt-illu [data-part="target"]`).offset().left - $('.abt-abt-illu [data-part="canvas"]').offset().left + $('.abt-abt-illu [data-part="target"]').get(0).getBoundingClientRect().width / 2;
                const y = $(`.abt-abt-illu [data-part="target"]`).offset().top - $('.abt-abt-illu [data-part="canvas"]').offset().top + $('.abt-abt-illu [data-part="target"]').get(0).getBoundingClientRect().height / 2

                spawnTimer -= deltaTime;

                while (spawnTimer <= 0) {

                    spawnTimer += spawnFreq;

                    let i = spawnRate;
                    while (i--) {
                        particles.push(new Particle(x, y, ctx));
                    }
                }
            });
        }
        particleIllus();
    }
    SCRIPT.stakingScript = () => {
        initAnimPath('.stak-tool-link-img', { duration: 6, delay: 3, fade: true });
    }
    SCRIPT.blogScript = () => {
        initAnimPath('.blog-hero-bg-left', { duration: 15, delay: 3 })
        initAnimPath('.blog-hero-bg-right', { duration: 10, delay: 5 })
        initAnimPath('.glob-cta-illu', {
            duration: 10, delay: 1.5,
            onUpdate: function () {
                const FadingByIndex = (index, { start, end }) => {
                    let el = this.targets()[0];
                    if (index == el.getAttribute('data-dot-index')) {
                        if (this.ratio > start || this.ratio < end) gsap.to(el, { opacity: 1, duration: 0.3, scale: 1, ease: 'linear' })
                        else gsap.to(el, { opacity: 0, duration: 0.3, scale: 0, ease: 'linear' })
                    }
                }
                FadingByIndex(1, { start: .85, end: .62 });
                FadingByIndex(2, { start: .85, end: .62 });
                FadingByIndex(3, { start: .58, end: .35 });
        }})
    }
    SCRIPT.ecosystemScript = () => {
        initAnimPath('.eco-hero-illu-wrap', {
            duration: 10, delay: 2,
            onUpdate: function () {
                let dot = this.targets()[0];
                if (this.ratio > 0.02 && this.ratio < 0.96) gsap.to(dot, { opacity: 1, duration: 0.4, scale: 1, ease: 'linear' })
                else gsap.to(dot, { opacity: 0, duration: 0.4, scale: .3, ease: 'linear' })

                if (this.ratio > .97) {
                    $('#paint5_linear_1241_19634').addClass('active');
                    setTimeout(() => {
                        $('#paint5_linear_1241_19634').removeClass('active');
                    }, 500);
                }
            }
        })
    }
    SCRIPT.communityScript = () => {
        const formSubmitEvent = (function () {
            const init = ({
                onlyWorkOnThisFormName,
                onSuccess,
                onFail
            }) => {
                $(document).ajaxComplete(function (event, xhr, settings) {
                    if (settings.url.includes("https://webflow.com/api/v1/form/")) {
                        const isSuccessful = xhr.status === 200
                        const isWorkOnAllForm = onlyWorkOnThisFormName == undefined
                        const isCorrectForm = !isWorkOnAllForm && settings.data.includes(getSanitizedFormName(onlyWorkOnThisFormName));

                        if(isWorkOnAllForm){
                            if(isSuccessful){
                                onSuccess?.()
                            }else{
                                onFail?.()
                            }
                        }else if(isCorrectForm ){
                            if(isSuccessful){
                                onSuccess?.()
                            }else{
                                onFail?.()
                            }
                        }
                    }
                });
            }
            function getSanitizedFormName(name) {
                return name.replaceAll(" ","+")
            }
            return {
                init
            }
        })()
        let originText = $('.com-ctc-acts .txt.txt-16').text();
        $('.com-ctc-submit-btn').on('click', function() {
            $('.com-ctc-acts .txt.txt-16').text('Sending...');
        })
        formSubmitEvent.init({
            onlyWorkOnThisFormName : "Contact form",
            onSuccess: () => {
                $('.com-ctc-success').addClass('active');
                $('.com-ctc-form-inner').trigger('reset');
                $('.com-ctc-acts .txt.txt-16').text(originText);
                setTimeout(() => {
                    $('.com-ctc-success').removeClass('active');
                }, 3000);
            },
            onFail : () => {
                alert("Something went wrong! Please try again.");
                $('.com-ctc-acts .txt.txt-16').text(originText);
            }
        })
    }
    SCRIPT.learnScript = () => {
        if ($(window).width() > 991 ) {
            $('.learn-why-head-item-inner').removeClass('active').eq(0).addClass('active');
            $('.learn-why-main-item-body-inner').removeClass('active').eq(0).addClass('active');

            $('.learn-why-head-item-inner').on('mouseover', function() {
                const $this = $(this);
                const index = $this.closest('.learn-why-head-item').index();
                $('.learn-why-head-item-inner').removeClass('active');
                $this.addClass('active');
                $('.learn-why-main-item-body-inner').removeClass('active').eq(index).addClass('active');
            });
        } else {
            $('.learn-why-main-item-head').on('click', function(e) {
                e.preventDefault();
                if (!$(this).hasClass('active')) {
                    $('.learn-why-main-item-head').removeClass('active')
                    $(this).addClass('active')
                    $('.learn-why-main-item-body').slideUp()
                    $(this).parents('.learn-why-main-item').find('.learn-why-main-item-body').slideDown()
                } else {
                    $('.learn-why-main-item-head').removeClass('active')
                    $('.learn-why-main-item-body').slideUp()
                }

            })
        }
    }
    SCRIPT.mediaScript = () => {
        initAnimPath('.media-ques-bg', { duration: 6, delay: 1.5, reverse: true });
        if ($(window).width() > 767) {
            $('.media-main').each((idx, el) => {
                const mediaSwiper = new Swiper($(el).find('.media-main-cms').get(0), {
                    slidesPerView: 3,
                    spaceBetween: parseRem(16),
                    mousewheel: {
                        enabled: true,
                        forceToAxis: true,
                    },
                    pagination: {
                        el: $(el).find('.media-main-pagi').get(0),
                        bulletClass: 'media-main-pagi-bullet',
                        bulletActiveClass: 'media-main-pagi-bullet-active',
                    }
                })
            })
        }
    }
    SCRIPT.techScript = () => {
        initAnimPath('.tech-build-illu', {
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
        initAnimPath('.tech-inspi-illu', { duration: 10, delay: 2, fade: true })
        initAnimPath('.tech-ques-bg', { duration: 8, delay: 2 });
        if ($(window).width() > 991) {

            $('.tech-fea-head-item-inner').removeClass('active').eq(0).addClass('active');
            $('.tech-fea-main-item-body-inner').removeClass('active').eq(0).addClass('active');
            $('.tech-fea-head-item-inner').on('mouseover', function(e) {
                const $this = $(this);
                const index = $this.closest('.tech-fea-head-item').index();
                $('.tech-fea-head-item-inner').removeClass('active');
                $this.addClass('active');
                $('.tech-fea-main-item-body-inner').removeClass('active').eq(index).addClass('active');
            });
        } else {
            $('.tech-fea-main-item-body').css('display', 'none')
            const activeIdx = {
                active: (el) => {
                    $('.tech-fea-main-item-head').removeClass('active')
                    $(el).addClass('active')

                    $('.tech-fea-main-item-body').removeClass('active').slideUp()
                    $(el).parents('.tech-fea-main-item-inner').find('.tech-fea-main-item-body').addClass('active').slideDown()
                },
                deactive: () => {
                    $('.tech-fea-main-item-body').removeClass('active').slideUp()
                    $('.tech-fea-main-item-head').removeClass('active')
                }
            }
            activeIdx.active($('.tech-fea-main-item-head')[0])
            $('.tech-fea-main-item-head').on('click', function(e) {
                e.preventDefault();
                console.log('object');
                if (!$(this).hasClass('active')) {
                    activeIdx.active($(this))
                } else {
                    activeIdx.deactive()
                }
            })
        }
        setTimeout(() => {
            initParticleAlongPath({ target: '.tech-road' });
        }, 800)
    }
    SCRIPT.careerScript = () => {
        initAnimPath('.career-main-bg', { duration: 10, delay: 2 });
    }
    SCRIPT.teleScript = () => {
        if ($(window).width() < 768) {
            $('[data-swiper=swiper]').each((idx, el) => {
                $(el).addClass('swiper')
                $(el).find('[data-swiper=wrapper]').addClass('swiper-wrapper')
                $(el).find('[data-swiper=slide]').addClass('swiper-slide')

                const swiper = new Swiper( el , {
                    slidesPerView: 1,
                    centeredSlides: true,
                    speed: 400,
                    spaceBetween: parseRem(16),
                    pagination: {
                        el: '.tele-benefit-pagi',
                        bulletClass: 'tele-main-pagi-bullet',
                        bulletActiveClass: 'tele-main-pagi-bullet-active',
                    },
                });
            })
        }
    }
    SCRIPT.roadScript = () => {
        gsap.set('.road-year', { "background-color": '#454646' })
        gsap.to($('.dot-rotate-ic-inner'), {rotation: 360, transformOrigin: "center", duration: 3, stagger: .15, repeat: -1, ease: 'expo.inOut'})
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.road-year',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            },
            defaults: {ease: "none"}
        })
        tl
        .to('.road-year', {
            "background-color": '#202120'
        })
        .to('.road-year', {
            "background-color": '#000000'
        })
        initParticleAlongPath({ target: '.road-year', start: `top ${$('.road-year').offset().top}px` });
        if ( $(window).width() > 767 ) {
            const homeNewsSwiper = new Swiper('.home-news-cms', {
                slidesPerView: 2,
                spaceBetween: parseRem(16),
                navigation: {
                    prevEl: '.home-news-nav-prev',
                    nextEl: '.home-news-nav-next',
                },
            })
        } else {
            $('[data-swiper=swiper]').each((idx, el) => {
                $(el).addClass('swiper')
                $(el).find('[data-swiper=wrapper]').addClass('swiper-wrapper')
                $(el).find('[data-swiper=slide]').addClass('swiper-slide')

                const swiper = new Swiper(el, {
                    slidesPerView: 1,
                    centeredSlides: true,
                    speed: 400,
                    spaceBetween: parseRem(16),
                    pagination: {
                        el: '.road-now-pagi',
                        bulletClass: 'road-now-pagi-bullet',
                        bulletActiveClass: 'road-now-pagi-bullet-active',
                    },
                });
            })
        }
    }
    SCRIPT.tokenScript = () => {
        initTokenChart();

        initAnimPath('.token-hero-bg-left', { duration: 12, delay: 3 });
        initAnimPath('.token-hero-bg-right', { duration: 8, delay: 5 });
        initAnimPath('.token-staking-bg', { duration: 10, delay: 2 });
        initAnimPath('.token-faq-bg', { duration: 10, delay: 2 });

        const tokenIntroMode = {
            light: () => {
                $('.token-hero').attr('data-section', '')
                $('.token-hero').removeClass('dark-mode');
                $('.token-intro').removeClass('dark-mode');
                $('.token-intro').attr('data-section', '');
                $('.token-staking').removeClass('dark-mode');
                $('.footer-custom-bg').removeClass('bg-black');
            },
            dark: () => {
                $('.token-hero').attr('data-section', 'dark');
                $('.token-hero').addClass('dark-mode');
                $('.token-intro').addClass('dark-mode');
                $('.token-intro').attr('data-section', 'dark');
                $('.token-staking').addClass('dark-mode');
                $('.footer-custom-bg').addClass('bg-black');
            }
        }

        ScrollTrigger.create({
            trigger: '.token-intro',
            start: 'top-=200px top',
            end: 'bottom center',
            scrub: true,
            onEnter: tokenIntroMode.dark,
            onEnterBack: tokenIntroMode.dark,
            onLeave: tokenIntroMode.light,
            onLeaveBack: tokenIntroMode.light
        })
    }
    SCRIPT.termPrivacyScript=()=>{

    }

    const pageName = $(".main").attr("name-space");
	if (pageName) {
        console.log(`Running ${pageName} script`)
		SCRIPT[`${pageName}Script`]();
    }
    setTimeout(() => {
        AOS.init({
            offset: parseRem(100),
            duration: 600,
            once: true,
        });
    }, 100);

    //stop lenis
    lenis.stop();

    //reload lenis animations
    $(document).ready(function(){lenis.start();})
}
window.document.addEventListener('DOMContentLoaded', mainScript);