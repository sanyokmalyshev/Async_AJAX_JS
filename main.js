function $(selector) {
    return document.querySelector(selector);
}

let select = $('#select'),
    submit = $('input[type="submit"]'),
    info = $('.info'),
    error = $('.error'),
    about = $('.about'),
    value,
    div = document.createElement('div');

select.addEventListener('click', (e) => {
    let target = e.target;
    if (target.className == '__select__input') {
        value = target.value;
    }
})


submit.addEventListener('click', (e) => {
    getSomething(value);
    e.preventDefault();

})


async function getSomething(param) {
    if (param != 'comments' && param != 'posts' && param != 'todos') {
        error.innerHTML = 'Не выбран параметр';
        return error;
    }
    error.innerHTML = "";


    loading();
    const response = await fetchParametr(param);
    div.style.display = 'none';
    const data = await response.json()
        .then(data => {
            getData(param, data);
        })
        .catch(err => {
            error.innerHTML = 'Что-то не так';
        })
        .finally(() => {
            about.innerHTML = 'Создатель Александр Малышев. По урокам ITVDN'
        })

}

function getData(param, data) {
    if (param == 'comments') getComments(data);
    if (param == 'posts') getPosts(data);
    if (param == 'todos') getTodos(data);
}

function getComments(data) {
    info.innerHTML = "";
    data.slice(0, 5).forEach(element => {
        let article = document.createElement('article');
        const html = `
            <p><b>Имя: </b>${element.name}</p>
            <p><b>E-mail: </b>${element.email}</p>
            <p><b>Текст комментария: </b><br>${element.body}</p>
        `;
        article.innerHTML = html;
        info.appendChild(article);
    });

}

function getPosts(data) {
    info.innerHTML = "";
    data.slice(0, 5).forEach(element => {
        let article = document.createElement('article');
        const html = `
            <h2>${element.title}</h2>
            <p>${element.body}</p>
        `;
        article.innerHTML = html;
        info.appendChild(article);
    });

}

function getTodos(data) {
    info.innerHTML = "";
    let ul = document.createElement('ul');
    let p = document.createElement('p');
    p.style.fontWeight = 'bold';
    p.innerHTML = 'Список дел';
    data.slice(0, 5).forEach(element => {
        const html = `
            <li>${element.title}</li>
        `;
        ul.innerHTML += html;
    });
    info.appendChild(p);
    info.appendChild(ul);
}

function fetchParametr(param) {
    const url = `https://jsonplaceholder.typicode.com/${param}`;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fetch(url));
        }, 500)
    })
}

// for loading
function loading() {
    div.classList.add('spinner');
    div.style.display = 'flex';
    submit.after(div);
}






