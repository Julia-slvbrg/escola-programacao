//PRIMEIRA SEMANA

//const turmas = ["HC1", "JS1", "JS2", "REST1", "REST2"]  //criado um array turmas
//const estudantes = ["Gabo", "Maurício", "Leonildo", "Anna Catarina"]  //criado um array estudantes
//const cursos = ["HTML e CSS", "JavaScript", "APIs REST" ]  //criado um array para os cursos


//------------------------//


const turmas = [
{
    turma: "Hipátia",
    curso: "JavaScript",
    inicio: "30/11/2022",  
    termino: "30/01/2023",
    numeroDeAlunos: 150, 
    periodo: "noturno",
    concluida: false
},
{
    turma: "Sibyla",
    curso: "JavaScript",
    inicio: "30/10/2022",
    termino: "30/12/2022",
    numeroDeAlunos: 200,
    periodo: "integral",
    concluida: false
},
{
    turma: "Curie",
    curso: "HTML e CSS",
    inicio: "15/09/2022",
    termino: "30/12/2022",
    numeroDeAlunos: 180,
    periodo: "noturno",
    concluida: true
},
{
    turma: "Zhenyi",
    curso: "HTML e CSS",
    inicio: "01/11/2022",
    termino: "01/01/2023",
    numeroDeAlunos: 80,
    periodo: "integral",
    concluida:false
},
{
    turma: "Clarke",
    curso: "HTML e CSS",
    inicio: "04/07/2022",
    termino: "04/09/2022",
    numeroDeAlunos: 200,
    periodo: "noturno",
    concluida: true
},
{
    turma: "Blackwwell",
    curso: "APIs Rest",
    inicio: "20/03/2022",
    termino: "20/06/2022",
    numeroDeAlunos: 100,
    periodo:"integral",
    concluida: true
},
{
    turma: "Elion",
    curso: "APIs Rest",
    inicio: "12/01/2022",
    termino: "12/06/2022",
    numeroDeAlunos: 200,
    periodo:"noturno",
    concluida: true
},
{
    turma: "Burnell",
    curso: "APIs Rest",
    inicio: "18/10/2022",
    periodo: "18/04/2023",
    numeroDeAlunos: 90,
    periodo: "integral",
    concluida: false
}
]

const cursos = [
{
    curso: "HTML e CSS",
    descricao: "Venha aprender HTML e CSS começando do zero!!!",
    duracao: "1 mês",
    valor: 500
},
{
    curso: "JavaScript",
    descricao: "Que tal um curso de JavaScript para começar a sua carreira de dev? Vem com a gente!!", 
    duracao: "2 meses",
    valor: 900
},
{
    curso: "APIs Rest",
    descricao: "Vem aprender APIsRest para dar um up no seu currículo!", 
    duracao: "6 meses",
    valor: 2000
}
]

const estudantes = [
{
    estudante: "Chris Evans",
    turma: "Hipátia",
    curso: "JavaScript",
    valor: 900,
    nParcelas: 9,
    desconto: false, 
    parcelas: 100
},
{
    estudante: "Halle Berry",
    turma: "Burnell",
    curso: "APIsRest",
    valor: 2000,
    nParcelas: 4,
    desconto: false,
    parcelas: 500
},
{
    estudante: "Lashana Lynch",
    turma: "Zhenyi",
    curso: "HTML e CSS",
    valor: 500,
    nParcelas: 1,
    desconto: true,
    parcelas: 500
}
]

