let form = document.getElementById('create-form');
let goal = document.getElementById('create-goal');
let needed = document.getElementById('create-needed');
let date = document.getElementById('create-date');
let deleteForm = document.getElementById('delete-form');
let deleteInput = document.getElementById('delete-goal');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let maBod = {
        goal: goal.value,
        needed: needed.value,
        finished: date.value
    }

    axios.post('/create-goal', maBod)
    .then((response) => {
        loadGoalsToDom(response.data);
    })
    .catch((error) => {
        console.log(error);
    })

})

axios.get('/goals')
.then((response) => {
    loadGoalsToDom(response.data);
})
.catch((error) => {
    console.log(error);
});

deleteForm.addEventListener('submit', (event) => {
    event.preventDefault();


    axios.delete(`/delete-goal/${deleteInput.value}`)
    .then((response) => {
        loadGoalsToDom(response.data);
        alert('Congratulations on completing your goal!')
    })
    .catch((error) => {
        console.log(error);
    })

})    

function loadGoalsToDom(goalsArray) {

    document.getElementById('goals-display').innerHTML = ''

   for (let i = 0; i < goalsArray.length; i++) {
    let containerDiv = document.createElement('div');
    let goalheading = document.createElement('h4');
    let thingsNeeded = document.createElement('p');
    let expectedDate = document.createElement('p');

    containerDiv.appendChild(goalheading);
    containerDiv.appendChild(thingsNeeded);
    containerDiv.appendChild(expectedDate);

    goalheading.innerHTML = 'Goal:<br>' + goalsArray[i].goal;
    thingsNeeded.innerHTML = 'Things Needed to Reach Goal:<br>' + goalsArray[i].needed;
    expectedDate.innerHTML = "Date Expected to Reach Goal:<br>" + goalsArray[i].finished

    document.getElementById('goals-display').appendChild(containerDiv);
   }
}