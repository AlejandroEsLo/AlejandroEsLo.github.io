
    const request = new XMLHttpRequest();
    const requestURL = '/http_ejemplo.json';

    request.open('GET', requestURL);
    request.responseType = 'text';
    request.send();

    request.onload = function() {
      const dataTXT = request.response; // We take the response string
      const data = JSON.parse(dataTXT); // We convert it to an object
      //console.log(data);

      // Return data as string
      //console.log(JSON.stringify(data);

      // We get keys from our dictionary
      let num_keys = Object.keys(data);
      //console.log(num_keys);

      let num_packets = num_keys.length
      console.log("Total number of packets = " + num_packets);

      for (let i = 0; i < num_packets; i++) {

        for(key in data[i]._source){
          //console.log(data[i]._source[key]);
          let acces1 = data[i]._source[key].eth
          //console.log(acces1);
          console.log("--------------------Paquete " + i + "------------------------");
          //Destination Address
          let eth_dst = Object.values(acces1)[0]
          console.log("Ethernet Destination Address " + i + " => " + eth_dst);
          //Source Address
          let eth_src = Object.values(acces1)[2]
          console.log("Ethernet Source Address " + i + " => " + eth_src);
        }

        for(key in data[i]._source){
          let acces2 = data[i]._source[key].ip
          //Destination Address
          let eth_dst = Object.values(acces2)[14]
          console.log("Ip Address " + i + " => " + eth_dst);
          //Source Address
          let eth_src = Object.values(acces2)[13]
          console.log("Ip Source Address " + i + " => " + eth_src);
        }
      }
    }
