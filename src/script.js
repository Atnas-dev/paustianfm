// Header change
document.addEventListener('DOMContentLoaded', () => {
	const $header = $('body header');
	const $sectionTwo = $('main.home section.competencies');
	
	if ($sectionTwo.length) {
		window.addEventListener("scroll", () => {
			const shouldGradient = window.scrollY > $sectionTwo[0].offsetTop;
			$header.toggleClass('gradient', shouldGradient);
		});
	}
});

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
	const $body = $('body');
	
	$body.find('header .menu').on('click', () => $body.toggleClass('open'));
	$body.find('aside.overlay').on('click', () => $body.removeClass('open'));
});

// Scroll to sections
document.addEventListener('DOMContentLoaded', () => {
	const $htmlBody = $('html, body');
	const $navs = $('header nav ul a');
	
	$navs.on('click', (event) => {
		const name = $(event.currentTarget).data('name');
		
		if (name) {
			scrollTo($(`#${name}`));
			$htmlBody.removeClass('open');
			
			return false;
		}
	});
	
	function scrollTo($element) {
		$htmlBody.animate({
			scrollTop: $element.offset().top
		}, 500, 'swing');
	}
});

// Competencies
document.addEventListener('DOMContentLoaded', () => {
	const $competencies = $('main section.competencies ul li');
	const $modals = $('body > aside.modals div');
	
	$competencies.on('click', (event) => {
		const name = $(event.currentTarget).data('name');
		
		$.each($modals, (index, modal) => {
			const $modal = $(modal);
			$modal.toggleClass('open', $modal.data('name') === name)
		})
	});
	
	$modals.find('button.close').on('click', () => $modals.removeClass('open'));
	$('html').on('keydown', (event) => {
		if (event.keyCode === 27) {
			$modals.removeClass('open');
		}
	})
});
