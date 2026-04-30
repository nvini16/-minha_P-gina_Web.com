// ===== INICIALIZAÇÃO GERAL
document.addEventListener("DOMContentLoaded", () => {

  // ===== LOADING
  const loading = document.getElementById("loading");

  if (loading) {
    setTimeout(() => {
      loading.style.opacity = "0";

      setTimeout(() => {
        loading.style.display = "none";

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

      if (el.tagName === "A") {
        e.preventDefault();
      }

      mostrarAlerta(el.dataset.msg || "Ação executada no proceder");

      if (el.tagName === "A" && el.href) {
        setTimeout(() => {
          window.location.href = el.href;
        }, 800);
      }

    });
  });

  // ===== STORIES (INSTAGRAM STYLE)
  const stories = document.querySelectorAll(".story");
  const viewer = document.getElementById("story-viewer");
  const video = document.getElementById("story-video");
  const fechar = document.getElementById("fechar");

  if (stories.length && viewer && video && fechar) {
    stories.forEach(story => {
      story.addEventListener("click", () => {
        const src = story.getAttribute("data-video");
        video.src = src;
        viewer.style.display = "flex";
        video.play();
      });
    });

    fechar.addEventListener("click", () => {
      viewer.style.display = "none";
      video.pause();
      video.currentTime = 0;
    });
  }

  // ===== TIKTOK (CARROSSEL FUNCIONAL)
  const posts = document.querySelectorAll(".post video");
  const destaque = document.querySelector(".video-destaque video");

  if (posts.length && destaque) {

    // clique troca vídeo destaque
    posts.forEach(videoEl => {
      videoEl.addEventListener("click", () => {
        const src = videoEl.querySelector("source").src;
        destaque.src = src;
        destaque.play();
      });
    });

    // ===== INTERSECTION OBSERVER (AUTO PLAY INTELIGENTE)
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    });

    posts.forEach(videoEl => {
      observer.observe(videoEl);
    });
  }

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
