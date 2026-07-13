(function () {
    'use strict';

    const updateDesktopTime = () => {
        const now = new Date();
        const label = new Intl.DateTimeFormat('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(now);
        const machineValue = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        document.querySelectorAll('[data-desktop-time]').forEach((clock) => {
            clock.textContent = label;
            clock.setAttribute('datetime', machineValue);
        });
    };

    const initializeDesktop = () => {
        updateDesktopTime();
        window.setInterval(updateDesktopTime, 60000);
        document.documentElement.classList.add('desktop-ready');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeDesktop, { once: true });
    } else {
        initializeDesktop();
    }
})();
