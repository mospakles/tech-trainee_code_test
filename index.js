const movieJson = require('./movies.json');

class MovieApi {
    constructor(movies) {
        this.movies = this.instantiate(movies);
    }

    instantiate = function(movies) {
        return movies.map((movie, index) => {
            return {...movie, id: index + 1, rating: this.generateRating() }
        })
    }

    generateRating() {
        return Math.floor(Math.random() * 6)
    }

    fetchAllMovies() {
        return this.movies;
    }

    fetchMoviesByGenre(genre) {
        return this.movies.filter((movie) => movie.genre === genre);
    }

    removeMovieById(id) {
        const index = this.movies.findIndex(movie => movie.id === id)
        if (index === -1) return 'not found';
        this.movies.splice(index, 1);
        return this.movies
    }

    filterSubtileAndThumb() {
        return this.movies.map((movie) => {
            delete movie.subtitle;
            delete movie.thumb;

            return movie
        })
    }

    sortMovieByRating() {
        return this.movies.sort((a, b) => b.rating >= a.rating ? 1 : -1)
    }
    
    sortMovieByName() {
        //Movies sorted in ascending order (a-z)
        return this.movies.sort((a, b) => b.title.toLowerCase() < a.title.toLowerCase() ? 1 : -1)
    }

    getTopTwoAndBottomTwoRating () {
        const result = [];
        const sorted = this.sortMovieByRating();
        result.concat(result.push(sorted.slice(0, 2)), result.push(sorted.slice(-2)));
        
        return result;
    }

    getTopThreeRated() {
        const sorted = this.sortMovieByRating();
        return sorted.slice(0, 3);
    }

    sortMovieBottomToTopRated() {
        return this.movies.sort((a, b) => b.rating <= a.rating ? 1 : -1)
    }
    
    addNewMovie(movie) {
        const lastIndex = this.movies[this.movies.length - 1].id;
        this.movies.push({ id: lastIndex + 1, rating: this.generateRating(), ...movie })
        return this.movies;
    }

    fetchMovieById(id) {
         return this.movies.find(movie => movie.id === id)
    }

    updateMovie(id, title) {
        return this.movies.map((movie) => {
            if (movie.id !== id) return movie
            return {...movie, title }
        })
    }

    
    

};

const api = new MovieApi(movieJson);

// console.log(api.fetchAllMovies());

// console.log(api.fetchMoviesByGenre('Romance'));

// console.log(api.removeMovieById(10));

// console.log(api.filterSubtileAndThumb());

// console.log(api.sortMovieByRating());

// console.log(api.sortMovieByName());

// console.log(api.getTopTwoAndBottomTwoRating());

// console.log(api.getTopThreeRated());

// console.log(api.sortMovieBottomToTopRated());

// console.log(api.addNewMovie({ description: 'A disillusioned college graduate finds himself torn between his older lover and her daughter.', sources: 'https://www.imdb.com/title/tt0061722/', subtitle: 'By Google', thumb: 'images/TheGraduate.jpg', title: 'The Graduate', genre: 'Romance'}));

// console.log(api.fetchMovieById(12));

// console.log(api.updateMovie(11, 'Lovers Game'));

