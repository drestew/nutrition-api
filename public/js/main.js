const likeIcon = document.querySelectorAll('.fa-thumbs-up')
const trashIcon = document.querySelectorAll('.fa-trash-can')

const likeRecipe = async function () {
    const foodName = this.parentNode.parentNode.previousElementSibling.textContent
    const numLikes = Number(this.parentNode.childNodes[1].textContent)
    console.log(foodName, numLikes)
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
        console.log(data)
        location.reload()
    } catch (err) {
        console.error(err)
    }
}

Array.from(likeIcon).forEach(el => {
    el.addEventListener('click', likeRecipe)
})