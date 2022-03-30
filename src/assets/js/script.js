const url = 'http://localhost:3333'
const tableData = document.querySelector('#users-body')

const headerPost = {
   method: 'POST',
   headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   },
}

const getAll = async () => {
   const users = await fetch(`${url}/user`).then((res) => res.json());


   console.log(users);

   mountResponse(users)
}

const search = async () => {
   const nameInput = document.querySelector('#nome')
   const emailInput = document.querySelector('#email')

   const req = {
      ...headerPost,
      body: JSON.stringify({
         name: nameInput.value,
         email: emailInput.value
      })
   }

   const users = await fetch(`${url}/user/search`, req).then(res => res.json());

   mountResponse(users)
}

const filterButton = document.querySelector('#filter');

filterButton.addEventListener('click', () => search())

const mountResponse = (data) => {
   let res = "";

   data.forEach((user) => {
      res += `
         <tr>
            <th scope="row">${user.id}</th>
            <td>${user.name}</td>
            <td>${user.email}</td>
         </tr>
      `
   })

   tableData.innerHTML = res;
}