const carrinhoCursosValores = []
const carrinhoCursosNomes = []
const buscarCurso=()=>{
    event.preventDefault()
    
    const inputCurso = document.getElementById('course').value.toLowerCase()
    const confereCurso = carrinhoCursosNomes.filter(element=> element.toLowerCase() === inputCurso)

    if(inputCurso == " " || inputCurso == "" ) return swal({
        title: "Curso inválido.",            
        icon: "error",
    }) 
    
    if(confereCurso.length > 0) return swal({
        title: "Curso já adicionado.",            
        icon: "error",
    }) 

    /*//Primeira opção:
    const index = cursos.findIndex(element=> element.curso.toLowerCase().indexOf(inputCurso.toLowerCase())>-1) 

    //console.log(cursos[index]) 
    console.log(index)

   return carrinhoCursosValores.push(cursos[index].valor), carrinhoCursosNomes.push(cursos[index].curso), console.log(carrinhoCursosValores), console.log(carrinhoCursosNomes)*/
    
    //Segunda opção:

    const retornaCurso = cursos.filter(element=>{
        if(element.curso.toLowerCase().includes(inputCurso))
        return element
        //essa função vai retornar um array com o objeto do curso dentro
    })
    
    if(retornaCurso.length == 0) return  swal({
        title: "Curso inválido.",            
        icon: "error",
    })  
    
    document.getElementById('course').value=""
    
    
    return carrinhoCursosNomes.push(retornaCurso[0].curso), carrinhoCursosValores.push(retornaCurso[0].valor), console.log(carrinhoCursosNomes), console.log(carrinhoCursosValores)
}


