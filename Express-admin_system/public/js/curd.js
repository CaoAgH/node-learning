let btn = document.getElementById('search_btn');
let content;
btn.onclick = function () {
    content = document.getElementById('search_content').value;
    if (content) {
        window.location.href = `/search?keywords=${content}`;
    } else {
        window.location.href = '/';
    }

}