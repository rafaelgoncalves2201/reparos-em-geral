# Rafael Gonçalves — Reparos em Geral

> **Slogan:** *“Qualidade, confiança e compromisso.”*

Site profissional, moderno e 100% responsivo desenvolvido para o prestador de serviços **Rafael Gonçalves — Reparos em Geral**. O projeto foi concebido para transmitir credibilidade, destacar os serviços de manutenção residencial e converter visitantes em contatos diretos pelo WhatsApp.

---

## 📁 Estrutura de Arquivos

```
Rafael Gonçalves - Reparos em Geral/
├── index.html                  # Página principal com todas as seções, SEO e acessibilidade
├── css/
│   └── style.css              # Folha de estilos moderna (Azul-marinho, Laranja e Branco)
├── js/
│   └── script.js              # Interações, menu mobile e CENTRAL DE CONFIGURAÇÕES EDITÁVEIS
├── assets/
│   └── images/
│       ├── logo.jpg           # Logomarca oficial com ferramentas e casa
│       ├── hero-reparos.jpg   # Fotografia profissional para a seção principal
│       └── favicon.svg        # Ícone do navegador estilizado em alta resolução
└── README.md                  # Este guia de uso e personalização
```

---

## ⚙️ Como Personalizar Seus Dados (Em 1 Minuto)

Todas as informações de contato estão **centralizadas** no arquivo [`js/script.js`](file:///c:/Users/Rafael%20Goncalves/OneDrive/Documentos/Rafael%20Goncalves%20-%20Reparos%20em%20Geral/js/script.js) nas primeiras linhas.

Ao alterar os valores desse arquivo, eles serão **automaticamente atualizados** em todos os botões, links de WhatsApp, formulário e rodapé do site:

```javascript
const SITE_CONFIG = {
  // Nome e identificação
  nome: "Rafael Gonçalves",
  subtitulo: "Reparos em Geral",
  slogan: "Qualidade, confiança e compromisso.",

  // Seu WhatsApp (apenas números: DDI 55 + DDD + Número)
  whatsappNumber: "5517996220084",

  // Como o telefone aparece escrito na tela
  whatsappDisplay: "(17) 99622-0084",

  // E-mail oficial que recebe os formulários de orçamento
  emailDestino: "rgcarmo545@gmail.com",

  // Seu Instagram
  instagramUser: "@_rafinhadevti",
  instagramUrl: "https://instagram.com/_rafinhadevti",

  // Região onde você atende
  regiaoAtendimento: "São José do Rio Preto e Região",

  // Horário de atendimento
  horarioAtendimento: "Segunda a Sábado, das 08h às 18h"
};
```

---

## 📧 Recebimento dos Formulários no E-mail (rgcarmo545@gmail.com)

O formulário do site está integrado com o serviço gratuito e seguro **FormSubmit**:
- Quando um cliente preenche os dados e clica em **"Enviar solicitação de orçamento"**, todos os dados são enviados diretamente para `rgcarmo545@gmail.com`.
- **Primeiro teste/ativação:** Ao enviar o primeiro teste do formulário, o FormSubmit enviará um e-mail de confirmação para `rgcarmo545@gmail.com` com um botão **"Activate Form"**. Basta clicar nele uma única vez para ativar o recebimento automático permanente.
- O cliente também tem a opção de, logo após o envio do e-mail, clicar no botão para abrir a conversa formatada no **WhatsApp**.
```

---

## 🚀 Como Visualizar o Site

1. Dê um **duplo clique no arquivo `index.html`** para abrir diretamente em qualquer navegador (Google Chrome, Edge, Firefox, Safari).
2. Não é necessário instalar nenhum programa, servidor ou framework. É HTML5, CSS3 e JavaScript puro.

---

## 🌐 Opções Gratuitas de Publicação na Internet

Você pode publicar este site de forma 100% gratuita na web com seu próprio domínio ou subdomínio:
- **Netlify**: Basta arrastar a pasta do projeto para [netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: Importe o repositório ou faça upload em [vercel.com](https://vercel.com).
- **GitHub Pages**: Crie um repositório no GitHub e ative o Pages nas configurações.
- **Hospedagem Tradicional (HostGator, Locaweb, Hostinger)**: Envie os arquivos para a pasta `public_html` via FTP ou Gerenciador de Arquivos do cPanel.