const acrescentaCurso=(nomeCurso, callback)=>{
    //Antes do DOM, essa função pegava o valor de cada curso, colocava em um array e era usada como callback na função parcelarCurso. 
    
    const arrCursosSelecionados = [callback(nomeCurso)]
    
    if(typeof callback(nomeCurso) == 'object'){
        for(let index in arrCursosSelecionados){
            carrinhoCursos.push(arrCursosSelecionados[index].valor)
        }
        
        return carrinhoCursos 
    } 

    return 'Curso não encontrado'
}

 
const parcelarCurso=()=>{
    event.preventDefault()

    const nParcelas = Number(document.getElementById('payment-plan').value)
    const inputCurso = document.getElementById('course').value.toLowerCase()

    if(!nParcelas) return swal({
        title: "Número de parcelas inválido.",            
        icon: "error",
    }); 

    if(nParcelas > 5) return swal({
        title: "Número de parcelas inválido.",            
        icon: "error",
    }); 

    let valorTotal = 0 
    let valorDesconto = 0
    let valorComDesconto = 0
    let valorParcelasComDesconto = 0
    let valorParcelas = 0
    let porcentagemDesconto 
    
    if(nParcelas == 1 || nParcelas == 2){
        switch (carrinhoCursosValores.length){
            case 1: 
                valorTotal = carrinhoCursosValores[0]
                valorDesconto = .2 * valorTotal;
                valorComDesconto = (valorTotal - valorDesconto).toFixed(2);
                valorParcelasComDesconto = (valorComDesconto / nParcelas).toFixed(2);
                porcentagemDesconto = '20%'
               
                console.log(`O curso de ${carrinhoCursosNomes} ficou no valor total de R$${valorComDesconto}. Em ${nParcelas}x de R$${valorParcelasComDesconto}. Foi concedido um desconto de 20%.`);

                return gerarCardValor(porcentagemDesconto, valorParcelasComDesconto, removerCardValor)

                break

            case 2:
                for(let index in carrinhoCursosValores){
                valorTotal += carrinhoCursosValores[index]
                };
 
                valorDesconto = valorTotal*.3;
                valorComDesconto = (valorTotal - valorDesconto).toFixed(2);
                valorParcelasComDesconto = (valorComDesconto / nParcelas).toFixed(2);
                porcentagemDesconto = '20% e 10%'
                
                console.log(`Os cursos de ${carrinhoCursosNomes} ficaram no valor total de R$${valorComDesconto}. Em ${nParcelas}x de R$${valorParcelasComDesconto}. Foi concedido um desconto de 20% e 10% sobre o valor total.`);

                return gerarCardValor(porcentagemDesconto, valorParcelasComDesconto, removerCardValor)

                break

            case 3:
                for(let index in carrinhoCursosValores){
                    valorTotal += carrinhoCursosValores[index]
                };
                valorDesconto = valorTotal*.3;
                valorComDesconto = (valorTotal - valorDesconto).toFixed(2);
                valorParcelasComDesconto = (valorComDesconto / nParcelas).toFixed(2);
                porcentagemDesconto = '20% e 10%'

                console.log(`Os cursos de ${carrinhoCursosNomes} ficaram no valor total de R$${valorComDesconto}. Em ${nParcelas}x de R$${valorParcelasComDesconto}. Foi concedido um desconto de 20% e 10% sobre o valor total.`);

                return gerarCardValor(porcentagemDesconto, valorParcelasComDesconto, removerCardValor)

                break

            default:
                console.log('Confira os cursos solicitados.');
                break           
        }
    }else if (nParcelas == 3){
        switch(carrinhoCursosValores.length){
            case 1:
                for(let index in carrinhoCursosValores){
                    valorTotal += carrinhoCursosValores[index]
                };
                valorParcelas = (valorTotal / nParcelas).toFixed(2)

                console.log(`O curso de ${carrinhoCursosNomes} ficou no valor total de R$${valorTotal}. Não há desconto para ser aplicado.`);

                return gerarCardValorSemDesconto(valorParcelas, removerCardValor)

                break
                
        case 2:
            for(let index in carrinhoCursosValores){
                valorTotal += carrinhoCursosValores[index]
            };
            valorDesconto = valorTotal * .1;
            valorComDesconto = (valorTotal - valorDesconto).toFixed(2);
            valorParcelasComDesconto = (valorComDesconto / nParcelas).toFixed(2);
            porcentagemDesconto = '10%'

            console.log(`Os cursos de ${carrinhoCursosNomes} ficaram no valor total de R$${valorComDesconto}. Em ${nParcelas}x de R$${valorParcelasComDesconto}. Foi concedido um desconto de 10% sobre o valor total.`);

            return gerarCardValor(porcentagemDesconto, valorParcelasComDesconto, removerCardValor)
            
            break
                
        case 3:
            for(let index in carrinhoCursosValores){
                valorTotal += carrinhoCursosValores[index]
            };
            valorDesconto = valorTotal * .15;
            valorComDesconto = (valorTotal - valorDesconto).toFixed(2);
            valorParcelasComDesconto = (valorComDesconto / nParcelas).toFixed(2);
            porcentagemDesconto = '20%'

            console.log(`Os cursos de ${carrinhoCursosNomes} ficaram no valor total de R$${valorComDesconto}. Em ${nParcelas}x de R$${valorParcelasComDesconto}. Foi concedido um desconto de 20% sobre o valor total.`);

            return gerarCardValor(porcentagemDesconto, valorParcelasComDesconto, removerCardValor)

            break

            default:
                console.log('Confira os cursos solicitados.');
                break 
        }
    }else if(nParcelas>3){
        switch(carrinhoCursosValores.length){
            case 1:
                for(let index in carrinhoCursosValores){
                    valorTotal += carrinhoCursosValores[index]
                };
                valorParcelas = (valorTotal / nParcelas).toFixed(2);

                console.log(`O curso de ${carrinhoCursosNomes} ficou no valor total de R$${valorTotal}. Em ${nParcelas}x de R$${valorParcelas}.`);

                return gerarCardValorSemDesconto(valorParcelas, removerCardValor)

                break
            
            case 2:
                for(let index in carrinhoCursosValores){
                    valorTotal += carrinhoCursosValores[index]
                };
                valorParcelas = (valorTotal / nParcelas).toFixed(2);

                console.log(`Os cursos de ${carrinhoCursosNomes} ficaram no valor total de R$${valorTotal}. Em ${nParcelas}x de R$${valorParcelas}.`);

                return gerarCardValorSemDesconto(valorParcelas, removerCardValor)

                break
            
                case 3:
                    for(let index in carrinhoCursosValores){
                        valorTotal += carrinhoCursosValores[index]
                    };
                    valorParcelas = (valorTotal / nParcelas).toFixed(2);
    
                    console.log(`Os cursos de ${carrinhoCursosNomes} ficaram no valor total de R$${valorTotal}. Em ${nParcelas}x de R$${valorParcelas}.`)

                    return gerarCardValorSemDesconto(valorParcelas, removerCardValor)

                    break
        } 
    }
} 

const removerCardValor =()=>{
    console.log(document.getElementsByClassName('payment-container'))
    if(document.getElementsByClassName('payment-container').length>0){
        const card = document.querySelector('.payment-container')
        card.parentNode.removeChild(card)
    }
}

