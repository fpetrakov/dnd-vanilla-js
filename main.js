const main = document.querySelector("main");

main.addEventListener("dragstart", e =>
	callIfTargetIsColumn(e, handleDragStart),
);
main.addEventListener("dragend", e => callIfTargetIsColumn(e, handleDragEnd));
main.addEventListener("dragenter", e =>
	callIfTargetIsColumn(e, handleDragEnter),
);
main.addEventListener("dragleave", handleDragLeave);
main.addEventListener("dragover", handleDragOver);
main.addEventListener("drop", handleDrop);

let currentDraggedElement = null;

function callIfTargetIsColumn(event, fn) {
	if (!event.target.className === "column") return;
	fn(event);
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
