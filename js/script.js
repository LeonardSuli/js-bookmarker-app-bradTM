// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Listen when i recharge page
window.addEventListener('load', fetchBookmark);

function attachDeleteListeners() {
    // Listen when i delete button
    document.querySelectorAll('.btn-danger').forEach((btn) => {

        btn.addEventListener('click', (e) => {

            const url = e.currentTarget.getAttribute('data-url');

            deleteBookmark(url);
        })
    })
}

// Save Bookmark
function saveBookmark(e) {

    // Prevent form from default
    e.preventDefault();

    // Get Form values
    const siteName = document.getElementById('siteName').value;
    const siteUrl = document.getElementById('siteUrl').value;

    const bookmark = {
        name: siteName,
        url: siteUrl
    };

    /*
   / / Local Storage Test
   localStorage.setItem('test', 'Hello World');
   console.log(localStorage.getItem('test'));   ----> Hello World
   localStorage.removeItem('test');
   console.log(localStorage.getItem('test'));   ----> null
 */

    // Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {

        //Init array
        const bookmarks = [];

        // Add to array
        bookmarks.push(bookmark);

        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else {

        // Get bookmarks from localStorage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // Add bookmark to array
        bookmarks.push(bookmark);

        // Re-set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    fetchBookmark();

    document.getElementById('siteName').value = '';
    document.getElementById('siteUrl').value = '';

};

// Fetch bookmarks
function fetchBookmark() {

    // Get bookmarks from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id 
    const bookmarksResults = document.getElementById('bookmarksResults');

    // Build output / Si svuota la lista
    bookmarksResults.innerHTML = '';

    bookmarks.forEach((bookmark) => {

        const name = bookmark.name;
        const url = bookmark.url;

        bookmarksResults.innerHTML += `<div class='mb-1'>
                                            <span>${name}</span>
                                            <a class='btn btn-primary btn-sm' href='https://${url}' target='_blank'>${url}</a>
                                            <a class='btn btn-danger btn-sm' data-url='${url}'>Delete</a>
                                        </div>`;

    });

    attachDeleteListeners();

}

// Delete bookmarks
function deleteBookmark(url) {

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Rimuove quello con l'URL corrispondente 
    bookmarks = bookmarks.filter(b => b.url !== url);
    // 
    // Aggiorna localStorage 
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // 
    // Aggiorna la UI 
    fetchBookmark();

    // Prevent form from default
    // e.preventDefault();

    // Get bookmarks from localStorage
    // const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // console.log(url);




}