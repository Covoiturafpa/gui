const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0ab03b33d2msh95b98d3304892c2p149f6bjsn3f1ac5015056',
		'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
	}
};

const fetchLocation = async (address) => {
    const request = `https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=${address}&accept-language=en&polygon_threshold=0.0`;
    const response = await fetch(request, options)
        .then(response => response.json())
        .catch(err => console.error(err));
        return response;
}

export { fetchLocation };