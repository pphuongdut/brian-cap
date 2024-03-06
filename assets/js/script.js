var visibleElementIndex = -1; // Initially no element is visible
let movingElement = document.getElementById('movingElement');

document.addEventListener('scroll', function () {
    // Get scroll position in px
    var scroll = window.scrollY;

    // Calculate viewport height
    const windowHeight = window.innerHeight;

    // Get section 4 element
    var section_4 = document.getElementById('section_4');

    // Check if section 4 is visible
    if (
        scroll >= section_4.offsetTop &&
        scroll < section_4.offsetTop + section_4.offsetHeight
    ) {
        // Calculate scroll positions for each part
        const part1Offset = section_4.offsetTop;
        const part2Offset = part1Offset + windowHeight;
        const part3Offset = part1Offset + 2 * windowHeight;

        // Determine which element should be shown based on scroll position
        var newElementIndex;
        if (scroll >= part1Offset && scroll < part2Offset) {
            newElementIndex = 0;
        } else if (scroll >= part2Offset && scroll < part3Offset) {
            newElementIndex = 1;
        } else if (scroll >= part3Offset) {
            newElementIndex = 2;
        } else {
            newElementIndex = -1; // No element should be shown
        }

        const scrolledPercentage =
            ((scroll - section_4.offsetTop) / section_4.offsetHeight) * 100;
        // calculate the position of the moving element by newElementIndex
        movingElement.style.transform = `translateX(${scrolledPercentage}%)`;

        // // calculate the position of the moving element by newElementIndex
        // movingElement.style.transform = `translateX(${
        //     newElementIndex * (100 / 3)
        // }%)`;

        // Show or hide elements based on scroll direction
        if (newElementIndex !== visibleElementIndex) {
            if (newElementIndex > visibleElementIndex) {
                // User is scrolling down, show new elements
                for (
                    var i = visibleElementIndex + 1;
                    i <= newElementIndex;
                    i++
                ) {
                    var element = document.getElementById(
                        'part' + (i + 1) + 'Element'
                    );
                    element.classList.add(
                        'animate__animated',
                        'animate__fadeInUp'
                    );
                    element.style.visibility = 'visible';
                }
            } else {
                // User is scrolling up, hide elements
                for (var j = visibleElementIndex; j > newElementIndex; j--) {
                    var elementToHide = document.getElementById(
                        'part' + (j + 1) + 'Element'
                    );
                    elementToHide.classList.remove(
                        'animate__animated',
                        'animate__fadeInUp'
                    );
                    elementToHide.style.visibility = 'hidden';
                }
            }
            visibleElementIndex = newElementIndex;
        }
    } else {
        // Hide all elements if section 4 is not visible
        for (var k = 0; k < 3; k++) {
            var elementToHide = document.getElementById(
                'part' + (k + 1) + 'Element'
            );
            elementToHide.classList.remove(
                'animate__animated',
                'animate__fadeInUp'
            );
            elementToHide.style.visibility = 'hidden';
        }
        visibleElementIndex = -1; // Reset visible element index
    }
});
