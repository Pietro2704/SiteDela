// =========================================================
// FORMULÁRIO DO DATE
//
// As perguntas são lidas direto do HTML: toda <section class="question">
// com um atributo data-resumo entra no resumo e na mensagem do WhatsApp.
// Para criar uma pergunta nova, basta copiar uma <section> no index.html.
// =========================================================

const WHATSAPP_NUMERO = "5511976627480";

const form = document.getElementById("dateForm");
const success = document.getElementById("success");
const summary = document.getElementById("summary");
const editDate = document.getElementById("editDate");
const whatsappDate = document.getElementById("whatsappDate");

// Guarda as últimas respostas confirmadas (usadas pelo botão do WhatsApp)
let respostas = null;


// =========================
// PEGAR RESPOSTAS
// =========================

function getChecked(section) {
    const values = [];

    section.querySelectorAll("input[type=checkbox]:checked").forEach(input => {
        // Se escolheu "Outro", pega o texto digitado
        if (input.value === "outro") {
            const textarea = input.closest(".option")?.querySelector(".outro-texto");
            const texto = textarea?.value.trim();
            if (texto) values.push(texto);
        } else {
            values.push(input.value);
        }
    });

    return values;
}

function lerRespostas() {
    const perguntas = [...form.querySelectorAll(".question[data-resumo]")].map(section => ({
        titulo: section.dataset.resumo,
        valores: getChecked(section)
    }));

    return {
        perguntas,
        data: document.getElementById("data").value,
        horario: document.getElementById("horario").value
    };
}


// =========================
// FORMATAR DATA E HORÁRIO
// =========================

function formatarData(data) {
    return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

function formatarHorario(horario) {
    const [hora, minuto] = horario.split(":");
    return `${hora}h${minuto}`;
}


// =========================
// MONTAR RESUMO NA TELA
// =========================

function renderizarResumo({ perguntas, data, horario }) {
    summary.replaceChildren();

    perguntas.forEach(({ titulo, valores }) => {
        const bloco = document.createElement("div");
        bloco.className = "summary-item";

        const strong = document.createElement("strong");
        strong.textContent = `${titulo}:`;
        bloco.appendChild(strong);

        valores.forEach(valor => {
            const linha = document.createElement("div");
            linha.textContent = `• ${valor}`;
            bloco.appendChild(linha);
        });

        summary.appendChild(bloco);
    });

    const quando = document.createElement("div");
    quando.className = "summary-item";
    quando.innerHTML = "<strong>📅 Data:</strong> <span></span><br><strong>🕐 Horário:</strong> <span></span>";
    const [spanData, spanHora] = quando.querySelectorAll("span");
    spanData.textContent = formatarData(data);
    spanHora.textContent = formatarHorario(horario);
    summary.appendChild(quando);
}


// =========================
// ENVIAR FORMULÁRIO
// =========================

form.addEventListener("submit", event => {
    event.preventDefault();

    const atual = lerRespostas();

    const faltaAlgo =
        atual.perguntas.some(p => p.valores.length === 0) ||
        atual.data === "" ||
        atual.horario === "";

    if (faltaAlgo) {
        alert("Ué 😔 Não tá querendo me ver não? Completa tudo aii ❤️");
        return;
    }

    respostas = atual;
    renderizarResumo(respostas);

    form.style.display = "none";
    success.classList.remove("hidden");
    success.scrollIntoView({ behavior: "smooth", block: "center" });
});


// =========================
// EDITAR DATE
// =========================

editDate.addEventListener("click", () => {
    success.classList.add("hidden");
    form.style.display = "";
    form.scrollIntoView({ behavior: "smooth", block: "start" });
});


// =========================
// ENVIAR PELO WHATSAPP
// =========================

whatsappDate.addEventListener("click", () => {
    if (!respostas) return;

    const blocos = respostas.perguntas
        .map(({ titulo, valores }) => `${titulo}:\n${valores.map(v => `• ${v}`).join("\n")}`)
        .join("\n\n");

    const mensagem = `Oi, Pietro! ❤️

Escolhi nosso date:

${blocos}

📅 Data: ${formatarData(respostas.data)}
🕐 Horário: ${formatarHorario(respostas.horario)}

Agora é só você marcar o date. 👀❤️`;

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
});
