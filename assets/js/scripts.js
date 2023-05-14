import { data } from './data.js';
import { SVGElement } from './utils.js';

const AudioController = {
	state: {
		audioList: [],
	},
	init() {
		this.initVariables();
		this.renderAudioList();
	},
	initVariables() {
		this.audioList = document.querySelector('.items');
	},
	loadAudioData(audio) {
		const item = document.createElement('div');
		item.classList.add('item');

		const itemImage = document.createElement('div');
		itemImage.classList.add('item-image');
		itemImage.style.backgroundImage = `url(./assets/images/${audio.link.split('.')[0]}.jpg)`;
		item.append(itemImage);

		const itemTitle = document.createElement('div');
		itemTitle.classList.add('item-titles');
		const itemGroup = document.createElement('h2');
		itemGroup.classList.add('item-group');
		itemGroup.textContent = audio.group;
		const itemTrack = document.createElement('h3');
		itemTrack.classList.add('item-track');
		itemTrack.textContent = audio.track;
		itemTitle.append(itemGroup, itemTrack);
		item.append(itemTitle);

		const itemDuration = document.createElement('p');
		itemDuration.classList.add('item-duration');
		itemDuration.textContent = audio.duration;
		item.append(itemDuration);

		const itemGenre = document.createElement('p');
		itemGenre.classList.add('item-genre');
		itemGenre.textContent = audio.genre;
		item.append(itemGenre);

		const itemButton = document.createElement('button');
		itemButton.classList.add('item-play');
		const iconPlay = SVGElement('play', 'icon-play');
		itemButton.append(iconPlay);
		item.append(itemButton);

		this.audioList.append(item);
	},
	renderAudioList() {
		data.forEach(element => {
			const audio = new Audio(`./assets/audio/${element.link}`);
			audio.addEventListener('loadeddata', () => {
				const newElement = { ...element, duration: audio.duration, audio: audio };
				this.state.audioList.push(newElement);
				this.loadAudioData(newElement);
			});
		});
	},
};

AudioController.init();

console.log('State:', AudioController.state);
