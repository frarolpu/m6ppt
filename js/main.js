/* ============================================================
   SICE M6 Toll â€” Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-ready');
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initTabs();
    initCounters();
    initParticles();
    initSmoothScroll();
    initSiteGallery();
    initOboFlow();
    initLightbox();
    initTimelineReveal();
    initKpiCharts();
});

/* --- Navbar scroll behavior --- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        // Navbar background
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* --- Mobile menu --- */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        menu.classList.toggle('open');
    });

    // Close menu on link click
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            menu.classList.remove('open');
        });
    });
}

/* --- Scroll-triggered animations (lightweight AOS) --- */
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px 0px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* --- Tolling tabs --- */
function initTabs() {
    // Scope each .tolling-tabs group independently
    document.querySelectorAll('.tolling-tabs').forEach(container => {
        const btns   = container.querySelectorAll('.tab-btn');
        const panels = container.querySelectorAll('.tab-panel');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                btns.forEach(b   => b.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    });
}

/* --- Animated counters --- */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    function update() {
        current += step;
        if (current >= target) {
            el.textContent = target.toLocaleString();
            return;
        }
        el.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

/* --- Floating particles background --- */
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const count = 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (8 + Math.random() * 12) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = 0.2 + Math.random() * 0.4;
        container.appendChild(particle);
    }
}

/* --- Smooth scroll for anchor links --- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const top = target.offsetTop - navHeight;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* --- Site Gallery (Free-Flow Tolling) --- */
function initSiteGallery() {
    // Freeflow site gallery
    const freeflowWrap = document.getElementById('freeflow');
    if (freeflowWrap) {
        const btns = freeflowWrap.querySelectorAll('.site-gallery-btn');
        const imgs = freeflowWrap.querySelectorAll('.site-gallery-img');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const site = btn.dataset.site;
                btns.forEach(b => b.classList.remove('active'));
                imgs.forEach(i => i.classList.remove('active'));
                btn.classList.add('active');
                freeflowWrap.querySelector(`.site-gallery-img[data-site="${site}"]`).classList.add('active');
            });
        });
    }

    // MOMS gallery
    const momsWrap = document.getElementById('moms');
    if (momsWrap) {
        const btns = momsWrap.querySelectorAll('.site-gallery-btn');
        const imgs = momsWrap.querySelectorAll('.site-gallery-img');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.moms;
                btns.forEach(b => b.classList.remove('active'));
                imgs.forEach(i => i.classList.remove('active'));
                btn.classList.add('active');
                momsWrap.querySelector(`.site-gallery-img[data-moms="${key}"]`).classList.add('active');
            });
        });
    }

    // AAVI gallery
    const aaviWrap = document.getElementById('aavi');
    if (aaviWrap) {
        const btns = aaviWrap.querySelectorAll('.site-gallery-btn');
        const imgs = aaviWrap.querySelectorAll('.site-gallery-img');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.aavi;
                btns.forEach(b => b.classList.remove('active'));
                imgs.forEach(i => i.classList.remove('active'));
                btn.classList.add('active');
                aaviWrap.querySelector(`.site-gallery-img[data-aavi="${key}"]`).classList.add('active');
            });
        });
    }
}

/* --- Lightbox (single + gallery) --- */
function initLightbox() {
    const lightbox   = document.getElementById('lightbox');
    const lbImg      = document.getElementById('lightboxImg');
    const lbCaption  = document.getElementById('lightboxCaption');
    const lbClose    = document.getElementById('lightboxClose');
    const lbBackdrop = document.getElementById('lightboxBackdrop');
    if (!lightbox) return;

    let galleryImgs = [];
    let galleryIdx  = 0;

    // Inject prev/next buttons once
    const lbPrev = document.createElement('button');
    lbPrev.className = 'lightbox-nav lightbox-prev';
    lbPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';
    lbPrev.setAttribute('aria-label', 'Previous');
    const lbNext = document.createElement('button');
    lbNext.className = 'lightbox-nav lightbox-next';
    lbNext.innerHTML = '<i class="fas fa-chevron-right"></i>';
    lbNext.setAttribute('aria-label', 'Next');
    lightbox.querySelector('.lightbox-content').prepend(lbPrev);
    lightbox.querySelector('.lightbox-content').append(lbNext);

    function showSlide(idx) {
        galleryIdx = (idx + galleryImgs.length) % galleryImgs.length;
        lbImg.src = galleryImgs[galleryIdx].src;
        lbImg.alt = galleryImgs[galleryIdx].alt;
        lbCaption.textContent = galleryImgs[galleryIdx].alt;
    }

    function openSingle(src, alt) {
        galleryImgs = [];
        lbImg.src = src;
        lbImg.alt = alt;
        lbCaption.textContent = alt;
        lbPrev.hidden = true;
        lbNext.hidden = true;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function openGallery(imgs, startIdx) {
        galleryImgs = imgs;
        galleryIdx  = startIdx;
        lbPrev.hidden = imgs.length < 2;
        lbNext.hidden = imgs.length < 2;
        showSlide(startIdx);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lbImg.src = ''; }, 300);
    }

    // Single images
    document.querySelectorAll('[data-lightbox-single]').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openSingle(img.src, img.alt));
    });

    // Gallery images — group by data-lightbox-gallery attribute
    const galleries = {};
    document.querySelectorAll('[data-lightbox-gallery]').forEach(img => {
        img.style.cursor = 'zoom-in';
        const key = img.dataset.lightboxGallery;
        if (!galleries[key]) galleries[key] = [];
        galleries[key].push(img);
    });
    Object.values(galleries).forEach(imgs => {
        imgs.forEach((img, i) => {
            img.addEventListener('click', () => openGallery(imgs, i));
        });
    });

    lbPrev.addEventListener('click', () => showSlide(galleryIdx - 1));
    lbNext.addEventListener('click', () => showSlide(galleryIdx + 1));
    lbClose.addEventListener('click', close);
    lbBackdrop.addEventListener('click', close);
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape')      close();
        if (e.key === 'ArrowLeft')   showSlide(galleryIdx - 1);
        if (e.key === 'ArrowRight')  showSlide(galleryIdx + 1);
    });
}

