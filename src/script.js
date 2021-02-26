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

// Benchmark tests
document.addEventListener('DOMContentLoaded', () => {
	const testSection = document.querySelector('main.benchmark section.test');
	if (! testSection) {
		return;
	}

    const formTemplate = document.querySelector('template.benchmark-form-mat');

	const fieldsets = testSection.querySelector('.fieldsets');
    const resultElement = testSection.querySelector('.result span');
    const ctaElement = testSection.querySelector('.contact');


	const prize = {
		"none":    0,
		"85x150":  50,
		"85x300":  120,
		"115x200": 95,
		"150x250": 150,
	};
	const forms = [];
	let processTimeout;

	const buttonSubmit = testSection.querySelector('button.submit');
	buttonSubmit.addEventListener('click', calculateBenchmark);

	const buttonAddForm = testSection.querySelector('button.add-form');
	buttonAddForm.addEventListener('click', addForm);


	addForm();


	function addForm() {
		if (testSection.classList.contains('loading')) {
			return;
		}

		const newForm = document.createElement('form');
		newForm.innerHTML = formTemplate.innerHTML;

        fieldsets.appendChild(newForm);

        newForm.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            calculateBenchmark();
        });

        forms.push(newForm);
	};


	function calculateBenchmark(event) {
		if (testSection.classList.contains('loading')) {
            return;
        }

        testSection.classList.add('loading');

		event.preventDefault();
        event.stopImmediatePropagation();

        if (processTimeout) {
            clearTimeout(processTimeout)
        }

		let benchmarkResult = 0;
        forms.forEach((form) => {
            const formData = new FormData(form);

            const matCount = formData.get('mat-count');
            const washCount = formData.get('wash-count');
            const size = formData.get('size') || 'none';

            benchmarkResult += matCount * washCount * prize[size];
        });

        if (benchmarkResult === 0) {
            testSection.classList.remove('loading');

            return;
        }

        processTimeout = setTimeout(() => {
            resultElement.classList.remove('empty');
            ctaElement.classList.remove('hidden');

            resultElement.textContent = numberToString(benchmarkResult)+',-';

            processTimeout = undefined;
            testSection.classList.remove('loading');
        }, 2100);
	};


	function numberToString(val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
});


// Studies
document.addEventListener('DOMContentLoaded', () => {
	const cmBookLink = document.querySelector('main.studies a.cm-book-link');
	const cmBookSection = document.querySelector('main.studies section#cm-book');

	if (! cmBookLink || ! cmBookSection) {
		return;
	}

	cmBookLink.addEventListener('click', (event) => {
		event.preventDefault();
		event.stopImmediatePropagation();

		cmBookSection.scrollIntoView({behavior: "smooth"});
	});
});
