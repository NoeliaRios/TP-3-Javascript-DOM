const apiKey = 'd1baa5f45cdb7ee2c85290a0dfdcbfb8';
const urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
const urlTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
const urlUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
const urlNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;


const input = document.querySelector('#search');
const divResults = document.querySelector('#search_page');
const ulSearch = document.querySelector('.results_list');
const photoHome = document.querySelector('.container #photo-home');
const movieDivs = document.querySelectorAll('.container #movies');
const homeLogo = document.querySelector('.logo');


const movieList = document.querySelector('#movies .movies_list');
const listTopRated = document.querySelector('#movies .movies_list_toprated');
const listUpcoming = document.querySelector('#movies .movies_list_upcoming');
const listNowPlaying = document.querySelector('#movies .movies_list_nowplaying');

const popularPage = document.querySelector('#popular_page');
const popularResults = document.querySelector('.popular_results');
const viewPopular = document.querySelector('#view_popular');
const searchTotal = document.querySelector('.total_results');
const popularHeader = document.querySelector('.popular_header');
const morePopular = document.querySelector('#more_popular');
let paginaActual = 1;
const navPopular = document.querySelector('#nav_popular');

const topRatedPage = document.querySelector('#top_rated_page');
const topRatedResults = document.querySelector('.top_rated_results');
const viewTopRated = document.querySelector('#view_top_rated');
const topRatedHeader = document.querySelector('.top_rated_header');
const moreTopRated = document.querySelector('#more_to_rated');
const navTopRated = document.querySelector('#nav_top_rated');

const upcomingPage = document.querySelector('#upcoming_page');
const upcomingResults = document.querySelector('.upcoming_results');
const viewUpcoming = document.querySelector('#view_upcoming');
const upcomingHeader = document.querySelector('.upcoming_header');
const moreUpcoming = document.querySelector('#more_upcoming');
const navUpcoming = document.querySelector('#nav_upcoming');

const nowPlayingPage = document.querySelector('#now_playing_page');
const nowPlayingResults = document.querySelector('.now_playing_results');
const viewNowPlaying = document.querySelector('#view_now_playing');
const nowPlayingHeader = document.querySelector('.now_playing_header');
const moreNowPlaying = document.querySelector('#more_now_playing');
const navNowPlaying = document.querySelector('#nav_now_playing');

const moviesItem = document.querySelectorAll('.movies_item');
const modalwrapper = document.querySelector('#modal_wrapper');
const modalContainer = document.querySelector('.modal_container');

const exitButton = document.querySelector('.exit_modal');


const busqueda = function () {
    const moviesItem = document.querySelectorAll('.movies_item');
    for (var i = 0; i < moviesItem.length; i++) {
        moviesItem[i].onclick = function (e) {
            e.preventDefault()
            modalwrapper.classList.remove('displayNone');
            modalwrapper.classList.add('active');
            const peliculaId = e.currentTarget.id;
            console.log(peliculaId);
            fetch(`https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    document.querySelector('.modal_header').style.backgroundImage = `linear-gradient(rgba(8,28,36,0.85),rgba(0,0,0,.5)), url(https://image.tmdb.org/t/p/original${data.backdrop_path})`;
                    document.querySelector('.modal_header img').src = `https://image.tmdb.org/t/p/original${data.poster_path}`;
                    document.querySelector('.modal_movie_title').innerHTML = data.original_title;
                    document.querySelector('.modal_title span').innerHTML = data.tagline;
                    document.querySelector('.movie_description').innerHTML = data.overview;
                    document.querySelector('.texts').innerHTML = data.genres.map(g => g.name).join(', ');
                    document.querySelector('.release_date').innerHTML = data.release_date;
                })
        }
    }
}



const abrirMenu = function(){
    const burger = document.querySelector('#menu');
    const menuDesplegado = document.querySelector('.nav-list');

    burger.addEventListener ('click', function(e){
        e.preventDefault()
        // if(menuDesplegado.style.visibility === 'hidden'){
        //     menuDesplegado.style.visibility = 'visible'
        // } else{
        //     menuDesplegado.style.visibility = 'hidden'
        // }
        
        menuDesplegado.style.visibility = ((menuDesplegado.style.visibility!='hidden') ? 'hidden' : 'visible');
        

    })
}
abrirMenu();



