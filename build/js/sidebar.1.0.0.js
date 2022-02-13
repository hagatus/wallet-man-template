
(function () {
    console.log('sidebar.js ready');

    const toggleLinks = document.querySelectorAll('.toggle-sidebar');
    toggleLinks.forEach((toggleLink) => {
        toggleLink.addEventListener('click', function () {

            const sidebar = document.querySelector('.main-sidebar');
            /**
             * Toggle class open  to animate and show the sidebar
             */
            toggleClass(sidebar, 'open')

        }, false)
    })

})()