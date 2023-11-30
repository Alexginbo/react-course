const apiKey = 'k3M9Fic8EZqvs5gpANdLITkHBI8Db2Ke'
const apiUrl = `https://api.giphy.com/v1/gifs/search?apiKey=${apiKey}&q=panda&limit=10`

export default function getGifs ({keyword = 'morty'} = {}) {
    const apiUrl = `https://api.giphy.com/v1/gifs/search?apiKey=${apiKey}&q=${keyword}}&limit=10`

    return fetch(apiUrl)
    .then(res => res.json())
    .then(response => {
        const {data = []} = response;
        if (Array.isArray(data)) {
            console.log(data)
            const gifs = data.map(
                image => image.images.downsized_medium.url
            )
            console.log(gifs)
            return gifs
        }
    })
}