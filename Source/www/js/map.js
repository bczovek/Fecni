let map;
let pos;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"),
    {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
  });
}

$(document).ready(function() {
    
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      
      console.log(pos);

      map.setCenter(pos);
      const marker = new google.maps.Marker({
        position: pos,
        map: map,
      })
      console.log(map.getCenter().lat());
    },
    () => {
      handleLocationError();
    });
  } else {
    handleLocationError();
  }

});

function handleLocationError(){
  const errorWindow = new google.maps.InfoWindow();

  errorWindow.setPosition(map.getCenter());
  errorWindow.setContent("<h4>Helymeghatározás sikertelen!</h4>");
  errorWindow.open(map);
}

function searchShops(types, range, openNow){

  clearMarkers();

  const service = new google.maps.places.PlacesService(map);

  types.forEach(type => {
    service.nearbySearch({
      location: new google.maps.LatLng(pos.lat,pos.lng),
      radius: range*1000,
      type: type,
      openNow: openNow,
    }, function(data){

      data.forEach(element => {
        
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(element.geometry.location.lat(),element.geometry.location.lng()),
          map: map,
          icon: element.icon,
        });
        const infowindow = new google.maps.InfoWindow({
          content: "<h4>"+element.name+"</h4><br><h6>"+element.vicinity+"</h6>",
        });
        marker.addListener("click", ()=>{
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });

        markers.push(marker);
        
      });
  
    });
  });
}

function clearMarkers(){
  markers.forEach(marker => {
    marker.setMap(null);
  });

  markers = [];
}
