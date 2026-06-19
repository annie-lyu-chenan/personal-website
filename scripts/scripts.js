document.addEventListener('DOMContentLoaded', () => {
    const researchSection = document.getElementsByClassName('project-item-research');
    const insightsSection = document.getElementsByClassName('project-item-insight');
    const designSection = document.getElementsByClassName('project-item-design');
    const prevBtn = document.querySelectorAll('button.prev-article');
    const nextBtn = document.querySelectorAll('button.next-article');
    const homeBtn = document.querySelectorAll('button.back-to-home');
    const motherSection = document.getElementById('mother-section');
    const pageSections = Array.from(document.querySelectorAll('main > section.page'));
    const articleOrder = [
        'spreadbeats.html',
        'zestypaws.html',
        'marriage.html',
        'feeding-ai.html',
        'https://www.sixthtone.com/news/1013939', 
        'fridgemate.html',
        'heatwise.html'
    ];

    function updateActiveTopBar() {
        let activeSection = pageSections[0];
        const triggerLine = window.innerHeight * 0.75;

        pageSections.forEach(section => {
            if (section.getBoundingClientRect().top <= triggerLine) {
                activeSection = section;
            }
        });

        pageSections.forEach(section => {
            const topBar = section.querySelector('.section-top-bar');
            if (topBar) {
                topBar.classList.toggle('is-active', section === activeSection);
            }
        });
    }

    if (pageSections.length > 0) {
        updateActiveTopBar();
        window.addEventListener('scroll', updateActiveTopBar, { passive: true });
        window.addEventListener('resize', updateActiveTopBar);
    }

    const revealTargets = Array.from(document.querySelectorAll([
        '#homepage',
        '#toc',
        '#home .self-intro',
        '.section-layout',
        '.section-gallery .research-card',
        '.section-gallery .insight-card',
        '.section-gallery .design-card',
        '#nav',
        '#article-content > *',
        'footer'
    ].join(', ')));

    const getScrollTop = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let lastScrollTop = getScrollTop();
    let isScrollingDown = false;

    function revealTarget(target) {
        target.classList.add('has-revealed', 'is-revealing');
        target.addEventListener('animationend', () => {
            target.classList.remove('is-revealing');
        }, { once: true });
    }

    function targetIsInView(target) {
        const rect = target.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.88 && rect.bottom > 0;
    }

    function revealVisibleTargets() {
        if (!isScrollingDown) {
            return;
        }

        revealTargets.forEach(target => {
            if (!target.classList.contains('has-revealed') && targetIsInView(target)) {
                revealTarget(target);
            }
        });
    }

    if (revealTargets.length > 0) {
        revealTargets.forEach(target => {
            target.classList.add('reveal-on-scroll');
            if (targetIsInView(target)) {
                target.classList.add('has-revealed');
            }
        });

        document.body.classList.add('reveal-ready');

        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && isScrollingDown && !entry.target.classList.contains('has-revealed')) {
                    revealTarget(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealTargets.forEach(target => revealObserver.observe(target));

        const updateScrollDirection = () => {
            const currentScrollTop = getScrollTop();
            isScrollingDown = currentScrollTop > lastScrollTop;
            lastScrollTop = currentScrollTop;
            revealVisibleTargets();
        };

        window.addEventListener('scroll', updateScrollDirection, { passive: true });
        document.body.addEventListener('scroll', updateScrollDirection, { passive: true });
    }

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    if (researchSection[0]) {
        researchSection[0].addEventListener('click', () => {
            scrollToSection('research');
        });
    }

    if (insightsSection[0]) {
        insightsSection[0].addEventListener('click', () => {
            scrollToSection('insight');
        });
    }

    if (designSection[0]) {
        designSection[0].addEventListener('click', () => {
            scrollToSection('design');
        });
    }

    if (motherSection) {
        motherSection.addEventListener('click', () => {
            const parentMain = motherSection.closest('main');
            if (parentMain && parentMain.id) {
                window.location.href = `index.html#${parentMain.id}`;
            }
        });
    }

    let activeTag = 'all';
    const filterTagSelector = '#all-tags li, #toc .home-cluster .tags li, main > section.page .section-top-bar li, section.page > .tags li, .section-layout > .tags li';
    const filterTags = Array.from(document.querySelectorAll(filterTagSelector))
        .filter(tagEl => !tagEl.closest('.card-content'));

    filterTags.forEach(tagEl => {
        tagEl.classList.add('filter-tag');
    });

    function applyTagFilter(tag) {
        const allProjects = document.querySelectorAll('.insight-card, .design-card, .research-card');

        const isSameTag = (activeTag === tag);
        activeTag = isSameTag ? 'all' : tag;

        allProjects.forEach(project => {
            if (activeTag === 'all' || project.classList.contains(activeTag)) {
                project.classList.remove('is-hidden');
            } else {
                project.classList.add('is-hidden');
            }
        });

        filterTags.forEach(tagEl => {
            tagEl.classList.toggle('is-active', tagEl.id === activeTag && activeTag !== 'all');
        });
    }

    filterTags.forEach(tagEl => {
        tagEl.addEventListener('click', (e) => {
            e.stopPropagation();
            const tag = tagEl.id;
            applyTagFilter(tag);

            if (tagEl.closest('#all-tags') || tagEl.closest('#toc')) {
                if (tagEl.classList.contains('research')) {
                    document.getElementById('research').scrollIntoView({ behavior: 'smooth' });
                } else if (tagEl.classList.contains('insight')) {
                    document.getElementById('insight').scrollIntoView({ behavior: 'smooth' });
                } else if (tagEl.classList.contains('design')) {
                    document.getElementById('design').scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    applyTagFilter('all'); 

    prevBtn.forEach(button => {
        button.addEventListener('click', () => {
            const currentPage = window.location.pathname.split('/').pop();
            console.log('Current Page:', currentPage);
            const currentIndex = articleOrder.indexOf(currentPage);
            console.log('Current Index:', currentIndex);
            if (currentIndex > 0) {
                window.location.href = articleOrder[currentIndex - 1];
            }
        });
    });

    nextBtn.forEach(button => {
        button.addEventListener('click', () => {
            const currentPage = window.location.pathname.split('/').pop();
            console.log('Current Page:', currentPage);
            const currentIndex = articleOrder.indexOf(currentPage);
            console.log('Current Index:', currentIndex);
            if (currentIndex < articleOrder.length - 1) {
                window.location.href = articleOrder[currentIndex + 1];
            }
        });
    });

    homeBtn.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Home clicked');
            window.location.href = 'index.html';
        });
    });
});
