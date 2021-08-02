//1. URL 
const URLPOST = "https://accounts.spotify.com/api/token";

//2. peticion
let llave1 = "grant_type=client_credentials";
let llave2 = "client_id=b9b066e0b9fe4e308aa853a4029fb4cb";
let llave3 = "client_secret=fbb52d90bdf24787b69a879e3709a8d7";

let peticionPOST = {
  method: "POST",
  headers: {
    "Content-Type": 'application/x-www-form-urlencoded'
  },
  body: llave1 + '&' + llave2 + '&' + llave3
}

fetch(URLPOST, peticionPOST)
  .then(function (respuesta) {
    return (respuesta.json())
  })
  .then(function (datos) {
    let token=`${datos.token_type} ${datos.access_token}`;
    obtenerCanciones(token);
  })

function obtenerCanciones(token) {
  const URL =
    "https://api.spotify.com/v1/tracks?ids=3fUvsaiyOx6K1lkNMzNy1Y%2C4gMgiXfqyzZLMhsksGmbQV%2C4YJUTdZ0Pgl0ZeNyHYXeLd%2C2vwqOagUdKs4iPG4awFt7Y%2C3TO7bbrUKrOSPGRTB5MeCz%2C7iAqvWLgZzXvH38lA06QZg%2C0vFOzaXqZHahrZp6enQwQb%2C6p9UFDNfGrzS5Byd2r9KPk%2C5oidljiMjeJTWUGZ4TfFea&market=US";

  let peticion = {
    method: "GET",
    headers: {
      Authorization: token,
    }
  };

  fetch(URL, peticion)
    .then(function (respuesta) {
      return (respuesta.json())
    })
    .then(function (datos) {
      // console.log(datos);
      filtrarDatos(datos);
    })
}

function filtrarDatos(datos) {
  let pistas = datos.tracks;
  // console.log(pistas);
  let datosFiltrados = pistas.map(function (pista) {
    return ({
      nombrePista: pista.name,
      nombreAlbum: pista.album.name,
      audio: pista.preview_url,
      foto: pista.album.images[1].url,
      popularidad: pista.popularity
    })
  });
  console.log(datosFiltrados);
  pintarDatos(datosFiltrados);
}

function pintarDatos(datosFiltrados) {
  let contenedorPadre = document.getElementById("contenedorPadre");

  datosFiltrados.map(function (pista) {
    //pintar div con la clase col
    let contenedorColumna = document.createElement("div");
    contenedorColumna.classList.add("col");
    //pintar un div con la clase card y h-100
    let tarjeta = document.createElement("div");
    tarjeta.classList.add("card");
    tarjeta.classList.add("h-100");
    //pintar una img con la clase card-img-top
    let foto = document.createElement("img");
    foto.classList.add("card-img-top");
    foto.src = pista.foto;

    //pintar un div con laq clase card-body
    let contenedorTitulo = document.createElement("div");
    contenedorTitulo.classList.add("card-body");

    //pintar titulo h5
    let titulo = document.createElement("h5");
    titulo.classList.add("card-title");
    titulo.innerText = pista.nombrePista;
    //pintar audio

    let audio = document.createElement("audio");
    audio.setAttribute("controls","controls");
    audio.classList.add("w-100");
    audio.src = pista.audio;
    //*****************/
    //Injdico que la foto va dentro de la tarjeta
    tarjeta.appendChild(foto);

    //Indico que el contenedorTitulo va dentro de la tarjeta
    tarjeta.appendChild(contenedorTitulo);

    //Indico que el titulo va dentro del contenedor titulo
    contenedorTitulo.appendChild(titulo);
    contenedorTitulo.appendChild(audio);
    //Indico que la targeta va dentro del contenedor columna

    contenedorColumna.appendChild(tarjeta);

    //Indico que el contenedorcolumna va dentro del contenedor padre

    contenedorPadre.appendChild(contenedorColumna);

  })
}

//Carousel
const fila = document.querySelector('.contenedor-carousel');
const imagenes = document.querySelectorAll('.imagen');
const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');
flechaDerecha.addEventListener('click',()=>{
  fila.scrollLeft += fila.offsetWidth;
})
flechaIzquierda.addEventListener('click',()=>{
  fila.scrollLeft -= fila.offsetWidth;
})
imagenes.forEach((imagen)=>{
  imagen.addEventListener('mouseenter',(e)=>{
    const elemento = e.currentTarget;
    setTimeout(()=>{
      imagenes.forEach(imagen => imagen.classList.remove('hover'));
      elemento.classList.add('hover');
    },300);
  })
});
fila.addEventListener('mouseleave',()=>{
  imagenes.forEach(imagen => imagen.classList.remove('hover'));
});