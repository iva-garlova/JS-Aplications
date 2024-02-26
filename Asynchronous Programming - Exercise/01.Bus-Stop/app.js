function getInfo() {
   let stopIdRef = document.getElementById('stopId');
   let stopId = stopIdRef.value;
   let stopNameRef = document.getElementById('stopName');
   let busesRef = document.getElementById('buses');

   stopNameRef.textContent = '';
   busesRef.innerHTML = '';

   let url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

   let request = fetch(url);
   request.then(response => {
    response.json().then(data => {
        stopNameRef.textContent = data.name;
        appendChild(Object.entries(data.buses));


    }).catch(err => {
        stopNameRef.textContent = 'Error';
    })
   }).catch(err => {
    stopNameRef.textContent = 'Error';
   })

function appendChild(data){
    for([bus, time] of data){
let li = document.createElement('li');
li.textContent = `Bus ${bus} arrives in ${time} minutes`;
busesRef.appendChild(li);
    }
}


}