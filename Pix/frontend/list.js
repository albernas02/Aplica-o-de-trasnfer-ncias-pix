let nameSelect = document.getElementById('name-select-list');
let table = document.getElementById('table-list');
let typeSelect = document.getElementById('type-select');
let form = document.getElementById('form-list');


async function getUsers(){
    let response = await fetch('http://localhost:3333/users')
    let users = await response.json();
    console.log(users);
    return users;
}

async function setUser(){
    let users = await getUsers();
    
    let selectOption = document.createElement('option');
    selectOption.innerText = 'Selecione';
    nameSelect.appendChild(selectOption).disabled; 
    
    for(let user of users){
        let option = document.createElement('option');
        option.value = user.id;
        option.innerText = user.name
        
        nameSelect.appendChild(option);
    }
}

form.addEventListener('submit', async (event) => {
    event.stopPropagation();
    event.preventDefault();
    
    
    let user = nameSelect.value;
    let type = typeSelect.value;
    console.log(user,type);
    
    let response = await fetch(`http://localhost:3333/transferList/${user}/${type}`)
    let transfers = await response.json();

    for(let transfer of transfers){

            let tr = document.createElement('tr');
            let tdUser = document.createElement('td')
            let tdRecipient = document.createElement('td')
            let tdData = document.createElement('td')
            let tdValue = document.createElement('td')
            
            
            tdUser.innerText= transfer.sender.name;
            tdRecipient.innerText =  transfer.recipient.name;
            tdData.innerText = transfer.createdAt;
            tdValue.innerText = transfer.value;
            
            tr.appendChild(tdUser)
            tr.appendChild(tdRecipient)
            tr.appendChild(tdData)
            tr.appendChild(tdValue)

            table.appendChild(tr);
        }
    
})

async function setTypes(){
    let option = document.createElement('option');
    option.value = "sender";
    option.innerText = "Enviados"
    let aux = document.createElement('option')
    aux.value = "received";
    aux.innerText = "Recebidos"
    
    typeSelect.appendChild(option);
    typeSelect.appendChild(aux);
}

setUser()
setTypes()