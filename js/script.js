class BlackBoard {
    constructor() {
        this.listaNomes = [];
        this.nome;
        this.dataAcesso;
    }

    loginFake() {
        document.getElementById("password").addEventListener('keyup', e => { if (e.key == "Enter") { window.location.href = "home.html" } })
    }

    acesso() {
        var data = new Date();

        if (document.getElementById("btn-acesso").className == "btn-acesso-liberar") {

            document.getElementById("textoAcesso").innerText = "Acesso Liberado em: " + data.toLocaleDateString("pt-BR") + " às " + data.toLocaleTimeString("pt-BR");

            document.getElementById("btn-acesso").className = "btn-acesso-desfazer";
            document.getElementById("btn-acesso").innerText = "Desfazer";

            this.dataAcesso = document.getElementById("textoAcesso").innerText;

            this.salvar();

        } else {
            document.getElementById("textoAcesso").innerText = "Deseja liberar o acesso dos alunos à atividade 2 ?"
            document.getElementById("btn-acesso").className = "btn-acesso-liberar"
            document.getElementById("btn-acesso").innerText = "Liberar"
            localStorage.removeItem('dataAcessoSave')

        }

    }

    gerarRA() {
        var ra = "";
        for (let i = 0; i < 8; i++) {
            var raN = Number(Math.floor(Math.random().toString() * 10));
            var ra = ra + raN;
        }
        return ra
    }

    pegarNome(i) {

        this.nome = document.getElementById("nomeCaminho").innerText = this.listaNomes[i];
        this.salvar()
        window.location.href = "atividades-pessoal.html"
    }

    salvar() {
        localStorage.clear();
        let nomeSave = JSON.stringify(this.nome);
        let dataAcessoSave = JSON.stringify(this.dataAcesso);

        if (this.nome != null || this.nome != undefined) {
            localStorage.setItem("nomeSave", nomeSave);
        }

        if (this.dataAcesso != null || this.dataAcesso != undefined) {
            localStorage.setItem("dataAcessoSave", dataAcessoSave);
        }

    }

    carregar() {

        //Se tiver um Nome Salvo no cache e existir o elemento nomeCaminho ele substitui o texto do elemento pelo nome salvo
        let nomeSave = JSON.parse(localStorage.getItem("nomeSave"));
        if (nomeSave != null && nomeSave != "") {
            this.nome = nomeSave;
            if (document.getElementById("nomeCaminho")) {
                document.getElementById("nomeCaminho").innerHTML = nomeSave;
            }
        }

        //Se tiver salvo no cache o acesso liberado a atividade 2
        let dataAcessoSave = JSON.parse(localStorage.getItem("dataAcessoSave"));
        if (dataAcessoSave != null && dataAcessoSave != "") {
            this.dataAcesso = dataAcessoSave;
            //se existir o elemento "textoAcesso" ele mostra o botão desfazer
            if (document.getElementById("textoAcesso")) {
                document.getElementById("textoAcesso").innerHTML = dataAcessoSave;
                document.getElementById("btn-acesso").className = "btn-acesso-desfazer";
                document.getElementById("btn-acesso").innerText = "Desfazer";
            }

            // Se existir o botão atividade 2 ele deixa o botão verde
            if (document.getElementById("btn-atv-2")) {
                if (dataAcessoSave != null && dataAcessoSave != "") {
                    document.getElementById("btn-atv-2").className = "ativo";
                } else {
                    document.getElementById("btn-atv-2").className = "request";
                }
            }

            //se existir o botão d atividade-1-pessoal
            if(document.getElementById("btn-atv-1-pessoal")){
                document.getElementById('btn-atv-2-pessoal').style.display ="block";
            }

        }




    }

    criarTabela() {
        this.carregar()
        if (document.getElementById("tabela")) {
            document.getElementById('tabela').innerHTML += `
        <div class="linha-principal ativo">
        <p>Nº</p>
        <p></p>
        <p>Nome</p>
        <p></p>
        <p>RA</p>
        <p></p>
        <p class="center-h" >N1</p>
        <p></p>
        <p class="center-h" >N2</p>
        <p></p>
        <p class="center-h" >N3</p>
        <p></p>
        <p class="center-h" >N4</p>
        <p></p>
        <p class="center-h" >Média</p>
        </div>`
            for (let i = 0; i < this.listaNomes.length; i++) {
                document.getElementById('tabela').innerHTML += `<div class="linha"> 
            <p>${i + 1}</p> 
            <p class="tracin">-</p>
            <p onclick="blackBoard.pegarNome(${i})" class="cursor-pointer">${this.listaNomes[i]}</p>
            <p class="tracin">-</p>
            <p>${blackBoard.gerarRA()}</p>
            <p class="tracin">-</p>
            <p class="center-h" >00</p>
            <p class="tracin">-</p>
            <p class="center-h" >00</p>
            <p class="tracin">-</p>
            <p class="center-h" >00</p>
            <p class="tracin">-</p>
            <p class="center-h" >00</p>
            <p class="tracin">-</p>
            <p class="center-h" >00</p>
            </div>`;
            }
        }
    }




}
let blackBoard = new BlackBoard;

blackBoard.listaNomes = ["Ana Júlia Marcílio do Amaral", "Bruno de Almeida Santos", "Charlie brown Junior", "Diogo de Avilar Farias", "Eduardo Conceição da Silva", "Felipe Massa", "George Lucas", "Helena Sanches Junior", "Ivete Sem Galo", "Juliana Couto Paes", "Keanu Charles Reeves", "Leonardo DiCaprio", "Michael Jordan", "Natalie Portman", "Oswaldo Gonçalves Cruz", "Peter Robert Jackson", "Quentin Tarantino", "Robert Downey Jr.", "Steve Jobs", "Tom Hanks", "Usain Bolt", "Vincent van Gogh", "Will Smith", "Xuxa Meneghel"];

blackBoard.criarTabela();
blackBoard.carregar();