/* --- OBO Sequential Flow Animation --- */
function initOboFlow() {
    const nextBtn    = document.getElementById('oboNext');
    const resetBtn   = document.getElementById('oboReset');
    const counterEl  = document.getElementById('oboStepCurrent');
    if (!nextBtn) return;

    const steps      = document.querySelectorAll('.obo-step');
    const connectors = document.querySelectorAll('.obo-connector');
    const total      = steps.length;
    let current      = 0;

    function advance() {
        if (current >= total) return;
        if (current > 0) {
            steps[current - 1].classList.remove('active');
            steps[current - 1].classList.add('done');
            if (connectors[current - 1]) connectors[current - 1].classList.add('lit');
        }
        steps[current].classList.remove('pending');
        steps[current].classList.add('active');
        current++;
        counterEl.textContent = current;
        if (current >= total) {
            nextBtn.innerHTML = '<i class="fas fa-check"></i> Complete';
            nextBtn.disabled  = true;
        } else {
            nextBtn.innerHTML = '<i class="fas fa-step-forward"></i> Next Step';
        }
    }

    function reset() {
        current = 0;
        steps.forEach(s => { s.classList.remove('active', 'done'); s.classList.add('pending'); });
        connectors.forEach(c => c.classList.remove('lit'));
        nextBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        nextBtn.disabled  = false;
        counterEl.textContent = '0';
    }

    nextBtn.addEventListener('click', advance);
    resetBtn.addEventListener('click', reset);
}
/* --- Equipment Migration Phase Switcher --- */
function eqmShowPhase(n) {
    document.querySelectorAll('.eqm-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.eqm-phase-btn').forEach(b => {
        b.className = 'eqm-phase-btn';
    });
    const panel = document.getElementById('eqm-phase' + n);
    if (panel) panel.classList.add('active');
    const btn = document.getElementById('eqm-btn' + n);
    if (btn) btn.classList.add('eqm-active-' + n);
}

