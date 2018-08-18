document.querySelector('#zipForm').addEventListener('submit', getLocationInfo);

//Delete Result
document.querySelector('body').addEventListener('click', deleteLocResult);

function getLocationInfo(e){
  //Get zip value from user input
  var zip = document.querySelector('.zip').value;

  //Make Request
  fetch(`http://api.zippopotam.us/us/${zip}`)
    .then(response => {
      if(response.status != 200){
        showIcon('remove');
        document.querySelector('#output').innerHTML =
        `
          <article class="message is-danger">
          <div class="message-body"> Invalid zipcode, please try again !
          </div></article>
        `;
        throw Error(response.statusText);

      } else {
        showIcon('check')
        return response.json();
      }

    })
    .then(data => {
      //Show Corresponding Location Information
      let output = '';
      data.places.forEach(place => {
        output += `
          <article class="message is-primary">
            <div class="message-header">
              <p>Location Information</p>
              <button class="delete"></button>
            </div>

            <div class="message-body">
              <ul>
                <li><strong>City: </strong> ${place['place name']}</li>
                <li><strong>State: </strong> ${place['state']}</li>
                <li><strong>Longitude: </strong> ${place['longitude']}</li>
                <li><strong>Latitude: </strong> ${place['latitude']}</li>
              </ul>

            </div>
          </article>
        `;
      })

      //Insert as output
      document.querySelector('#output').innerHTML = output;
    })

    .catch(err => console.log(err));

  e.preventDefault();
}

//Show Remove or Check Icons
function showIcon(icon){
  //Clear icon at default
  document.querySelector('.icon-remove')
  .style.display = 'none';
  document.querySelector('.icon-check').style.display = 'none';

  //Show Correct Icon
  document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';

}

function deleteLocResult(e){
  if(e.target.className == 'delete'){
    document.querySelector('.message').remove();
    document.querySelector('.zip').value = '';
    document.querySelector('.icon-check').remove();
  }
}
