import htmlContent from "./content.html";
import { initCopyButton } from "./downloader";

function checkForElement() {
	const targetElement = document.querySelector("div.icon-details-preview-rendering");
	if (targetElement && !targetElement.hasAttribute("facopy")) {
		const wrapper = document.createElement("facopy");
		wrapper.innerHTML = htmlContent;
		targetElement.appendChild(wrapper);

		targetElement.setAttribute("facopy", "true");
		initCopyButton();
	}
}
checkForElement();

const observer = new MutationObserver(mutations => {
	mutations.forEach(mutation => {
		if (mutation.type === "childList") {
			mutation.addedNodes.forEach(addedNode => {
				if (addedNode.nodeType === 1) {
					checkForElement();
				}
			});
		}
	});
});
observer.observe(document.body, { childList: true, subtree: true });