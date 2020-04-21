class Maps{
  constructor(){
    this.map = null;
    this.markers = [];
  }

  start(options){
    this.map = new google.maps.Map(document.getElementById('map'), {zoom: 16, center: {lat: options.lat, lng: options.lng}});
    this.addMarker({
      title: 'Start',
      lat: options.lat,
      lng: options.lng
    })
  }

  addMarker(options){
    let title = null;
    if (options.title !== undefined) {
      title = options.title;
    }

    let icon = null;
    if (options.icon !== undefined) {
      icon = options.icon;
    }
    let marker = new google.maps.Marker({
      title: title,
      position: {
        lat: options.lat,
        lng: options.lng
      },
      icon: icon,
      map: this.map
    });
    this.markers.push(marker);
    return marker;
  }

  moveToMarker(marker, options){
    marker.setPosition( new google.maps.LatLng( options.lat, options.lng ) );
  }

  findMaker(title) {
    for(let i = 0; i < this.markers.length; i++) {
      if (this.markers[i].title === title) {
        return this.markers[i];
      }
    }
    return false;
  }
}
