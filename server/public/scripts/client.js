console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  });

  $('#viewKoalas').on('click', '.readyToTransfer', isReady);
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $('#viewKoalas').empty();
  $.ajax({
    method: 'GET',
    url: '/koalas'
  })
  .then(function (response) {
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      console.log(response[i]);
      $('#viewKoalas').append(`
          <tr>
              <td>${response[i].name}</td>
              <td>${response[i].gender}</td>
              <td>${response[i].age}</td>
              <td>${response[i].readyForTransfer}</td>
              <td>${response[i].notes}</td>
              <td>
                  <button class="readyToTransfer" data-id="${response[i].id}">Ready To Transfer</button>
              </td>
          </tr>
      `);
    }
  })
  .catch(error =>{
    console.log('error in GET of koalas', error);
  })
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala,
    }).then(function(response) {
      console.log('Response from server.', response);
      getKoalas();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add koala at this time. Please try again later.');
    });
}

function isReady(koalaId, isReady){
$.ajax({
  method: "PUT",
  url: `/koalas/${koalaId}`,
  data: {
    readyForTransfer: isReady,
  }
})
.then((response) =>{
  console.log("I<3Koalas");
  getKoalas();
})
.catch((err) =>{
  console.log("no koalas for you!!");
  alert("there was an error. take a break and go outside", err);
})
}