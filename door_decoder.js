function Decoder(bytes, port, uplink_info) {
  //Transform bytes to decoded payload below
  let value=(bytes[0]<<8 | bytes[1])&0x3FFF;
  let bat=value/1000;//Battery,units:V
  let door_open_status=bytes[0]&0x80?1:0;//1:open,0:close
  
  let hotspots = uplink_info['hotspots'];
  let hotspotName = hotspots[0]['name'];
  let hotspotLat = hotspots[0]['lat'];
  let hotspotLong = hotspots[0]['long'];
  let hotspotRssi = hotspots[0]['rssi'];
  let hotspotSnr = hotspots[0]['snr'];
  //let hotspotFreq = hotspots[0]['frequency'];
  let device = uplink_info['name'];
  
  //flags
  let door_open = 0;
  let door_close = 0;
  
  if(door_open_status == 1){
    door_open = 1;
    door_close = 0;
    }
  else{
    door_open = 0;
    door_close = 1;
    }
  
  let decodedPayload = {
    "hotspot-name": hotspotName,
    "device": device,
    "hotspot-latitude": hotspotLat,
    "hotspot-longitude": hotspotLong,
    "hotspot-rssi": hotspotRssi,
    "hotspot-snr": hotspotSnr,
    "sensor-opened": door_open,
    "sensor-closed": door_close
    //"hotspot-frequency": hotspotFreq
  };
  // END TODO

  return Serialize(decodedPayload)
}

// Generated: do not touch unless your Google Form fields have changed
var field_mapping = {
  "hotspot-name": "entry.506430335",
  "device": "entry.490886948",
  "hotspot-latitude": "entry.92464061",
  "hotspot-longitude": "entry.2032696840",
  "hotspot-rssi": "entry.238230833",
  "hotspot-snr": "entry.402762348",
  "sensor-opened": "entry.655165361",
  "sensor-closed": "entry.502258333"
  //"hotspot-frequency": "entry.12048687"
};
// End Generated

function Serialize(payload) {
  var str = [];
  for (var key in payload) {
    if (payload.hasOwnProperty(key)) {
      var name = encodeURIComponent(field_mapping[key]);
      var value = encodeURIComponent(payload[key]);
      str.push(name + "=" + value);
    }
  }
  return str.join("&");
}
// DO NOT REMOVE: Google Form Function
  