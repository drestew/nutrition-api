const recipe = document.querySelector('#recipe').value
const submit = document.querySelector('.submit')


submit.addEventListener('click', () => {
    fetch(`/api/${recipe}`, (req, res), () => {
        const data = res.json()
    })
        .then(data, () => {
            console.log(data)
        })
})