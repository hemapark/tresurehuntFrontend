document.addEventListener('DOMContentLoaded', () => {
    const teamIdCointainerContainer = document.getElementById('displayTeamID');
    teamIdCointainerContainer.innerText = `Team ${sessionStorage.getItem('teamID')}`;
    const questionContainer = document.getElementById('question');
    questionContainer.innerText = `Task ${sessionStorage.getItem('task_id')} : ${sessionStorage.getItem('question')} \n Ans Length : ${sessionStorage.getItem('ansLen')}`;
});
