const flashError = document.querySelector('#flash-error');
const flashSuccess = document.querySelector('#flash-success');


alertify.set('notifier','position', 'bottom-center');

if (flashError && flashError.innerText.length > 0){
    alertify.notify(flashError, 'error', 5, function(){  console.log('dismissed'); });
} else if (flashSuccess && flashSuccess.innerText.length > 0) {
    alertify.notify(flashSuccess, 'success', 5, function(){  console.log('dismissed'); })
}
