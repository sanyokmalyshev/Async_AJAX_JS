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
    
    
    loading(div);
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
            resolve(fetch(url));
    })
}

// for loading
function loading(div) {
    div.classList.add('loading');
    div.style.display = 'block';
    submit.after(div);
}

function loadingShow(obj, time) {
    obj.animate({ 'opacity': 1 }, time, function () {
        loadingHide(obj, time);
    });
}

function loadingHide(obj, time) {
    obj.animate({ 'opacity': 0.3 }, time, function () {
        setTimeout(function () {
            loadingShow(obj, time);
        }, 500);
    });
}

setInterval(function () {
    $('.loading').each(function () {
        var obj = $(this);
        if (obj.children('div').length > 0) return;
        var w = 30;
        var h = 20;
        obj.append('<div style="width:' + w + 'px;height:' + h + 'px"></div>');
        obj.append('<div style="width:' + w + 'px;height:' + h + 'px"></div>');
        obj.append('<div style="width:' + w + 'px;height:' + h + 'px"></div>');
        obj.append('<div style="clear:both"></div>');
        var i = 0;
        var time = 100;
        obj.children('div').each(function () {
            i++;
            var obj = $(this);
            setTimeout(function () {
                loadingShow(obj, time * 2);
            }, i * time);
        });
    });
}, 100);



