function isCardNumberValid(number) {
	// normally we would contact a credit card service...but we don't know how to do that yet. So to keep things simple we will only accept one number
	return number === '1234123412341234'
}
function displayError(msg) {
	// display error message
	document.querySelector('.errorMsg').innerHTML = msg
}
function submitHandler(event) {
	event.preventDefault()
	let errorMsg = ''
	console.log(this.cardNum.value)
	// clear any previous errors
	displayError('')
	// check credit card number
	if (isNaN(this.cardNum.value)) {
		// it is not a valid number
		errorMsg += 'Card number is not a valid number\n'
	} else if (!isCardNumberValid(this.cardNum.value)) {
		// it is a number, but is it valid?
		errorMsg += 'Card number is not a valid card number\n'
	}

    const expMonth = parseInt(this.mm.value, 10);
    const expYear = parseInt(this.yy.value, 10);

    if(!expMonth || !expYear || expMonth < 1 || expMonth > 12){
        errorMsg += 'Invalid expiration date format\n';
    }else{
        const now = new Date();
        const expiryDate = new Date('20' +expYear, expMonth, 0);
        if(expiryDate < now){
            errorMsg += 'Card has expired\n';
        }
    }

	if (errorMsg !== '') {
		// there was an error. stop the form and display the errors.
		displayError(errorMsg)
		return false
	}
	return true
}

document.querySelector('.form-container').addEventListener('submit', submitHandler);