input.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        const q = input.value;

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=a70dbfe19b800809dfdd3e89e8532c9e&query=${q}`)
            .then(res => res.json())
            .then(data => {
                const movies = data.results;

                ulSearch.innerHTML = movies.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img id="poster"src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');
                divResults.classList.remove('displayNone');
                divResults.classList.remove('displayNone');

                for (var i = 0; i < movieDivs.length; ++i) {
                    movieDivs[i].classList.add('displayNone');
                }
                photoHome.classList.add('displayNone');

                busqueda();


            })
    }
})


exitButton.onclick = function (e) {
    e.preventDefault();
    modalwrapper.classList.add('displayNone');
}



fetch(urlPopular)
    .then(res => res.json())
    .then(data => {
        const primerasPelis = data.results.slice(0, 5);

        movieList.innerHTML = primerasPelis.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');

        
        busqueda();



        const movies = data.results;
        popularResults.innerHTML = movies.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');
        viewPopular.onclick = function (e) {
            e.preventDefault()
            popularPage.classList.remove('displayNone');
            photoHome.classList.add('displayNone');
            for (var i = 0; i < movieDivs.length; ++i) {
                movieDivs[i].classList.add('displayNone');
            }

            searchTotal.innerText = data.total_results + ' ' + 'results';
            popularHeader.appendChild(searchTotal);
        }


        // const movies = data.results;
        // popularResults.innerHTML = movies.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');
        // for (var i = 0; i < viewPopular.length; ++i) {
        //     viewPopular[i].onclick = function (e) {
        //     e.preventDefault()
        //     popularPage.classList.remove('displayNone');
        //     photoHome.classList.add('displayNone');
        //     for (var i = 0; i < movieDivs.length; ++i) {
        //         movieDivs[i].classList.add('displayNone');
        //     }

        //     searchTotal.innerText = data.total_results + ' ' + 'results';
        //     popularHeader.appendChild(searchTotal);
        // }

        // }
        





    })




navPopular.onclick = function (e) {
    e.preventDefault()
    popularPage.classList.remove('displayNone');
    photoHome.classList.add('displayNone');
    topRatedPage.classList.add('displayNone');
    upcomingPage.classList.add('displayNone');
    nowPlayingPage.classList.add('displayNone');
    for (var i = 0; i < movieDivs.length; ++i) {
        movieDivs[i].classList.add('displayNone');
    }
    fetch(urlPopular)
        .then(res => res.json())
        .then(data => {
            searchTotal.innerText = data.total_results + ' ' + 'results';
            popularHeader.appendChild(searchTotal);
        })
}


function loadMorePopular() {
    paginaActual++
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${paginaActual}`)
        .then(res => res.json())
        .then(data => {

            const movies = data.results
            let newMovies = movies.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');
            popularResults.innerHTML = popularResults.innerHTML + newMovies;
            busqueda();
        })
        
}





fetch(urlTopRated)
    .then(res => res.json())
    .then(data => {
        const primerasPelis = data.results.slice(0, 5);

        listTopRated.innerHTML = primerasPelis.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');

        busqueda();


        const movies = data.results;
        topRatedResults.innerHTML = movies.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');
        viewTopRated.onclick = function (e) {
            e.preventDefault()
            topRatedPage.classList.remove('displayNone');
            photoHome.classList.add('displayNone');
            for (var i = 0; i < movieDivs.length; ++i) {
                movieDivs[i].classList.add('displayNone');
            }

            searchTotal.innerText = data.total_results + ' ' + 'results';
            topRatedHeader.appendChild(searchTotal);
        }



    })


navTopRated.onclick = function (e) {
    e.preventDefault()
    topRatedPage.classList.remove('displayNone');
    photoHome.classList.add('displayNone');
    popularPage.classList.add('displayNone');
    upcomingPage.classList.add('displayNone');
    nowPlayingPage.classList.add('displayNone');
    for (var i = 0; i < movieDivs.length; ++i) {
        movieDivs[i].classList.add('displayNone');
    }
    fetch(urlTopRated)
        .then(res => res.json())
        .then(data => {
            searchTotal.innerText = data.total_results + ' ' + 'results';
            topRatedHeader.appendChild(searchTotal);
        })
}


