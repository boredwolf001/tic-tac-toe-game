let currentOption = 'x'
const cells = []
const cellGrid = document.querySelector('.cell-grid')

drawGrid()

function drawGrid() {
  for (let i = 0; i < 3; i++) {
    cells.push([])
    for (let j = 0; j < 3; j++) {
      cells[i].push('')
      const cellEl = document.createElement('div')
      cellEl.className = 'cell'
      cellEl.setAttribute(`data-cell-x-${i}`, '')
      cellEl.setAttribute(`data-cell-y-${j}`, '')
      cellEl.setAttribute('onclick', `makeCellActive(${i}, ${j})`)
      cellGrid.appendChild(cellEl)
    }
  }
}

function makeCellActive(x, y) {
  cells[x][y] = currentOption
  const cell = document.querySelector(`[data-cell-x-${x}][data-cell-y-${y}]`)

  cell.className = `cell cell-${currentOption}`
  // Set to don't change the class again
  cell.removeAttribute('onclick')
  currentOption = currentOption === 'x' ? 'o' : 'x'

  // Check win or draw
  checkWin()
}

function checkWin() {
  // horizontal and vertical
  for (let i = 0; i < 3; i++) {
    if (allEqual([cells[i][0], cells[i][1], cells[i][2]])) {
      alert(cells[i][0] + ' won')
      location.reload()
      break
    }

    if (allEqual([cells[0][i], cells[1][i], cells[2][i]])) {
      alert(cells[0][i] + ' won')
      location.reload()
      break
    }
  }

  // diagonal
  if (allEqual([cells[0][0], cells[1][1], cells[2][2]])) {
    alert(cells[0][0] + ' won')
    location.reload()
    return
  }

  if (allEqual([cells[0][2], cells[1][1], cells[2][0]])) {
    alert(cells[0][2] + ' won')
    location.reload()
    return
  }

  // draw
  if (!cells.some(x => x.some(y => y == ''))) {
    alert('Draw')
    location.reload()
  }
}

/*
STRUCTURE OF THE ARRAY

[
[x, o, o],
[o, x, o],
[x, o, x],
]
*/

// https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal
const allEqual = arr =>
  arr.every(v => {
    if (v == '') return false
    return v === arr[0]
  })
