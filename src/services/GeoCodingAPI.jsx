const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0ab03b33d2msh95b98d3304892c2p149f6bjsn3f1ac5015056',
		'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
	}
};

const fetchLocation = async (address) => {
    if (address.length !== 0) {
        const request = `https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=${address}&format=json&addressdetails=1&namedetails=0&accept-language=fr&countrycodes=FR&polygon_threshold=0.0`;
        const response = await fetch(request, options)
            .then(response => response.json())
            .catch(err => console.error(err));
            return response;
    } else {
        return null;
    }
}

export { fetchLocation };