document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("input");
  const btn = document.getElementById("btn-enviar");
  const mensagens = document.getElementById("mensagens");

  const insta = "https://instagram.com/risadinha__3rk7";

  // ===== REMOVE LOADING INICIAL
  const loadingMsg = document.getElementById("loading-msg");
  if (loadingMsg) {
    loadingMsg.remove();
  }

  // ===== MENSAGEM INICIAL
  adicionarMensagem(
    'Digite ou clique em uma das opções abaixo! pae',
    "bot"
  );

  mostrarOpcoes(["projeto", "sobre", "contato"]);

  // ===== ENVIAR MENSAGEM
  function enviarMensagem() {
    const texto = input.value.trim();
    if (!texto) return;

    adicionarMensagem(texto, "user");
    input.value = "";

    setTimeout(() => {
      const resposta = gerarRespostaTexto(texto);
      adicionarMensagem(resposta, "bot");
    }, 500);
  }

  // ===== ADICIONAR MENSAGEM
  function adicionarMensagem(texto, tipo) {
    const div = document.createElement("div");
    div.classList.add("msg", tipo);
    div.innerHTML = `<p>${texto}</p>`;
    mensagens.appendChild(div);

    mensagens.scrollTop = mensagens.scrollHeight;
  }

  // ===== NORMALIZAR TEXTO
  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // ===== RESPOSTA POR TEXTO
  function gerarRespostaTexto(texto) {
    const t = normalizar(texto);

    if (t.includes("projeto")) return gerarRespostaCodigo("projeto");
    if (t.includes("sobre")) return gerarRespostaCodigo("sobre");
    if (t.includes("contato") || t.includes("insta")) return gerarRespostaCodigo("contato");

    return `Não peguei isso... tenta clicar em uma opção abaixo ou me chama no Insta:
    <a href="${insta}" target="_blank">@risadinha__3rk7</a>`;
  }

  // ===== RESPOSTA POR CÓDIGO
  function gerarRespostaCodigo(tipo) {

    const respostas = {
      projeto: {
        texto: "Aqui estão alguns dos meus projetos principais.",
        opcoes: ["sobre", "contato"]
      },
      sobre: {
        texto: "Opa, sou o Nathanael, tenho 17 anos e tô seguindo uma jornada como desenvolvedor fullstack, Sempre buscando fazer coisas novas pra não repetir os mesmos erros.",
        opcoes: ["projeto", "contato"]
      },
      contato: {
        texto: `Fala direto comigo aqui:
        <a href="${insta}" target="_blank">@risadinha__3rk7</a>`,
        opcoes: ["projeto", "sobre"]
      }
    };

    const res = respostas[tipo];

    if (!res) return "Peraeeee!";

    setTimeout(() => {
      mostrarOpcoes(res.opcoes);
    }, 300);

    return res.texto;
  }

  // ===== MOSTRAR OPÇÕES
  function mostrarOpcoes(lista) {
    const container = document.createElement("div");
    container.classList.add("opcoes");

    const nomes = {
      projeto: "Projetos",
      sobre: "Sobre mim",
      contato: "Contato"
    };

    lista.forEach(tipo => {
      const btn = document.createElement("button");
      btn.classList.add("opcao");
      btn.textContent = nomes[tipo];

      btn.addEventListener("click", () => {
        adicionarMensagem(btn.textContent, "user");

        setTimeout(() => {
          const resposta = gerarRespostaCodigo(tipo);
          adicionarMensagem(resposta, "bot");
        }, 400);
      });

      container.appendChild(btn);
    });

    mensagens.appendChild(container);
    mensagens.scrollTop = mensagens.scrollHeight;
  }

  // ===== EVENTOS
  btn.addEventListener("click", enviarMensagem);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      enviarMensagem();
    }
  });

});
