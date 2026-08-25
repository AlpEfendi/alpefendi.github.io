document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('videoModal');
    const modalFrame = document.getElementById('videoFrame');
    const closeBtn = document.querySelector('.close-modal');
    const overlay = document.querySelector('.modal-overlay');
    const modalText = document.getElementById('modalText');
    const videoContainer = document.getElementById('videoContainer');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.querySelector('.modal-content');

    if (!modal || !modalFrame || !closeBtn || !overlay || !modalText || !videoContainer || !modalTitle || !modalContent) {
        console.warn('Portfolyo modalı başlatılamadı: gerekli bir arayüz öğesi eksik.');
        return;
    }

    // Date Formatter based on Web Interface Guidelines
    const formatMonthYear = (dateStr) => {
        try {
            const [year, month] = dateStr.split('-').map(Number);
            if (!year || !month) return dateStr;

            return new Intl.DateTimeFormat(['tr-TR', navigator.language], {
                month: 'short',
                year: 'numeric',
                timeZone: 'UTC'
            }).format(new Date(Date.UTC(year, month - 1, 1)));
        } catch (e) {
            return dateStr;
        }
    };

    // Project Data
    const projectDetails = {
        'pixel_ai_agency': {
            title: 'Pixel AI Agency — Video Prodüksiyon Uzmanı',
            content: `
                <h3>Video Editör &amp; AI Content Creator</h3>
                <p><strong>Pixel AI Agency · Tam zamanlı</strong><br>
                <time datetime="2026-02">Şubat 2026</time> — Günümüz<br>
                İzmir, Türkiye · Ofisten</p>

                <p>Pixel AI Agency bünyesinde markalar ve işletmeler için yaratıcı video prodüksiyonu gerçekleştiriyorum. Sosyal medya reklamları, tanıtım filmleri, kısa format videolar, yapay zekâ destekli animasyonlar ve sinematik içerikler üretiyor; geleneksel video editörlüğü ile yapay zekâ tabanlı üretim araçlarını aynı iş akışında birleştiriyorum.</p>

                <h3>Görev Kapsamım:</h3>
                <ul>
                    <li>Sosyal medya reklamları ve video içeriklerinin kurgu ve montajı</li>
                    <li>Yapay zekâ destekli görsel, video ve animasyon üretimi</li>
                    <li>AI video araçlarıyla sinematik sahne tasarımı ve içerik geliştirme</li>
                    <li>Motion graphics, görsel efekt ve post-prodüksiyon çalışmaları</li>
                    <li>Instagram Reels, TikTok ve YouTube Shorts formatlarına uygun içerik üretimi</li>
                    <li>Marka kimliğine uygun yaratıcı konsept geliştirme</li>
                    <li>Yapay zekâ destekli reklam, tanıtım ve hikâye anlatımı projeleri</li>
                </ul>

                <h3>Yetenekler:</h3>
                <div class="skill-tags-container">
                    <span class="skill-tag">Video Prodüksiyonu</span>
                    <span class="skill-tag">Video Kurgu</span>
                    <span class="skill-tag">Yapay Zekâ</span>
                    <span class="skill-tag">AI Video</span>
                    <span class="skill-tag">Post-prodüksiyon</span>
                    <span class="skill-tag">Motion Graphics</span>
                    <span class="skill-tag">Animasyon</span>
                    <span class="skill-tag">Görsel Efekt</span>
                    <span class="skill-tag">Sosyal Medya</span>
                    <span class="skill-tag">Reklam</span>
                </div>

                <p><a class="details-external-link" href="https://www.linkedin.com/company/pixel-ai-agency/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="Pixel AI Agency LinkedIn sayfası, yeni sekmede açılır">Pixel AI Agency LinkedIn sayfası <span aria-hidden="true">↗</span></a></p>
            `
        },
        'mazi_kalbimde': {
            title: 'Mazi Kalbimde Bir Yaradır - AI Music & Video Producer',
            videoUrl: 'https://vimeo.com/1159577486',
            content: `
                <h3>AI Music & Video Producer (Project-Based)</h3>
                <p><strong>Şahıs · Dönemsel</strong><br>
                ${formatMonthYear('2026-01-01')} - ${formatMonthYear('2026-01-01')} · 1 ay<br>
                İzmir, Türkiye · Uzaktan</p>

                <h3>“Mazi Kalbimde Bir Yaradır” — Müzik & Klip Projesi</h3>
                <p>“Mazi Kalbimde Bir Yaradır” adlı parça için, tamamen yapay zekâ destekli müzik üretimi ve video klip tasarımı içeren uçtan uca bir yaratıcı proje gerçekleştirdim. Bu çalışmada hem müziğin üretim sürecini hem de klibin görsel dünyasını sıfırdan oluşturarak projeyi teslim ettim.</p>
                
                <p>Parçanın duygusal anlatımı doğrultusunda:</p>
                <ul>
                    <li>Müzik kompozisyonu ve ses tasarımı</li>
                    <li>Yapay zekâ ile görsel ve sahne üretimi</li>
                    <li>Sinematik kurgu ve ritim uyumu</li>
                    <li>Duygu, atmosfer ve hikâye bütünlüğü</li>
                </ul>
                <p>tek bir yaratıcı çatı altında birleştirildi.</p>

                <p>Video klipte, tek bir karakter üzerinden ilerleyen görsel anlatı; hafıza, kayıp ve içsel yüzleşme temaları etrafında inşa edildi. Yapay zekâ tabanlı görüntü üretimi, sinematik kompozisyon ve klasik video kurgusu teknikleri birlikte kullanılarak, dijital bir müzik videosu estetiği oluşturuldu.</p>
                
                <p>Bu proje, AI destekli müzik ve video üretiminin profesyonel yaratıcı iş akışlarıyla nasıl bütünleşebileceğini gösteren deneysel ve sanatsal bir çalışmadır.</p>

                <h3>Yetenekler:</h3>
                <div class="skill-tags-container" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                    <span class="skill-tag">Video Prodüksiyonu</span>
                    <span class="skill-tag">Yapay Zeka</span>
                    <span class="skill-tag">Müzik Videoları</span>
                    <span class="skill-tag">Müzik Yapım</span>
                    <span class="skill-tag">Dijital Video</span>
                    <span class="skill-tag">Müzik</span>
                </div>
            `
        },
        'source_of_agency': {
            title: 'Source of Agency - Video Prodüksiyon Uzmanı',
            content: `
                <p><strong>${formatMonthYear('2025-08-01')} - ${formatMonthYear('2025-11-01')} (2,5 Ay – Ofis içi, tam zamanlı proje)</strong></p>
                <p>Source of Agency bünyesinde 2,5 ay boyunca ofis ortamında Video Editör ve Yapay Zekâ Destekli İçerik Üreticisi olarak görev aldım. Bu süreçte markanın sosyal medya stratejileri doğrultusunda, Instagram ve dijital platformlar için yüksek etkileşim odaklı video içerikler ürettim.</p>
                <p>Ham görüntüleri; hikâye akışı, tempo, ritim ve görsel bütünlük açısından kurgulayarak sosyal medya dinamiklerine uygun, izleyici dikkatini tutan kısa format videolara dönüştürdüm. İçeriklerin görsel gücünü artırmak için yapay zekâ tabanlı görsel ve video üretim araçlarını aktif olarak kullandım; sahne varyasyonları, stilize görüntüler ve yaratıcı efektler ürettim.</p>
                <h3>Görev Kapsamım:</h3>
                <ul>
                    <li>Sosyal medya için video kurgu ve montaj</li>
                    <li>Yapay zekâ destekli görsel ve video üretimi</li>
                    <li>Motion grafik ve görsel iyileştirmeler</li>
                    <li>Instagram Reels ve sosyal platformlara uygun formatlama</li>
                    <li>Marka kimliğine uygun, tutarlı görsel dil oluşturma</li>
                </ul>
                <p><strong>Amaç;</strong> hızlı, dikkat çekici ve marka kimliğiyle uyumlu içerikler üreterek ajansın dijital kampanyalarına ve sosyal medya performansına doğrudan katkı sağlamaktı.</p>
            `
        },
        'dokuz_eylul_uni': {
            title: 'Dokuz Eylül Üniversitesi - Video Editor',
            content: `
                <p><strong>${formatMonthYear('2021-08-01')} - ${formatMonthYear('2025-05-01')} (3 yıl 10 ay – Ofis içi, tam zamanlı)</strong></p>
                <p>Dokuz Eylül Üniversitesi Rektörlüğü Kurumsal İletişim Koordinatörlüğü bünyesinde Video Editor olarak görev aldım. Video biriminde; üniversitenin sosyal medya, kurumsal görsel ve video içeriklerinin üretimini gerçekleştirdim.</p>
                <h3>Yetkinlikler ve Faaliyetler:</h3>
                <ul>
                    <li>Hareketli Grafikler ve Animasyon</li>
                    <li>İleri Seviye Video Düzenleme ve Kurgu (Adobe Premiere, After Effects)</li>
                    <li>Post Prodüksiyon Süreçleri</li>
                    <li>Kamera Operatörlüğü ve Videografi</li>
                    <li>Yapay Zeka Destekli İçerik Üretimi (Stable Diffusion)</li>
                    <li>Reklam ve Tanıtım Filmi Kurgusu</li>
                </ul>
            `
        },
        'sevda_gulusun': {
            title: 'Sevda Gülüsün - Modern Türkçe Alternative Rock Cover',
            videoUrl: 'https://www.youtube.com/embed/VwDgRDInC6E',
            content: `
                <h3>Proje Hakkında</h3>
                <p><strong>Sevda Gülüsün, geleneksel bir Türkçe eserin duygusal özüne sadık kalınarak hazırlanmış modern bir alternative rock yeniden yorumudur.</strong></p>
                <p>Proje, eserin romantik ve içe dönük yapısını; rock altyapı, piyano ve yaylı dokular eşliğinde çağdaş bir müzikal ve görsel dile taşımayı amaçlar. Bu çalışmada amaç, eseri dönüştürmekten ziyade onun duygusunu koruyarak yeni bir atmosfer içinde yeniden hissettirmektir. Abartıdan uzak, dengeli ve sinematografik bir anlatım tercih edilmiştir.</p>
                
                <h3>Bütüncül Görsel Anlatı</h3>
                <p>Müzikal üretimin yanı sıra klip; yapay zekâ destekli görsel üretim, sinematik kurgu ve konsept tasarım yaklaşımlarıyla bütüncül bir görsel anlatı olarak kurgulanmıştır. Müzik, görüntü ve duygu arasında tek bir anlatı dili oluşturmak hedeflenmiştir.</p>

                <h3>Proje Kapsamı</h3>
                <ul>
                    <li>Müzik prodüksiyonu ve düzenleme</li>
                    <li>Yapay zekâ destekli klip üretimi</li>
                    <li>Görsel konsept ve sahne tasarımı</li>
                    <li>Prompt tasarımı ve yaratıcı yönlendirme</li>
                    <li>Kurgu ve post-prodüksiyon</li>
                </ul>

                <h3>Künye</h3>
                <ul class="credits-list">
                    <li><strong>Eser:</strong> Sevda Gülüsün (Söz: Nurgül Ekeke – Beste: Hüseyin Çebi)</li>
                    <li><strong>Solist:</strong> Koralp Yorulmaz</li>
                    <li><strong>Müzik & Mixing:</strong> SUNO v5</li>
                    <li><strong>Görsel Üretim:</strong> Veo 3.1, Higgsfield AI</li>
                    <li><strong>Kapak Tasarımı:</strong> Gemini Nano Banana Pro</li>
                    <li><strong>Konsept & Prompt Tasarımı:</strong> Alp İlkme</li>
                </ul>
            `
        },
        'vesvese': {
            title: 'Vesvese: Cin Fısıltısı',
            content: `
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="poster_vesvese.jpg" alt="Vesvese: Cin Fısıltısı Afiş" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">
                </div>
                <h3>Vesvese: Cin Fısıltısı</h3>
                <p><strong>Video Prodüksiyon Uzmanı</strong><br>
                Boyoz Yapım · Tam zamanlı<br>
                ${formatMonthYear('2021-05-01')} - ${formatMonthYear('2021-07-01')} · 3 ay<br>
                İzmir, Türkiye · Ofisten</p>
                
                <p>Vesvese: Cin Fısıltısı sinema filmi için. Kurgu operatörlüğü ve kamera asistanlığı yaptım.</p>
                
                <h3>Yetenekler:</h3>
                <div class="skill-tags-container" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                    <span class="skill-tag">Hareket Grafikleri</span>
                    <span class="skill-tag">Video Düzenleme</span>
                    <span class="skill-tag">Animasyon</span>
                    <span class="skill-tag">Adobe Creative Cloud</span>
                    <span class="skill-tag">Post prodüksiyon</span>
                    <span class="skill-tag">Prömiyer</span>
                    <span class="skill-tag">Kurgu</span>
                    <span class="skill-tag">Kamera</span>
                    <span class="skill-tag">Tasarım</span>
                    <span class="skill-tag">Ekip Çalışması</span>
                    <span class="skill-tag">Video</span>
                    <span class="skill-tag">Video Prodüksiyonu</span>
                    <span class="skill-tag">Videografi</span>
                    <span class="skill-tag">Grafik Tasarımı</span>
                    <span class="skill-tag">Film Düzenleme</span>
                    <span class="skill-tag">Adobe Creative Suite</span>
                    <span class="skill-tag">Ses Düzenleme</span>
                    <span class="skill-tag">Photoshop</span>
                </div>
            `
        }
    };

    const backgroundElements = Array.from(document.body.children)
        .filter((element) => element !== modal && element.tagName !== 'SCRIPT');
    const backgroundState = new Map();
    let lastFocusedElement = null;
    let previousBodyOverflow = '';

    const toEmbedUrl = (rawUrl, autoplay = false) => {
        try {
            const url = new URL(rawUrl);
            const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
            const pathParts = url.pathname.split('/').filter(Boolean);
            let videoId = '';
            let embedUrl = null;

            if (hostname === 'youtu.be') {
                videoId = pathParts[0] || '';
            } else if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
                if (['embed', 'shorts', 'live'].includes(pathParts[0])) {
                    videoId = pathParts[1] || '';
                } else {
                    videoId = url.searchParams.get('v') || '';
                }

                if (/^[A-Za-z0-9_-]{6,}$/.test(videoId)) {
                    embedUrl = `https://www.youtube.com/embed/${videoId}`;
                }
            }

            if (!embedUrl && /^[A-Za-z0-9_-]{6,}$/.test(videoId)) {
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            }

            if (!embedUrl && (hostname === 'vimeo.com' || hostname === 'player.vimeo.com')) {
                videoId = pathParts.find((part) => /^\d+$/.test(part)) || '';
                if (videoId) embedUrl = `https://player.vimeo.com/video/${videoId}`;
            }

            if (!embedUrl) return null;
            return autoplay ? `${embedUrl}?autoplay=1` : embedUrl;
        } catch (error) {
            return null;
        }
    };

    const setBackgroundInert = (isInert) => {
        if (isInert) {
            backgroundState.clear();
            backgroundElements.forEach((element) => {
                backgroundState.set(element, {
                    hadInert: element.hasAttribute('inert'),
                    ariaHidden: element.getAttribute('aria-hidden')
                });
                element.setAttribute('inert', '');
                element.setAttribute('aria-hidden', 'true');
            });
            return;
        }

        backgroundElements.forEach((element) => {
            const state = backgroundState.get(element);
            if (!state) return;

            if (!state.hadInert) element.removeAttribute('inert');
            if (state.ariaHidden === null) {
                element.removeAttribute('aria-hidden');
            } else {
                element.setAttribute('aria-hidden', state.ariaHidden);
            }
        });
        backgroundState.clear();
    };

    const openModal = () => {
        const wasActive = modal.classList.contains('active');
        if (!wasActive) {
            lastFocusedElement = document.activeElement;
            previousBodyOverflow = document.body.style.overflow;
            setBackgroundInert(true);
            document.body.style.overflow = 'hidden';
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        closeBtn.focus({ preventScroll: true });
        requestAnimationFrame(() => {
            if (modal.classList.contains('active')) closeBtn.focus({ preventScroll: true });
        });
        window.setTimeout(() => {
            if (modal.classList.contains('active') && document.activeElement !== closeBtn) {
                closeBtn.focus({ preventScroll: true });
            }
        }, 50);
    };

    window.openProjectDetails = function (projectId) {
        const data = projectDetails[projectId];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalText.innerHTML = `<div class="details-body">${data.content}</div>`;
        modalContent.classList.remove('video-mode');
        modalContent.classList.add('text-mode');

        const embedUrl = data.videoUrl ? toEmbedUrl(data.videoUrl) : null;
        if (embedUrl) {
            modalFrame.src = embedUrl;
            modalFrame.title = `${data.title} videosu`;
            videoContainer.hidden = false;
        } else {
            modalFrame.removeAttribute('src');
            videoContainer.hidden = true;
        }

        openModal();
    };

    window.openVideo = function (videoUrl, title = 'Proje Videosu') {
        const embedUrl = toEmbedUrl(videoUrl, true);
        if (!embedUrl) {
            alert('Video bağlantısı geçersiz veya desteklenmiyor.');
            return;
        }

        modalTitle.textContent = title;
        modalText.innerHTML = '';
        modalFrame.src = embedUrl;
        modalFrame.title = `${title} videosu`;
        videoContainer.hidden = false;
        modalContent.classList.remove('text-mode');
        modalContent.classList.add('video-mode');
        openModal();
    };

    window.closeModal = function () {
        if (!modal.classList.contains('active')) return;

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modalFrame.removeAttribute('src');
        videoContainer.hidden = true;
        modalTitle.textContent = '';
        modalText.innerHTML = '';
        modalContent.classList.remove('text-mode', 'video-mode');
        document.body.style.overflow = previousBodyOverflow;
        setBackgroundInert(false);

        if (lastFocusedElement instanceof HTMLElement && lastFocusedElement.isConnected) {
            lastFocusedElement.focus({ preventScroll: true });
        }
        lastFocusedElement = null;
    };

    document.querySelectorAll('[data-project-id]').forEach((button) => {
        button.addEventListener('click', () => openProjectDetails(button.dataset.projectId));
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('focusin', (event) => {
        if (modal.classList.contains('active') && !modal.contains(event.target)) {
            closeBtn.focus({ preventScroll: true });
        }
    });

    document.addEventListener('keydown', (event) => {
        if (!modal.classList.contains('active')) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key !== 'Tab') return;

        const focusableElements = Array.from(modal.querySelectorAll(
            'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
        )).filter((element) => !element.hidden && element.getClientRects().length > 0);

        if (!focusableElements.length) {
            event.preventDefault();
            closeBtn.focus();
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    });
});
