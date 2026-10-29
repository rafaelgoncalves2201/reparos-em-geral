/**
 * ==========================================================================
 * RAFAEL GONÇALVES — REPAROS EM GERAL
 * Script Principal & Configurações Editáveis
 * "Qualidade, confiança e compromisso."
 * ==========================================================================
 */

/**
 * --------------------------------------------------------------------------
 * 1. CONFIGURAÇÕES CENTRAIS EDITÁVEIS
 * Altere aqui suas informações de contato e atendimento.
 * Essas informações serão atualizadas automaticamente em todo o site.
 * --------------------------------------------------------------------------
 */
const SITE_CONFIG = {
  // Nome e identificação
  nome: "Rafael Gonçalves",
  subtitulo: "Reparos em Geral",
  slogan: "Qualidade, confiança e compromisso.",

  // WhatsApp para onde as mensagens e orçamentos serão enviados
  // IMPORTANTE: utilize apenas números, com código do país (55) + DDD + Telefone
  whatsappNumber: "5517996220084",

  // Como o telefone é exibido visualmente no site para os clientes
  whatsappDisplay: "(17) 99622-0084",

  // Instagram oficial
  instagramUser: "@_rafinhadevti",
  instagramUrl: "https://instagram.com/_rafinhadevti",

  // E-mail oficial para recebimento dos formulários de orçamento
  emailDestino: "rgcarmo545@gmail.com",

  // Região de atendimento
  regiaoAtendimento: "São José do Rio Preto e Região",

  // Horário de atendimento
  horarioAtendimento: "Segunda a Sábado, das 08h às 18h",

  // Mensagem padrão ao clicar diretamente no botão de WhatsApp geral
  mensagemPadraoWhatsApp: "Olá, Rafael! Vi seu site e gostaria de solicitar um orçamento para reparos em geral."
};

/**
 * --------------------------------------------------------------------------
 * 2. INICIALIZAÇÃO QUANDO O DOM ESTIVER PRONTO
 * --------------------------------------------------------------------------
 */
document.addEventListener("DOMContentLoaded", () => {
  aplicarConfiguracoes();
  configurarNavegacao();
  configurarFormularioOrcamento();
  configurarMascaraTelefone();
  configurarBotoesServicos();
  configurarBotaoFlutuante();
  configurarAnimacoesScroll();
  atualizarAnoCopyright();
});

/**
 * --------------------------------------------------------------------------
 * 3. APLICAÇÃO DOS DADOS CONFIGURADOS NO HTML
 * --------------------------------------------------------------------------
 */