const gerarCardValor = (porcentagemDesconto, valorParcelasComDesconto, callback) =>{
    const paymentContainer = document.getElementById('search')

    callback()

    const newCard = document.createElement('div')
    newCard.setAttribute('id', 'payment')
    newCard.setAttribute('class', 'payment-container')

    newCard.innerHTML = `
        <h1 class='payment-title'>Valor</h1>
        <p class="paragraph" >Desconto de ${porcentagemDesconto}. Parcelas de R${valorParcelasComDesconto}</p>
    `
    return paymentContainer.insertAdjacentElement('beforeend', newCard)
}

const gerarCardValorSemDesconto = (valorParcelas, callback) =>{
    const paymentContainer = document.getElementById('search')

    callback() 

    const newCard = document.createElement('div')
    newCard.setAttribute('id', 'payment')
    newCard.setAttribute('class', 'payment-container')

    newCard.innerHTML = `
        <h1 class='payment-title'>Valor</h1>
        <p class="paragraph" >Não há desconto. Parcelas de R${valorParcelas}</p>
    `
    return paymentContainer.insertAdjacentElement('beforeend', newCard)
}


const buscarTurma = (event)=>{
    event.preventDefault()
   
    const inputTurma = document.getElementById('input-search-class').value.toLowerCase()
    
    const retornaTurma = turmas.filter(element => {
        if(element.turma.toLowerCase().includes(inputTurma))
        return element
    })

    document.getElementById('input-search-class').value = ""
    console.log(retornaTurma)
    
    return retornaTurma.length > 0? gerarCardTurmas(retornaTurma) : gerarCardTurmas(turmas) 
}

const gerarCardTurmas = (cardTurmas) =>{

    const searchContainer = document.getElementById('search-container')

    if(document.getElementsByClassName('classes').length > 0){ 
        while(document.getElementsByClassName('classes').length > 0){
            
            const cards = document.querySelector('.classes')
        
            console.log(document.querySelector('.classes'))
            cards.parentNode.removeChild(cards)
        }
    } 

    const geradorDeCard = cardTurmas.map((element) =>{
        const newCard = document.createElement('div')
        newCard.setAttribute("class", "classes")
   
        newCard.innerHTML = `
            <h1 class="class-name">${element.turma}</h1>
            <p class="details"><span class="bold">Curso:</span> ${element.curso}</p>
            <p class="details"><span class="bold">Início:</span> ${element.inicio}</p>
            <p class="details"><span class="bold">Término:</span> ${element.termino}</p>
            <p class="details"><span class="bold">Número de alunos:</span> ${element.numeroDeAlunos}</p>
            <p class="details"><span class="bold">Período:</span> ${element.periodo}</p>
            <p class="details"><span class="bold">Concluído:</span> ${element.concluida? 'sim' : 'não'}</p>
        `
      searchContainer.insertAdjacentElement('beforeend', newCard) 

    })
   return geradorDeCard
}

const buscarEstudante=(nomeEstudante)=>{

    const retornoEstudante = estudantes.filter(element =>
        element.estudante.toLowerCase().indexOf(nomeEstudante.toLowerCase())> -1)

        retornoEstudante.length>0?
        console.log(retornoEstudante[0]) : console.log('Aluno não encontrado')
        return retornoEstudante[0]
}

const relatorioEstudante=()=>{
    event.preventDefault()
    const nomeInput = document.getElementById('name').value
    const dadosEstudantes = buscarEstudante(nomeInput)
    
    const relatorio = {
        aluno: dadosEstudantes.estudante,
        turma: dadosEstudantes.turma,
        curso: dadosEstudantes.curso,
        valorTotal: dadosEstudantes.valor,
        valorParcelas: dadosEstudantes.parcelas,
        nParcelas: dadosEstudantes.nParcelas
    }
    console.log(`Aluno: ${relatorio.aluno}\nTurma: ${relatorio.turma}\nCurso: ${relatorio.curso}\nValor Toral: ${relatorio.valorTotal}\nValor Parcelas: ${relatorio.valorParcelas}\nNº Parcelas: ${relatorio.nParcelas}`)
    return relatorio, gerarCardRelatorio(relatorio)
} 

