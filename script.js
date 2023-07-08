// https://jsonplaceholder.typicode.com/posts

async function readPosts() {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Carregando...';


    let req = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await req.json();

    if(json.length > 0) {
        postArea.innerHTML = '';


        for(let item in json) {
            let postList = `
            <div>
                <h1>${json[item].title}</h1>  
                <p>${json[item].body}</p>
                <hr>
            </div>
            `

            postArea.innerHTML += postList;
        }
    } else {
        postArea.innerHTML = 'Nenhum post para exibir';
    }
}

async function addNewPost(title, body) {
    await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                body,
                userId: 2
            })
        }
    );
    document.querySelector("#titulo").value = '';
    document.querySelector("#descricao").value = '';

    readPosts();

}

document.querySelector("#inserir").addEventListener('click', () => {
    let title = document.querySelector("#titulo").value;
    let body = document.querySelector("#descricao").value;

    if(title && body) {
        addNewPost(title, body);
    } else {
        alert('Preencha todos os campos.');
    }
});



readPosts();