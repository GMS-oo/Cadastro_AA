// 1. Inicia a lista de atletas (Corrigido para usar um único nome: 'listaAtletas')
let listaAtletas = JSON.parse(localStorage.getItem('atletos_db')) || [];

// 2. Função para Cadastrar o Atleta
function cadastrarAtleta(event) {
    event.preventDefault(); // Impede o recarregamento da página

    console.log("Tentando cadastrar..."); // Para você ver no F12 se a função chamou

    try {
        // Criando o objeto com os IDs exatos do seu HTML
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

        // Salva na lista global
        listaAtletas.push(novoAtleta);
        
        // Salva no banco local do navegador
        localStorage.setItem('atletos_db', JSON.stringify(listaAtletas));

        alert("Atleta " + novoAtleta.nome + " cadastrado com sucesso!");
        
        // Limpa os campos
        event.target.reset();
        
        // Pula para a tela de listagem
        onListarClick();

    } catch (erro) {
        console.error("Erro ao salvar:", erro);
        alert("Ops! Algo deu errado ao salvar. Verifique o console (F12).");
    }
}

// 3. Função para desenhar a tabela
function renderizarTabela() {
    const corpoTabela = document.getElementById('tabela-atletas-body');
    
    if (!corpoTabela) return; // Segurança caso o elemento não exista

    corpoTabela.innerHTML = ""; // Limpa antes de renderizar

    if (listaAtletas.length === 0) {
        corpoTabela.innerHTML = "<tr><td colspan='12' style='text-align:center;'>Nenhum atleta cadastrado.</td></tr>";
        return;
    }

    listaAtletas.forEach((atleta) => {
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
            </tr>
        `;
        corpoTabela.innerHTML += linha;
    });
}

// 4. Funções de Alternância de Abas
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

// 5. Botão Sair
function voltar() {
    if(confirm("Deseja sair do sistema?")) {
        window.location.href = "index.html"; // Mude para o seu arquivo inicial
    }
}

// Inicialização
window.onload = function() {
    onCadastrarClick();
};