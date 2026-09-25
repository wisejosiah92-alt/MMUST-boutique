const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');

if (menuToggle && navLinks) {
	const header = menuToggle.closest('.header');
	const setMenuOpen = (isOpen) => {
		navLinks.classList.toggle('is-open', isOpen);
		header.classList.toggle('is-menu-open', isOpen);
		menuToggle.setAttribute('aria-expanded', String(isOpen));
		menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
	};

	menuToggle.addEventListener('click', () => {
		setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
	});

	navLinks.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => setMenuOpen(false));
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
			setMenuOpen(false);
			menuToggle.focus();
		}
	});

	document.addEventListener('click', (event) => {
		if (!header.contains(event.target)) setMenuOpen(false);
	});

	window.matchMedia('(min-width: 961px)').addEventListener('change', (event) => {
		if (event.matches) setMenuOpen(false);
	});
}

const authContainer = document.querySelector('.auth-container');

if (authContainer) {
	const authTabs = [...authContainer.querySelectorAll('.auth-tab-btn')];
	const authViews = [...authContainer.querySelectorAll('.auth-view')];

	const showAuthView = (viewId) => {
		authContainer.classList.toggle('is-recovering', viewId === 'forgot-view');

		authTabs.forEach((tab) => {
			const isActive = tab.dataset.target === viewId;
			tab.classList.toggle('is-active', isActive);
			tab.setAttribute('aria-selected', String(isActive));
			tab.tabIndex = isActive ? 0 : -1;
		});

		authViews.forEach((view) => {
			const isActive = view.id === viewId;
			view.classList.toggle('is-active', isActive);
			view.hidden = !isActive;
			const status = view.querySelector('.auth-status');
			if (status) status.textContent = '';
		});
	};

	authTabs.forEach((tab, index) => {
		tab.addEventListener('click', () => showAuthView(tab.dataset.target));
		tab.addEventListener('keydown', (event) => {
			if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
			event.preventDefault();
			const direction = event.key === 'ArrowRight' ? 1 : -1;
			const nextTab = authTabs[(index + direction + authTabs.length) % authTabs.length];
			nextTab.focus();
			showAuthView(nextTab.dataset.target);
		});
	});

	document.querySelector('#goToForgot').addEventListener('click', () => showAuthView('forgot-view'));
	document.querySelector('#backToLogin').addEventListener('click', () => showAuthView('login-view'));

	authContainer.querySelectorAll('[data-auth-form]').forEach((form) => {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			const messages = {
				login: 'Sign-in is not connected yet, so no session was created.',
				signup: 'Account creation is not connected yet.',
				recovery: 'Password recovery is not connected yet.'
			};
			form.querySelector('.auth-status').textContent = messages[form.dataset.authForm];
		});
	});
}

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
	const cards = [...carousel.querySelectorAll('.carousel-card')];
	const counter = carousel.querySelector('.carousel-count');
	let activeIndex = 0;

	const render = () => {
		cards.forEach((card, index) => {
			let offset = (index - activeIndex + cards.length) % cards.length;
			if (offset > Math.floor(cards.length / 2)) offset -= cards.length;

			card.classList.remove('is-active', 'is-previous', 'is-next', 'is-hidden');
			if (offset === 0) card.classList.add('is-active');
			else if (offset === -1) card.classList.add('is-previous');
			else if (offset === 1) card.classList.add('is-next');
			else card.classList.add('is-hidden');
		});

		counter.innerHTML = `${String(activeIndex + 1).padStart(2, '0')} <span>/ ${String(cards.length).padStart(2, '0')}</span>`;
	};

	const move = (direction) => {
		activeIndex = (activeIndex + direction + cards.length) % cards.length;
		render();
	};

	carousel.querySelector('[data-previous]').addEventListener('click', () => move(-1));
	carousel.querySelector('[data-next]').addEventListener('click', () => move(1));
	carousel.addEventListener('keydown', (event) => {
		if (event.key === 'ArrowLeft') move(-1);
		if (event.key === 'ArrowRight') move(1);
	});

	render();
});

const productFilters = document.querySelector('[data-product-filters]');
const occasionFilters = document.querySelector('[data-occasion-filters]');

