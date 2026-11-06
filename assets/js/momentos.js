// =========================================================
// CARROSSEL
// =========================================================

const carrossel = document.getElementById("carrossel");
const slides = [...carrossel.querySelectorAll(".slide")];
const pontos = carrossel.querySelector(".carrossel-pontos");
const TEMPO_POR_FOTO = 5000;

let atual = 0;
let timer = null;

const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Usa a própria foto como fundo desfocado do slide (ver .slide::before no CSS)
slides.forEach(slide => {
    const img = slide.querySelector("img");
    slide.style.setProperty("--foto", `url("${img.src}")`);
});

// Cria uma bolinha para cada slide
const botoesPontos = slides.map((_, i) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.setAttribute("role", "tab");
    botao.setAttribute("aria-label", `Foto ${i + 1}`);
    botao.addEventListener("click", () => irPara(i));
    pontos.appendChild(botao);
    return botao;
});

function irPara(indice) {
    atual = (indice + slides.length) % slides.length;

    slides.forEach((slide, i) => slide.classList.toggle("ativo", i === atual));
    botoesPontos.forEach((botao, i) => botao.setAttribute("aria-selected", i === atual));

    reiniciarTimer();
}

function reiniciarTimer() {
    clearInterval(timer);
    if (!reduzirMovimento) {
        timer = setInterval(() => irPara(atual + 1), TEMPO_POR_FOTO);
    }
}

carrossel.querySelector(".anterior").addEventListener("click", () => irPara(atual - 1));
carrossel.querySelector(".proximo").addEventListener("click", () => irPara(atual + 1));

// Pausa enquanto o mouse está em cima
carrossel.addEventListener("mouseenter", () => clearInterval(timer));
carrossel.addEventListener("mouseleave", reiniciarTimer);

// Arrastar com o dedo no celular
let toqueInicioX = null;

carrossel.addEventListener("touchstart", e => {
    toqueInicioX = e.touches[0].clientX;
}, { passive: true });

carrossel.addEventListener("touchend", e => {
    if (toqueInicioX === null) return;
    const distancia = e.changedTouches[0].clientX - toqueInicioX;
    if (Math.abs(distancia) > 40) irPara(atual + (distancia < 0 ? 1 : -1));
    toqueInicioX = null;
});

irPara(0);


// =========================================================
// FOTO AMPLIADA (clique numa polaroid)
// =========================================================

const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const lightboxLegenda = lightbox.querySelector(".lightbox-legenda");

document.querySelectorAll(".polaroid").forEach(polaroid => {
    polaroid.tabIndex = 0;

    const abrir = () => {
        const img = polaroid.querySelector("img");
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxLegenda.textContent = polaroid.querySelector("h3")?.textContent ?? "";
        lightbox.showModal();
    };

    polaroid.addEventListener("click", abrir);
    polaroid.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            abrir();
        }
    });
});

lightbox.querySelector(".lightbox-fechar").addEventListener("click", () => lightbox.close());

// Clicar fora da foto também fecha
lightbox.addEventListener("click", e => {
    const r = lightbox.getBoundingClientRect();
    const fora = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    if (fora) lightbox.close();
});
