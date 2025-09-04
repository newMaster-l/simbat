// Модалка и музыка
var modal = document.getElementById('musicModal');
var playButton = document.getElementById('playMusic');
var audio = document.getElementById('backgroundMusic');
const musicBtn = document.getElementById('musicToggle');

playButton.onclick = function () {
	audio.play();
	closeModal();
};

let isPlaying = false;

musicBtn.addEventListener('click', () => {
	if (isPlaying) {
		audio.pause();
		musicBtn.textContent = '🔇';
	} else {
		audio.play();
		musicBtn.textContent = '🔊';
	}
	isPlaying = !isPlaying;
});

function closeModal() {
	modal.style.display = 'none';
	document.body.classList.remove('modal-open');
}

// Fade-in анимация
document.addEventListener('DOMContentLoaded', function () {
	var observer = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	});

	document.querySelectorAll('.fade-in').forEach(function (element) {
		observer.observe(element);
	});
});

// Анимация элементов при скролле
function onEntry(entry) {
	entry.forEach((change) => {
		if (change.isIntersecting) {
			change.target.classList.add('element-show');
		}
	});
}
let options = { threshold: [0.5] };
let observer2 = new IntersectionObserver(onEntry, options);
document.querySelectorAll('.element-animation').forEach((elm) => {
	observer2.observe(elm);
});

// Форма
const URL_APP =
	'https://script.google.com/macros/s/AKfycbzZLWp-cbbUb3TtMNFUoV6lOtrePc2IPukv130HEm0EWwa1rS07aVt6SncfVvKBWY3I_w/exec'; 
const form = document.querySelector('#form');
const submitButton = form.querySelector('[type=submit]');

form.action = URL_APP;

form.addEventListener('submit', async (ev) => {
	ev.preventDefault();

	const name = document.querySelector('[name=name]:checked');
	const message = document.querySelector('[name=message]');

	let details = {
		name: name ? name.value : '',
		message: message.value.trim(),
	};

	if (!details.name || !details.message) {
		alert('Барлық өрістерді толтырыңыз!');
		return;
	}

	let formBody = [];
	for (let property in details) {
		formBody.push(encodeURIComponent(property) + '=' + encodeURIComponent(details[property]));
	}
	formBody = formBody.join('&');

	form.reset();
	alert('Жауабыңызға рахмет!');

	fetch(URL_APP, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
		mode: 'no-cors',
		body: formBody,
	}).finally(() => {
		submitButton.disabled = false;
	});
});

// Таймер
document.addEventListener('DOMContentLoaded', function () {
	function updateCountdown() {
		const endDate = new Date('October 17, 2025 09:00:00').getTime();
		const now = new Date().getTime();
		const distance = endDate - now;

		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		document.getElementById('days').innerText = days >= 0 ? days : '00';
		document.getElementById('hours').innerText = hours >= 0 ? hours : '00';
		document.getElementById('minutes').innerText = minutes >= 0 ? minutes : '00';
		document.getElementById('seconds').innerText = seconds >= 0 ? seconds : '00';
	}

	setInterval(updateCountdown, 1000);
	updateCountdown();
});

