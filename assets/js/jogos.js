/* ========================================================
   LÓGICA DO JOGO 1: CONEXO
======================================================== */

const CATEGORIAS_CONEXO = [

    {
        nome: "Jogos que jogamos",

        cor: "var(--cat-facil)",

        itens: [
            "TERMO",
            "CONEXO",
            "STOP",
            "FORCA"
        ]
    },

    {
        nome: "Coisas que você gosta",

        cor: "var(--cat-media)",

        itens: [
            "DIREITO",
            "JOGOS",
            "CORINTHIANS",
            "LIVROS"
        ]
    },

    {
        nome: "Coisas que lembram nossos encontros",

        cor: "var(--cat-dificil)",

        itens: [
            "CINEMA",
            "VINHO",
            "SÉRIES",
            "MCDONALDS"
        ]
    },

    {
        nome: "Coisas que o Pietro gosta",

        cor: "var(--cat-especial)",
        itens: ["PYTHON", "CÓDIGO", "SINUCA", "JÚLIA (VC)"]
    }

];



let conexoSelecionados = [];

let conexoResolvidos = [];

let conexoVidas = 4;

let conexoCartas = [];

let conexoFinalizado = false;


function iniciarConexo() {

    conexoSelecionados = [];

    conexoResolvidos = [];

    conexoVidas = 4;

    conexoFinalizado = false;

    atualizarVidasConexo();


    conexoCartas = [];


    CATEGORIAS_CONEXO.forEach((cat, indexCat) => {

        cat.itens.forEach(palavra => {

            conexoCartas.push({
                palavra,
                categoriaIndex: indexCat
            });

        });

    });


    /* Fisher-Yates */

    for (
        let i = conexoCartas.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [
            conexoCartas[i],
            conexoCartas[j]
        ] = [
            conexoCartas[j],
            conexoCartas[i]
        ];

    }


    document.getElementById(
        "btn-reiniciar-conexo"
    ).style.display = "none";


    document.getElementById(
        "conexo-mensagem"
    ).textContent = "Selecione 4 palavras";


    renderizarGridConexo();

}


function renderizarGridConexo() {

    const grid =
        document.getElementById("conexo-grid");


    grid.innerHTML = "";


    /* Grupos resolvidos */

    conexoResolvidos.forEach(catIndex => {

        const cat =
            CATEGORIAS_CONEXO[catIndex];


        const resolvedDiv =
            document.createElement("div");


        resolvedDiv.className =
            "conexo-resolved";


        resolvedDiv.style.background =
            cat.cor;


        resolvedDiv.style.color =
            catIndex === 3
                ? "#ffffff"
                : "var(--cor-primaria)";


        resolvedDiv.innerHTML = `
            <h4>${cat.nome}</h4>
            <p>${cat.itens.join(", ")}</p>
        `;


        grid.appendChild(resolvedDiv);

    });


    /* Cartas restantes */

    conexoCartas.forEach(item => {

        if (
            !conexoResolvidos.includes(
                item.categoriaIndex
            )
        ) {

            const card =
                document.createElement("div");


            card.className =
                "conexo-card" +
                (
                    conexoSelecionados.includes(
                        item.palavra
                    )
                        ? " selected"
                        : ""
                );


            card.textContent =
                item.palavra;


            card.onclick = () =>
                selecionarCardConexo(
                    item.palavra
                );


            grid.appendChild(card);

        }

    });


    document.getElementById(
        "btn-enviar-conexo"
    ).disabled =
        conexoSelecionados.length !== 4 ||
        conexoFinalizado;

}


function selecionarCardConexo(palavra) {

    if (conexoFinalizado) {
        return;
    }


    if (conexoSelecionados.includes(palavra)) {

        conexoSelecionados =
            conexoSelecionados.filter(
                p => p !== palavra
            );

    }

    else if (
        conexoSelecionados.length < 4
    ) {

        conexoSelecionados.push(palavra);

    }


    renderizarGridConexo();

}


