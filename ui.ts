function createUI() {
    setTitle();
    setFavicon();
    Content.render();
    Navbar.render();
}

function setTitle() {
    document.title = 'mission control';
}

function setFavicon() {
    // set favicon dynamically for all pages
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = './favicon.svg';
    document.getElementsByTagName('head')[0].appendChild(link);
}
