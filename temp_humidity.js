// Source: //http://www.dragino.com/downloads/downloads/LHT65/UserManual/LHT65_Temperature_Humidity_Sensor_UserManual_v1.3.pdf
function Decoder(bytes, port, uplink_info) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
  let value = (bytes[0] << 8 | bytes[1]) & 0x3FFF;
  let batV = value / 1000; //Battery,units:V

  value = bytes[2] << 8 | bytes[3];
  if (bytes[2] & 0x80) {
    value |= 0xFFFF0000;
    }
  let temp_SHT = (value / 100).toFixed(2); //SHT20,temperature,units:°C
  let tempSHT_f = (temp_SHT * 1.8 + 32);
  
  value = bytes[4] << 8 | bytes[5];
  let hum_SHT = (value / 10).toFixed(1); //SHT20,Humidity,units:%

  value = bytes[7] << 8 | bytes[8];
  if (bytes[7] & 0x80) {
    value |= 0xFFFF0000;
    }
  
  let temp_ds = (value / 100).toFixed(2); //DS18B20,temperature,units:°C
  let temp_ds_f = (temp_ds * 1.8 + 32);

  let hotspots = uplink_info['hotspots'];
  let hotspotName = hotspots[0]['name'];
  //let hotspotLat = hotspots[0]['lat'];
  //let hotspotLong = hotspots[0]['long'];
  //let hotspotRssi = hotspots[0]['rssi'];
  //let hotspotSnr = hotspots[0]['snr'];
  let device = uplink_info['name'];
  
  let decodedPayload = {
    "device": device,
    "battery": batV,
    "relative-humidity": hum_SHT,
    "temperature-sht-c": temp_SHT,
    "temperature-ds-c": temp_ds,
    //"temperature-sht-f": tempSHT_f,
    //"temperature-ds-f": temp_ds_f,
    "hotspot-name": hotspotName
    //"hotspot-latitude": hotspotLat,
    //"hotspot-longitude": hotspotLong
    //"hotspot-rssi": hotspotRssi,
    //"hotspot-snr": "hotspotSnr
    };
  // END TODO

  return Serialize(decodedPayload)
}

// Generated: do not touch unless your Google Form fields have changed
var field_mapping = {
  "device": "entry.560666518",
  "battery": "entry.35237966",
  "relative-humidity": "entry.10984992",
  "temperature-sht-c": "entry.1368947862",
  "temperature-ds-c": "entry.672819440",
  //"temperature-sht-f": "entry.1624375976",
  //"temperature-ds-f": "entry.820940945",
  "hotspot-name": "entry.1879243173"
  //"hotspot-latitude": "entry.1233653885",
  //"hotspot-longitude": "entry.1598499172"
  //"hotspot-rssi": "entry.99124843",
  //"hotspot-snr": "entry.1110712855"
}
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