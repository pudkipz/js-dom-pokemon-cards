const cardsListUL = document.querySelector('.cards')
cardsListUL.innerHTML = ''

// const card = data[0]
for (const card of data) {
    const cardLi = document.createElement('li')
    cardLi.setAttribute('id', card.id)
    cardLi.setAttribute('class', 'card')

    const cardHeader = document.createElement('h2')
    cardHeader.setAttribute('class', 'card--title')
    // cardHeader.append(card.name)
    cardHeader.innerText = card.name

    const cardImage = document.createElement('img')
    cardImage.setAttribute('width', '256')
    cardImage.setAttribute('class', 'card--img')
    cardImage.setAttribute('src', card.sprites.other['official-artwork'].front_default)

    const statsListUL = document.createElement('ul')
    statsListUL.setAttribute('class', 'card--text')

    for (const stat of card.stats) {
        const statLi = document.createElement('li')
        statLi.innerText = stat.stat.name + ': ' + stat.base_stat
        statsListUL.appendChild(statLi)
    }

    cardLi.appendChild(cardHeader)
    cardLi.appendChild(cardImage)
    cardLi.appendChild(statsListUL)

    cardsListUL.appendChild(cardLi)
}