document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('videoModal');
    const modalFrame = document.getElementById('videoFrame');
    const closeBtn = document.querySelector('.close-modal');
    const overlay = document.querySelector('.modal-overlay');

    const modalText = document.getElementById('modalText');

    // Project Data
    const projectDetails = {
        'mazi_kalbimde': {
            title: 'Mazi Kalbimde Bir Yaradır - AI Music & Video Producer',
            videoUrl: 'https://vimeo.com/1159577486',
            content: `
                <h3>AI Music & Video Producer (Project-Based)</h3>
                <p><strong>Şahıs · Dönemsel</strong><br>
                Oca 2026 - Oca 2026 · 1 ay<br>
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
                <p><strong>Ağu 2025 - Kas 2025 (2,5 Ay – Ofis içi, tam zamanlı proje)</strong></p>
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
                <p><strong>Ağu 2021 - May 2025 (3 yıl 10 ay – Ofis içi, tam zamanlı)</strong></p>
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
                May 2021 - Tem 2021 · 3 ay<br>
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

    // Function to open text details (and optional video)
    window.openProjectDetails = function (projectId) {
        const data = projectDetails[projectId];
        if (!data) return;

        // Set Text Content
        modalText.innerHTML = `<h2>${data.title}</h2><div class="details-body">${data.content}</div`;

        // Handle Video if present
        const videoContainer = document.getElementById('videoContainer');
        const modalVideoTitle = document.getElementById('modalVideoTitle');
        const modalContent = document.querySelector('.modal-content');

        if (data.videoUrl) {
            let embedUrl = data.videoUrl;

            // Convert YouTube Watch URL to Embed URL
            if (embedUrl.includes('youtube.com/watch?v=')) {
                const videoId = embedUrl.split('v=')[1].split('&')[0];
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            } else if (embedUrl.includes('youtu.be/')) {
                const videoId = embedUrl.split('youtu.be/')[1].split('?')[0];
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            } else if (embedUrl.includes('vimeo.com/')) {
                const videoId = embedUrl.split('vimeo.com/')[1];
                embedUrl = `https://player.vimeo.com/video/${videoId}`;
            }

            modalFrame.src = embedUrl;
            videoContainer.style.display = 'block';
            modalVideoTitle.style.display = 'none';
        } else {
            videoContainer.style.display = 'none';
            modalFrame.src = '';
        }

        // Switch to text mode (layout)
        modalText.style.display = 'block';
        modalFrame.style.display = 'block';

        modalContent.classList.add('text-mode'); // Keep text-mode for padding etc

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Function to open modal (Video Loop - Pure Video Mode)
    window.openVideo = function (videoUrl, title = null) {
        if (!videoUrl || videoUrl === 'null') {
            alert('Bu proje için video henüz yüklenmedi.');
            return;
        }

        const videoContainer = document.getElementById('videoContainer');
        const modalVideoTitle = document.getElementById('modalVideoTitle');
        const modalContent = document.querySelector('.modal-content');

        // Handle YouTube URLs to ensure embed format
        let embedUrl = videoUrl;
        if (videoUrl.includes('youtube.com/watch?v=')) {
            const videoId = videoUrl.split('v=')[1];
            embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else if (videoUrl.includes('youtu.be/')) {
            const videoId = videoUrl.split('youtu.be/')[1];
            embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else if (videoUrl.includes('vimeo.com/')) {
            // Vimeo support
            const videoId = videoUrl.split('vimeo.com/')[1];
            embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
        }

        modalFrame.src = embedUrl;

        // Setup Title
        if (title) {
            modalVideoTitle.innerText = title;
            modalVideoTitle.style.display = 'block';
        } else {
            modalVideoTitle.style.display = 'none';
        }

        // Switch to video mode
        modalText.style.display = 'none';
        modalFrame.style.display = 'block'; // Ensure iframe is visible within wrapper
        videoContainer.style.display = 'block';

        // Add specific class for styling
        modalContent.classList.remove('text-mode');
        modalContent.classList.add('video-mode');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    // Function to close modal
    window.closeModal = function () {
        modal.classList.remove('active');
        modalFrame.src = ''; // Stop video
        modalText.innerHTML = '';

        // Reset Video Container
        document.getElementById('videoContainer').style.display = 'none';
        document.getElementById('modalVideoTitle').innerText = '';

        document.body.style.overflow = '';
        // Reset classes
        const modalContent = document.querySelector('.modal-content');
        modalContent.classList.remove('text-mode');
        modalContent.classList.remove('video-mode');
    }

    // Event Listeners
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
