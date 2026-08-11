const form = document.getElementById("dateForm");
const success = document.getElementById("success");
const summary = document.getElementById("summary");
const editDate = document.getElementById("editDate");


form.addEventListener("submit", function (event) {
    event.preventDefault();

    // =========================
    // PEGAR RESPOSTAS
    // =========================

    function getChecked(name) {
        const checked = document.querySelectorAll(
            `input[name="${name}"]:checked`
        );

        const values = [];

        checked.forEach(input => {
            // Se escolheu "Outro", pegar o texto digitado
            if (input.value === "outro") {
                const textarea = input
                    .closest(".option")
                    ?.querySelector(".outro-texto");

                if (textarea && textarea.value.trim() !== "") {
                    values.push(textarea.value.trim());
                }
            } else {
                values.push(input.value);
            }
        });

        return values;
    }

    const comida = getChecked("comida");
    const atividade = getChecked("atividade");
    const clima = getChecked("clima");
    const essencial = getChecked("essencial");
    const depois = getChecked("depois");

    const dataInput = document.getElementById("data");
    const horarioInput = document.getElementById("horario");

    const data = dataInput.value;
    const horario = horarioInput.value;


    // =========================
    // VALIDAR
    // =========================

    if (
        comida.length === 0 ||
        atividade.length === 0 ||
        clima.length === 0 ||
        essencial.length === 0 ||
        depois.length === 0 ||
        data === "" ||
        horario === ""
    ) {
        alert("Ué 😔 Não tá querendo me ver não? Completa tudo aii ❤️");
        return;
    }


    // =========================
    // FORMATAR DATA
    // =========================

    const dataObj = new Date(`${data}T00:00:00`);

    const dataFormatada = dataObj.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });


    // =========================
    // FORMATAR HORÁRIO
    // =========================

    const [hora, minuto] = horario.split(":");

    const horarioFormatado = `${hora}h${minuto}`;


    // =========================
    // FORMATAR LISTAS
    // =========================

    function formatList(arr) {
        return arr
            .map(item => `• ${item}`)
            .join("<br>");
    }


    // =========================
    // MONTAR RESUMO
    // =========================

    summary.innerHTML = `
    <strong>🍔 Onde vamos comer:</strong><br>
    ${formatList(comida)}

    <br><br>

    <strong>🎬 O rolê:</strong><br>
    ${formatList(atividade)}

    <br><br>

    <strong>🌙 O clima:</strong><br>
    ${formatList(clima)}

    <br><br>

    <strong>✨ Não pode faltar:</strong><br>
    ${formatList(essencial)}

    <br><br>

    <strong>😏 Depois do date:</strong><br>
    ${formatList(depois)}

    <br><br>

    <strong>📅 Data:</strong> ${dataFormatada}<br>
    <strong>🕐 Horário:</strong> ${horarioFormatado}
`;

// =========================
// MOSTRAR SUCESSO
// =========================

form.style.display = "none";

success.classList.remove("hidden");

success.scrollIntoView({
    behavior: "smooth",
    block: "center"
});


// =========================
// EDITAR DATE
// =========================

editDate.addEventListener("click", function () {
    success.classList.add("hidden");
    form.style.display = "";

    form.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

});