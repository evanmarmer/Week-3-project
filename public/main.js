let form = document.getElementById('create-form');
let goal = document.getElementById('create-goal');
let needed = document.getElementById('create-needed');
let date = document.getElementById('create-date');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let maBod = {
        goal: goal.value,
        needed: needed.value,
        finished: date.value
    }

    axios.post('/create-goal', maBod)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    })

})