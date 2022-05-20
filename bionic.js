const findParagraphsAndReplace = () => {
  const paragraphs = document.querySelectorAll("p")
  paragraphs.forEach(paragraph => {
    processParagraph(paragraph)
  })
}

const processParagraph = (paragraph) => {
  let child = paragraph.firstChild

  const toReplace = []

  while (child) {
    if (child.nodeType === 3) {
      const text = child.nodeValue
      const words = text.split(" ")
      const newWords = words.map(word => {
        const wordLength = word.length
        // get the current computed font weight
        const fontWeight = parseInt(window.getComputedStyle(typeof child === Element ? child : paragraph).getPropertyValue("font-weight"))
        const boldLength = Math.max(Math.min(Math.random() * Math.floor(wordLength / 2), 3), 1)
        const boldedWord = `<span style="font-weight:${Math.min(fontWeight + 200, 900)} !important;">${word.substring(0, boldLength)}</span>${word.substring(boldLength, wordLength)}`
        return boldedWord
      })
      const newElement = document.createElement("span")
      newElement.innerHTML = newWords.join(" ")
      toReplace.push({ old: child, new: newElement })
      // child.nodeValue = newWords.join(" ")
    }
    child = child.nextSibling
  }

  toReplace.forEach((entry) => {
    paragraph.replaceChild(entry.new, entry.old)
  })


  // const words = paragraph.innerText.split(" ")
  // words.forEach(word => {
  //   const wordLength = word.length
  //   // get the current computed font weight
  //   const fontWeight = parseInt(window.getComputedStyle(paragraph).getPropertyValue("font-weight"))
  //   const boldLength = Math.max(Math.min(Math.random() * Math.floor(wordLength / 2), 3), 1)
  //   const boldedWord = `<span style="font-weight:${Math.min(fontWeight + 200, 900)} !important;">${word.substring(0, boldLength)}</span>${word.substring(boldLength, wordLength)}`
  //   paragraph.innerHTML = paragraph.innerHTML.replace(word, boldedWord)
  // });

  // const splitByElements = paragraph.innerHTML.split(/<[^>]+>/g)

  // let innerHTML = paragraph.innerHTML.slice(0, paragraph.innerHTML.length - 1)
  // splitByElements.forEach(line => {
  //   if (line.length > 0) {
  //     const words = line.split(' ')
  //     const newWords = words.map(word => {
  //       const wordLength = word.length
  //       // get the current computed font weight
  //       const fontWeight = parseInt(window.getComputedStyle(paragraph).getPropertyValue("font-weight"))
  //       const boldLength = Math.max(Math.min(Math.random() * Math.floor(wordLength / 2), 3), 1)
  //       const boldedWord = `<span style="font-weight:${Math.min(fontWeight + 200, 900)} !important;">${word.substring(0, boldLength)}</span>${word.substring(boldLength, wordLength)}`
  //       return boldedWord
  //     })

  //     const newLine = newWords.join(' ')
  //     innerHTML = innerHTML.replace(line, newLine)
  //   }
  // })
  // return innerHTML
}

findParagraphsAndReplace()