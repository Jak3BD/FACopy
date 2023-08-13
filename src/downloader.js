function getParams() {
	const uri = window.location.href;
	const params = new URLSearchParams(new URL(uri).search);

	return {
		name: uri.split("/").pop().split("?")[0],
		family: params.get("f"),
		style: params.get("s")
	}
}

function createURI(name, family, style) {
	const root = "https://site-assets.fontawesome.com/releases/v6.4.2/svgs/";

	var uri = new URL(`${style}/${name}.svg`, root);

	switch (family) {
		case "brands":
			uri = new URL(`${family}/${name}.svg`, root);
			break;

		case "classic":
			uri = new URL(`${family}-${style}/${name}.svg`, root);
			break;
	}

	return uri.href;
}

export function initCopyButton() {
	const facopyButton = document.getElementById("facopyButton");
	const facopySuccess = document.getElementById("facopySuccess");

	facopyButton.addEventListener("click", async () => {
		try {
			const params = getParams();
			const uri = createURI(params.name, params.family, params.style);

			const res = await fetch(uri);
			if (res.status !== 200) {
				throw new Error("Response status not expected: " + res.status);
			}

			const txt = await res.text();
			const svg = txt.replace(/<!--!.*?-->/g, "");
			await navigator.clipboard.writeText(svg);

			facopySuccess.classList.add("facopySuccess");
			setTimeout(() => {
				facopySuccess.classList.remove("facopySuccess");
			}, 2000);

		} catch (e) {
			window.alert(`An error has occurred: ${e}`);
		}
	});
}