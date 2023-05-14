export const SVGElement = (link, className) => {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.classList.add(className);
	const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	use.setAttributeNS(
		'http://www.w3.org/1999/xlink',
		'xlink:href',
		`./assets/images/sprite.svg#${link}`,
	);
	svg.appendChild(use);
	return svg;
};

export const toMinSec = duration => {
	const min = Math.floor(duration / 60);
	const sec = Math.floor(duration % 60);

	return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
};
