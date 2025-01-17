

      AFRAME.registerComponent('poster', {
        schema: {
            color: {type: 'color', default: 'white'},
            position: {type: 'vec3'},
            text: {type: 'string'}

        },
        init: function () {
          //console.log('In to the POSTER Component');
          let el = this.el
          let data = this.data
          el.setAttribute('geometry', {primitive:'plane',height: 0.5, width: 3});
          el.setAttribute('text', {width:8, color:'red', value: data.text, align:'center'});
          el.setAttribute('material', 'color', data.color);
          el.setAttribute('position', data.position);
        }
    });

    AFRAME.registerComponent('node', {
      schema: {
        obj_type: {type: 'string', default: 'box'},
        color: {type: 'color', default: 'blue'},
        position: {type: 'vec3'},
        id: {type: 'string'}
      },
      init: function () {
        //console.log('In to the NODE Component');
        let el = this.el
        let data = this.data
        if (data.obj_type == 'computer') {
          el.setAttribute('gltf-model', "old_computer/scene.gltf");
          el.setAttribute('scale', '0.015 0.015 0.015');
          el.setAttribute('rotation', '0 90 0');
          el.setAttribute('position', data.position);
          el.setAttribute('id', data.id);

        }else {
          el.setAttribute('geometry', {primitive: data.obj_type});
          el.setAttribute('material', 'color', data.color);
          el.setAttribute('position', data.position);
          el.setAttribute('id', data.id)
        }

      }
    });

    AFRAME.registerComponent('connection', {
      schema: {
        from:{type: 'string'},
        to:{type: 'string'},
      },
      init: function () {
        //console.log("-------------CONNECTION Component---------------");

        let el = this.el
        let data = this.data
        let node_from = data.from
        let node_to = data.to

        // We obtain position Node From
        let node_from_el = document.getElementById(node_from);
        let pos1 = node_from_el.getAttribute('position');
        let pos_from = Object.values(pos1);

        // We pass each component of position FROM to string
        var fromX = pos_from[0];
        var fx = fromX.toString();

        var fromY = pos_from[1]*2.5;
        var fy = fromY.toString();

        var fromZ = pos_from[2];
        var fz = fromZ.toString();

        // We concatenate all of them into a single string
        var coorFrom = fx.concat(' ', fy.concat(' ',fz))
        //console.log('Strings Position from = ' + coorFrom );

        // We obtain position Node To
        let node_to_el = document.getElementById(node_to);
        let pos2 = node_to_el.getAttribute('position');
        let pos_to = Object.values(pos2);

        // We pass each component of position TO to string
        var toX = pos_to[0];
        var tx = toX.toString();

        var toY = pos_to[1]*2.5;
        var ty = toY.toString();

        var toZ = pos_to[2];
        var tz = toZ.toString();

        // We concatenate all of them into a single string
        var coorTo = tx.concat(' ', ty.concat(' ',tz))
        //console.log('Strings Position to = ' + coorTo );

        // Draw the connection
        el.setAttribute('tube', {'path': [coorFrom, coorTo] , 'radius': '0.25' });
        el.setAttribute('material', 'color', 'cyan');
        el.setAttribute('material', 'opacity', '0.15');
      }
    });

    AFRAME.registerComponent('packet', {
      schema: {
        duration: {type: 'number', default: '3000'},
        start: {type: 'number'},
        class:{type: 'string'},
        id:{type: 'string'},
        color: {type: 'color', default: 'black'},
        from:{type: 'string'},
        to:{type: 'string'},
        pos_ini:{type: 'vec3'},
        pos_end:{type: 'vec3'},
        pos_poster:{type: 'vec3'},
        pos_info_packet:{type: 'vec3'},
        LastValue:{type: 'string'},

        info_from_ip:{type: 'string'},
        info_to_ip:{type: 'string'},
        info_from_eth:{type: 'string'},
        info_to_eth:{type: 'string'},

        info_http1:{type: 'string'},
        info_http2:{type: 'string'},

        info_from:{type: 'string'},
        info_to:{type: 'string'},
        port_tcp_dst:{type: 'string'},
        port_tcp_src:{type: 'string'},
        proto:{type: 'string'}
      },
      init: function () {
        //console.log("-------------PACKET Component---------------");

        let el = this.el
        let data = this.data
        let y_packet = 2.5
        let proto_data = data.proto
        var info_ip_from = "";
        var info_ip_to = "";
        var info_eth_from = "";
        var info_eth_to = "";

        if (proto_data == "ip" ) {
          var node_from = data.info_from_ip
          var node_to = data.info_to_ip
          info_ip_from = node_from
          info_ip_to = node_to
          info_eth_from = data.info_from_eth
          info_eth_to = data.info_to_eth

        }else if (proto_data == "eth") {
          var node_from = data.info_from_eth
          var node_to = data.info_to_eth
          info_eth_from = node_from
          info_eth_to = node_to
          info_ip_from = data.info_from_ip
          info_ip_to = data.info_to_ip
        }

        if (node_from) {
          // We obtain position Node From
          let node_from_el = document.getElementById(node_from);
          let pos1 = node_from_el.getAttribute('position');
          let pos_from = Object.values(pos1);
          //console.log('Position from = ' + pos_from);

          data.pos_ini.x = Math.round(pos_from[0] * 100) / 100;
          data.pos_ini.y = pos_from[1]*y_packet;
          data.pos_ini.z = Math.round(pos_from[2] * 100) / 100;
          //console.log('Position from = ' , data.pos_ini);

          // We obtain position Node To
          let node_to_el = document.getElementById(node_to);
          let pos2 = node_to_el.getAttribute('position');
          let pos_to = Object.values(pos2);
          //console.log('Position to = ' + pos_to);

          data.pos_end.x = Math.round(pos_to[0] * 100) / 100;
          data.pos_end.y = pos_to[1]*y_packet;
          data.pos_end.z = Math.round(pos_to[2] * 100) / 100;
          //console.log('Position end = ' , data.pos_end);

          el.setAttribute('geometry', {primitive: 'box'});
          el.setAttribute('material', 'color', data.color);
          el.setAttribute('scale', {x : 0.25 , y : 2.25 , z : 0.25});
          el.setAttribute('position', data.pos_ini);
          el.setAttribute('class', data.class);
          el.setAttribute('id', data.id);
  //------------------- Set interval ...-----------------------------------------
          let i = 1;

          function run() {
            if (currentEvent == 'move-pause') {
              //console.log("currentEvent = move-pause");
                if (i == Math.ceil(data.start/1000)) {
                  //console.log("DATA %O:",data)
                  var packet_move = document.getElementById(data.id);
                  //console.log("poner a mover "+ data.id);
                  packet_move.setAttribute('animation', {property:'position', to:data.pos_end ,dur:data.duration,
                                   pauseEvents:'move-pause', resumeEvents:'move-resume'});
                }
              //console.log("time = "+i);
              i++;
            }
          }


          var mybutton = document.querySelector('#mybutton');
          var elements_packets = document.getElementsByClassName('all_packets');
          //console.log("paquetes %O:",elements_packets)

          var currentEvent = 'move-begin'
          mybutton.addEventListener('click', function () {

            //Scroll through the list of selected items
            for (var a=0; a< elements_packets.length; a++) {
              //You add an event to each element
              elements_packets[a].emit(currentEvent,null,false)
            }

            switch(currentEvent) {
              case 'move-begin':
              var refreshInterval = setInterval(run, 1000);
              currentEvent = 'move-pause'
              break

              case 'move-resume':
              currentEvent = 'move-pause'
              break

              case 'move-pause':
              currentEvent = 'move-resume'
              break
              //console.log("currentEvent = " + currentEvent)
            }
          });

  //-----------------------------------------------------------------------------



  //------ Put poster in packets

          var poster2 = document.createElement('a-entity');
          var poster_behind2 = document.createElement('a-entity');

          // We obtain position poster
          data.pos_poster.x = pos_from[0];
          data.pos_poster.y = pos_from[1]*4;
          data.pos_poster.z = pos_from[2];

          poster2.setAttribute('poster','position',data.pos_poster);
          poster2.setAttribute('scale', {x : 5 , y : 1 , z : 5});
          poster2.setAttribute('poster','color','black');
          poster2.setAttribute('poster','text',' ' );
          poster2.setAttribute('visible', false);

          poster_behind2.setAttribute('poster','position',data.pos_poster);
          poster_behind2.setAttribute('scale', {x : 5 , y : 1 , z : 5});
          poster_behind2.setAttribute('poster','color','black');
          poster_behind2.setAttribute('poster','text',' ');
          poster_behind2.setAttribute('rotation', {x: 180, y: 0, z: 180});
          poster_behind2.setAttribute('visible', false);

          el.appendChild(poster2);
          el.appendChild(poster_behind2);


  //-- Packet for view the information
          var packet_eth = document.createElement('a-entity');
          var packet_ip = document.createElement('a-entity');
          var packet_tcp = document.createElement('a-entity');
          var packet_http = document.createElement('a-entity');

          var x_info = parseInt(pos_from[0], 10);
          var z_info = parseInt(pos_from[2], 10);
          var z_info_to = parseInt(pos_to[2], 10);

          // We obtain position info packets eth
          data.pos_info_packet.x = x_info;
          data.pos_info_packet.y = pos_from[1];
          data.pos_info_packet.z = Math.abs(pos_from[2]);

          packet_eth.setAttribute('geometry', {primitive: 'box'});
          packet_eth.setAttribute('material', 'color', 'blue');
          packet_eth.setAttribute('scale', {x : 2 , y : 0.25 , z : 1});
          packet_eth.setAttribute('position', data.pos_info_packet);
          packet_eth.setAttribute('visible', false);

          // We obtain position info packets ip
          data.pos_info_packet.x = x_info;
          data.pos_info_packet.y = pos_from[1] + 0.25;
          data.pos_info_packet.z = Math.abs(pos_from[2]);

          packet_ip.setAttribute('geometry', {primitive: 'box'});
          packet_ip.setAttribute('material', 'color', 'yellow');
          packet_ip.setAttribute('scale', {x : 2 , y : 0.25 , z : 1});
          packet_ip.setAttribute('position', data.pos_info_packet);
          packet_ip.setAttribute('visible', false);

          // We obtain position info packets tcp
          data.pos_info_packet.x = x_info;
          data.pos_info_packet.y = pos_from[1] + 0.5;
          data.pos_info_packet.z = Math.abs(pos_from[2]);

          packet_tcp.setAttribute('geometry', {primitive: 'box'});
          packet_tcp.setAttribute('material', 'color', 'red');
          packet_tcp.setAttribute('scale', {x : 2 , y : 0.25 , z : 1});
          packet_tcp.setAttribute('position', data.pos_info_packet);
          packet_tcp.setAttribute('visible', false);

          // We obtain position info packets http
          data.pos_info_packet.x = x_info;
          data.pos_info_packet.y = pos_from[1] + 0.75;
          data.pos_info_packet.z = Math.abs(pos_from[2]);

          packet_http.setAttribute('geometry', {primitive: 'box'});
          packet_http.setAttribute('material', 'color', 'green');
          packet_http.setAttribute('scale', {x : 2 , y : 0.25 , z : 1});
          packet_http.setAttribute('position', data.pos_info_packet);
          packet_http.setAttribute('visible', false);

          el.appendChild(packet_eth);
          el.appendChild(packet_ip);
          el.appendChild(packet_tcp);
          el.appendChild(packet_http);

          //--visibility control of package signs
          var active = 'on'
          var view_info = 'on'

          el.addEventListener('click', function () {
            if (active == 'on' & view_info == 'on') {
              packet_eth.setAttribute('visible', true);
              packet_eth.addEventListener('click', function () {
                //console.log("active ON view ON ETH" );
                poster2.setAttribute('visible', true);
                poster2.setAttribute('text', {width:4, color:'blue', value: 'Protocol ETH\nFrom=> '+info_eth_from+ '\nTo=> '+info_eth_to ,align:'center'});
                poster2.setAttribute('geometry', {primitive:'plane',height: 0.75, width: 2.5});
                poster_behind2.setAttribute('visible', true);
                poster_behind2.setAttribute('text', {width:4, color:'blue', value: 'Protocol ETH\nFrom=> '+info_eth_from+ '\nTo=> '+info_eth_to ,align:'center'});
                poster_behind2.setAttribute('geometry', {primitive:'plane',height: 0.75, width: 2.5});

                active = 'on'
                view_info = 'off'
                  //console.log("Change to => active ON view OFF " );

              });

              if (info_ip_from != "" || info_ip_to != "") {
                packet_ip.setAttribute('visible', true);
                packet_ip.addEventListener('click', function () {
                  //console.log("active ON view ON IP" );
                  poster2.setAttribute('visible', true);
                  poster2.setAttribute('text', {width:4, color:'yellow', value: 'Protocol IP\nFrom=> '+info_ip_from+ '\nTo=> '+info_ip_to ,align:'center'});
                  poster2.setAttribute('geometry', {primitive:'plane',height: 0.75, width: 2.5});
                  poster_behind2.setAttribute('visible', true);
                  poster_behind2.setAttribute('text', {width:4, color:'yellow', value: 'Protocol IP\nFrom=> '+info_ip_from+ '\nTo=> '+info_ip_to ,align:'center'});
                  poster_behind2.setAttribute('geometry', {primitive:'plane',height: 0.75, width: 2.5});

                  active = 'on'
                  view_info = 'off'
                  //console.log("Change to => active ON view OFF " );

                });
              };

              if (data.port_tcp_src != "empty" || data.port_tcp_dst != "empty") {
                packet_tcp.setAttribute('visible', true);
                packet_tcp.addEventListener('click', function () {
                  //console.log("active ON view ON TCP" );
                  poster2.setAttribute('visible', true);
                  poster2.setAttribute('text', {width:4, color:'red', value: 'Protocol TCP\n Port From=> '+data.port_tcp_src+ '\nPort To=> '+data.port_tcp_dst ,align:'center'});
                  poster2.setAttribute('geometry', {primitive:'plane',height: 0.75, width: 2.5});
                  poster_behind2.setAttribute('visible', true);
                  poster_behind2.setAttribute('text', {width:4, color:'red', value: 'Protocol TCP\n Port From=> '+data.port_tcp_src+ '\nPort To=> '+data.port_tcp_dst ,align:'center'});
                  poster_behind2.setAttribute('geometry', {primitive:'plane',height: 0.75, width: 2.5});

                  active = 'on'
                  view_info = 'off'

                    //console.log("Change to => active ON view OFF " );

                });
              }

              if (data.info_http1 != "empty" || data.info_http2 != "empty") {
                packet_http.setAttribute('visible', true);
                packet_http.addEventListener('click', function () {
                  //console.log("active ON view ON HTTP" );
                  poster2.setAttribute('visible', true);
                  poster2.setAttribute('text', {width:4, color:'green', value: 'Protocol HTTP\n '+data.info_http1+ '\n '+data.info_http2 ,align:'center'});
                  poster2.setAttribute('geometry', {primitive:'plane',height: 0.75, width: 2.5});
                  poster_behind2.setAttribute('visible', true);
                  poster_behind2.setAttribute('text', {width:4, color:'green', value: 'Protocol HTTP\n '+data.info_http1+ '\n '+data.info_http2 ,align:'center'});
                  poster_behind2.setAttribute('geometry', {primitive:'plane',height: 0.75, width: 2.5});

                  active = 'on'
                  view_info = 'off'
                  //console.log("Change to => active ON view OFF " );
                });
              }

              //console.log("active visible = " + active);
              active = 'off'
//*****************************************************************************
            }else if (active == 'on' & view_info == 'off') {
              packet_eth.setAttribute('visible', true);
              packet_eth.addEventListener('click', function () {
                //console.log("active ON view  OFF ETH" );
                poster2.setAttribute('visible', false);
                poster_behind2.setAttribute('visible', false);
                active = 'on'
                view_info = 'on'
                //console.log("Change to => active OFF view ON " );
              });

              if (info_ip_from != "" || info_ip_to != "") {
                packet_ip.setAttribute('visible', true);
                packet_ip.addEventListener('click', function () {
                  //console.log("active ON view  OFF IP" );
                  poster2.setAttribute('visible', false);
                  poster_behind2.setAttribute('visible', false);
                  active = 'on'
                  view_info = 'on'
                  //console.log("Change to => active OFF view ON " );
                });
              };

              if (data.port_tcp_src != "empty" || data.port_tcp_dst != "empty") {
                packet_tcp.setAttribute('visible', true);
                packet_tcp.addEventListener('click', function () {
                  //console.log("active ON view  OFF IP" );
                  poster2.setAttribute('visible', false);
                  poster_behind2.setAttribute('visible', false);
                  active = 'on'
                  view_info = 'on'
                  //console.log("Change to => active OFF view ON " );
                });
              }

              if (data.info_http1 != "empty" || data.info_http2 != "empty") {
                packet_http.setAttribute('visible', true);
                packet_http.addEventListener('click', function () {
                  //console.log("active ON view  OFF IP" );
                  poster2.setAttribute('visible', false);
                  poster_behind2.setAttribute('visible', false);
                  active = 'on'
                  view_info = 'on'
                  //console.log("Change to => active OFF view ON " );
                });
              }

//*****************************************************************************
            }else if (active == 'off'& view_info == 'off') {
              packet_eth.setAttribute('visible', false);
              if (info_ip_from != "" || info_ip_to != "") {
                  packet_ip.setAttribute('visible', false);
              }

              if (data.port_tcp_src != "empty" || data.port_tcp_dst != "empty") {
                packet_tcp.setAttribute('visible', false);
              }

              if (data.info_http1 != "empty" || data.info_http2 != "empty") {
                packet_http.setAttribute('visible', false);
              }

              //console.log("active visible = " + active);
              active = 'on'

            }else if (active == 'off'& view_info == 'on') {
              packet_eth.setAttribute('visible', false);

              if (info_ip_from != "" || info_ip_to != "") {
                  packet_ip.setAttribute('visible', false);
              }

              if (data.port_tcp_src != "empty" || data.port_tcp_dst != "empty") {
                  packet_tcp.setAttribute('visible', false);
              }

              if (data.info_http1 != "empty" || data.info_http2 != "empty") {
                packet_http.setAttribute('visible', false);
              }

            //console.log("active visible = " + active);
              active = 'on'
            }
          });
        }
      }
    });

    AFRAME.registerComponent('net-simulator', {
      schema: {
        file: {type: 'string'},
        proto: {type: 'string',default: 'eth'}, //eth or ip
      },

      init: function () {
        //console.log('In to the net-simulator Component');
        let el = this.el
        let data = this.data
        let proto = data.proto

        const request = new XMLHttpRequest();
        const requestURL = data.file;

        request.open('GET', requestURL);
        request.responseType = 'text';
        request.send();

        request.onload = function() {
          const dataTXT = request.response; // We take the response string
          const data = JSON.parse(dataTXT); // We convert it to an object


          let num_keys = Object.keys(data); // We get keys from our dictionary
          let num_packets = num_keys.length
          console.log("Total number of packets = " + num_packets);

          // Array to store all addresses
          let eth_total = [];
          let eth_fin = [];
          let ip_total = [];
          let ip_fin = [];
          var connections = {};
          var connections_eth = {};
          var connections_ip = {};
          var all_packet = {};//Array of objects{package number,dir_src,dir_dst,delay}
          var all_packet_info = {};
          var all_packet_eth = {};
          var all_packet_ip = {};
          var protocols = {};
          var times_packets = {};
          var array_times = [];

          // Function to keep the unique addresses of the arrays
          Array.prototype.unique=function(a){
            return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
          });

          // We go through the JSON file to get the addresses
          for (let i = 0; i < num_packets; i++) {

            for(key in data[i]._source){

            //  console.log("--------------------Paquete " + i + "------------------------");

              //---------- <<<<<TIME RELATIVE >>>>>----------
              let acces3 = data[i]._source[key].frame
              let time_relative = 5000*Object.values(acces3)[6]
              //console.log("Time relative " + i + " => " + time_relative);


              //----------<<<<< Ethernet Address >>>>>----------
              let acces1 = data[i]._source[key].eth

              let eth_dst = Object.values(acces1)[0]//Destination Address
              //console.log("Ethernet Destination Address " + i + " => " + eth_dst);

              let eth_src = Object.values(acces1)[2]//Source Address
              //console.log("Ethernet Source Address " + i + " => " + eth_src);

              // We add to our array all the addresses that we are finding
              eth_total.push(eth_dst)
              eth_total.push(eth_src)
              //console.log("Ethernet TOTAL => " + eth_total);

              eth_fin = eth_total.unique();
              //console.log("Ethernet UNICAS => " + eth_fin)

              let num_nodes_eth = eth_fin.length;
              //console.log("Numero nodos finales Ethernet => " + num_nodes_eth)

              // We create a list of connections with activity
              var comparison = [eth_src,eth_dst];
              var order = comparison.sort(); // we order alphabetically
              var first_dir = order[0];
              var second_dir = order[1];

              connections_eth[first_dir+ '-' + second_dir] = {from: eth_src, to: eth_dst}

              // We create a list of Packet Ethernet
              all_packet_eth['packet_' + i] = {from:eth_src, to: eth_dst, delay:time_relative}

              //----------<<<<< IP Address >>>>>----------
              let acces2 = data[i]._source[key].ip

              if (acces2 != undefined || acces2 != null) {
                //Destination Address
                let ip_dst = Object.values(acces2)[14]//Destination Address
                //console.log("Ip Address Destination " + i + " => " + ip_dst);

                let ip_src = Object.values(acces2)[13]//Source Address
                //console.log("Ip Source Address " + i + " => " + ip_src);

                ip_total.push(ip_dst)
                ip_total.push(ip_src)
                //console.log("IP TOTAL => " + ip_total);

                ip_fin = ip_total.unique();
                //console.log("IP UNICAS => " + ip_fin);;

                let num_nodes_ip = ip_fin.length;

                // We create a list of connections with activity
                var comparison = [ip_src,ip_dst];
                var order = comparison.sort(); // we order alphabetically
                var first_dir = order[0];
                var second_dir = order[1];

                connections_ip[first_dir+ '-' + second_dir] = {from: ip_src, to: ip_dst}

                // We create a list of Packet IP
                all_packet_ip['packet_' + i] = {from:ip_src, to: ip_dst, delay:time_relative}

              }

            }
          }

//---------------------------- Create NODES -----------------------------------

          var scene = document.querySelector('a-scene');
          var nodes = {}
          var nodesP = []// ARRAY [nodo, coordenada]
          var position_nodes = []

          // It depends on whether we want to analyze the ETHERNET or IP layer
          if (proto == "ip") {
            nodes = ip_fin // case to IP Address
          }else {
            nodes = eth_fin
          }

          //console.log("NODES " + nodes);
          var node_pos = '0 0.5 0' // Position initial for the first node
          var poster_pos = '0 2 0'
          var increase = Math.PI * 2 / nodes.length ;
          angle = 0


          for (let i = 0; i < nodes.length; i++) {

            var generarColor = () => "#000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16))

            var entity = document.createElement('a-entity');
            var poster = document.createElement('a-entity');
            var poster_behind = document.createElement('a-entity');

            entity.setAttribute('node','obj_type','computer');
            entity.setAttribute('node','color',generarColor());
            entity.setAttribute('node','id',nodes[i]);

            // Calculate the X and Z coordinates to form a circle
            var connect_pos = []
            var change_pos = node_pos.split(" ")

            // Change the position X
            var pos_x = parseInt(change_pos[0])
            var pos_x = nodes.length*Math.cos(angle);

            // Change the position Z
            var pos_z = parseInt(change_pos[2])
            var pos_z = nodes.length*Math.sin(angle);
            pos_z = Math.round(pos_z);

            // We pass each component of position to string
            var coorX = pos_x;
            var cx = coorX.toString();

            var coorY = change_pos[1];
            var cy = coorY.toString();

            var coorZ = pos_z;
            var cz = coorZ.toString();

            // We concatenate all of them into a single string
            var node_pos = cx.concat(' ', cy.concat(' ',cz))
            //var node_pos2 = cx.concat(',', cy.concat(',',cz))

            //Increase the angle
            angle += increase;

            // Add the position to the node
            entity.setAttribute('node','position',node_pos);
            //console.log('NODE Position = ' + node_pos);

            // Add each coordinate to its node
            nodesP.push(nodes[i])
            position_nodes.push(node_pos)

            // Add to the scene
            scene.appendChild(entity);

            //---- Introduce poster of each Package ----
            var posterY_node = change_pos[1] * 6;
            var posterY_node_behind = change_pos[1] * 6;
            //console.log('POSITION Y = ' + posterY);

            var py_node = posterY_node.toString();
            var poster_pos_node = cx.concat(' ', py_node.concat(' ',cz))

            var py_node_behind = posterY_node_behind.toString();
            var poster_pos_node_behind = cx.concat(' ', py_node_behind.concat(' ',cz))

            poster.setAttribute('poster','position',poster_pos_node);
            poster.setAttribute('poster','color','lightgrey');
            poster.setAttribute('poster','text',nodes[i]);

            poster_behind.setAttribute('poster','position',poster_pos_node_behind);
            poster_behind.setAttribute('poster','color','lightgrey');
            poster_behind.setAttribute('poster','text',nodes[i]);
            poster_behind.setAttribute('rotation', {x: 180, y: 0, z: 180});

            // Add to the scene
            scene.appendChild(poster);
            scene.appendChild(poster_behind);

          }

//-------------------------- Create CONNECTIONS --------------------------------

          // It depends on whether we want to analyze the ETHERNET or IP layer
          if (proto == "ip") {
            connections = connections_ip // case to IP Address
          }else {
            connections = connections_eth
          }

          for (let i = 0; i < Object.keys(connections).length; i++) {

            var entity2 = document.createElement('a-entity');

            var key_connections = Object.keys(connections)
            //console.log("Key => " + key_connections)

            var prop = connections[key_connections[i]];
            // To obtain the value of the property from and to
            //console.log("Direccion From => " + prop.from)
            // console.log("Direccion To => " + prop.to)

            entity2.setAttribute('connection','from',prop.from);
            entity2.setAttribute('connection','to',prop.to);
            // Add to the scene
            scene.appendChild(entity2);
          }

//-------------------------- Create PACKETS -----------------------------------

          // It depends on whether we want to analyze the ETHERNET or IP layer
         if (proto == "ip") {
            all_packet = all_packet_ip // case to IP Address
            all_packet_info = all_packet_eth
          }else {
            all_packet = all_packet_eth
            all_packet_info = all_packet_ip
          }

          console.log("ALL_PACKET %O:",all_packet)

          console.log("tamaño ip =>" + Object.keys(all_packet_ip).length);
          console.log("tamaño eth =>" + Object.keys(all_packet_eth).length);

          //console.log("tamaño protocolo =>" + Object.keys(all_packet).length);
          var arrayFinal = [];
          var packet_color = "red";

          var eth_dst_data = "empty";
          var eth_src_data = "empty";
          var ip_dst_data = "empty";
          var ip_src_data = "empty";
          var tcp_src = "empty";
          var tcp_dst = "empty";
          var in_http = "";
          var http_method = "empty";
          var http_url = "empty";
          var petition ="";

          for (let i = 0; i < data.length; i++) {

            var entity3 = document.createElement('a-entity');

            //----------<<<<< IP Address >>>>>----------
            let acces_ip = data[i]._source[key].ip

            if (acces_ip) {
              ip_dst_data = Object.values(acces_ip)[14]//Destination Address
              //console.log("Ip Address Destination " + i + " => " + ip_dst_data);

              ip_src_data = Object.values(acces_ip)[13]//Source Address
              //console.log("Ip Source Address " + i + " => " + ip_src_data);
              entity3.setAttribute('packet','info_from_ip',ip_src_data);
              entity3.setAttribute('packet','info_to_ip',ip_dst_data);

            }else{
              //console.log('SALTAMOS ' + i);
            }


            //----------<<<<< Ethernet Address >>>>>----------
            let acces_eth = data[i]._source[key].eth
            if (acces_eth){
              //!= undefined || acces_eth != null) {
              eth_dst_data = Object.values(acces_eth)[0]//Destination Address
              //console.log("Ethernet Destination Address " + i + " => " + eth_dst_data);

              eth_src_data = Object.values(acces_eth)[2]//Source Address
              //console.log("Ethernet Source Address " + i + " => " + eth_src_data);

            }else {
              eth_dst_data = "empty"
              eth_src_data = "empty"
            }


            //----------<<<<< Port TCP >>>>>----------
            let acces_tcp = data[i]._source[key].tcp

            if (acces_tcp) {
              //Destination Port
              tcp_dst = Object.values(acces_tcp)[2]
              //console.log("TCP Destination Port " + i + " => " + tcp_dst);
              //Source Port
              tcp_src = Object.values(acces_tcp)[0]
              //console.log("TCP Source Port " + i + " => " + tcp_src);

            }else {
              tcp_dst = "empty"
              tcp_src = "empty"
            }


            //----------<<<<< DATOS HTTP >>>>>----------
            let acces_http = data[i]._source[key].http

            if (acces_http != undefined) {
              petition = Object.entries(acces_http)[2][0] //(http.request.line o http.response.line)
              //console.log("petition :"+ petition)
            }
            //console.log("acces_http %O:",acces_http)

            if (acces_http && petition == "http.request.line" ) {
              //Destination Port
              in_http = Object.values(acces_http)[0]
              http_method = Object.values(in_http)[1] //GET
              //console.log("request.method " + i + " => " + http_method);
              //Source Port
              http_url = Object.values(in_http)[2]  ///download.html
              //console.log("request.uri " + i + " => " + http_url);

            }else if (acces_http && petition == "http.response.line") {
              in_http = Object.values(acces_http)[0]
              http_method = Object.values(in_http)[3]// OK
              //console.log("request.method " + i + " => " + http_method);
              //Source Port
              http_url = Object.values(in_http)[2] // 200
              //console.log("request.uri " + i + " => " + http_url);

            }else {

                http_method = "empty"
                http_url = "empty"
            }

// Create an array to use it in the setInterval ---------------------------
            //---------- <<<<<TIME RELATIVE >>>>>----------
            let acces_time = data[i]._source[key].frame
            let time_relative_data = 5000*Object.values(acces_time)[6]
            //console.log("Time relative " + i + " => " + time_relative_data);


            var id_packet = "packet_" + i
            //console.log(id_packet);

            times_packets = {time_relative_data, id_packet}
            array_times.push(times_packets)

            //let claves = Object.values(array_times);
            //console.log("times_packets  %O= ", claves)
            //-----------------------------------------------------------------

            //---------- <<<<< PROTOCOLS >>>>>----------
            let acces4 = data[i]._source[key].frame
            let all_protocols = Object.values(acces4)[12]
            var arrayProtocols = all_protocols.split(":");
            //console.log("arrayProtocols " + i + " = "+ arrayProtocols);
            //eth", "ethertype", "ip", "tcp", "http"
            for (let i = 0; i < arrayProtocols.length; i++) {
              if (arrayProtocols[i] == "eth") {
                arrayFinal.push("eth")
                packet_color = "blue"
              }else if (arrayProtocols[i] == "ip") {
                arrayFinal.push("ip")
                packet_color = "yellow"
              }else if (arrayProtocols[i] == "tcp") {
                arrayFinal.push("tcp")
                packet_color = "red"
              }else if (arrayProtocols[i] == "http") {
                arrayFinal.push("http")
                packet_color = "green"
              }
            }

            protocols["Packet "+ i +  ":"] = {Protocolo: arrayFinal }
            //console.log("objetos %O:",protocols)

            var LastValue = arrayFinal[arrayFinal.length - 1]
            //console.log("Last Value" + i + " => " + LastValue);

            entity3.setAttribute('packet','id',id_packet);
            entity3.setAttribute('packet','start',time_relative_data);
            entity3.setAttribute('packet','color',packet_color);
            entity3.setAttribute('packet','duration','5000');
            entity3.setAttribute('packet','LastValue',LastValue);
            entity3.setAttribute('packet','class', 'all_packets')
            entity3.setAttribute('packet','proto',proto);

            entity3.setAttribute('packet','info_from_eth',eth_src_data);
            entity3.setAttribute('packet','info_to_eth',eth_dst_data);
            entity3.setAttribute('packet','port_tcp_dst',tcp_dst);
            entity3.setAttribute('packet','port_tcp_src',tcp_src);

            entity3.setAttribute('packet','info_http1',http_method);
            entity3.setAttribute('packet','info_http2',http_url);

            scene.appendChild(entity3);

          }

        }

      }
    });
