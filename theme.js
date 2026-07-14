(function () {
    'use strict';

    const themeStorageKey = 'alp-ilkme-theme';
    const osStorageKey = 'alp-ilkme-os';
    const root = document.documentElement;
    const systemPreference = window.matchMedia('(prefers-color-scheme: light)');
    const appearanceParams = new URLSearchParams(window.location.search);
    const requestedTheme = appearanceParams.get('theme');
    const requestedOS = appearanceParams.get('os');
    const themeColors = {
        mac: {
            dark: '#111218',
            light: '#dfe3ff'
        },
        windows: {
            dark: '#040f24',
            light: '#96b7d1'
        }
    };

    const isTheme = (value) => value === 'dark' || value === 'light';
    const isOS = (value) => value === 'mac' || value === 'windows';

    const readStorage = (key, validator) => {
        try {
            const value = window.localStorage.getItem(key);
            return validator(value) ? value : null;
        } catch (error) {
            return null;
        }
    };

    const writeStorage = (key, value) => {
        try {
            window.localStorage.setItem(key, value);
        } catch (error) {
            // The selected appearance still applies for the current page.
        }
    };

    const readStoredTheme = () => readStorage(themeStorageKey, isTheme);
    const readStoredOS = () => readStorage(osStorageKey, isOS);
    const getSystemTheme = () => systemPreference.matches ? 'light' : 'dark';

    const updateMetaColor = () => {
        const theme = isTheme(root.dataset.theme) ? root.dataset.theme : getSystemTheme();
        const os = isOS(root.dataset.os) ? root.dataset.os : 'mac';
        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) themeColor.setAttribute('content', themeColors[os][theme]);
    };

    const updateThemeControls = (theme) => {
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

    const updateOSControls = (os) => {
        document.querySelectorAll('[data-os-option]').forEach((button) => {
            const selected = button.dataset.osOption === os;
            button.setAttribute('aria-pressed', String(selected));
        });
    };

    const announceAppearanceChange = () => {
        window.dispatchEvent(new CustomEvent('alp:appearancechange', {
            detail: {
                os: root.dataset.os,
                theme: root.dataset.theme
            }
        }));
    };

    const applyTheme = (theme, announce = true) => {
        const safeTheme = isTheme(theme) ? theme : getSystemTheme();
        root.dataset.theme = safeTheme;
        root.style.colorScheme = safeTheme;
        updateMetaColor();
        updateThemeControls(safeTheme);
        if (announce) announceAppearanceChange();
    };

    const applyOS = (os, announce = true) => {
        const safeOS = isOS(os) ? os : 'mac';
        root.dataset.os = safeOS;
        updateMetaColor();
        updateOSControls(safeOS);
        if (announce) announceAppearanceChange();
    };

    applyOS(isOS(requestedOS) ? requestedOS : (readStoredOS() || 'mac'), false);
    applyTheme(isTheme(requestedTheme) ? requestedTheme : (readStoredTheme() || getSystemTheme()), false);

    document.addEventListener('DOMContentLoaded', () => {
        updateThemeControls(root.dataset.theme);
        updateOSControls(root.dataset.os);
    });

    document.addEventListener('click', (event) => {
        const themeButton = event.target.closest('[data-theme-toggle]');
        if (themeButton) {
            const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
            writeStorage(themeStorageKey, nextTheme);
            return;
        }

        const osButton = event.target.closest('[data-os-option]');
        if (osButton) {
            const nextOS = isOS(osButton.dataset.osOption) ? osButton.dataset.osOption : 'mac';
            applyOS(nextOS);
            writeStorage(osStorageKey, nextOS);
        }
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
        if (event.key === themeStorageKey || event.key === null) {
            applyTheme(isTheme(event.newValue) ? event.newValue : (readStoredTheme() || getSystemTheme()));
        }

        if (event.key === osStorageKey || event.key === null) {
            applyOS(isOS(event.newValue) ? event.newValue : (readStoredOS() || 'mac'));
        }
    });
})();
