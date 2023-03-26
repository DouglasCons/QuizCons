import prova from './jsArquivo.js';

    const btnF = document.querySelector('#find')

    btnF.addEventListener('click', function perguntasFiltradas() {
        const search = document.querySelector('#search')
        let frente = document.querySelector("#pergunta")
        let verso = document.querySelector("#resposta")

        const searchTerm = search.value.trim().toLowerCase()
        
        const newArray = prova.filter((item) => {
            return item.pergunta.toLowerCase().includes(searchTerm) || 
            item.especialidade.toLowerCase().includes(searchTerm) || 
            item.resposta.toLowerCase().includes(searchTerm)
            
        })

        if(newArray <= 0) {
            const qtd = document.querySelector('#qtd')
            qtd.innerHTML = `
                <p>Não foram encontradas questões com esse termo. 
                Por Favor, tente digitar apenas uma parte do termo.</p>
            `
        } else {
            const qtd = document.querySelector('#qtd')
            qtd.innerHTML = `
                <p>${newArray.length > 1? "Foram selecionadas" : "Foi selecionada"} 
                ${newArray.length} ${newArray.length > 1? "questões" : "questão"}
                de um total de ${prova.length}.</p>
            `
        }

        let count = 0

        frente.innerHTML = `<h2>Questão ${newArray[count].id}</h2><br>
            <h2>${newArray[count].pergunta}</h2>`
        verso.innerHTML = `<h2>${newArray[count].resposta}</h2>`

        const bA = document.querySelector('#anterior')

        bA.addEventListener('click', function anterior(){
            if(count > 0) count--
            
            frente.innerHTML = `<h2>Questão ${newArray[count].id}</h2><br>
            <h2>${newArray[count].pergunta}</h2>`
            verso.innerHTML = `<h2>${newArray[count].resposta}</h2>`
            verso.classList.add("hide")

        })

        const bP = document.querySelector('#proximo')

        bP.addEventListener('click', function proximo(){
            if(count >= 0 && count < (newArray.length - 1)) count++
            
            frente.innerHTML = `<h2>Questão ${newArray[count].id}</h2><br>
            <h2>${newArray[count].pergunta}</h2>`
            verso.innerHTML = `<h2>${newArray[count].resposta}</h2>`
            verso.classList.add("hide")

        })
        
        console.log(newArray)
        console.log(newArray[5].pergunta.toLowerCase())

        verso.classList.add("hide")

    })

    const btnr = document.querySelector(".r");

    btnr.addEventListener('click', function() {
        let verso = document.querySelector("#resposta");

        verso.classList.remove("hide")
    })

    const btng = document.querySelector(".g");

    btng.addEventListener('click', function() {
        const gPergunta = document.querySelector("#pergunta");
        const gResposta = document.querySelector("#resposta");

        let table = document.getElementById("tb");
        let tr = table.insertRow();

        let td_P = tr.insertCell();
        let td_R = tr.insertCell();

        td_P.innerText = gPergunta.innerText;
        td_R.innerText = gResposta.innerText;

    });

    const pdf_btn = document.querySelector('#pdf'); 
    const t = document.querySelector('#tabela');

    const toPDF = function(t) {
        const html_code = `
        <link rel="stylesheet" href="./style.css" />
        <table id="tabela"> ${t.innerHTML} </table>            
        `;

        const new_windon = window.open();
        new_windon.document.write(html_code);

        setTimeout(() => {
            new_windon.print();
        }, 200);

    }

    pdf_btn.onclick = () => {
        toPDF(t);
    }