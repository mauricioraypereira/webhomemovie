export const getTrending = async (mediaType, timeWindow, setMoviesList, setErrorMessage) => {
    fetch(`https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}?api_key=f5385ed65b4aa6a61986372440c6e194`)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            setMoviesList(data)
        })
        .catch(e => {
            setErrorMessage('Ocorreu um erro! ', e)
        });
}
