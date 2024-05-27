document.addEventListener("DOMContentLoaded", () => {
    function getRandomPosition(parent, element) {
        // Get the dimensions of the parent element
        const parentWidth = parent.offsetWidth;
        const parentHeight = parent.offsetHeight;
    
        const elementRect = element.getBoundingClientRect();
    
        // Calculate the maximum X and Y positions considering element's dimensions
        const maxX = parentWidth - elementRect.width;
        const maxY = parentHeight - elementRect.height;
    
        // Ensure the random positions are within bounds
        const randomX = Math.floor(Math.random() * Math.max(0, maxX));
        const randomY = Math.floor(Math.random() * Math.max(0, maxY));

        return { x: randomX, y: randomY };
    }
    
    function positionElement() {
        const parent = document.querySelector('.middle-square');
        const element = document.getElementById('duck');
        const position = getRandomPosition(parent, element); 
    
        // Apply the calculated positions to the element
        element.style.position = 'absolute';
        element.style.left = `${position.x}px`;
        element.style.top = `${position.y}px`;
    }
    

    function playQuackSound() {
        const quackSound = new Audio('./assets/quack.mp3');
        quackSound.play().catch(error => {
            console.error('Error playing sound:', error);
        });
    }

    const duckButton = document.querySelector(".duck-button");
    positionElement();

    duckButton.addEventListener("click", () => {
        positionElement();
        playQuackSound();
    });

    // ------------------------------------------------- ^ DUCK BUTTON LOGIC ^ -------------------------------------------------

    // Your existing code remains unchanged
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }

    function applyRandomColors(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const parent = node.parentNode;
            const text = node.nodeValue;
            const fragment = document.createDocumentFragment();

            for (let char of text) {
                const span = document.createElement('span');
                span.classList.add('stroked-letter');
                span.style.color = getRandomColor(); // Random color each time
                span.textContent = char;
                fragment.appendChild(span);
            }

            parent.replaceChild(fragment, node);
        } else {
            for (let child of node.childNodes) {
                applyRandomColors(child);
            }
        }
    }

    function changeCatImage(button, imageSrc) {
        const catImage = button.querySelector('img');
        catImage.src = imageSrc;
    }

    function playSound() {
        if (!isPlaying) {
            cuackSound.play().catch(error => {
                console.error('Error playing sound:', error);
            });
            isPlaying = true;
            cuackSound.addEventListener('ended', function () {
                isPlaying = false;
            });
        } else {
            cuackSound.currentTime = 0;
        }
    }

    function handleCatButtonHold(event) {
        event.preventDefault(); // Prevent default behavior like image drag
        const button = event.currentTarget;
        const imageSrc = button.dataset.imageSrcHold;
        changeCatImage(button, imageSrc);
        playSound();
    }

    function handleCatButtonRelease(event) {
        event.preventDefault(); // Prevent default behavior like image drag
        const button = event.currentTarget;
        const imageSrc = button.dataset.imageSrc;
        changeCatImage(button, imageSrc);
    }

    applyRandomColors(document.body);

    const catButtons = document.querySelectorAll('.cat-button-1, .cat-button-2');
    const cuackSound = new Audio('./assets/cuack.mp3');
    cuackSound.volume = 0.5;
    let isPlaying = false;

    // Add event listeners for both mouse and touch events for each cat button
    catButtons.forEach(button => {
        button.addEventListener('mousedown', handleCatButtonHold);
        button.addEventListener('touchstart', handleCatButtonHold);
        button.addEventListener('mouseup', handleCatButtonRelease);
        button.addEventListener('touchend', handleCatButtonRelease);
    });

    const heroContainer = document.querySelector('.hero-container');
    const body = document.querySelector('body');
    const buttons = heroContainer.querySelectorAll('button');
    let initialized = false;
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        if (!initialized) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            initialized = true;
        }

        const offsetX = (e.clientX - mouseX - window.innerWidth) / 100;
        const offsetY = (e.clientY - mouseY - window.innerHeight) / 100;

        buttons.forEach(button => {
            const isCatButton2 = button.classList.contains('cat-button-2');
            const transformValue = isCatButton2 ? 'scaleX(-1)' : '';
            button.style.transform = `translate(${offsetX}px, ${offsetY}px) ${transformValue}`;
        });

        body.style.backgroundPositionX = `${offsetX}px`;
        body.style.backgroundPositionY = `${offsetY}px`;
    });
    
    // New functionality to update the header text every 0.5 seconds
    let quacks = ["CUACK", "CUACK CUACK", "CUACK CUACK CUACK!"];
    let index = 0;

    setInterval(() => {
        const quackText = document.querySelector(".main-header");
        quackText.textContent = quacks[index];
        applyRandomColors(quackText); // Apply random color to the quack text
        index = (index + 1) % quacks.length;
    }, 500);

    // ------------------------------------------------- ^ HERO SECTION LOGIC ^ -------------------------------------------------
});