function atualizarVidasConexo() {

    const icones =
        "❤️".repeat(conexoVidas) ||
        "💔";


    document.getElementById(
        "conexo-vidas"
    ).textContent = icones;

}


function verificarConexo() {

    if (
        conexoFinalizado ||
        conexoSelecionados.length !== 4
    ) {
        return;
    }


    const msg =
        document.getElementById(
            "conexo-mensagem"
        );


    let grupoEncontrado = null;


    CATEGORIAS_CONEXO.forEach(
        (cat, index) => {

            const pertence =
                conexoSelecionados.every(
                    palavra =>
                        cat.itens.includes(
                            palavra
                        )
                );


            if (pertence) {
                grupoEncontrado = index;
            }

        }
    );


    /* Acertou */

    if (grupoEncontrado !== null) {

        conexoResolvidos.push(
            grupoEncontrado
        );


        conexoSelecionados = [];


        if (grupoEncontrado === 3) {

            msg.textContent =
                "Essa aí foi fácil... você já devia saber que VOCÊ estaria aqui 👀❤️";

        }

        else {

            msg.textContent =
                "Boa! Grupo encontrado! 🎉";

        }


        if (
            conexoResolvidos.length ===
            CATEGORIAS_CONEXO.length
        ) {

            msg.textContent =
                "PARABÉNS! Você completou o Conexo! ❤️✨";


            conexoFinalizado = true;


            document.getElementById(
                "btn-reiniciar-conexo"
            ).style.display = "block";

        }

    }


    /* Errou */

    else {

        let quase = false;


        CATEGORIAS_CONEXO.forEach(cat => {

            const acertos =
                conexoSelecionados.filter(
                    palavra =>
                        cat.itens.includes(
                            palavra
                        )
                ).length;


            if (acertos === 3) {
                quase = true;
            }

        });


        conexoVidas--;


        atualizarVidasConexo();


        if (quase) {

            msg.textContent =
                "Quase lá! 3 de 4 correspondem. 😬";

        }

        else {

            msg.textContent =
                "Nenhum grupo correspondente. Tente de novo! ❌";

        }


        if (conexoVidas <= 0) {

            conexoFinalizado = true;


            msg.textContent =
                "Acabaram as tentativas! Quer tentar de novo? 🥺";


            document.getElementById(
                "btn-reiniciar-conexo"
            ).style.display = "block";

        }

    }


    renderizarGridConexo();

}



/* ========================================================
   LÓGICA DO JOGO 2: ADIVINHE O NÚMERO
======================================================== */

let numeroSecreto;

let tentativa;


function iniciarJogoNumero() {

    numeroSecreto =
        Math.floor(
            Math.random() * 100
        ) + 1;


    tentativa = 0;


    document.getElementById(
        "mensagem"
    ).textContent =
        "Estou pensando em um número... 👀";


    document.getElementById(
        "chute"
    ).value = "";


    document.getElementById(
        "novoJogo"
    ).style.display = "none";


    document.getElementById(
        "chute"
    ).disabled = false;


    document.getElementById(
        "botaoChutar"
    ).disabled = false;

}


function verificarChute() {

    const input =
        document.getElementById(
            "chute"
        );


    const mensagem =
        document.getElementById(
            "mensagem"
        );


    const chute =
        Number(input.value);


    if (
        !chute ||
        chute < 1 ||
        chute > 100
    ) {

        mensagem.textContent =
            "Escolha um número entre 1 e 100 😌";

        return;

    }


    tentativa++;


    if (chute < numeroSecreto) {

        mensagem.textContent =
            `Tentativa ${tentativa}: tente um número maior 📈`;

    }

    else if (chute > numeroSecreto) {

        mensagem.textContent =
            `Tentativa ${tentativa}: tente um número menor 📉`;

    }

    else {

        mensagem.textContent =
            `ACERTOU! 🎉 Você precisou de ${tentativa} tentativa(s)! ❤️`;


        input.disabled = true;


        document.getElementById(
            "botaoChutar"
        ).disabled = true;


        document.getElementById(
            "novoJogo"
        ).style.display = "block";

    }

}


