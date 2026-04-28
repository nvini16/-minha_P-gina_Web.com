// LOADING
window.onload = () => {
  document.getElementById("loading").style.display = "none";
};

// FRASES DINÂMICAS
const frases = [
  "A vida é um pacote completo.",
  "Dor e alegria caminham juntas.",
  "Tudo que você sente tem um propósito."
];

let i = 0;

setInterval(() => {
  document.getElementById("frase").textContent = frases[i];
  i = (i + 1) % frases.length;
}, 3000);

// ALERT
function mostrarAlerta(msg) {
  const alerta = document.getElementById("alerta");
  alerta.textContent = msg;
  alerta.style.display = "block";

  setTimeout(() => {
    alerta.style.display = "none";
  }, 3000);
}
