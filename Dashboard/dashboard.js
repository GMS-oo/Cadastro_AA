let listaAtletas = JSON.parse(localStorage.getItem('atletos_db')) || [];

function cadastrarAtleta(event) {
    event.preventDefault(); 

    console.log("Tentando cadastrar...");

    try {
        const novoAtleta = {
            id: Date.now(),
            nome: document.getElementById('input-nome-atleta').value,
            nascimento: document.getElementById('input-dtNascimento').value,
            nacionalidade: document.getElementById('input-nacionalidade').value,
            cpf: document.getElementById('input-cpf').value,
            modalidade: document.getElementById('input-modalidade').value,
            genero: document.getElementById('input-genero').value,
            categoria: document.getElementById('input-categoria').value,
            peso: document.getElementById('input-peso').value,
            altura: document.getElementById('input-altura').value,
            sangue: document.getElementById('input-tipoSanguineo').value,
            alergias: document.getElementById('input-alergias').value,
            historico: document.getElementById('input-historico').value
        };

        listaAtletas.push(novoAtleta);
        localStorage.setItem('atletos_db', JSON.stringify(listaAtletas));

        alert("Atleta " + novoAtleta.nome + " cadastrado com sucesso!");
        
        event.target.reset();
        onListarClick();

    } catch (erro) {
        console.error("Erro ao salvar:", erro);
        alert("Ops! Algo deu errado ao salvar.");
    }
}

function renderizarTabela() {
    const corpoTabela = document.getElementById('tabela-atletas-body');
    
    if (!corpoTabela) return;

    corpoTabela.innerHTML = ""; 

    if (listaAtletas.length === 0) {
        corpoTabela.innerHTML = "<tr><td colspan='13' style='text-align:center;'>Nenhum atleta cadastrado.</td></tr>";
        return;
    }

    listaAtletas.forEach((atleta, index) => {
        const linha = `
            <tr>
                <td>${atleta.nome}</td>
                <td>${atleta.nacionalidade}</td>
                <td>${atleta.nascimento}</td>
                <td>${atleta.cpf}</td>
                <td>${atleta.modalidade}</td>
                <td>${atleta.genero}</td>
                <td>${atleta.categoria}</td>
                <td>${atleta.peso}kg</td>
                <td>${atleta.altura}m</td>
                <td style="color: #a855f7; font-weight: bold;">${atleta.sangue}</td>
                <td>${atleta.alergias}</td>
                <td>${atleta.historico}</td>
                <td>
                    <button class="btn-excluir" onclick="excluirAtleta(${index})">Excluir</button>
                </td>
            </tr>
        `;
        corpoTabela.innerHTML += linha;
    });
}

function excluirAtleta(index) {
    const nomeAtleta = listaAtletas[index].nome;
    
    if (confirm(`Deseja realmente excluir o atleta ${nomeAtleta}?`)) {
        listaAtletas.splice(index, 1);
        
        localStorage.setItem('atletos_db', JSON.stringify(listaAtletas));
        
        renderizarTabela();
    }
}

function onCadastrarClick() {
    document.getElementById('container-cadastro').style.display = 'flex';
    document.getElementById('container-lista').style.display = 'none';
    
    document.getElementById('btn-cadastrar').classList.add('btn-aba-selecionado');
    document.getElementById('btn-listar').classList.remove('btn-aba-selecionado');
}

function onListarClick() {
    document.getElementById('container-cadastro').style.display = 'none';
    document.getElementById('container-lista').style.display = 'flex';
    
    document.getElementById('btn-cadastrar').classList.remove('btn-aba-selecionado');
    document.getElementById('btn-listar').classList.add('btn-aba-selecionado');

    renderizarTabela(); 
}

function voltar() {
    if(confirm("Deseja sair do sistema?")) {
        window.location.href = "index.html";
    }
}

window.onload = function() {
    onCadastrarClick();
};