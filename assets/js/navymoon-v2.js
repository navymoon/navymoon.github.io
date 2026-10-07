/* NAVYMOON: language preference and accessible mobile navigation. */
(() => {
  'use strict';
  const languages = new Set(['ko', 'en']);
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const languageButtons = document.querySelectorAll('[data-lang]');
  let currentLanguage = languages.has(document.documentElement.lang)
    ? document.documentElement.lang : 'en';

  function closeMenu(returnFocus = false) {
    if (!menuButton || !mobileNav) return;
    const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', currentLanguage === 'ko' ? '메뉴 열기' : 'Open menu');
    if (returnFocus && wasOpen) menuButton.focus();
  }

  function setLanguage(language, updateUrl = false) {
    if (!languages.has(language)) return;
    currentLanguage = language;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-ko][data-en]').forEach(element => {
      const value = element.dataset[language];
      if (element.tagName === 'META') element.setAttribute('content', value);
      else element.innerHTML = value;
    });
    document.querySelectorAll('[data-ko-alt][data-en-alt]').forEach(element => {
      element.setAttribute('alt', element.dataset[`${language}Alt`]);
    });
    document.querySelectorAll('[data-ko-label][data-en-label]').forEach(element => {
      element.setAttribute('aria-label', element.dataset[`${language}Label`]);
    });
    languageButtons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === language));
    });
    closeMenu();
    try { localStorage.setItem('navymoon-language', language); } catch (_) { /* Optional preference. */ }
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
    }
  }

  languageButtons.forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang, true));
  });
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMenu();
      else {
        mobileNav.hidden = false;
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.setAttribute('aria-label', currentLanguage === 'ko' ? '메뉴 닫기' : 'Close menu');
      }
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu(true);
    });
    document.addEventListener('click', event => {
      if (!mobileNav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => closeMenu());
  }

  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  let savedLanguage;
  try { savedLanguage = localStorage.getItem('navymoon-language'); } catch (_) { /* Storage may be disabled. */ }
  setLanguage(languages.has(requestedLanguage) ? requestedLanguage
    : languages.has(savedLanguage) ? savedLanguage : currentLanguage);
})();
