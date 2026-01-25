document.addEventListener('DOMContentLoaded', () => {
    const researchSection = document.getElementsByClassName('project-item-research');
    const insightsSection = document.getElementsByClassName('project-item-insight');
    const designSection = document.getElementsByClassName('project-item-design');
    const tagElements = document.querySelectorAll('.tags li');
    const prevBtn = document.querySelectorAll('button.prev-article');
    const nextBtn = document.querySelectorAll('button.next-article');
    const homeBtn = document.querySelectorAll('button.back-to-home');
    const motherSection = document.getElementById('mother-section');
    const articleOrder = [
        'spreadbeats.html',
        'zestypaws.html',
        'marriage.html',
        'feeding-ai.html',
        'https://www.sixthtone.com/news/1013939', 
        'fridgemate.html',
        'heatwise.html'
    ];

    const globalBar = document.getElementById('global-top-bar');
    if (globalBar) {
        const globalBottomBar = document.getElementById('global-bottom-bar');
        const sections = document.querySelectorAll('.page');

        const sectionColors = {
            home: '#1F1F1F',
            research: "#635BFF",
            insight: "#C2E427",
            design: "#FFA858"
        };

        const sectionOrder = Object.keys(sectionColors);

        function getCurrentSectionId() {
            let current = '';
            const triggerLine = window.innerHeight * 0.1; 

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= triggerLine && rect.bottom >= triggerLine) {
                    current = section.id;
                }
            });

            return current;
        }

        function updateGlobalBar(currentId) {
            globalBar.innerHTML = '';
            globalBottomBar.innerHTML = '';
            const currentIndex = sectionOrder.indexOf(currentId);

            if (currentIndex === -1) return;

            for (let i = 0; i <= currentIndex; i++) {
                const id = sectionOrder[i];
                const bar = document.createElement('div');
                bar.classList.add('section-bar');
                bar.style.backgroundColor = sectionColors[id];

                if (i === currentIndex) {
                    bar.classList.add('is-active');
                } else {
                    bar.classList.add('is-history');
                    bar.onclick = () => {
                        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
                    };
                }

                globalBar.appendChild(bar);
            }
            
            for (let j = currentIndex + 1; j < sectionOrder.length; j++) {
                const id = sectionOrder[j];
                const bar = document.createElement('div');
                bar.classList.add('section-bar');
                bar.style.backgroundColor = sectionColors[id];
                bar.style.height = '0.5rem';
                bar.onclick = () => {
                    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
                };
                globalBottomBar.appendChild(bar);
            }
        }

        window.addEventListener('scroll', () => {
            let currentId = getCurrentSectionId();
            updateGlobalBar(currentId);
        });

        updateGlobalBar(getCurrentSectionId());
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

    function applyTagFilter(tag) {
        const allProjects = document.querySelectorAll('.insight-card, .design-card, .research-card');
        const allTags = document.querySelectorAll('#all-tags li, section.page .tags li');

        const isSameTag = (activeTag === tag);
        activeTag = isSameTag ? 'all' : tag;

        allProjects.forEach(project => {
            if (activeTag === 'all' || project.classList.contains(activeTag)) {
                project.classList.remove('is-hidden');
            } else {
                project.classList.add('is-hidden');
            }
        });

        allTags.forEach(tagEl => {
            tagEl.classList.toggle('is-active', tagEl.id === activeTag && activeTag !== 'all');
        });
    }

    document.querySelectorAll('#all-tags li, section.page .tags li').forEach(tagEl => {
        tagEl.addEventListener('click', (e) => {
            e.stopPropagation();
            const tag = tagEl.id;
            applyTagFilter(tag);

            if (tagEl.closest('#all-tags')) {
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