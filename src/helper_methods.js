async function findGeolocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
                };
                currentLat = pos.lat
                currentLong = pos.lng
            })
        await setTimeout(function(){
            addMarker()
        }, 7000)
    }
}

function renderCard(currentLocation){
    cardInnerHTML.innerHTML = ''
    cardInnerHTML.innerHTML = 
        `<div class="w3-card-4">
            <div class="top-border">
                <p class="location-name"style="display: inline;">${currentLocation.name}</p>
                <button id="closeCardButton" type="button">x</button>
            </div>
            <img class="photo" src="${currentLocation.photos[0].name}" alt="Alps">
            <div class="w3-container w3-center">
                <p class="loc-description">${currentLocation.photos[0].description}</p>
            </div>
        </div>`
}

async function addMarker(){
    console.log("Hello")
    let marker = new google.maps.Marker({
            position: {lat: currentLat, lng: currentLong}, 
            map: map, 
            title: currentLat +', '+ currentLong
    });
}

function uploadFile(){
    let file = currentFile.target.files[0];
    let formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    return formData
}

function getCurrentLocationFromClick(e){
    if(e.target.tagName === "BUTTON"){
        e.preventDefault()
        findGeolocation()
        createLocation()
        addLocationToArray()
        $("#submit-form").slideDown();
    }
}

function friendList(users){
    friendsList.innerHTML = "<option disabled selected>Select a friend</option>"
    users.map(function(user){
        friendsList.innerHTML += `<option value="${user.id}">${user.name}</option>`
    })
}

function backToMyMap(){
    locations = []
    currentUser = loggedInUser;
    loggedInUser.locations.forEach(location => {
        locations.push({lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)})
    })
    friendsList.value = null;
    initMap();
}
