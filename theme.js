(function () {
    'use strict';

    const storageKey = 'alp-ilkme-theme';
    const root = document.documentElement;
    const systemPreference = window.matchMedia('(prefers-color-scheme: light)');
    const themeColors = {
        dark: '#111218',
        light: '#dfe3ff'
    };

    const isTheme = (value) => value === 'dark' || value === 'light';

    const readStoredTheme = () => {
        try {
            const value = window.localStorage.getItem(storageKey);
            return isTheme(value) ? value : null;
        } catch (error) {
            return null;
        }
    };

    const storeTheme = (theme) => {
        try {
            window.localStorage.setItem(storageKey, theme);
        } catch (error) {
            // The selected theme still applies for the current page when storage is unavailable.
        }
    };

    const getSystemTheme = () => systemPreference.matches ? 'light' : 'dark';

    const updateControls = (theme) => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        const nextLabel = nextTheme === 'light' ? 'Açık' : 'Koyu';
        const actionLabel = `${nextLabel} temaya geç`;

        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            button.hidden = false;
            button.setAttribute('aria-label', actionLabel);
            button.setAttribute('title', actionLabel);
            const label = button.querySelector('[data-theme-label]');
            if (label) label.textContent = nextLabel;
        });
    };

    const applyTheme = (theme) => {
        const safeTheme = isTheme(theme) ? theme : getSystemTheme();
        root.dataset.theme = safeTheme;
        root.style.colorScheme = safeTheme;

        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) themeColor.setAttribute('content', themeColors[safeTheme]);

        updateControls(safeTheme);
    };

    const initialTheme = readStoredTheme() || getSystemTheme();
    applyTheme(initialTheme);

    document.addEventListener('DOMContentLoaded', () => {
        updateControls(root.dataset.theme);

        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            button.addEventListener('click', () => {
                const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
                applyTheme(nextTheme);
                storeTheme(nextTheme);
            });
        });
    });

    const handleSystemChange = (event) => {
        if (!readStoredTheme()) applyTheme(event.matches ? 'light' : 'dark');
    };

    if (typeof systemPreference.addEventListener === 'function') {
        systemPreference.addEventListener('change', handleSystemChange);
    } else if (typeof systemPreference.addListener === 'function') {
        systemPreference.addListener(handleSystemChange);
    }

    window.addEventListener('storage', (event) => {
        if (event.key !== storageKey && event.key !== null) return;
        applyTheme(isTheme(event.newValue) ? event.newValue : getSystemTheme());
    });
})();
