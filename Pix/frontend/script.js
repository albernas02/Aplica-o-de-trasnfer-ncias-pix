let bodyTable = document.getElementById('body-table')


async function listUsers(){
    let response = await fetch('http://localhost:3333/users')
    let users = await response.json();

    for (let user of users) {
        let tr = document.createElement('tr');
        let tdNome = document.createElement('td');
        let tdId = document.createElement('td');
        
        tdNome.innerText = user.name;
        tdId.innerText = user.id;
        
        tr.appendChild(tdNome);
        tr.appendChild(tdId);
        
        bodyTable.appendChild(tr);
    }   
}