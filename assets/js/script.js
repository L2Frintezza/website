

// Theme

document.addEventListener("DOMContentLoaded", function () {
    const darkThemeButton = document.getElementById("dark_theme");
    const lightThemeButton = document.getElementById("light_theme");
    const htmlElement = document.documentElement;

    function setTheme(theme) {
        console.log("Setting theme:", theme);
        localStorage.setItem("selected-theme", theme);
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem("selected-theme");
    
        if (savedTheme) {
            htmlElement.setAttribute("data-theme", savedTheme);
            darkThemeButton.classList.toggle("active", savedTheme === "dark");
            lightThemeButton.classList.toggle("active", savedTheme === "light");
        
        } else {
            
            const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

            const defaultTheme = prefersDarkMode ? "dark" : "light";
            htmlElement.setAttribute("data-theme", defaultTheme);
            setTheme(defaultTheme);
            lightThemeButton.classList.toggle("active", defaultTheme === "light");
            darkThemeButton.classList.toggle("active", defaultTheme === "dark");
        }
    }
    

    loadTheme();

    darkThemeButton.addEventListener("click", () => {
        htmlElement.setAttribute("data-theme", "dark");
        setTheme("dark");
        darkThemeButton.classList.add("active");
        lightThemeButton.classList.remove("active");
    });

    lightThemeButton.addEventListener("click", () => {
        htmlElement.setAttribute("data-theme", "light");
        setTheme("light");
        lightThemeButton.classList.add("active");
        darkThemeButton.classList.remove("active");
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.list-loading');
    let currentVisibleItems = {};
    let currentVisibleItemsAfterShowMore = {};

    const resetVisibility = (containerId) => {
        const container = document.getElementById(containerId);

        if (!container) {
            return;
        }

        const itemsPerPage = parseInt(container.dataset.itemsPerPage) || 3;
        const lis = container.querySelectorAll('.list-loading_item');
        const noResultsMessage = container.querySelector('.no-results-message');

        let visibleItemsCount = 0;

        lis.forEach((item, index) => {
            if (index < currentVisibleItems[containerId] || (index >= currentVisibleItems[containerId] && index < currentVisibleItemsAfterShowMore[containerId])) {
                item.style.display = '';
                visibleItemsCount++;
            } else {
                item.style.display = 'none';
            }
        });

        noResultsMessage.style.display = visibleItemsCount === 0 ? 'flex' : 'none';
    };

    const updateCurrentVisibleItems = (containerId, value, afterShowMore = false) => {
        if (afterShowMore) {
            currentVisibleItemsAfterShowMore[containerId] = value;
        } else {
            currentVisibleItems[containerId] = value;
        }
    };

    const handleShowMore = (container, itemsPerPage) => {
        const ul = container.querySelector('.list-loading_wrapper');
        const lis = ul.querySelectorAll('.list-loading_item');
        const showMoreButton = container.querySelector('.showMore');
        const loadingSpinner = container.querySelector('.spinner_loading');
        const noResultsMessage = container.querySelector('.no-results-message');

        if (!ul || !showMoreButton || !loadingSpinner || !noResultsMessage) {
            return;
        }

        showMoreButton.addEventListener('click', function () {
            loadingSpinner.style.display = 'flex';

            setTimeout(() => {
                const containerId = container.id;

                for (let i = currentVisibleItems[containerId]; i < currentVisibleItems[containerId] + itemsPerPage && i < lis.length; i++) {
                    lis[i].style.display = '';
                }

                currentVisibleItems[containerId] += itemsPerPage;

                resetVisibility(containerId);

                if (currentVisibleItems[containerId] >= lis.length) {
                    showMoreButton.style.display = 'none';
                }

                loadingSpinner.style.display = 'none';
            }, 600);
        });

        showMoreButton.style.display = currentVisibleItems[container.id] >= lis.length ? 'none' : 'flex';
    };



    const handleSearch = () => {
        const loadingSpinner = document.getElementById('input_loading');

        if (!loadingSpinner) {
            return;
        }

        loadingSpinner.style.display = 'flex';

        clearTimeout(timeout);

        timeout = setTimeout(function () {
            containers.forEach(container => {
                const filterText = document.getElementById('input_searching')?.value.toLowerCase();
                const lis = container.querySelectorAll('.list-loading_item');
                const showMoreButton = container.querySelector('.showMore');
                const noResultsMessage = container.querySelector('.no-results-message');
                const ul = container.querySelector('.list-loading_wrapper');

                if (!showMoreButton || !noResultsMessage || !ul) {
                    return;
                }


                lis.forEach(item => {
                    item.style.display = '';
                });

                resetVisibility(container.id);

                if (filterText.trim() !== '') {
                    let foundItems = 0;

                    lis.forEach(item => {
                        const itemName = item.textContent.toLowerCase();
                        if (itemName.includes(filterText)) {
                            item.style.display = '';
                            foundItems++;
                        } else {
                            item.style.display = 'none';
                        }
                    });

                    noResultsMessage.style.display = foundItems === 0 ? 'flex' : 'none';

                    showMoreButton.style.display = 'none';

                    ul.classList.toggle('active', foundItems > 0);
                } else {

                    const visibleItemsCount = Array.from(lis).filter(item => item.style.display !== 'none').length;

                    currentVisibleItemsAfterShowMore[container.id] = parseInt(container.dataset.itemsPerPage) || 3;

                    showMoreButton.style.display = visibleItemsCount > 0 && visibleItemsCount < lis.length ? 'flex' : 'none';
                    noResultsMessage.style.display = 'none';

                    ul.classList.remove('active');
                }
            });

            loadingSpinner.style.display = 'none';
        }, 500);
    };


    containers.forEach(container => {
        const itemsPerPage = parseInt(container.dataset.itemsPerPage) || 3;
        currentVisibleItems[container.id] = itemsPerPage;

        const ul = container.querySelector('.list-loading_wrapper');
        const lis = ul?.querySelectorAll('.list-loading_item');

        if (!ul || !lis) {
            return;
        }

        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message';
        noResultsMessage.textContent = 'No results to show';
        container.appendChild(noResultsMessage);

        for (let i = itemsPerPage; i < lis.length; i++) {
            lis[i].style.display = 'none';
        }

        handleShowMore(container, itemsPerPage);
    });

    let timeout;

    const inputSearch = document.getElementById('input_searching');
    if (inputSearch) {
        inputSearch.addEventListener('input', handleSearch);
    }
});








document.addEventListener('DOMContentLoaded', function () {
    var modals = document.querySelectorAll('.modal');
    var openModalBtns = document.querySelectorAll('.toOpen_modal');
    var closeModalBtns = document.querySelectorAll('.toClose_modal');

    function openModal(modalId) {
        var modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            window.location.hash = modalId;

            var loadingSpinner = modal.querySelector('.loading_modalContent');
            loadingSpinner.style.display = 'block';

            var actualContent = modal.querySelector('.show_modalContent');
            actualContent.style.display = 'none';

            document.body.classList.add('hidden');

            setTimeout(function () {
                loadingSpinner.style.display = 'none';
                actualContent.style.display = 'block';
                window.location.hash = modalId;
            }, 800);
        }
    }

    function closeModal() {
        modals.forEach(modal => {
            modal.style.display = 'none';

            var iframe = modal.querySelector('iframe');
            if (iframe) {
                iframe.src = iframe.src;
            }

            history.replaceState({}, document.title, window.location.pathname + window.location.search);
            document.body.classList.remove('hidden');
        });
    }

    openModalBtns.forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.modalId)));
    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

    var hash = window.location.hash.substr(1);
    if (hash) openModal(hash);
});




document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 1) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
})


function toggleClass(className) {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.toggle('active');
    }
}


