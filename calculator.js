let total = 0;
let buffer = "0";
let previousOperator;
let screen = document.querySelector(".screen");

function rerender() {
	screen.innerText = buffer;
}

function handleNumber(value) {
	if (buffer === "0") {
		buffer = value;
	} else {
		buffer += value;
	}
}

function flushOperation(intBuffer) {
	if (previousOperator === "+") {
		total += intBuffer;
	} else if (previousOperator === "-") {
		total -= intBuffer;
	} else if (previousOperator === "*") {
		total *= intBuffer;
	} else {
		total /= intBuffer;
	}
}

function handleMath(value) {
	const intBuffer = parseInt(buffer);
	if (total === 0) {
		total = intBuffer;
	} else {
		flushOperation(intBuffer);
	}
	previousOperator = value;
	buffer = "0";
}

function handleSymbol(value) {
	switch (value) {
		case "C":
			buffer = "0";
			total = 0;
			previousOperator = null;

			break;
		case "=":
			if (previousOperator === null) {
				return;
			}
			flushOperation(parseInt(buffer));
			previousOperator = null;
			buffer = "" + total;
			console.log(total);
			total = 0;
			break;
		case "Del":
			if (buffer.length === 1) {
				buffer = "0";
			} else {
				buffer = buffer.substring(0, buffer.length - 1);
			}
			break;
		default:
			handleMath(value);
			break;
	}
}

function buttonClick(value) {
	if (isNaN(parseInt(value))) {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}
	rerender();
}

document
	.querySelector(".calc-buttons")
	.addEventListener("click", function (event) {
		buttonClick(event.target.innerText);
	});
