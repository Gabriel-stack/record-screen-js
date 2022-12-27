export default class Style {
	static InitialStyleButtons(record, stop) {
		record.style.backgroundColor = "#18e370";
		record.innerHTML = "Gravar";
		record.style.cursor = "pointer";
		record.disabled = false;
		stop.disabled = true;
		stop.style.cursor = "not-allowed";
	}
	static ChangeStyleButtons(record, stop) {
		record.style.backgroundColor = "red";
		record.innerHTML = "Gravando✨...";
		record.style.cursor = "not-allowed";
		record.disabled = true;
		stop.disabled = false;
		stop.style.cursor = "pointer";
	}
}