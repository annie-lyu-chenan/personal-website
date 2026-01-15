document.addEventListener('DOMContentLoaded', () => {

    const globalBar = document.getElementById('global-top-bar');
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
});