/* Permite apertar Enter */

document.getElementById(
    "chute"
).addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            verificarChute();
        }

    }
);



/* ========================================================
   KARAOKÊ
======================================================== */

const musica =
    document.getElementById(
        "musica"
    );


const botaoIniciar =
    document.getElementById(
        "iniciar"
    );


const areaPopups =
    document.getElementById(
        "popups"
    );


const vinil =
    document.querySelector(
        ".vinil"
    );


/* ========================================================
   FRASES DA MÚSICA
======================================================== */

const frases = [

    {
        inicio: 12,
        fim: 16,
        texto: "You're just too good to be true"
    },

    {
        inicio: 16,
        fim: 20,
        texto: "Can't take my eyes off you"
    },

    {
        inicio: 20,
        fim: 24,
        texto: "You'd be like heaven to touch"
    },

    {
        inicio: 24,
        fim: 28,
        texto: "I wanna hold you so much"
    },

    {
        inicio: 28,
        fim: 32,
        texto: "At long last love has arrived"
    },

    {
        inicio: 32,
        fim: 36,
        texto: "And I thank God I'm alive"
    },

    {
        inicio: 36,
        fim: 40,
        texto: "You're just too good to be true"
    },

    {
        inicio: 40,
        fim: 44,
        texto: "Can't take my eyes off you"
    },

    {
        inicio: 60,
        fim: 63,
        texto: "I love you, baby"
    },

    {
        inicio: 63,
        fim: 65,
        texto: "And if it's quite all right"
    },

    {
        inicio: 65,
        fim: 67,
        texto: "I need you, baby"
    },

    {
        inicio: 67,
        fim: 69,
        texto: "To warm the lonely nights"
    },

    {
        inicio: 69,
        fim: 71,
        texto: "I love you, baby"
    },

    {
        inicio: 71,
        fim: 76,
        texto: "Trust in me when I say"
    },

    {
        inicio: 76,
        fim: 78,
        texto: "Oh, pretty baby"
    },

    {
        inicio: 78,
        fim: 80,
        texto: "Don't bring me down, I pray"
    },

    {
        inicio: 80,
        fim: 82,
        texto: "Oh, pretty baby"
    },

    {
        inicio: 82,
        fim: 84,
        texto: "Now that I've found you, stay"
    },

    {
        inicio: 84,
        fim: 88,
        texto: "And let me love you, baby"
    },

    {
        inicio: 88,
        fim: 100,
        texto: "Let me love you"
    }

];


/* ========================================================
   CONTROLE DA FRASE ATUAL
======================================================== */

let fraseAtual = -1;

let popupAtual = null;



/* ========================================================
   MOSTRAR FRASE
======================================================== */

