const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCmngKdHI41_dHy2FpMS5j-Q&part=snippet%2Cid&order=date&maxResults=12';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9ad33d8161mshbee137763ab0cacp1a2297jsn669646de414e',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

//Lógica de async: ir por los datos, luego esperar por ellos y finalmente retornarlos hacia el usuario
async function fetchData(urlApi) { //siempre async antes de function
    const response = await fetch(urlApi, options); //hacemos uso del fetch() y solo por esta vez le pasamos la opciones 
    const data = await response.json(); //estructura de los datos transformandolos en json
    return data; //retorna la información de la API que estamos solicitando
    }

(async () => {
        //Dentro implementamos la lógica necesaria para hacer el llamado a la API, obtener los elementos y mostrarlos en html
        //Se implementa try y catch
    try {
        const videos = await fetchData(API);
        let view = `
                ${videos.items.map(video => `
                <a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
                    <div class="group relative">
                        <div
                            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                        </div>
                        <div class="mt-4 flex justify-between">
                            <h3 class="text-sm text-gray-700">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                ${video.snippet.title}
                            </h3>
                        </div>
                    </div></a>
                `).slice(0, 12).join('')}
                `;
                content.innerHTML = view;//innerHTML es igual a la vista que se ha creado e itera con el metodo map y devuelve un nuevo arreglo con los elementos que queremos obtener como el título, la descripción, la imagen miniatura de la API
            } catch (error){
                    console.log(error); //en caso que de que haya un error el catch lo captura e imprime qué tipo de error devolvió
                    
            }
        })();    