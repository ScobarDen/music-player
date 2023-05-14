import { data } from './data.js';
import { SVGElement, toMinSec } from './utils.js';

const AudioController = {
	state: {
		audioList: [],
		current: {},
	},
	init() {
		this.initVariables();
		this.renderAudioList();
		this.initEvents();
	},
	initVariables() {
		this.audioList = document.querySelector('.items');
		this.currentItem = document.querySelector('.current');
	},
	initEvents() {
		this.audioList.addEventListener('click', this.handleItemClick.bind(this));
	},

	setCurrentItem(itemId) {
		const current = this.state.audioList.find(item => item.id === Number(itemId));
		if (!current) return;
		this.state.current = current;
		const currentItem = this.renderCurrentItem();
		this.currentItem.innerHTML = '';
		this.currentItem.append(...currentItem);
	},

	handleItemClick({ target }) {
		const { id } = target.dataset;
		if (!id) return;
		this.setCurrentItem(id);
	},

	renderAudioItem(audio) {
		const item = document.createElement('div');
		item.classList.add('item');
		item.dataset.id = audio.id;

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
		itemDuration.textContent = toMinSec(audio.duration);
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

		return item;
	},

	renderCurrentItem() {
		const { id, link, genre, track, group, year, duration } = this.state.current;

		const currentImage = document.createElement('div');
		currentImage.classList.add('current-image');
		currentImage.style.backgroundImage = `url(./assets/images/${link.split('.')[0]}.jpg)`;

		const currentInfo = document.createElement('div');
		currentInfo.classList.add('current-info');

		const currentInfoTop = document.createElement('div');
		currentInfoTop.classList.add('current-info__top');
		currentInfo.append(currentInfoTop);
		const currentInfoTitles = document.createElement('div');
		currentInfoTitles.classList.add('current-info__titles');
		const currentInfoGroup = document.createElement('h2');
		currentInfoGroup.classList.add('current-info__group');
		currentInfoGroup.textContent = group;
		const currentInfoTrack = document.createElement('h3');
		currentInfoTrack.classList.add('current-info__track');
		currentInfoTrack.textContent = track;
		currentInfoTitles.append(currentInfoGroup, currentInfoTrack);
		const currentInfoYear = document.createElement('div');
		currentInfoYear.classList.add('current-info__year');
		currentInfoYear.textContent = year;
		currentInfoTop.append(currentInfoTitles, currentInfoYear);
		currentInfo.append(currentInfoTop);

		const controls = document.createElement('div');
		controls.classList.add('controls');
		const controlsButtons = document.createElement('div');
		controlsButtons.classList.add('controls-buttons');
		controls.append(controlsButtons);
		const controlsPrev = document.createElement('button');
		controlsPrev.classList.add('controls-button', 'controls-prev');
		controlsButtons.append(controlsPrev);
		const iconPrev = SVGElement('arrow', 'icon-arrow');
		controlsPrev.append(iconPrev);
		const controlsPlay = document.createElement('button');
		controlsPlay.classList.add('controls-button', 'controls-play');
		controlsButtons.append(controlsPlay);
		const iconPause = SVGElement('pause', 'icon-pause');
		const iconPlay = SVGElement('play', 'icon-play');
		controlsPlay.append(iconPause, iconPlay);
		const controlsNext = document.createElement('button');
		controlsNext.classList.add('controls-button', 'controls-next');
		controlsButtons.append(controlsNext);
		const iconNext = SVGElement('arrow', 'icon-arrow');
		controlsNext.append(iconNext);
		currentInfo.append(controls);

		const controlsProgress = document.createElement('div');
		controlsProgress.classList.add('controls-progress');
		const progress = document.createElement('div');
		progress.classList.add('progress');
		controlsProgress.append(progress);
		const progressCurrent = document.createElement('div');
		progressCurrent.classList.add('progress-current');
		progress.append(progressCurrent);
		const timeline = document.createElement('div');
		timeline.classList.add('timeline');
		const timelineStart = document.createElement('span');
		timelineStart.classList.add('timeline-start');
		timelineStart.textContent = '00:00';
		const timelineEnd = document.createElement('span');
		timelineEnd.classList.add('timeline-end');
		timelineEnd.textContent = toMinSec(duration);
		timeline.append(timelineStart, timelineEnd);
		controlsProgress.append(timeline);

		currentInfo.append(controlsProgress);

		return [currentImage, currentInfo];
	},

	loadAudioData(item) {
		this.audioList.append(item);
	},
	renderAudioList() {
		data.forEach((element, index) => {
			const audio = new Audio(`./assets/audio/${element.link}`);
			audio.addEventListener('loadeddata', () => {
				const newElement = { ...element, duration: audio.duration, audio: audio };
				this.state.audioList.push(newElement);
				this.loadAudioData(this.renderAudioItem(newElement));
				if (index === 0) {
					this.state.current = newElement;
					this.setCurrentItem(newElement.id);
				}
			});
		});
	},
};

AudioController.init();
