/**
 * ArtWorld – Artist Painting App
 * Phase 2 - Storytelling, History, Geography & Detailed Nature
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // App State
    const state = {
        currentSection: 'home',
        currentFilter: 'all',
        isDarkMode: false,
        favorites: JSON.parse(localStorage.getItem('artworld_favorites')) || [],
        artworks: [] 
    };

    // DOM Elements
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const navLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.getElementById('mainContent');
    const globalSearch = document.getElementById('globalSearch');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    // --- ENRICHED DATASETS ---

    const paintings = [
        { id: 'p1', title: 'Mona Lisa', artist: 'Leonardo da Vinci', year: '1503', description: 'Renaissance masterpiece known for its mysterious smile.', image: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&w=800&q=80', type: 'painting' },
        { id: 'p2', title: 'Starry Night', artist: 'Vincent van Gogh', year: '1889', description: 'Turbulent night sky captured through impressionist strokes.', image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80', type: 'painting' },
        { id: 'p6', title: 'Realistic Morning', artist: 'S. K. Miller', year: '2023', description: 'A hyper-realistic study of light hitting a vase.', image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4366?auto=format&fit=crop&w=800&q=80', type: 'painting' },
        { id: 'p7', title: 'The Old Fisherman', artist: 'Unknown', year: '19th Century', description: 'Realistic storytelling portrait showing years of wisdom.', image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=800&q=80', type: 'painting' }
    ];

    const blogPosts = [
        { 
            id: 'b1', title: 'The Secret of Renaissance Pigments', tag: 'Art Tech', date: 'Oct 12, 2026', author: 'Dr. Julian Artos',
            excerpt: 'How ancient artists used crushed beetles and precious stones to create colors that lasted 500 years...',
            image: 'https://images.unsplash.com/photo-1579762795152-7338350cc23a?auto=format&fit=crop&w=800&q=80'
        },
        { 
            id: 'b2', title: 'Storytelling Through the Lens', tag: 'Photography', date: 'Nov 02, 2026', author: 'Elena Ray',
            excerpt: 'Capturing the raw emotions of rural life in the mountains through cinematic photography techniques.',
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
        },
        { 
            id: 'b3', title: 'The Call of the Amazon', tag: 'Nature', date: 'Dec 15, 2026', author: 'Forest Guardian',
            excerpt: 'A deep dive into the lush canopy and the hidden creatures of the worlds largest rainforest.',
            image: 'https://images.unsplash.com/photo-1518144591331-17a5dd71c477?auto=format&fit=crop&w=800&q=80'
        }
    ];

    const historyData = [
        { era: 'Ancient Egypt', year: '3100 BC', desc: 'The rise of the Pharaohs and the building of the Great Pyramids.', image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80' },
        { era: 'Imperial Rome', year: '27 BC', desc: 'The Pax Romana and the architectural marvels like the Colosseum.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80' },
        { era: 'The Renaissance', year: '14th Century', desc: 'A cultural rebirth of art, science, and exploration in Europe.', image: 'https://images.unsplash.com/photo-1564393029826-342d72496f7c?auto=format&fit=crop&w=800&q=80' }
    ];

    const maps = [
        { title: 'Ancient World Map', year: '1560', desc: 'Hand-drawn cartography showing early perceptions of the globe.', image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=1200&q=80' },
        { title: 'Modern Continental View', year: '2025', desc: 'Satellite imagery detailing geographic elevations and river systems.', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80' }
    ];

    const amazonForest = {
        title: 'The Amazon Rainforest',
        sub: 'Earth\'s Green Heart',
        heroImg: 'https://images.unsplash.com/photo-1518144591331-17a5dd71c477?auto=format&fit=crop&w=1600&q=80',
        details: [
            { icon: 'leaf', title: '40,000 Plant Species', desc: 'From giant water lilies to towering Brazil nut trees.' },
            { icon: 'twitter', title: '1,300 Bird Species', desc: 'Majestic Macaws, Toucans, and rare Harpy Eagles.' },
            { icon: 'droplets', title: 'Amazon River', desc: 'The lifeblood of the forest, holding 20% of Earth\'s river water.' }
        ]
    };

    const wallpapers = [
        { id: 'w1', title: 'Abstract Flow', artist: 'Digital Dream', category: 'Abstract', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80', type: 'wallpaper' },
        { id: 'w2', title: 'Lush Canopy', artist: 'Nature Lens', category: 'Nature', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80', type: 'wallpaper' }
    ];

    const photography = [
        { id: 'ph1', title: 'Misty Mountains', artist: 'Highland Peak', category: 'Mountains', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', type: 'photo' },
        { id: 'ph2', title: 'Golden Horizon', artist: 'Sunset Hunter', category: 'Sunrise / Sunset', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80', type: 'photo' }
    ];

    const natureForest = [
        { id: 'n1', title: 'Deep Jungle Path', artist: 'Nature Soul', category: 'Forest', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80', type: 'nature' },
        { id: 'n2', title: 'Emerald Falls', artist: 'Aqua Lens', category: 'Waterfall', image: 'https://images.unsplash.com/photo-1433086177607-6c8a08c00017?auto=format&fit=crop&w=800&q=80', type: 'nature' }
    ];

    const birds = [
        { id: 'b1', title: 'Scarlet Macaw', artist: 'WildLife', category: 'Parrot', image: 'https://images.unsplash.com/photo-1552728089-57bdde30fc3b?auto=format&fit=crop&w=800&q=80', type: 'bird' },
        { id: 'b2', title: 'Golden Eagle', artist: 'Sky Scout', category: 'Eagle', image: 'https://images.unsplash.com/photo-1481007409975-3375881ee09e?auto=format&fit=crop&w=800&q=80', type: 'bird' }
    ];

    state.artworks = [...paintings, ...wallpapers, ...photography, ...natureForest, ...birds];

    // --- Core Navigation & Theme ---

    const toggleTheme = () => {
        state.isDarkMode = !state.isDarkMode;
        if (state.isDarkMode) {
            body.classList.replace('light-mode', 'dark-mode');
            themeIcon.setAttribute('data-lucide', 'moon');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            themeIcon.setAttribute('data-lucide', 'sun');
        }
        lucide.createIcons();
    };

    const navigate = (section) => {
        state.currentSection = section;
        state.currentFilter = 'all';
        navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === section));
        if (window.innerWidth <= 992) navMenu.classList.remove('active');
        renderSection();
    };

    const renderSection = () => {
        mainContent.innerHTML = '<div class="loader"><div class="artist-loader"></div></div>';
        
        setTimeout(() => {
            switch(state.currentSection) {
                case 'home': renderHome(); break;
                case 'paintings': renderGallery('Realism & Fine Art', paintings); break;
                case 'blog': renderBlog(); break;
                case 'history': renderHistory(); break;
                case 'geography': renderGeography(); break;
                case 'amazon': renderAmazon(); break;
                case 'wallpapers': renderGallery('HD Wallpapers', wallpapers, ['Abstract', 'Nature']); break;
                case 'nature': renderGallery('Nature & Forest', natureForest); break;
                case 'birds': renderGallery('Wild Birds', birds); break;
                case 'favorites': renderFavorites(); break;
                case 'search': renderSearch(); break;
                case 'about': renderAbout(); break;
                default: renderHome();
            }
            lucide.createIcons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    };

    // --- View Generators ---

    const renderHome = () => {
        mainContent.innerHTML = `
            <div class="section container">
                <div class="hero glass">
                    <div class="hero-content">
                        <h1>Beyond <span class="highlight">Visual Storytelling</span></h1>
                        <p>A journey through time, deep history, and the lush biodiversity of our planet.</p>
                        <div class="hero-btns">
                            <button class="btn primary" onclick="navigate('blog')">Art Blog</button>
                            <button class="btn secondary" onclick="navigate('history')">Ancient History</button>
                        </div>
                    </div>
                    <div class="daily-card glass">
                        <img src="${blogPosts[0].image}" alt="Daily Inspiration">
                        <div class="daily-info">
                            <span class="artist-style">FEATURED STORY</span>
                            <h3>${blogPosts[0].title}</h3>
                            <button class="btn secondary" style="padding: 5px 15px; margin-top: 10px;" onclick="navigate('blog')">Read Story</button>
                        </div>
                    </div>
                </div>

                <div class="featured-grid">
                    <div class="featured-item glass" onclick="navigate('amazon')"><i data-lucide="leaf"></i><h3>Amazon</h3><p>Green Heart</p></div>
                    <div class="featured-item glass" onclick="navigate('history')"><i data-lucide="hourglass"></i><h3>History</h3><p>Human Saga</p></div>
                    <div class="featured-item glass" onclick="navigate('geography')"><i data-lucide="globe"></i><h3>Geography</h3><p>Ancient Maps</p></div>
                </div>
            </div>
        `;
    };

    const renderBlog = () => {
        mainContent.innerHTML = `
            <div class="section container">
                <div class="section-header">
                    <h2>Art & Nature Chronicles</h2>
                    <p>Deep dives into storytelling through paint, lens, and history.</p>
                </div>
                <div class="blog-grid">
                    ${blogPosts.map(post => `
                        <div class="blog-card glass">
                            <img src="${post.image}" class="blog-img" alt="${post.title}">
                            <div class="blog-content">
                                <span class="blog-tag">${post.tag}</span>
                                <div class="blog-meta">${post.date} • By ${post.author}</div>
                                <h3>${post.title}</h3>
                                <p class="art-desc">${post.excerpt}</p>
                                <a href="#" class="read-more" onclick="alert('Full article content coming soon!')">Read More <i data-lucide="arrow-right"></i></a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    };

    const renderHistory = () => {
        mainContent.innerHTML = `
            <div class="section container">
                <div class="section-header">
                    <h2>Ancient Civilizations</h2>
                    <p>Tracing the footprints of human history through art and architecture.</p>
                </div>
                <div class="history-intro glass">
                    <h3>The Saga of Humanity</h3>
                    <p>Ancient history is not just about dates; it's about the storytelling that connects us all. From the shifting sands of Egypt to the marble halls of Rome.</p>
                </div>
                <div class="timeline">
                    ${historyData.map((item, index) => `
                        <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
                            <div class="timeline-content glass">
                                <img src="${item.image}" alt="${item.era}" style="width: 100%; border-radius: 15px; margin-bottom: 15px;">
                                <span class="blog-tag">${item.year}</span>
                                <h3>${item.era}</h3>
                                <p class="art-desc">${item.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    };

    const renderGeography = () => {
        mainContent.innerHTML = `
            <div class="section container">
                <div class="section-header">
                    <h2>World Maps & Geography</h2>
                    <p>Exploring how we mapped our world through the ages.</p>
                </div>
                ${maps.map(map => `
                    <div class="map-section glass" style="margin-bottom: 40px; padding: 20px;">
                        <div class="map-container">
                            <img src="${map.image}" class="map-img" alt="${map.title}">
                        </div>
                        <div class="art-info">
                            <span class="blog-tag">${map.year}</span>
                            <h3>${map.title}</h3>
                            <p class="art-desc">${map.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    };

    const renderAmazon = () => {
        mainContent.innerHTML = `
            <div class="section container">
                <div class="amazon-hero" style="background-image: url('${amazonForest.heroImg}');">
                    <div class="amazon-hero-content">
                        <h1>${amazonForest.title}</h1>
                        <p>${amazonForest.sub}</p>
                    </div>
                </div>
                <div class="section-header">
                    <h2>Biodiversity Hotspot</h2>
                    <p>A detailed look at the organisms that make the lung of our planet.</p>
                </div>
                <div class="biodiversity-row">
                    ${amazonForest.details.map(detail => `
                        <div class="bio-card glass">
                            <i data-lucide="${detail.icon}" style="width: 30px; color: var(--primary); margin-bottom: 20px;"></i>
                            <h3>${detail.title}</h3>
                            <p class="art-desc">${detail.desc}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="section container" style="margin-top: 60px;">
                    <div class="art-grid">
                        <div class="art-card glass"><img src="https://images.unsplash.com/photo-1541804294406-037042a420b2?auto=format&fit=crop&w=800&q=80"></div>
                        <div class="art-card glass"><img src="https://images.unsplash.com/photo-1590740683050-4d56f6f947fa?auto=format&fit=crop&w=800&q=80"></div>
                    </div>
                </div>
            </div>
        `;
    };

    const renderGallery = (title, items, filters = []) => {
        mainContent.innerHTML = `
            <div class="section container">
                <div class="section-header">
                    <h2>${title}</h2>
                </div>
                <div class="art-grid">
                    ${items.map(item => `
                        <div class="art-card glass">
                            <div class="art-img-container">
                                <img src="${item.image}" alt="${item.title}" loading="lazy">
                                <div class="art-overlay">
                                    <button class="action-btn" onclick="toggleFavorite('${item.id}')">
                                        <i data-lucide="heart" class="${state.favorites.includes(item.id) ? 'fill-red' : ''}"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="art-info">
                                <h3>${item.title}</h3>
                                <div class="art-meta"><span>${item.artist || ''}</span><span>${item.year || ''}</span></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    };

    const renderFavorites = () => {
        const items = state.artworks.filter(a => state.favorites.includes(a.id));
        mainContent.innerHTML = `
            <div class="section container">
                <div class="section-header"><h2>Favorites</h2></div>
                ${items.length > 0 ? `<div class="art-grid">${items.map(i => `
                    <div class="art-card glass">
                        <img src="${i.image}" alt="${i.title}" style="height: 200px; width: 100%; object-fit: cover;">
                        <div class="art-info"><h3>${i.title}</h3></div>
                    </div>
                `).join('')}</div>` : `<div class="empty-state"><h3>No favorites yet.</h3></div>`}
            </div>
        `;
    };

    const renderSearch = () => {
        const query = globalSearch.value.toLowerCase();
        const results = state.artworks.filter(a => a.title.toLowerCase().includes(query) || (a.artist && a.artist.toLowerCase().includes(query)));
        mainContent.innerHTML = `
            <div class="section container">
                <div class="section-header"><h2>Search: "${globalSearch.value}"</h2></div>
                <div class="art-grid">${results.map(i => `<div class="art-card glass"><img src="${i.image}" style="height: 200px; width:100%; object-fit: cover;"><h3>${i.title}</h3></div>`).join('')}</div>
            </div>
        `;
    };

    const renderAbout = () => {
        mainContent.innerHTML = `<div class="section container"><h2>ArtWorld</h2><p>Exploring human history and Earth's beauty.</p></div>`;
    };

    // --- Interaction Handlers ---

    window.toggleFavorite = (id) => {
        if (state.favorites.includes(id)) {
            state.favorites = state.favorites.filter(favId => favId !== id);
        } else {
            state.favorites.push(id);
        }
        localStorage.setItem('artworld_favorites', JSON.stringify(state.favorites));
        renderSection();
    };

    window.navigate = navigate;
    themeToggle.addEventListener('click', toggleTheme);
    navLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); navigate(link.dataset.section); }));
    mobileMenuBtn.addEventListener('click', () => navMenu.classList.toggle('active'));
    globalSearch.addEventListener('input', () => { state.currentSection = globalSearch.value.trim() ? 'search' : 'home'; renderSection(); });

    renderSection('home');
});
