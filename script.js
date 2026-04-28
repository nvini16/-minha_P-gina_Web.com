// ===== INICIALIZAÇÃO GERAL
document.addEventListener("DOMContentLoaded", () => {

  // ===== LOADING
  const loading = document.getElementById("loading");

  if (loading) {
    setTimeout(() => {
      loading.style.opacity = "0";

      setTimeout(() => {
        loading.style.display = "none";

        // ===== ALERT (primeira visita)
        if (!localStorage.getItem("visitou")) {
          mostrarAlerta("Pagina em desenvolvimento guys!");
          localStorage.setItem("visitou", "true");
        }

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


  // ===== ALERT-TRIGGER SYSTEM
  document.querySelectorAll(".alert-trigger").forEach(el => {
    el.addEventListener("click", (e) => {

      // bloqueia navegação padrão se for link
      if (el.tagName === "A") {
        e.preventDefault();
      }

      // mostra alerta
      mostrarAlerta(el.dataset.msg || "Ação executada no proceder");

      // redireciona depois se for link
      if (el.tagName === "A" && el.href) {
        setTimeout(() => {
          window.location.href = el.href;
        }, 800);
      }

    });
  });

});


// ===== TOAST (ALERT SYSTEM)
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
