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
    }
    child = child.nextSibling
  }

  toReplace.forEach((entry) => {
    paragraph.replaceChild(entry.new, entry.old)
  })
}

findParagraphsAndReplace()