/* --- KPI Charts --- */
function initKpiCharts() {
    if (typeof Chart === 'undefined') return;

    const TEAL       = '#00a99d';
    const TEAL_LIGHT = '#00d2be';
    const GOLD       = '#f6c90e';
    const GRID_COLOR = 'rgba(255,255,255,0.07)';
    const TICK_COLOR = 'rgba(255,255,255,0.35)';

    const months = ['05/25','06/25','07/25','08/25','09/25','10/25','11/25','12/25','01/26','02/26'];
    const qMonths = ['05/25','08/25','11/25','02/26'];

    function baseOpts(min, target, quarterly) {
        const labels = quarterly ? qMonths : months;
        return {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1400, easing: 'easeOutQuart' },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1a2a2f',
                    borderColor: TEAL,
                    borderWidth: 1,
                    callbacks: {
                        label: ctx => ` ${ctx.parsed.y !== null ? ctx.parsed.y.toFixed(2) + '%' : 'N/A'}`
                    }
                },
                annotation: {
                    annotations: {
                        targetLine: {
                            type: 'line', yMin: target, yMax: target,
                            borderColor: GOLD, borderWidth: 1.5,
                            borderDash: [6,4],
                            label: {
                                display: true, content: `Target ${target}%`,
                                color: GOLD, font: { size: 10, weight: '600' },
                                backgroundColor: 'rgba(26,42,47,0.85)',
                                position: 'end', yAdjust: -10
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: GRID_COLOR },
                    ticks: { color: TICK_COLOR, font: { size: 10 } }
                },
                y: {
                    min: min,
                    max: 100.1,
                    grid: { color: GRID_COLOR },
                    ticks: {
                        color: TICK_COLOR,
                        font: { size: 10 },
                        callback: v => v.toFixed(1) + '%'
                    }
                }
            }
        };
    }

    function makeDataset(data, color) {
        return {
            data,
            borderColor: color,
            backgroundColor: color + '22',
            pointBackgroundColor: data.map(v => v !== null ? color : 'transparent'),
            pointRadius: data.map(v => v !== null ? 5 : 0),
            pointHoverRadius: 7,
            borderWidth: 2.5,
            fill: true,
            tension: 0.35,
            spanGaps: true
        };
    }

    // ── Monthly charts ──────────────────────────────────────────────────
    // AC-08  VRN Image Capture  (target 99.70%)
    new Chart(document.getElementById('chartAC08'), {
        type: 'line',
        data: { labels: months, datasets: [ makeDataset(
            [99.95,99.92,99.90,99.95,99.93,99.92,99.94,99.93,99.95,99.93], TEAL
        )]},  
        options: baseOpts(99.5, 99.70, false)
    });

    // AC-10  Correct ANPR Accuracy  (target 98.80%)
    new Chart(document.getElementById('chartAC10'), {
        type: 'line',
        data: { labels: months, datasets: [ makeDataset(
            [99.72,99.68,99.70,99.75,99.65,99.68,99.72,99.70,99.71,99.69], TEAL_LIGHT
        )]},  
        options: baseOpts(98.5, 98.80, false)
    });

    // AV-01  ANPR Controller Availability  (target 99.99%)
    new Chart(document.getElementById('chartAV01'), {
        type: 'line',
        data: { labels: months, datasets: [ makeDataset(
            [99.96,99.99,100,100,99.98,99.98,100,100,99.92,100], TEAL
        )]},
        options: baseOpts(99.8, 99.99, false)
    });

    // ── Quarterly charts ─────────────────────────────────────────────────
    // AC-01  Detection Accuracy  (target 99.90%)
    new Chart(document.getElementById('chartAC01'), {
        type: 'bar',
        data: { labels: qMonths, datasets: [
            {
                label: 'Result',
                data: [99.98, null, 100, 99.99],
                backgroundColor: TEAL + 'cc',
                borderColor: TEAL,
                borderWidth: 2,
                borderRadius: 4
            }
        ]},
        options: baseOpts(99.7, 99.90, true)
    });

    // AC-07  VRN Image Association Accuracy  (target 99.90%)
    new Chart(document.getElementById('chartAC07'), {
        type: 'bar',
        data: { labels: qMonths, datasets: [
            {
                label: 'Result',
                data: [99.91, 99.90, 99.94, 99.92],
                backgroundColor: TEAL_LIGHT + 'cc',
                borderColor: TEAL_LIGHT,
                borderWidth: 2,
                borderRadius: 4
            }
        ]},
        options: baseOpts(99.7, 99.90, true)
    });

    // AC-09  ANPR Obtention Accuracy  (target 99.90%)
    new Chart(document.getElementById('chartAC09'), {
        type: 'bar',
        data: { labels: qMonths, datasets: [
            {
                label: 'Result',
                data: [100, 99.97, 99.94, 99.94],
                backgroundColor: TEAL + 'cc',
                borderColor: TEAL,
                borderWidth: 2,
                borderRadius: 4
            }
        ]},
        options: baseOpts(99.7, 99.90, true)
    });

    // ── Mini gauge bars ──────────────────────────────────────────────────
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.querySelectorAll('.kpi-bar-wrap').forEach(wrap => {
                const min    = parseFloat(wrap.dataset.min);
                const target = parseFloat(wrap.dataset.target);
                const val    = parseFloat(wrap.dataset.val);
                const range  = 100 - min;
                const fillPct   = Math.min(((val    - min) / range) * 100, 100);
                const targetPct = Math.min(((target - min) / range) * 100, 100);
                wrap.querySelector('.kpi-bar-fill').style.width         = fillPct + '%';
                wrap.querySelector('.kpi-bar-target-line').style.left   = targetPct + '%';
            });
            io.unobserve(e.target);
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.kpi-summary').forEach(el => io.observe(el));
}

/* --- Timeline scroll-reveal --- */
function initTimelineReveal() {
    const items = document.querySelectorAll('.ptl-item');
    if (!items.length) return;

    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('tl-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    items.forEach(item => io.observe(item));
}
/* =============================================================
   M6 Toll â€” 3D Winding Road Animation  (lateral camera)
   ============================================================= */
