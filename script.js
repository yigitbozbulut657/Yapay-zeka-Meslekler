document.addEventListener('DOMContentLoaded', () => {
    
    // DOM Elements
    const sectorsContainer = document.getElementById('sectors-container');
    const professionsContainer = document.getElementById('professions-container');
    const detailContainer = document.getElementById('detail-container');

    const sectorsList = document.getElementById('sectors-list');
    const professionsList = document.getElementById('professions-list');
    const professionDetail = document.getElementById('profession-detail');
    
    const sectorTitle = document.getElementById('sector-title');
    const backButton = document.getElementById('back-button');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchResultsList = document.getElementById('search-results-list');
    const searchSubtitle = document.getElementById('search-subtitle');
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    let appData = null;
    let currentView = 'sectors'; // 'sectors', 'professions', 'detail'
    let selectedSectorId = null;
    let savedScrollPositions = { sectors: 0, professions: 0 };

    // Load Data
    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error("Veri yüklenemedi.");
            return response.json();
        })
        .then(data => {
            appData = data;
            
            // Check if there's a preserved state from a refresh
            if (history.state && history.state.view) {
                const state = history.state;
                renderSectors(); 
                if (state.view === 'professions') {
                    showProfessions(state.sectorId);
                } else if (state.view === 'detail') {
                    showProfessions(state.sectorId); 
                    showDetail(state.sectorId, state.profId);
                }
            } else {
                history.replaceState({ view: 'sectors' }, '', '');
                renderSectors();
            }
        })
        .catch(error => {
            console.error("Hata:", error);
            sectorsList.innerHTML = "<p style='color: red;'>Veri yüklenirken hata oluştu.</p>";
        });

    // Render Sectors
    function renderSectors() {
        sectorsList.innerHTML = '';
        appData.sectors.forEach(sector => {
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.innerHTML = `
                <span class="card-icon">${sector.icon}</span>
                <h3 class="card-title">${sector.name}</h3>
                <p class="card-desc">${sector.professions.length} Meslek Alanı</p>
            `;
            card.addEventListener('click', () => {
                savedScrollPositions['sectors'] = window.scrollY;
                history.pushState({ view: 'professions', sectorId: sector.id }, '', '');
                showProfessions(sector.id);
                window.scrollTo(0, 0);
            });
            sectorsList.appendChild(card);
        });
        showScreen('sectors');
    }

    // Render Professions
    function showProfessions(sectorId) {
        selectedSectorId = sectorId;
        const sector = appData.sectors.find(s => s.id === sectorId);
        if (!sector) return;

        document.title = `${sector.name} - Yapay Zeka`;
        sectorTitle.textContent = `${sector.name} ve Yapay Zeka`;
        professionsList.innerHTML = '';

        sector.professions.forEach(prof => {
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.innerHTML = `
                <h3 class="card-title">${prof.name}</h3>
                <p class="card-desc" style="margin-top:1rem;">${prof.shortDesc}</p>
            `;
            card.addEventListener('click', () => {
                savedScrollPositions['professions'] = window.scrollY;
                history.pushState({ view: 'detail', sectorId: sectorId, profId: prof.id }, '', '');
                showDetail(sectorId, prof.id);
                window.scrollTo(0, 0);
            });
            professionsList.appendChild(card);
        });

        showScreen('professions');
    }

    // Render Details
    function showDetail(sectorId, profId) {
        const sector = appData.sectors.find(s => s.id === sectorId);
        const prof = sector.professions.find(p => p.id === profId);
        if (!prof) return;

        document.title = `${prof.name} ve Yapay Zeka - KSBÜ`;

        let pastProjectsHTML = prof.pastProjects.map(p => `<li>${p}</li>`).join('');
        let futureProjectsHTML = prof.futureProjects.map(p => `<li>${p}</li>`).join('');
        
        let articleHTML = prof.article.split('\\n\\n').map(para => `<p>${para}</p>`).join('');

        professionDetail.innerHTML = `
            <div class="detail-card">
                <div class="detail-header skeleton">
                    <img src="${prof.imagePath}" alt="${prof.name}" class="detail-image" onload="this.parentElement.classList.remove('skeleton')" onerror="this.src='https://via.placeholder.com/800x400?text=Görsel+Bulunamadı'; this.parentElement.classList.remove('skeleton');">
                    <div class="detail-image-overlay">
                        <h2 class="detail-title">${prof.name}</h2>
                        <p style="color: #94a3b8; font-size: 1.2rem;">Yapay Zeka Entegrasyonu</p>
                    </div>
                </div>
                <div class="detail-content">
                    <div class="article-section">
                        <h3>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            Genel Bakış
                        </h3>
                        ${articleHTML}
                    </div>
                    
                    <div class="projects-section">
                        <div class="project-box">
                            <h4>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                Mevcut Projeler
                            </h4>
                            <ul class="project-list">
                                ${pastProjectsHTML}
                            </ul>
                        </div>

                        <div class="project-box">
                            <h4>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                Gelecek Vizyonu
                            </h4>
                            <ul class="project-list">
                                ${futureProjectsHTML}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        showScreen('detail');
    }

    // Navigation
    function showScreen(viewName) {
        currentView = viewName;
        sectorsContainer.classList.add('hidden');
        professionsContainer.classList.add('hidden');
        detailContainer.classList.add('hidden');
        searchResultsContainer.classList.add('hidden');

        if (viewName === 'sectors') {
            sectorsContainer.classList.remove('hidden');
            backButton.classList.add('hidden');
            searchContainer.classList.remove('hidden');
            document.title = "Yapay Zeka ve Meslekler";
        } else if (viewName === 'professions') {
            professionsContainer.classList.remove('hidden');
            backButton.classList.remove('hidden');
            searchContainer.classList.remove('hidden');
        } else if (viewName === 'detail') {
            detailContainer.classList.remove('hidden');
            backButton.classList.remove('hidden');
            searchContainer.classList.add('hidden');
        } else if (viewName === 'search') {
            searchResultsContainer.classList.remove('hidden');
            backButton.classList.remove('hidden');
            searchContainer.classList.remove('hidden');
            document.title = "Arama Sonuçları - Yapay Zeka";
        }
    }

    backButton.addEventListener('click', () => {
        history.back();
    });

    window.addEventListener('popstate', (event) => {
        searchInput.value = ''; // clear search on back navigation
        const state = event.state;
        if (!state || state.view === 'sectors') {
            showScreen('sectors');
            window.scrollTo(0, savedScrollPositions['sectors'] || 0);
        } else if (state.view === 'professions') {
            showProfessions(state.sectorId);
            window.scrollTo(0, savedScrollPositions['professions'] || 0);
        } else if (state.view === 'detail') {
            showDetail(state.sectorId, state.profId);
            window.scrollTo(0, 0);
        }
    });

    // Search Functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length === 0) {
            // Restore previous view from history state
            const state = history.state;
            if (!state || state.view === 'sectors') {
                showScreen('sectors');
            } else if (state.view === 'professions') {
                showScreen('professions');
            } else if (state.view === 'detail') {
                showScreen('detail');
            }
            return;
        }

        let results = [];
        appData.sectors.forEach(sector => {
            sector.professions.forEach(prof => {
                if (prof.name.toLowerCase().includes(query) || sector.name.toLowerCase().includes(query)) {
                    results.push({ prof, sector });
                }
            });
        });

        renderSearchResults(results, query);
    });

    function renderSearchResults(results, query) {
        searchResultsList.innerHTML = '';
        if (results.length === 0) {
            searchSubtitle.textContent = `"${query}" için sonuç bulunamadı.`;
        } else {
            searchSubtitle.textContent = `"${query}" için ${results.length} sonuç bulundu.`;
            results.forEach(item => {
                const card = document.createElement('div');
                card.className = 'glass-card';
                card.innerHTML = `
                    <h3 class="card-title">${item.prof.name}</h3>
                    <p class="card-desc" style="color: var(--accent); margin-bottom: 0.5rem; font-size: 0.85rem;">${item.sector.name}</p>
                    <p class="card-desc">${item.prof.shortDesc}</p>
                `;
                card.addEventListener('click', () => {
                    searchInput.value = '';
                    history.pushState({ view: 'detail', sectorId: item.sector.id, profId: item.prof.id }, '', '');
                    showDetail(item.sector.id, item.prof.id);
                    window.scrollTo(0, 0);
                });
                searchResultsList.appendChild(card);
            });
        }
        showScreen('search');
    }

    // Scroll To Top
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Logo Click to Home
    const communityLogo = document.getElementById('logo-community');
    if (communityLogo) {
        communityLogo.addEventListener('click', () => {
            searchInput.value = '';
            history.pushState({ view: 'sectors' }, '', '');
            showScreen('sectors');
            window.scrollTo(0, 0);
        });
    }

});
