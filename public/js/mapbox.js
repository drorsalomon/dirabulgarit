export const displayMap = (long, lat, title) => {
  L.mapbox.accessToken = 'pk.eyJ1IjoiZHJvcnNhbDMiLCJhIjoiY2x2bDFjdTY0MGdibzJrbXc3ajJubmxiZyJ9.7pdKIb23xT3EUfmDm16jnA';

  if (long && lat) {
    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [long, lat],
          },
          properties: {
            title: title,
            'marker-color': '#2078a9',
            'marker-size': 'large',
            'marker-symbol': 'building',
          },
        },
      ],
    };

    const map = L.mapbox.map('map').setView([lat, long], 15).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v12'));

    const myLayer = L.mapbox.featureLayer().addTo(map);
    myLayer.setGeoJSON(geojson);
  }
};
