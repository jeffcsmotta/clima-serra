/**
 * Clima Serra - Climatização & Ar Condicionado
 * Engine de Interação, Controle de CTA Único e Roteamento WhatsApp
 */

(function () {
  'use strict';

  const HUGO_PHONE = '555491678733'; // +55 54 9167-8733

  // Mensagens pré-configuradas sem formalidades desnecessárias
  const WHATSAPP_MESSAGES = {
    urgente: 'Olá, Hugo! Preciso de conserto ou diagnóstico urgente para meu ar condicionado em Caxias do Sul.',
    higienizacao: 'Olá, Hugo! Gostaria de agendar a higienização e limpeza profunda do meu ar condicionado.',
    instalacao: 'Olá, Hugo! Gostaria de solicitar um orçamento para instalação de ar condicionado.',
    gas: 'Olá, Hugo! Suspeito que meu ar condicionado precisa de recarga de gás ou conserto de vazamento.',
    venda: 'Olá, Hugo! Gostaria de saber sobre os aparelhos disponíveis e consultoria técnica.',
    geral: 'Olá, Hugo! Encontrei a Clima Serra pelo site e gostaria de tirar uma dúvida sobre ar condicionado.'
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
