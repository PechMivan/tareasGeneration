async function getUsers(){
  let { data }  = await getUsersFromLocalStorage();
  // Si no hay información en el LocalStorage, busca en la API de reqres.
  if(data === undefined){
    ({ data } = await getUsersFromAPI("https://reqres.in/api/users?delay=3"));
  }
  return data;
}

async function getUsersFromLocalStorage(){
  const timeWhenSaved = localStorage.getItem("time");
  // Si el tiempo es menor a un minuto, devuelve los datos del LocalStore
  if( (new Date().getTime() - timeWhenSaved) < 60000 )
    return JSON.parse(localStorage.getItem("users"));
  return {}; // Si no, devuelve un objeto vacío para evitar problemas de desestructuración.
}

async function getUsersFromAPI(url) {
    try {
        const resolve = await fetch(url);
        const users = await resolve.json();
        // Guarda los datos y la hora en el LocalStorage.
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("time", new Date().getTime());
        return users;
    } catch (error) {
        console.warn(error);
        return null;
    }
}

async function showUsers() {
    const data = await getUsers();
    printData(data);
}

function printData(data) {
    const info = document.getElementById("userTable");
    let str = `<table class="table">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">e-mail</th>
        <th scope="col" class="img">Image</th>
      </tr>
    </thead>
    <tbody>`;

    data.forEach(user => {
       str += `<tr class="${paintRow(user.id)}">
        <th scope="row">${user.id}</th>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td class="img"><img src="${user.avatar}"></td>
      </tr>`
    });

    str += `</tbody>
    </table>`;

    info.innerHTML = str;
}

function paintRow(number){
    return number % 2 == 0 ? "table-success" : "table-light";
}