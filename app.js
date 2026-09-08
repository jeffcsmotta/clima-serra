/**
 * Clima Serra - Climatização & Ar Condicionado
 * Engine de Interação, Controle de CTA Único e Roteamento WhatsApp
 */

(function () {
  'use strict';

  const HUGO_PHONE = '555491678733'; // +55 54 9167-8733

  // Mensagens pré-configuradas com foco em instalação de ar condicionado
  const WHATSAPP_MESSAGES = {
    instalacao: 'Olá, Hugo! Gostaria de solicitar um orçamento para instalação de ar condicionado em Caxias do Sul.',
    orcamento: 'Olá, Hugo! Comprei um aparelho de ar condicionado e gostaria de agendar a instalação.',
    infraestrutura: 'Olá, Hugo! Preciso de uma avaliação técnica de ponto e infraestrutura para ar condicionado.',
    visita: 'Olá, Hugo! Gostaria de agendar uma visita técnica para orçamento de instalação.',
    higienizacao: 'Olá, Hugo! Gostaria de agendar a manutenção preventiva e higienização do meu ar condicionado.',
    geral: 'Olá, Hugo! Encontrei a Clima Serra pelo site e gostaria de um orçamento para instalação de ar condicionado.'
  };

  /**
   * Aciona conversa direta com o Hugo no WhatsApp
   * @param {string} intent - Chave de WHATSAPP_MESSAGES
   */
  window.contactHugo = function (intent) {
    const text = WHATSAPP_MESSAGES[intent] || WHATSAPP_MESSAGES.geral;
    const encodedText = encodeURIComponent(text);
    const targetUrl = `https://wa.me/${HUGO_PHONE}?text=${encodedText}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  /**
   * REGRA DE BOTÃO ÚNICO EM TELA:
   * Monitora o CTA principal do Hero. O botão flutuante SÓ aparece
   * quando o CTA do Hero rolar para fora da área visível do usuário.
   */
  function initFloatingCtaObserver() {
    const heroCtaGroup = document.getElementById('hero-cta-group');
    const floatingBtn = document.getElementById('floating-whatsapp');

    if (!heroCtaGroup || !floatingBtn) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Se o CTA do Hero estiver visível na tela, esconda o flutuante
            if (entry.isIntersecting) {
              floatingBtn.classList.remove('is-visible');
            } else {
              // Só mostra se o usuário rolou para baixo do Hero
              const rect = heroCtaGroup.getBoundingClientRect();
              if (rect.top < 0) {
                floatingBtn.classList.add('is-visible');
              } else {
                floatingBtn.classList.remove('is-visible');
              }
            }
          });
        },
        {
          root: null,
          threshold: 0.1
        }
      );

      observer.observe(heroCtaGroup);
    } else {
      // Fallback para navegadores sem suporte a IntersectionObserver
      window.addEventListener('scroll', () => {
        const rect = heroCtaGroup.getBoundingClientRect();
        if (rect.bottom < 0) {
          floatingBtn.classList.add('is-visible');
        } else {
          floatingBtn.classList.remove('is-visible');
        }
      }, { passive: true });
    }
  }

  /**
   * Inicialização segura dos ícones Lucide
   */
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  // Execução no carregamento da página
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initIcons();
      initFloatingCtaObserver();
    });
  } else {
    initIcons();
    initFloatingCtaObserver();
  }
})();
