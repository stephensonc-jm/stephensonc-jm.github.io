
document.getElementById("btnclose").addEventListener("click", closeModal);
document.getElementById("btnStart").addEventListener("click", StartGame);

function closeModal() {
    let ModalForm = document.getElementById('dvModal');
    ModalForm.style.display = "none";
    ModalForm.close();
}

function StartGame() {
    let ModalForm = document.getElementById('dvModal')
    ModalForm.style.display = "none";   
  
    let Quiz = document.getElementById('dvQuiz')
    let HeaderInfo = document.getElementById('dvHeaderInfo')
    let Frame = document.getElementById('iframeQuiz')

    HeaderInfo.style.display = "none";   
    Quiz.style.display = "block"   
    Quiz.style.height = Frame.contentWindow.document.body.scrollHeight + 'px';
}
