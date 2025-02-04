const cardsListUL = document.querySelector('.cards')
cardsListUL.innerHTML = ''

// const card = data[0]
for (const card of data) {
    const cardLi = document.createElement('li')
    cardLi.setAttribute('id', card.id)
    cardLi.setAttribute('class', 'card')

    // header
    const cardHeader = document.createElement('h2')
    cardHeader.setAttribute('class', 'card--title')
    // cardHeader.append(card.name)
    cardHeader.innerText = card.name

    // image
    const cardImage = document.createElement('img')
    cardImage.setAttribute('width', '256')
    cardImage.setAttribute('class', 'card--img')
    cardImage.setAttribute('src', card.sprites.other['official-artwork'].front_default)

    // stats
    const statsListUL = document.createElement('ul')
    statsListUL.setAttribute('class', 'card--text')

    for (const stat of card.stats) {
        const statLi = document.createElement('li')
        statLi.innerText = stat.stat.name + ': ' + stat.base_stat
        statsListUL.appendChild(statLi)
    }

    // game versions
    const gamesListHeader = document.createElement('h3')
    gamesListHeader.innerText = 'Has appeared in:'
    const gamesListUL = document.createElement('ul')
    gamesListUL.setAttribute('class', 'card--games')
    for (const game of card.game_indices) {
        const gameLi = document.createElement('li')
        gameLi.innerText = game.version.name
        gamesListUL.appendChild(gameLi)
    }


    cardLi.appendChild(cardHeader)
    cardLi.appendChild(cardImage)
    cardLi.appendChild(statsListUL)
    cardLi.appendChild(gamesListHeader)
    cardLi.appendChild(gamesListUL)

    cardsListUL.appendChild(cardLi)
}