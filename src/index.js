function getCardHeader(card) {
    const cardHeader = document.createElement('h2')
    cardHeader.setAttribute('class', 'card--title')
    // cardHeader.append(card.name)
    cardHeader.innerText = card.name
    return cardHeader
}

function getCardImage(card) {
    const cardImage = document.createElement('img')
    cardImage.setAttribute('width', '256')
    cardImage.setAttribute('class', 'card--img')
    if (typeof(card['currentImage']) == 'string') {
        cardImage.setAttribute('src', card['currentImage'])
    } else {
        cardImage.setAttribute('src', card['availableImages'][card['currentImage']])
    }
    
    return cardImage
}

function getCardStats(card) {
    const statsListUL = document.createElement('ul')
    statsListUL.setAttribute('class', 'card--text')

    for (const stat of card.stats) {
        const statLi = document.createElement('li')
        statLi.innerText = stat.stat.name + ': ' + stat.base_stat
        statsListUL.appendChild(statLi)
    }
    return statsListUL
}

function getGameVersionList(card) {
    const gamesListDetails = document.createElement('details')
    gamesListDetails.setAttribute('class', 'card--games')
    const gamesListDetailsSummary = document.createElement('summary')
    gamesListDetailsSummary.innerText = 'Appears in games:'
    gamesListDetails.appendChild(gamesListDetailsSummary)
    const gamesListUL = document.createElement('ul')

    for (const game of card.game_indices) {
        const gameLi = document.createElement('li')
        gameLi.innerText = game.version.name
        gamesListUL.appendChild(gameLi)
    }
    gamesListDetails.appendChild(gamesListUL)
    return gamesListDetails
}

function getAvailableImages(object) {
    const imageList = []
    const keys = Object.keys(object)
    for (const k of keys) {
        // console.log(k)
        if (typeof(object[k]) == 'string') {
            // if (k == 'front_default') {
            if (object[k].slice(-4) == '.gif') {
            imageList.push(object[k])
            }
        } else if (object[k] !== null) {
            for (const image of getAvailableImages(object[k])) {
                imageList.push(image)
            }
        }
    }
    return imageList
}

function nextImageListener(card) {
    // console.log(availableImages[Math.floor(Math.random() * availableImages.length)])
    if (typeof(card['currentImage']) == 'string') {
        card['currentImage'] = 0
    } else {
        card['currentImage'] = (card['currentImage'] + 1) % card['availableImages'].length

    }
    renderCards()
}

function getCardLi(card) {
    const cardLi = document.createElement('li')
    cardLi.setAttribute('id', card.id)
    cardLi.setAttribute('class', 'card')

    cardHeader = getCardHeader(card)
    cardImage = getCardImage(card)
    statsListUL = getCardStats(card)
    gamesListUL = getGameVersionList(card)

    // const gamesListHeader = document.createElement('h3')
    // gamesListHeader.innerText = 'Has appeared in:'

    cardImage.addEventListener('click', () => {nextImageListener(card)})

    cardLi.appendChild(cardHeader)
    cardLi.appendChild(cardImage)
    cardLi.appendChild(statsListUL)
    // cardLi.appendChild(gamesListHeader)
    cardLi.appendChild(gamesListUL)
    return cardLi
}

function renderCards() {
    const cardsListUL = document.querySelector('.cards')
    cardsListUL.innerHTML = ''
    // const card = data[0]
    for (const card of data) {
        cardLi = getCardLi(card)
        cardsListUL.appendChild(cardLi)
    }
}

function prepareCardImages() {
    for (card of data) {
        card['availableImages'] = getAvailableImages(card)
        card['currentImage'] = card.sprites.other['official-artwork'].front_default
    }
}

function main() {
    prepareCardImages()
    renderCards()
}

main()