if (productFilters || occasionFilters) {
	const productCards = [...document.querySelectorAll('.product-card[data-category]')];
	let selectedCategory = 'all';
	let selectedOccasion = 'all';

	const applyProductFilters = () => {
		productCards.forEach((card) => {
			const occasions = card.querySelector('[data-occasions]')?.dataset.occasions.split(/\s+/) || [];
			const matchesCategory = selectedCategory === 'all' || card.dataset.category === selectedCategory;
			const matchesOccasion = selectedOccasion === 'all' || occasions.includes(selectedOccasion);
			card.classList.toggle('is-filtered-out', !matchesCategory || !matchesOccasion);
		});
	};

	if (productFilters) {
		productFilters.querySelectorAll('[data-filter]').forEach((button) => {
			button.addEventListener('click', () => {
				selectedCategory = button.dataset.filter;
				productFilters.querySelectorAll('[data-filter]').forEach((filterButton) => {
					const isActive = filterButton === button;
					filterButton.classList.toggle('is-active', isActive);
					filterButton.setAttribute('aria-pressed', String(isActive));
				});
				applyProductFilters();
			});
		});
	}

	if (occasionFilters) {
		occasionFilters.querySelectorAll('[data-occasion-filter]').forEach((button) => {
			button.addEventListener('click', () => {
				selectedOccasion = button.dataset.occasionFilter;
				occasionFilters.querySelectorAll('[data-occasion-filter]').forEach((filterButton) => {
					const isActive = filterButton === button;
					filterButton.classList.toggle('is-active', isActive);
					filterButton.setAttribute('aria-pressed', String(isActive));
				});
				applyProductFilters();
			});
		});
	}

	applyProductFilters();
}

const lookPieceButtons = [...document.querySelectorAll('[data-look-piece]')];
const selectedLookPieces = new Map();
const lookPiecePrices = new Map([
	['Campus-ready look', 29.99],
	['The easy layer', 49.99],
	['The carryall', 42.99]
]);

const updateLookPieceButtons = () => {
	lookPieceButtons.forEach((button) => {
		const isSelected = selectedLookPieces.has(button.dataset.lookPiece);
		button.setAttribute('aria-pressed', String(isSelected));
		button.classList.toggle('is-selected', isSelected);
	});
};

lookPieceButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const pieceName = button.dataset.lookPiece;
		if (selectedLookPieces.has(pieceName)) selectedLookPieces.delete(pieceName);
		else selectedLookPieces.set(pieceName, lookPiecePrices.get(pieceName));
		updateLookPieceButtons();
	});
});

document.querySelector('[data-add-look]')?.addEventListener('click', () => {
	const status = document.querySelector('.look-bag-status');
	if (!selectedLookPieces.size) {
		status.textContent = 'Choose at least one piece to build your style list.';
		return;
	}

	const total = [...selectedLookPieces.values()].reduce((sum, price) => sum + price, 0);
	status.textContent = `${selectedLookPieces.size} pieces in your temporary style list ($${total.toFixed(2)}). Checkout is not connected.`;
});

document.querySelector('[data-fit-form]')?.addEventListener('submit', (event) => {
	event.preventDefault();
	const size = document.querySelector('#usual-size').value;
	const fit = document.querySelector('#fit-preference').value;
	const guidance = {
		close: 'For a close fit, compare chest, waist, and hip measurements with the garment details before choosing.',
		regular: 'For a regular fit, use your usual size as a starting point and check the garment measurements.',
		relaxed: 'For a relaxed fit, check the garment measurements and fit notes for the intended ease.'
	};
	document.querySelector('.fit-result').textContent = `For ${size} with a ${fit} fit: ${guidance[fit]} This is general guidance; sizing varies by item.`;
});

const videoUpload = document.querySelector('[data-video-upload]');
const localVideo = document.querySelector('[data-local-video]');
const videoEmptyState = document.querySelector('[data-video-empty]');
const videoNote = document.querySelector('[data-video-note]');
let localVideoUrl;

videoUpload?.addEventListener('change', () => {
	const videoFile = videoUpload.files[0];
	if (!videoFile) return;
	if (localVideoUrl) URL.revokeObjectURL(localVideoUrl);
	localVideoUrl = URL.createObjectURL(videoFile);
	localVideo.src = localVideoUrl;
	localVideo.hidden = false;
	videoEmptyState.hidden = true;
	videoNote.textContent = 'Checking clip length…';
	localVideo.onloadedmetadata = () => {
		const duration = localVideo.duration;
		videoNote.textContent = duration >= 5 && duration <= 10
			? `${duration.toFixed(1)} second local preview. This clip stays on your device.`
			: `This clip is ${duration.toFixed(1)} seconds. Choose a clip between 5 and 10 seconds for this preview.`;
	};
});

document.querySelector('[data-early-access-form]')?.addEventListener('submit', (event) => {
	event.preventDefault();
	document.querySelector('.early-access-status').textContent = 'Preview only: your email has not been saved. Connect an email service to create a real early-access list.';
});
