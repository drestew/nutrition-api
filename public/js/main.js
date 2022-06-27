const likeIcon = document.querySelectorAll('.fa-thumbs-up')
const trashIcon = document.querySelectorAll('.fa-trash-can')

const likeRecipe = async function () {
    const foodName = this.parentNode.parentNode.previousElementSibling.textContent
    const numLikes = Number(this.parentNode.childNodes[1].textContent)
    try {
        const res = await fetch('addOneLike', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': foodName,
                'likes': numLikes
            })
        })
        const data = await res.json()
        location.reload()
    } catch (err) {
        console.error(err)
    }
}

const deleteRecipe = async function () {
    const foodName = this.parentNode.parentNode.previousElementSibling.textContent
    try {
        const res = await fetch('/deleteFood', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': foodName
            })
        })
        const data = await res.json()
        location.reload()
    }
    catch (error) {
        console.error(error)

    }
}
Array.from(likeIcon).forEach(el => {
    el.addEventListener('click', likeRecipe)
})

Array.from(trashIcon).forEach(el => {
    el.addEventListener('click', deleteRecipe)
})