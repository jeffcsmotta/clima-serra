/**
 * Clima Serra - Climatização & Ar Condicionado
 * Client Interaction & WhatsApp Routing Engine
 */

(function () {
  'use strict';

  const HUGO_PHONE = '555491678733'; // +55 54 9167-8733

  // Pre-configured conversion messages for WhatsApp
  const WHATSAPP_MESSAGES = {
    urgente: 'Olá, Sr. Hugo! Preciso de conserto ou diagnóstico urgente para meu ar condicionado em Caxias do Sul.',
    higienizacao: 'Olá, Sr. Hugo! Gostaria de agendar a higienização e limpeza profunda do meu ar condicionado.',
    instalacao: 'Olá, Sr. Hugo! Gostaria de solicitar um orçamento para instalação de ar condicionado.',
    gas: 'Olá, Sr. Hugo! Suspeito que meu ar condicionado precisa de recarga de gás ou conserto de vazamento.',
    venda: 'Olá, Sr. Hugo! Gostaria de saber sobre os aparelhos de ar condicionado disponíveis e consultoria para o meu espaço.',
    geral: 'Olá, Sr. Hugo! Encontrei a Clima Serra pelo site e gostaria de um atendimento para ar condicionado em Caxias do Sul.'
  };

  /**
   * Dispatches direct WhatsApp conversation with Sr. Hugo
   * @param {string} intent - Key from WHATSAPP_MESSAGES
   */
  window.contactHugo = function (intent) {
    const text = WHATSAPP_MESSAGES[intent] || WHATSAPP_MESSAGES.geral;
    const encodedText = encodeURIComponent(text);
    const targetUrl = `https://wa.me/${HUGO_PHONE}?text=${encodedText}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  /**
   * Initializes FAQ accordion toggling
   */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach((item) => {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items for clean accordion behavior
        faqItems.forEach((other) => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /**
   * Initializes Lucide icons safely when DOM is ready
   */
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /**
   * Mobile menu toggle handler
   */
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.backgroundColor = '#FFFFFF';
      navMenu.style.padding = '20px';
      navMenu.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      navMenu.style.borderBottom = '1px solid #E2E8F0';
    });
  }

  // Lifecycle boot
  document.addEventListener('DOMContentLoaded', () => {
    initFaqAccordion();
    initIcons();
    initMobileMenu();
  });
})();
