(function () {
    'use strict';

    let resetMacDockMagnification = () => {};

    const syncThemeAwareImages = (theme = document.documentElement.dataset.theme) => {
        const safeTheme = theme === 'light' ? 'light' : 'dark';

        document.querySelectorAll('[data-icon-light][data-icon-dark]').forEach((image) => {
            const nextSource = safeTheme === 'light' ? image.dataset.iconLight : image.dataset.iconDark;
            if (nextSource && image.getAttribute('src') !== nextSource) image.src = nextSource;
        });
    };

    const createOSSwitcher = () => {
        document.querySelectorAll('.window-actions').forEach((actions) => {
            if (actions.querySelector('[data-os-switcher]')) return;

            const selectedOS = document.documentElement.dataset.os === 'windows' ? 'windows' : 'mac';
            const switcher = document.createElement('div');
            switcher.className = 'os-switcher';
            switcher.dataset.osSwitcher = '';
            switcher.setAttribute('role', 'group');
            switcher.setAttribute('aria-label', 'İşletim sistemi görünümü');
            switcher.innerHTML = `
                <button class="os-option os-option--mac" type="button" data-os-option="mac" aria-label="Mac görünümünü seç" title="Mac görünümü" aria-pressed="${selectedOS === 'mac'}">
                    <img class="os-option-image os-option-image--apple" src="icons/mac/apple_white.png" data-icon-dark="icons/mac/apple_white.png" data-icon-light="icons/mac/apple_dark_grey.png" alt="" width="18" height="21" draggable="false">
                </button>
                <button class="os-option os-option--windows" type="button" data-os-option="windows" aria-label="Windows 11 görünümünü seç" title="Windows 11 görünümü" aria-pressed="${selectedOS === 'windows'}">
                    <img class="os-option-image" src="icons/windows/windows_logo.png" alt="" width="24" height="24" draggable="false">
                </button>`;
            actions.insertBefore(switcher, actions.firstChild);
        });
    };

    const createWindowsTaskbar = () => {
        if (document.querySelector('.windows-taskbar')) return;

        const taskbar = document.createElement('div');
        taskbar.className = 'windows-taskbar';
        taskbar.setAttribute('role', 'img');
        taskbar.setAttribute('aria-label', 'Windows 11 görev çubuğu önizlemesi');
        taskbar.innerHTML = `
            <div class="windows-taskbar-center" aria-hidden="true">
                <span class="win-task-icon win-task-icon--start" title="Başlat">
                    <img class="win-task-image" src="icons/windows/windows_logo.png" alt="" width="32" height="32" draggable="false">
                </span>
                <span class="win-task-search" title="Ara">
                    <svg focusable="false"><use href="desktop-icons.svg#icon-search"></use></svg>
                    <span>Ara</span>
                </span>
                <span class="win-task-icon win-task-icon--task-view" title="Çoklu masaüstü">
                    <img class="win-task-image" src="icons/windows/task_view.png" alt="" width="32" height="32" draggable="false">
                </span>
                <span class="win-task-icon win-task-icon--copilot" title="Copilot">
                    <img class="win-task-image" src="icons/windows/copilot.png" alt="" width="32" height="32" draggable="false">
                </span>
                <span class="win-task-icon win-task-icon--explorer" title="Dosya Gezgini">
                    <img class="win-task-image" src="icons/windows/file_explorer.png" alt="" width="32" height="32" draggable="false">
                </span>
                <span class="win-task-icon win-task-icon--edge" title="Microsoft Edge">
                    <img class="win-task-image" src="icons/windows/edge.png" alt="" width="32" height="32" draggable="false">
                </span>
                <span class="win-task-icon win-task-icon--settings" title="Ayarlar">
                    <img class="win-task-image" src="icons/windows/settings.png" alt="" width="32" height="32" draggable="false">
                </span>
                <span class="win-task-icon win-task-icon--alp" title="ALP.OS">
                    <span class="win-alp-logo">A</span><i class="win-running-indicator"></i>
                </span>
            </div>
            <div class="windows-taskbar-tray" aria-hidden="true">
                <span class="win-tray-symbols">⌃ &nbsp; ◔ &nbsp; ▰</span>
                <span>TR</span>
                <time class="windows-tray-time" data-desktop-time datetime="12:00">12:00</time>
                <span class="windows-tray-date" data-desktop-date>13.07.2026</span>
            </div>`;
        document.body.appendChild(taskbar);
    };

    const setupMacDockMagnification = (dock) => {
        if (!dock || dock.dataset.macDockMotionReady === 'true') return;

        const itemsContainer = dock.querySelector('.mac-dock-items');
        const slots = Array.from(dock.querySelectorAll('[data-mac-dock-slot]'));
        const visuals = slots.map((slot) => slot.querySelector('.mac-dock-visual'));
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const hoverPointer = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');

        if (!itemsContainer || !slots.length || visuals.some((visual) => !visual)) return;

        dock.dataset.macDockMotionReady = 'true';

        let centers = [];
        let latestPointerX = 0;
        let animationFrame = 0;
        let isActive = false;

        const canMagnify = () => (
            document.documentElement.dataset.os === 'mac' &&
            hoverPointer.matches &&
            !reducedMotion.matches
        );

        const cacheCenters = () => {
            centers = slots.map((slot) => {
                const rect = slot.getBoundingClientRect();
                return rect.left + rect.width / 2;
            });
        };

        const reset = () => {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            animationFrame = 0;
            isActive = false;
            dock.classList.remove('is-magnifying');

            visuals.forEach((visual) => {
                visual.style.removeProperty('--dock-scale');
                visual.style.removeProperty('--dock-lift');
                visual.style.removeProperty('--dock-shift');
            });
        };

        const render = () => {
            animationFrame = 0;

            if (!isActive || !canMagnify()) {
                reset();
                return;
            }

            visuals.forEach((visual, index) => {
                const distance = Math.abs(latestPointerX - centers[index]);
                const proximity = Math.max(0, 1 - distance / 160);
                const influence = proximity * proximity * (3 - 2 * proximity);
                const scale = 1 + 0.42 * influence;
                const lift = -17 * influence;
                const shift = Math.sign(centers[index] - latestPointerX) * 10 * influence;

                visual.style.setProperty('--dock-scale', scale.toFixed(3));
                visual.style.setProperty('--dock-lift', `${lift.toFixed(2)}px`);
                visual.style.setProperty('--dock-shift', `${shift.toFixed(2)}px`);
            });
        };

        const scheduleRender = () => {
            if (!animationFrame) animationFrame = window.requestAnimationFrame(render);
        };

        const handlePointerEnter = (event) => {
            if (event.pointerType === 'touch' || !canMagnify()) return;

            isActive = true;
            latestPointerX = event.clientX;
            cacheCenters();
            dock.classList.add('is-magnifying');
            scheduleRender();
        };

        const handlePointerMove = (event) => {
            if (event.pointerType === 'touch') return;

            if (!isActive) {
                handlePointerEnter(event);
                return;
            }

            latestPointerX = event.clientX;
            scheduleRender();
        };

        const supportsPointerEvents = 'PointerEvent' in window;
        dock.addEventListener(supportsPointerEvents ? 'pointerenter' : 'mouseenter', handlePointerEnter);
        dock.addEventListener(supportsPointerEvents ? 'pointermove' : 'mousemove', handlePointerMove);
        dock.addEventListener(supportsPointerEvents ? 'pointerleave' : 'mouseleave', reset);
        if (supportsPointerEvents) dock.addEventListener('pointercancel', reset);

        const refreshGeometry = () => {
            cacheCenters();
            if (isActive) scheduleRender();
        };

        if (typeof ResizeObserver === 'function') {
            const resizeObserver = new ResizeObserver(refreshGeometry);
            resizeObserver.observe(dock);
            resizeObserver.observe(itemsContainer);
            dock.macDockResizeObserver = resizeObserver;
        }

        window.addEventListener('resize', refreshGeometry, { passive: true });
        window.visualViewport?.addEventListener('resize', refreshGeometry, { passive: true });

        const handleMediaChange = () => {
            reset();
            cacheCenters();
        };

        [reducedMotion, hoverPointer].forEach((mediaQuery) => {
            if (typeof mediaQuery.addEventListener === 'function') {
                mediaQuery.addEventListener('change', handleMediaChange);
            } else if (typeof mediaQuery.addListener === 'function') {
                mediaQuery.addListener(handleMediaChange);
            }
        });

        resetMacDockMagnification = reset;
    };

    const createMacDock = () => {
        const existingDock = document.querySelector('[data-mac-dock]');
        if (existingDock) {
            syncThemeAwareImages();
            setupMacDockMagnification(existingDock);
            return;
        }

        const dock = document.createElement('div');
        dock.className = 'mac-system-dock';
        dock.dataset.macDock = '';
        dock.setAttribute('role', 'img');
        dock.setAttribute('aria-label', 'macOS uygulama Dock önizlemesi');
        dock.innerHTML = `
            <div class="mac-dock-items" aria-hidden="true">
                <span class="mac-dock-slot" data-mac-dock-slot>
                    <span class="mac-dock-visual">
                        <img class="mac-dock-image" src="icons/mac/finder_dark.png" data-icon-dark="icons/mac/finder_dark.png" data-icon-light="icons/mac/finder_light.png" alt="" draggable="false">
                    </span>
                    <span class="mac-dock-tooltip">Finder</span>
                </span>
                <span class="mac-dock-slot" data-mac-dock-slot>
                    <span class="mac-dock-visual">
                        <img class="mac-dock-image" src="icons/mac/safari_dark.png" data-icon-dark="icons/mac/safari_dark.png" data-icon-light="icons/mac/safari_light.png" alt="" draggable="false">
                    </span>
                    <span class="mac-dock-tooltip">Safari</span>
                </span>
                <span class="mac-dock-slot" data-mac-dock-slot>
                    <span class="mac-dock-visual">
                        <img class="mac-dock-image" src="icons/mac/photos_dark.png" data-icon-dark="icons/mac/photos_dark.png" data-icon-light="icons/mac/photos_light.png" alt="" draggable="false">
                    </span>
                    <span class="mac-dock-tooltip">Fotoğraflar</span>
                </span>
                <span class="mac-dock-slot" data-mac-dock-slot>
                    <span class="mac-dock-visual">
                        <img class="mac-dock-image" src="icons/mac/appstore_dark.png" data-icon-dark="icons/mac/appstore_dark.png" data-icon-light="icons/mac/appstore_light.png" alt="" draggable="false">
                    </span>
                    <span class="mac-dock-tooltip">App Store</span>
                </span>
                <span class="mac-dock-slot" data-mac-dock-slot>
                    <span class="mac-dock-visual">
                        <img class="mac-dock-image" src="icons/mac/calculator_dark.png" data-icon-dark="icons/mac/calculator_dark.png" data-icon-light="icons/mac/calculator_light.png" alt="" draggable="false">
                    </span>
                    <span class="mac-dock-tooltip">Hesap Makinesi</span>
                </span>
                <span class="mac-dock-slot" data-mac-dock-slot>
                    <span class="mac-dock-visual">
                        <img class="mac-dock-image" src="icons/mac/clock_dark.png" data-icon-dark="icons/mac/clock_dark.png" data-icon-light="icons/mac/clock_light.png" alt="" draggable="false">
                    </span>
                    <span class="mac-dock-tooltip">Saat</span>
                </span>
                <span class="mac-dock-slot" data-mac-dock-slot>
                    <span class="mac-dock-visual">
                        <img class="mac-dock-image" src="icons/mac/tv.png" alt="" draggable="false">
                    </span>
                    <span class="mac-dock-tooltip">TV</span>
                </span>
                <span class="mac-dock-slot" data-mac-dock-slot>
                    <span class="mac-dock-visual">
                        <img class="mac-dock-image" src="icons/mac/settings_dark.png" data-icon-dark="icons/mac/settings_dark.png" data-icon-light="icons/mac/sattings_light.png" alt="" draggable="false">
                    </span>
                    <span class="mac-dock-tooltip">Sistem Ayarları</span>
                </span>
                <span class="mac-dock-slot mac-dock-slot--alp mac-dock-slot--running" data-mac-dock-slot>
                    <span class="mac-dock-visual">
                        <span class="win-alp-logo mac-alp-logo">A</span>
                    </span>
                    <span class="mac-dock-tooltip">ALP.OS</span>
                </span>
                <span class="mac-dock-separator" aria-hidden="true"></span>
                <span class="mac-dock-slot mac-dock-slot--folder" data-mac-dock-slot>
                    <span class="mac-dock-visual">
                        <img class="mac-dock-image mac-dock-image--folder" src="icons/mac/download_folder.png" alt="" draggable="false">
                    </span>
                    <span class="mac-dock-tooltip">İndirilenler</span>
                </span>
                <span class="mac-dock-slot mac-dock-slot--trash" data-mac-dock-slot>
                    <span class="mac-dock-visual">
                        <img class="mac-dock-image mac-dock-image--trash" src="icons/mac/trash_full_dark.png" data-icon-dark="icons/mac/trash_full_dark.png" data-icon-light="icons/mac/trash_full_light.png" alt="" draggable="false">
                    </span>
                    <span class="mac-dock-tooltip">Çöp Sepeti</span>
                </span>
            </div>`;

        document.body.appendChild(dock);
        syncThemeAwareImages();
        setupMacDockMagnification(dock);
    };

    const updateDesktopTime = () => {
        const now = new Date();
        const label = new Intl.DateTimeFormat('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(now);
        const dateLabel = new Intl.DateTimeFormat('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(now);
        const machineValue = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        document.querySelectorAll('[data-desktop-time]').forEach((clock) => {
            clock.textContent = label;
            clock.setAttribute('datetime', machineValue);
        });

        document.querySelectorAll('[data-desktop-date]').forEach((date) => {
            date.textContent = dateLabel;
        });
    };

    const initializeDesktop = () => {
        createOSSwitcher();
        createWindowsTaskbar();
        createMacDock();
        syncThemeAwareImages();
        updateDesktopTime();
        window.setInterval(updateDesktopTime, 60000);
        document.documentElement.classList.add('desktop-ready');
    };

    window.addEventListener('alp:appearancechange', (event) => {
        syncThemeAwareImages(event.detail?.theme);
        if (event.detail?.os !== 'mac') resetMacDockMagnification();
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDesktop, { once: true });
    } else {
        initializeDesktop();
    }
})();
