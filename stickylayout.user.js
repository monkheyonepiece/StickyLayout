// ==UserScript==
// @name         StickyLayout
// @namespace    https://github.com/monkheyonepiece/StickyLayout
// @updateURL    https://raw.githubusercontent.com/monkheyonepiece/StickyLayout/main/stickylayout.user.js
// @downloadURL  https://raw.githubusercontent.com/monkheyonepiece/StickyLayout/main/stickylayout.user.js
// @version      1.1.1
// @description  Colle le Layout Sous-Forums et Info pendant le scroll de la page
// @author       monkheyonepiece
// @match        https://www.jeuxvideo.com/forums/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const SIDEBAR_SEL = '.layout__contentAside';
    const BOTTOM_SEL  = '.layout__contentMain';
    const HEADER_SEL  = '.js-header, .header--affix, header.header';

    const style = document.createElement('style');
    style.innerHTML = `
        .layout__contentAside {
            position: sticky !important;
            align-self: flex-start !important;
            overflow-y: scroll !important;
            overflow-x: hidden !important;
            scrollbar-width: thin;
            scrollbar-color: rgba(255,255,255,0.5) rgba(255,255,255,0.05);
        }
        .layout__contentAside::-webkit-scrollbar { width: 6px; }
        .layout__contentAside::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
        }
        .layout__contentAside::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.5);
            border-radius: 10px;
        }
        .layout__contentAside::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.8);
        }
    `;
    document.head.appendChild(style);

    const sidebar   = document.querySelector(SIDEBAR_SEL);
    const headerEl  = document.querySelector(HEADER_SEL);
    const bottomEl  = document.querySelector(BOTTOM_SEL);

    if (!sidebar) return;

    function update() {
        const headerBottom = headerEl  ? headerEl.getBoundingClientRect().bottom  : 80;
        const footerTop    = bottomEl  ? bottomEl.getBoundingClientRect().bottom  : window.innerHeight;

        const top = headerBottom + 8;

        const maxByFooter   = footerTop - top - 8;
        const maxByViewport = window.innerHeight - top - 8;
        const maxH          = Math.max(0, Math.min(maxByFooter, maxByViewport));

        sidebar.style.top       = top  + 'px';
        sidebar.style.maxHeight = maxH + 'px';
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();

    console.log('[JVC Sticky v1.1.0] OK');
})();