function loadMoreTopRated() {
    paginaActual++
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${paginaActual}`)
        .then(res => res.json())
        .then(data => {

            const movies = data.results
            let newMovies = movies.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');
            topRatedResults.innerHTML = topRatedResults.innerHTML + newMovies;
            busqueda();
        })
}









fetch(urlUpcoming)
    .then(res => res.json())
    .then(data => {
        const primerasPelis = data.results.slice(0, 5);

        listUpcoming.innerHTML = primerasPelis.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');

        busqueda();


        const movies = data.results;
        upcomingResults.innerHTML = movies.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');
        viewUpcoming.onclick = function (e) {
            e.preventDefault()
            upcomingPage.classList.remove('displayNone');
            photoHome.classList.add('displayNone');
            for (var i = 0; i < movieDivs.length; ++i) {
                movieDivs[i].classList.add('displayNone');
            }

            searchTotal.innerText = data.total_results + ' ' + 'results';
            upcomingHeader.appendChild(searchTotal);
        }



    })

navUpcoming.onclick = function (e) {
    e.preventDefault()
    upcomingPage.classList.remove('displayNone');
    photoHome.classList.add('displayNone');
    popularPage.classList.add('displayNone');
    topRatedPage.classList.add('displayNone');
    nowPlayingPage.classList.add('displayNone');
    for (var i = 0; i < movieDivs.length; ++i) {
        movieDivs[i].classList.add('displayNone');
    }

    fetch(urlUpcoming)
        .then(res => res.json())
        .then(data => {
            searchTotal.innerText = data.total_results + ' ' + 'results';
            upcomingHeader.appendChild(searchTotal);
        })
}

function loadMoreUpcoming() {
    paginaActual++
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${paginaActual}`)
        .then(res => res.json())
        .then(data => {

            const movies = data.results
            let newMovies = movies.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');
            upcomingResults.innerHTML = upcomingResults.innerHTML + newMovies;

            busqueda();
        })
        
}



fetch(urlNowPlaying)
    .then(res => res.json())
    .then(data => {
        const primerasPelis = data.results.slice(0, 5);

        listNowPlaying.innerHTML = primerasPelis.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');

        
        busqueda();


        const movies = data.results;
        nowPlayingResults.innerHTML = movies.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');
        viewNowPlaying.onclick = function (e) {
            e.preventDefault()
            nowPlayingPage.classList.remove('displayNone');
            photoHome.classList.add('displayNone');
            for (var i = 0; i < movieDivs.length; ++i) {
                movieDivs[i].classList.add('displayNone');
            }

            searchTotal.innerText = data.total_results + ' ' + 'results';
            nowPlayingHeader.appendChild(searchTotal);
        }


    })

navNowPlaying.onclick = function (e) {
    e.preventDefault()
    nowPlayingPage.classList.remove('displayNone');
    photoHome.classList.add('displayNone');
    popularPage.classList.add('displayNone');
    topRatedPage.classList.add('displayNone');
    upcomingPage.classList.add('displayNone');
    for (var i = 0; i < movieDivs.length; ++i) {
        movieDivs[i].classList.add('displayNone');
    }
    upcomingPage.classList.add('displayNone');
    fetch(urlNowPlaying)
        .then(res => res.json())
        .then(data => {
            searchTotal.innerText = data.total_results + ' ' + 'results';
            nowPlayingHeader.appendChild(searchTotal);
        })
}

function loadMoreNowPlaying() {
    paginaActual++
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${paginaActual}`)
        .then(res => res.json())
        .then(data => {

            const movies = data.results
            let newMovies = movies.map(movie => `<li class="movies_item" id="${movie.id}"><a href=""><div class="movies_poster"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}"/></div><div class="movies_content"><p class="movies_title">${movie.title}</p></div></a></li>`).join('');
            nowPlayingResults.innerHTML = nowPlayingResults.innerHTML + newMovies;

            busqueda();
        })
        
}




