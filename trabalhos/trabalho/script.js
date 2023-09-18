let bookCodeInput = document.getElementById('book_code');

async function getBook (bookCode) {
    let response = await fetch(`https://brasilapi.com.br/api/isbn/v1/${bookCode}`);
    return await response.json();
}
async function setBook(result){
    let name = result.title;
    let year = result.year;
    let subtitle = result.subtitle;
    let authors = result.authors;
    let publisher = result.publisher;
    let pages = result.pages_count;
    let price = result.retail_price;
    let image = result.cover_url;
    let synopsis = result.synopsis;
        console.log(`${name} - ${year}`);

        
        let nome = document.createElement('li');
        nome.innerText = name;
        lista.appendChild(nome)
        if(subtitle){
            let subtitulo = document.createElement('li');
            subtitulo.innerText = subtitle;
            lista.appendChild(subtitulo)
        }
        if (synopsis) {
            let sinopse = document.createElement('li');
            sinopse.innerText = synopsis;
            lista.appendChild(sinopse)
        }
        
        if (authors){
            autor.innerText = authors;
            lista.appendChild(autor)
            let autor = document.createElement('li');
        }
        
        if(year){
            let ano = document.createElement('li');
            ano.innerText = year;
            lista.appendChild(ano)
        }
        if(publisher){
            let editora = document.createElement('li');
            editora.innerText = publisher;
            lista.appendChild(editora)
        }
        if(pages){
            let paginas = document.createElement('li');
            paginas.innerText = pages;
            lista.appendChild(paginas)
        }
        
        
        if (price) {
            let preco = document.createElement('li');
            preco.innerText = price;
            lista.appendChild(preco)
        }
    }
    // let foto = document.createElement('img');
    // foto.innerImage = 'image';
    // lista.appendChild(foto)
    
bookCodeInput.addEventListener('input', async () => {
    let aux2 = bookCodeInput.value.split('-').join('');
    let aux = aux2.split('–').join('');
    let bookCode = aux.split(' ').join('');
  
    if (bookCode.length == 10 || bookCode.length == 13 ) {
        let result = await getBook(bookCode);
        console.log('livro certo')
        setBook(result)
    }
    })

    getBook();