let nameSelect = document.getElementById('name-select');
let recipientSelect = document.getElementById('recipient-select');
let valueInput = document.getElementById('value-input');
let spanName = document.getElementById('name-span')
let spanRecipient = document.getElementById('recipient-span')
let spanValue = document.getElementById('value-span')
let form = document.getElementById('form')

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

async function setRecipient(){
    let users = await getUsers();
    
    let selectOption = document.createElement('option');
    selectOption.innerText = 'Selecione';
    recipientSelect.appendChild(selectOption).disabled; 
    
    for(let user of users){
        let option = document.createElement('option');
        option.value = user.id;
        option.innerText = user.name;
        
        recipientSelect.appendChild(option);
    }
}

form.addEventListener('submit', async (event) => {
    event.stopPropagation();
    event.preventDefault();

    let user = nameSelect.value;
    let recipient = recipientSelect.value;
    let value = valueInput.value;

    let payload = {
        user,
        recipient,
        value
    }
    
    let response = await fetch('http://localhost:3333/transfer', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    
    if(response.ok){
        alert('Transfêrencia realidada com sucesso')
    }else{
        alert('Revise suas credenciais')
    }
})

  setUser();
  setRecipient();
