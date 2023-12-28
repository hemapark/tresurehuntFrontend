const api = "https://740f-2409-40c0-104c-ef28-4e41-df44-1a88-1ccd.ngrok-free.app"

function login(){
    const teamId = document.getElementById('teamId').value;
    const password = document.getElementById('password').value;
    callLoginApi(teamId, password)
}

function submitAnswer(){
    var inputAnswer = document.getElementById('inputAnswer').value;
    callAnswerApi(inputAnswer)
}

function callAnswerApi(inputAnswer){
    const taskId = sessionStorage.getItem('task_id');
    const teamID = sessionStorage.getItem('teamID');
    const password = sessionStorage.getItem('password');

    const apiUrl = api+'/teams/ans/'+teamID;

    const requestBody = {
        "password":password,
        "task_id": taskId,
        "input_answer": inputAnswer,
      };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        if (data["answerStatus"]){
            sessionStorage.setItem('task_id',+taskId+1);
            if (sessionStorage.getItem('task_id') < 8){
                callApi(teamID,password,sessionStorage.getItem('task_id'))
                setInterval(() => {
                    window.location.href = 'task.html'; 
                }, 300);
            }
            else{
                window.location.href = 'treasure.html';
            }
        }
        else{
            displayErrorAlert("Wrong Answer");
        }
    })
    .catch(error => console.error('Error:', error));

}

function callLoginApi(teamID, password){
    const apiUrl = api + '/teams/login/'+teamID
    const requestBody = {
        "password":password,
      };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        if (data["login"]){
            sessionStorage.setItem('teamID', teamID);
            sessionStorage.setItem('password', password);
            sessionStorage.setItem('task_id', 1);
            callApi(teamID, password,sessionStorage.getItem('task_id'))
            setInterval(() => {
                window.location.href = 'task.html'; 
            }, 300);
        }
        else{
            displayErrorAlert("Invalid credentials");
        }
    })
    .catch(error => {
        console.error('Error:', error)
    });
}

function callApi(teamID, password='', taskId='1') {
    const apiUrl = api + '/teams/ques/'+teamID;

    const requestBody = {
        "password":password,
        "task_id": taskId,
      };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem('question', data["question"]);
        sessionStorage.setItem('ansLen', data["ansLen"]);
    })
    .catch(error => {
        console.error('Error:', error)});
}

function displayErrorAlert(message) {
    var alertElement = document.getElementById("error-alert");
    alertElement.textContent = message;
    alertElement.style.display = "block";
    setTimeout(function () {
        alertElement.style.display = "none";
    }, 3000);
}
