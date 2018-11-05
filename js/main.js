(function MusicDb() {

 this.init = function () {
   this.search();
 };


 this.search = function () {
   document.querySelector('#form').addEventListener("submit", function (e) {
     e.preventDefault();
     const value = document.querySelector('#inputSearch').value;
     form.reset();
     getData(value.split(' ').join("+"));
     // getArtistInfo()
   });
 };

 this.hover = function () {


 }



 this.getData = function (artist) {
   const http = new XMLHttpRequest();
   const url = "https://itunes.apple.com/search?term=" + artist + "&entity=album";
   const method = "GET";
   console.log(artist);
   const container = document.querySelector('#albumListContainer');
   container.innerHTML = '';
   // const search = artist;
   http.open(method, url);
   http.onreadystatechange = function () {

     if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
       showArtists(JSON.parse(http.response));
       console.log(artist)
       fetch(`https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`)
         .then(res => res.json())
         .then(response => {
           document.querySelector('.hide').style.display = "block";

           console.log(response)
           document.querySelector('.artistInfo').addEventListener("mouseover", function () {
             const parent = document.querySelector('#paraParent');
             const paragraph = document.createElement('section');
             paragraph.innerHTML = `
               <h2 class="headingBio">${response.artists[0].strArtist}</h2>
               <p>${response.artists[0].strBiographyEN}</p>

             `
             parent.appendChild(paragraph);
             console.log('test')
             document.querySelector('.artistInfo').addEventListener("mouseleave", function () {
               paragraph.innerHTML = ""
               parent.appendChild(paragraph);
             })
           })


         })
         .catch(err => {
           console.log(`error ${err}`)
           alert("Sorry, nothing came back")
         })

     } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
       //
     }

   };
   http.send();

 };

 this.showArtists = function (obj) {
   const container = document.querySelector('#albumListContainer');
   let template = '';

   if (obj.results.length > 0) {
     document.querySelector('#notMatch').style.display = 'none';

     for (var i = 0; i < obj.results.length; i++) {
       template += `<div class="col-sm-3 albumItem">`;
       template += `<div class="itemThmb" style="background:url(${obj.results[i].artworkUrl100})"></div>`;
       template += `<div class="itemTitle">${obj.results[i].collectionName}</div>`;
       template += `<div class="itemPrice"><span>Price: </span>'${obj.results[i].collectionPrice} 'USD </div>`;
       template += `<a href="${obj.results[i].collectionViewUrl}" target="_blank">Buy now</a>`;
       template += `</div>`;
     }

     container.innerHTML = '';
     container.insertAdjacentHTML('afterbegin', template);
     hover()
   } else {
     document.querySelectorAll('#notMatch').style.display = 'block';
   }
 };

 this.init();
})();