function mostrarFrase(frase) {

    /* Remove frase anterior */

    if (popupAtual) {

        popupAtual.remove();

        popupAtual = null;

    }


    const popup =
        document.createElement(
            "div"
        );


    popup.classList.add(
        "popup"
    );


    const texto =
        document.createElement(
            "p"
        );


    texto.textContent =
        frase;


    popup.appendChild(
        texto
    );


    /* ==================================================
       POSIÇÃO ALEATÓRIA DENTRO DO KARAOKÊ
    ================================================== */

    const larguraArea =
        areaPopups.clientWidth;


    const alturaArea =
        areaPopups.clientHeight;


    const larguraPopup =
        Math.min(
            320,
            larguraArea * 0.8
        );


    const alturaPopup = 90;


    let x;
    let y;


    /*
     * Evita colocar o popup exatamente
     * no centro, onde está o player.
     */

    const lado =
        Math.floor(
            Math.random() * 4
        );


    if (lado === 0) {

        /* Esquerda */

        x =
            Math.random() *
            Math.max(
                1,
                larguraArea * 0.25 -
                larguraPopup
            );


        y =
            Math.random() *
            Math.max(
                1,
                alturaArea -
                alturaPopup
            );

    }


    else if (lado === 1) {

        /* Direita */

        x =
            larguraArea * 0.75 -
            Math.random() *
            Math.min(
                100,
                larguraArea * 0.15
            );


        y =
            Math.random() *
            Math.max(
                1,
                alturaArea -
                alturaPopup
            );

    }


    else if (lado === 2) {

        /* Superior */

        x =
            Math.random() *
            Math.max(
                1,
                larguraArea -
                larguraPopup
            );


        y =
            Math.random() *
            Math.max(
                1,
                alturaArea * 0.25
            );

    }


    else {

        /* Inferior */

        x =
            Math.random() *
            Math.max(
                1,
                larguraArea -
                larguraPopup
            );


        y =
            alturaArea * 0.70 -
            Math.random() *
            Math.min(
                40,
                alturaArea * 0.10
            );

    }


    /* Mantém dentro da área */

    x = Math.max(
        5,
        Math.min(
            x,
            larguraArea - larguraPopup - 5
        )
    );


    y = Math.max(
        5,
        Math.min(
            y,
            alturaArea - alturaPopup - 5
        )
    );


    popup.style.left =
        `${x}px`;


    popup.style.top =
        `${y}px`;


    areaPopups.appendChild(
        popup
    );


    popupAtual =
        popup;

}



/* ========================================================
   VERIFICAR TEMPO DA MÚSICA
======================================================== */

function verificarFrase() {

    const tempoAtual =
        musica.currentTime;


    for (
        let i = 0;
        i < frases.length;
        i++
    ) {

        const frase =
            frases[i];


        if (
            tempoAtual >=
            frase.inicio &&

            tempoAtual <
            frase.fim
        ) {

            if (
                fraseAtual !== i
            ) {

                fraseAtual = i;

                mostrarFrase(
                    frase.texto
                );

            }

            return;

        }

    }


    /* Fora de qualquer frase */

    if (popupAtual) {

        popupAtual.remove();

        popupAtual = null;

    }


    fraseAtual = -1;

}



/* ========================================================
   COMEÇAR
======================================================== */

botaoIniciar.addEventListener(
    "click",
    () => {

        musica.play();

    }
);



/* ========================================================
   MÚSICA COMEÇOU
======================================================== */

musica.addEventListener(
    "play",
    () => {

        vinil.style.animationPlayState =
            "running";


        botaoIniciar.textContent =
            "Tocando 🎵";

    }
);



/* ========================================================
   MÚSICA PAUSOU
======================================================== */

musica.addEventListener(
    "pause",
    () => {

        vinil.style.animationPlayState =
            "paused";


        botaoIniciar.textContent =
            "Continuar 🎤";

    }
);



/* ========================================================
   MÚSICA TERMINOU
======================================================== */

musica.addEventListener(
    "ended",
    () => {

        vinil.style.animationPlayState =
            "paused";


        botaoIniciar.textContent =
            "Ouvir novamente ❤️";


        if (popupAtual) {

            popupAtual.remove();

            popupAtual = null;

        }


        fraseAtual = -1;

    }
);



/* ========================================================
   ACOMPANHAR MÚSICA
======================================================== */

musica.addEventListener(
    "timeupdate",
    verificarFrase
);


/* ========================================================
   QUANDO O USUÁRIO ARRASTA O PLAYER
======================================================== */

musica.addEventListener(
    "seeked",
    verificarFrase
);



/* ========================================================
   INICIALIZA OS JOGOS
======================================================== */

iniciarConexo();

iniciarJogoNumero();

