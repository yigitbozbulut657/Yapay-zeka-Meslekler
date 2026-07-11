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

    let appData = null;
    let currentView = 'sectors'; // 'sectors', 'professions', 'detail'
    let selectedSectorId = null;

    // Load Data
    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error("Veri yüklenemedi.");
            return response.json();
        })
        .then(data => {
            appData = data;
            renderSectors();
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
            card.addEventListener('click', () => showProfessions(sector.id));
            sectorsList.appendChild(card);
        });
        showScreen('sectors');
    }

    // Render Professions
    function showProfessions(sectorId) {
        selectedSectorId = sectorId;
        const sector = appData.sectors.find(s => s.id === sectorId);
        if (!sector) return;

        sectorTitle.textContent = `${sector.name} ve Yapay Zeka`;
        professionsList.innerHTML = '';

        sector.professions.forEach(prof => {
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.innerHTML = `
                <h3 class="card-title">${prof.name}</h3>
                <p class="card-desc" style="margin-top:1rem;">${prof.shortDesc}</p>
            `;
            card.addEventListener('click', () => showDetail(sectorId, prof.id));
            professionsList.appendChild(card);
        });

        showScreen('professions');
    }

    // Render Details
    function showDetail(sectorId, profId) {
        const sector = appData.sectors.find(s => s.id === sectorId);
        const prof = sector.professions.find(p => p.id === profId);
        if (!prof) return;

        let pastProjectsHTML = prof.pastProjects.map(p => `<li>${p}</li>`).join('');
        let futureProjectsHTML = prof.futureProjects.map(p => `<li>${p}</li>`).join('');
        
        let articleHTML = prof.article.split('\\n\\n').map(para => `<p>${para}</p>`).join('');

        professionDetail.innerHTML = `
            <div class="detail-card">
                <div class="detail-header">
                    <img src="${prof.imagePath}" alt="${prof.name}" class="detail-image" onerror="this.src='https://via.placeholder.com/800x400?text=Görsel+Bulunamadı'">
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

        if (viewName === 'sectors') {
            sectorsContainer.classList.remove('hidden');
            backButton.classList.add('hidden');
        } else if (viewName === 'professions') {
            professionsContainer.classList.remove('hidden');
            backButton.classList.remove('hidden');
        } else if (viewName === 'detail') {
            detailContainer.classList.remove('hidden');
            backButton.classList.remove('hidden');
        }
    }

    backButton.addEventListener('click', () => {
        if (currentView === 'detail') {
            showScreen('professions');
        } else if (currentView === 'professions') {
            showScreen('sectors');
        }
    });

});