const gerarCardRelatorio =(relatorio)=>{

    const reportContainer = document.getElementById('student-report')

    if(document.getElementsByClassName('report-class').length > 0){
        const card  = document.querySelector('.report-class')
        card.parentNode.removeChild(card)
        console.log('oi')
    }

    const newCard = document.createElement('div')
    newCard.setAttribute('id', 'report')
    newCard.setAttribute('class', 'report-class')

    newCard.innerHTML = `
    <p class="paragraph">Aluno: ${relatorio.aluno}</p>
    <p class="paragraph">Turma: ${relatorio.turma}</p>
    <p class="paragraph">Curso: ${relatorio.curso}</p>
    <p class="paragraph">Valor total: R$${relatorio.valorTotal}</p>
    <p class="paragraph">Valor parcela: R$${relatorio.valorParcelas}</p>
    <p class="paragraph">Nº parcelas: ${relatorio.nParcelas}</p>
    `
    return reportContainer.insertAdjacentElement('beforeend', newCard)
}

const matricular = () =>{
    event.preventDefault()

    const nomeInput = document.getElementById('name').value;
    const cursoInput = document.getElementById('course').value;
    const turmaInput = document.getElementById('classes').value.toLowerCase();
    const parcelasInput = document.getElementById('payment').value;

    const confereTurma = turmas.filter(element=> element.turma.toLowerCase().includes(turmaInput));

    console.log(confereTurma);

    const confereAluno = estudantes.filter(element=> element.estudante.toLowerCase() === nomeInput.toLowerCase());
    console.log(confereAluno); 


    if(confereAluno.length>0){
        const confereCurso = confereAluno.filter(element => element.curso.toLowerCase() == cursoInput.toLowerCase())
        
        if(confereCurso.length>0){
            const confereTurmaMatricula = confereCurso.filter(element => element.turma.toLowerCase() == turmaInput.toLowerCase())

            if(confereTurmaMatricula.length>0) return swal({
                title: "Aluno já matriculado no curso.",            
                icon: "error",
            }), removerCardMatricula()
        }
    } 

    if(nomeInput == "" || nomeInput==" ") return swal({
        title: "Nome não preenchido.",            
        icon: "error",
    }), removerCardMatricula()
     
    if(!confereTurma.length>0) return swal({
        title: "Turma não encontrada.",            
        icon: "error",
    }), removerCardMatricula()
     
    if(!confereTurma[0].curso.toLowerCase().includes(cursoInput.toLowerCase())) return swal({
        title: "A turma não oferece esse curso.",            
        icon: "error",
    }), removerCardMatricula()    

    if(confereTurma[0].concluida === true) return swal({
        title: "O curso já foi concluído",            
        icon: "error",
    }), removerCardMatricula()

   

    const novoAluno = {
        estudante: nomeInput,
        turma: turmaInput,
        curso: cursoInput,
        nParcelas: parcelasInput
    };
    
    console.log(`Aluno Matriculado\nNome: ${nomeInput}\nCurso: ${cursoInput}\nTurma: ${turmaInput}`);
    return estudantes.push(novoAluno), gerarCardMatricula(novoAluno, confereTurma, removerCardMatricula)
}

const removerCardMatricula=()=>{
    if(document.getElementsByClassName('confirm-report-div').length > 0){
        while(document.getElementsByClassName('confirm-report-div').length > 0){
            const card = document.querySelector('.confirm-report-div')
            card.parentNode.removeChild(card)
        }
    }
}

const gerarCardMatricula=(estudanteDados, arrTurma, callback)=>{
    const confirmContainer = document.getElementById('confirm-report')

    callback()
   
    const newCard = document.createElement('div')
    newCard.setAttribute('class', 'confirm-report-div')
    
    newCard.innerHTML = `
        <div class="confirm-student">
            <h1>Aluno matriculado</h1>
            <figure>
              <img src="./midias/confirm-check.svg" alt="check" id="confirm-check">
            </figure>
        </div>

        <p class="studant-info">Aluno Matriculado</p>
        <p class="studant-info">Nome: ${estudanteDados.estudante}</p>
        <p class="studant-info">Curso: ${arrTurma[0].curso}</p>
        <p class="studant-info">Turma: ${arrTurma[0].turma}</p>
    `

    return confirmContainer.insertAdjacentElement('beforeend', newCard)
}

