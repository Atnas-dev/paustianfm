// Header change
document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('body header');
	const sectionTwo = document.querySelector('main.home section.competencies');

	if (sectionTwo) {
		window.addEventListener("scroll", () => {
			const shouldGradient = window.scrollY > sectionTwo.offsetTop;
			header.classList.toggle('gradient', shouldGradient);
		});
	}
});

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
	const body = document.querySelector('body');
	
	body.querySelector('header .menu').addEventListener('click', () => body.classList.toggle('open'));
	body.querySelector('aside.overlay').addEventListener('click', () => body.classList.remove('open'));
});

// Scroll to sections
document.addEventListener('DOMContentLoaded', () => {
	const $htmlBody = $('html, body');
	const $navs = $('header nav ul a');
	
	$navs.on('click', (event) => {
		const name = event.currentTarget.getAttribute('data-name');
		
		if (name) {
			scrollTo(document.querySelector(`#${name}`));
			$htmlBody.removeClass('open');
			
			return false;
		}
	});
	
	function scrollTo(element) {
		$htmlBody.animate({
			scrollTop: element.offsetTop,
		}, 500, 'swing');
	}
});

// Competencies
document.addEventListener('DOMContentLoaded', () => {
	const $competencies = $('main section.competencies ul li');
	const $modals = $('body > aside.modals div');
	
	$competencies.on('click', (event) => {
		const name = event.currentTarget.getAttribute('data-name');
		
		$.each($modals, (index, modal) => {
			modal.classList.toggle('open', modal.getAttribute('data-name') === name);
		});
	});
	
	$modals.find('button.close').on('click', () => $modals.removeClass('open'));
	document.addEventListener('keydown', (event) => {
		if (event.keyCode === 27) {
			$modals.removeClass('open');
		}
	});
});
