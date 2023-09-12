async function load() {
    const toggle = document.querySelector('#toggle');
    const slug = document.querySelector('#slug');
    const input = document.querySelector('input');

    toggle.addEventListener('click', () => {

        let loopLength = input.value * 100000;

        for (let i = 0; i < loopLength; i++) {
            slug.classList = slug.classList;
        }

        slug.classList.toggle('hidden');

    })
}

window.onload = load;