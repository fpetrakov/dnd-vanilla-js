const main = document.querySelector("main");

main.addEventListener("dragstart", callIfTargetIsColumn(handleDragStart));
main.addEventListener("dragend", callIfTargetIsColumn(handleDragEnd));
main.addEventListener("dragenter", callIfTargetIsColumn(handleDragEnter));
main.addEventListener("dragleave", callIfTargetIsColumn(handleDragLeave));
main.addEventListener("dragover", callIfTargetIsColumn(handleDragOver));
main.addEventListener("drop", callIfTargetIsColumn(handleDrop));

let currentDraggedElement = null;

function callIfTargetIsColumn(fn) {
	return event => {
		if (!event.target.className === "column") return;
		fn(event);
	};
}

function handleDragStart({ target, dataTransfer }) {
	target.style.opacity = "0.4";

	currentDraggedElement = target;

	dataTransfer.effectAllowed = "move";
	dataTransfer.setData("text/html", target.innerHTML);
}

function handleDragEnd({ target }) {
	target.style.opacity = "1";
	target.classList.remove("over");
}

function handleDragEnter({ target }) {
	target.classList.add("over");
}

function handleDragLeave({ target }) {
	target.classList.remove("over");
}

function handleDragOver(e) {
	e.preventDefault();
}

function handleDrop(e) {
	e.stopPropagation();

	if (currentDraggedElement === e.target) return;

	currentDraggedElement.innerHTML = e.target.innerHTML;
	e.target.innerHTML = e.dataTransfer.getData("text/html");
	e.target.classList.remove("over");
}