function aplicarConfiguracoes() {
  // Atualiza elementos com data-config
  const elements = document.querySelectorAll("[data-config]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-config");
    if (SITE_CONFIG[key]) {
      el.textContent = SITE_CONFIG[key];
    }
  });

  // Atualiza links com data-config-link="whatsapp"
  const waLinks = document.querySelectorAll('[data-config-link="whatsapp"]');
  const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.mensagemPadraoWhatsApp)}`;
  waLinks.forEach((link) => {
    link.href = waUrl;
  });

  // Atualiza links do Instagram
  const instaLinks = document.querySelectorAll('[data-config-link="instagram"]');
  instaLinks.forEach((link) => {
    link.href = SITE_CONFIG.instagramUrl;
  });
}

/**
 * --------------------------------------------------------------------------
 * 4. NAVEGAÇÃO & MENU MOBILE
 * --------------------------------------------------------------------------
 */
function configurarNavegacao() {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Efeito sticky e sombra ao rolar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    destacarLinkAtivo();
  }, { passive: true });

  // Toggle do menu mobile
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Fechar ao clicar em qualquer link de navegação
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });

    // Fechar ao pressionar ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  }

  // Destacar link ativo conforme a seção visível
  function destacarLinkAtivo() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
}

/**
 * --------------------------------------------------------------------------
 * 5. FORMULÁRIO DE ORÇAMENTO COM ENVIO DIRETO PARA O E-MAIL (rgcarmo545@gmail.com)
 * E INTEGRAÇÃO ADICIONAL COM O WHATSAPP
 * --------------------------------------------------------------------------
 */
function configurarFormularioOrcamento() {
  const form = document.getElementById("orcamento-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nomeInput = document.getElementById("cliente-nome");
    const telefoneInput = document.getElementById("cliente-telefone");
    const emailInput = document.getElementById("cliente-email");
    const regiaoInput = document.getElementById("cliente-regiao");
    const servicoInput = document.getElementById("cliente-servico");
    const mensagemInput = document.getElementById("cliente-mensagem");
    const feedbackMsg = document.getElementById("form-feedback");
    const submitBtn = form.querySelector('button[type="submit"]');

    // Validação básica
    const nome = nomeInput ? nomeInput.value.trim() : "";
    const telefone = telefoneInput ? telefoneInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const regiao = (regiaoInput && regiaoInput.value.trim()) ? regiaoInput.value.trim() : "Não informada";
    const servico = servicoInput ? servicoInput.value : "Reparo em geral";
    const detalhes = mensagemInput ? mensagemInput.value.trim() : "";

    if (!nome || !detalhes) {
      if (feedbackMsg) {
        feedbackMsg.innerHTML = "Por favor, preencha pelo menos seu <strong>Nome</strong> e a <strong>Descrição do serviço</strong>.";
        feedbackMsg.className = "form-feedback error";
      }
      return;
    }

    // Texto formatado para o WhatsApp caso o cliente deseje abrir simultaneamente
    let textoWhatsApp = `*SOLICITAÇÃO DE ORÇAMENTO*\n`;
    textoWhatsApp += `------------------------------\n`;
    textoWhatsApp += `👤 *Nome:* ${nome}\n`;
    if (telefone) textoWhatsApp += `📱 *Telefone:* ${telefone}\n`;
    if (email) textoWhatsApp += `✉️ *E-mail:* ${email}\n`;
    textoWhatsApp += `📍 *Região / Bairro:* ${regiao}\n`;
    textoWhatsApp += `🔧 *Serviço de interesse:* ${servico}\n`;
    textoWhatsApp += `📝 *Descrição do que precisa:*\n"${detalhes}"\n`;
    textoWhatsApp += `------------------------------\n`;
    textoWhatsApp += `_Enviado pelo formulário do site de Rafael Gonçalves_`;

    const urlWhatsApp = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(textoWhatsApp)}`;

    // Feedback de carregamento
    const textoOriginalBtn = submitBtn ? submitBtn.innerHTML : "Enviar";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
        Enviando para o e-mail de Rafael...
      `;
    }

    if (feedbackMsg) {
      feedbackMsg.innerHTML = "Enviando seus dados diretamente para <strong>" + SITE_CONFIG.emailDestino + "</strong>...";
      feedbackMsg.className = "form-feedback";
      feedbackMsg.style.display = "block";
    }

    // Dados estruturados para o FormSubmit enviar para o e-mail
    const payload = {
      _subject: `Novo Orçamento de ${nome} - Rafael Gonçalves Reparos`,
      _template: "table",
      _captcha: "false",
      Nome: nome,
      Telefone_WhatsApp: telefone || "Não informado",
      Email_Cliente: email || "Não informado",
      Regiao_Bairro: regiao,
      Servico_Solicitado: servico,
      Descricao_Necessidade: detalhes,
      Data_Envio: new Date().toLocaleString("pt-BR")
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${SITE_CONFIG.emailDestino}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok || response.status === 200) {
        exibirSucessoEnvio();
      } else {
        // Se a API AJAX falhar, envia pelo formulário tradicional sem perder nada
        form.submit();
      }
    } catch (err) {
      // Em caso de falha de conexão ou bloqueio local, envia pelo método tradicional
      console.warn("Envio AJAX falhou, usando envio direto do formulário:", err);
      form.submit();
    }

    function exibirSucessoEnvio() {
      form.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = textoOriginalBtn;
      }

      if (feedbackMsg) {
        feedbackMsg.className = "form-feedback success";
        feedbackMsg.innerHTML = `
          <h4>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Solicitação enviada com sucesso!
          </h4>
          <p>
            Seus dados foram enviados diretamente para o e-mail de <strong>Rafael Gonçalves</strong> (<code>${SITE_CONFIG.emailDestino}</code>). Retornaremos seu contato em breve.
          </p>
          <a href="${urlWhatsApp}" target="_blank" rel="noopener noreferrer" class="feedback-wa-cta">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Deseja também abrir no WhatsApp agora?
          </a>
        `;
      }
    }
  });
}

/**
 * --------------------------------------------------------------------------
 * 6. MÁSCARA AUTOMÁTICA DE TELEFONE / WHATSAPP: (11) 99999-9999
 * --------------------------------------------------------------------------
 */
function configurarMascaraTelefone() {
  const telInput = document.getElementById("cliente-telefone");
  if (!telInput) return;

  telInput.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 10) {
      // Formato celular: (11) 99999-9999
      valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (valor.length > 6) {
      // Formato fixo ou intermediário: (11) 9999-9999
      valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else if (valor.length > 0) {
      valor = valor.replace(/^(\d{0,2})$/, "($1");
    }
    e.target.value = valor;
  });
}

/**
 * --------------------------------------------------------------------------
 * 7. BOTÕES DOS CARDS DE SERVIÇOS
 * Clicar em "Solicitar este serviço" rola suavemente para o formulário
 * e já pré-seleciona a categoria no campo de serviço!
 * --------------------------------------------------------------------------
 */
function configurarBotoesServicos() {
  const botoes = document.querySelectorAll(".btn-servico-solicitar");
  const selectServico = document.getElementById("cliente-servico");
  const campoMensagem = document.getElementById("cliente-mensagem");
  const secaoContato = document.getElementById("contato");

  botoes.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const nomeServico = btn.getAttribute("data-servico-nome");

      if (selectServico && nomeServico) {
        // Encontra ou define a opção correspondente
        let encontrou = false;
        for (let i = 0; i < selectServico.options.length; i++) {
          if (selectServico.options[i].value.toLowerCase().includes(nomeServico.toLowerCase())) {
            selectServico.selectedIndex = i;
            encontrou = true;
            break;
          }
        }
        if (!encontrou) {
          selectServico.value = nomeServico;
        }
      }

      if (secaoContato) {
        secaoContato.scrollIntoView({ behavior: "smooth" });
        if (campoMensagem) {
          setTimeout(() => {
            campoMensagem.focus();
          }, 600);
        }
      }
    });
  });
}

/**
 * --------------------------------------------------------------------------
 * 8. BOTÃO FLUTUANTE DO WHATSAPP COM TOOLTIP SUTIL
 * --------------------------------------------------------------------------
 */
function configurarBotaoFlutuante() {
  const tooltip = document.querySelector(".whatsapp-float-tooltip");
  if (!tooltip) return;

  // Mostra tooltip após 3.5 segundos de visita
  setTimeout(() => {
    tooltip.classList.add("visible");
  }, 3500);

  // Fecha tooltip ao clicar nela ou após 15 segundos
  tooltip.addEventListener("click", () => {
    tooltip.classList.remove("visible");
  });

  setTimeout(() => {
    tooltip.classList.remove("visible");
  }, 16000);
}

/**
 * --------------------------------------------------------------------------
 * 9. ANIMAÇÕES DISCRETAS NO SCROLL (INTERSECTION OBSERVER)
 * --------------------------------------------------------------------------
 */
function configurarAnimacoesScroll() {
  // Verifica se o navegador suporta IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".fade-up-init").forEach((el) => {
      el.classList.add("fade-up-visible");
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-up-visible");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-up-init").forEach((el) => {
    observer.observe(el);
  });
}

/**
 * --------------------------------------------------------------------------
 * 10. ATUALIZAÇÃO DO ANO NO COPYRIGHT
 * --------------------------------------------------------------------------
 */
function atualizarAnoCopyright() {
  const anoSpan = document.getElementById("ano-atual");
  if (anoSpan) {
    anoSpan.textContent = new Date().getFullYear();
  }
}
