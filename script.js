// ===== INICIALIZAÇÃO GERAL
document.addEventListener("DOMContentLoaded", () => {

  // ===== LOADING
  const loading = document.getElementById("loading");

  if (loading) {
    setTimeout(() => {
      loading.style.opacity = "0";

      setTimeout(() => {
        loading.style.display = "none";
      }, 500);
    }, 1200);
  }


  // ===== FRASES DINÂMICAS
  const frases = [
    "A vida é um pacote completo. Se você sente dor também pode sentir alegria.",
    "Imaturo é o homem que culpa outros por suas dores."
  ];

  const fraseEl = document.getElementById("frase");

  if (fraseEl) {
    let i = 0;
    fraseEl.textContent = frases[i];

    setInterval(() => {
      i = (i + 1) % frases.length;
      fraseEl.textContent = frases[i];
    }, 3000);
  }


  // ===== ALERT-TRIGGER (SISTEMA PRINCIPAL)
  document.querySelectorAll(".alert-trigger").forEach(el => {
    el.addEventListener("click", (e) => {

      // se for link, segura a navegação
      if (el.tagName === "A") {
        e.preventDefault();
      }

      // mostra mensagem do HTML
      mostrarAlerta(el.dataset.msg || "Ação executada 👀");

      // se for link, redireciona depois
      if (el.tagName === "A" && el.href) {
        setTimeout(() => {
          window.location.href = el.href;
        }, 800);
      }

    });
  });

});


// ===== TOAST (ALERT)
function mostrarAlerta(msg) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
                }
