//  Sum of Two
// ------------------------------------------------------------------------------------

// 1) Primera forma
// Iterar haciendo la combinatoria, agarrando de a dos elementos
// El loop exterior fija un numero
// El loop interior itera desde el siguiente elemento haciendo las sumas de los dos elementos
// Desde el siguiente elemento (j=i+1) para no sumar el elemento con si mismo
//
// Time complexity = O(n^2)
// Space complexity = O(1)

function getPairWithRequiredSum(numsArray, requiredSum) {
  // Check inputs
  if (numsArray.length <= 1 || typeof requiredSum !== "number") {
    return null
  }

  // Loop suma
  for (let i = 0; i < numsArray.length; i++) {
    for (let j = i + 1; j < numsArray.length; j++) {
      if (numsArray[i] + numsArray[j] === requiredSum) {
        return [numsArray[i], numsArray[j]]
      }
    }
  }
  return null
}

// 2)
// La siguiente solución, al escalar el problema, logra mejor rendimiento en tiempo
// Sacrificando a cambio algo en espacio para almacenar una hash table
// En vez de iterar nuevamente el array por cada elemento, vamos guardando value:index en un hashmap en un solo loop
// Por cada elemento, se va buscando en la tabla si ya existe un valor que sea complemento de la actual iteración
// (o sea que los dos sumen requiredSum)
//
// requiredSum - num[i] = complemento  --> buscamos si complemento existe en tabla
//
// ej: nums=[1, 6, 19] --- requiredSum=20
// Tabla:
//  valor | posición
//   1    |    0
//   6    |    1
//   19   |    2
//
// En este ejemplo, al llegar el loop al elemento nums[2], vemos que el complento de 19 es 1 (20-19=1) y que 1 se encuentra en la tabla
// Lo que significa que
// --> nums[0] + nums[2] = requiredSum
//
// Time complexity = O(n)
// Space complexity = O(n)

function getPairWithRequiredSumHashMapVersion(numsArray, requiredSum) {
  if (numsArray.length <= 1 || typeof requiredSum !== "number") {
    return null
  }

  const table = {}

  for (let i = 0; i < numsArray.length; i++) {
    const complement = requiredSum - nums[i]

    if (table.hasOwnProperty(complement)) {
      return [complement, nums[i]]
    }

    table[nums[i]] = i
    // console.log(table)
  }
  return null
}

// UI
// ------------------------------------------------------------------------------------
const $listOfNumbers = document.getElementById("list-of-numbers")
const $numberInput = document.getElementById("number")
const $result = document.getElementById("result")
const $addButton = document.getElementById("add-number")
const $requiredSumInput = document.getElementById("required-sum")
const $resetButton = document.getElementById("reset")
const $checkSumButton = document.getElementById("check-sum")

$addButton.addEventListener("click", addNumberToList)
$resetButton.addEventListener("click", reset)
$checkSumButton.addEventListener("click", checkSum)

let nums = []

function addNumberToList() {
  if (!$numberInput.value) {
    return
  }
  nums.push(+$numberInput.value)

  $listOfNumbers.textContent = nums.join(" - ")

  $numberInput.value = null
}

function reset() {
  nums = []
  $listOfNumbers.textContent = null
  $numberInput.value = null
  $requiredSumInput.value = null
  $result.textContent = null
}

function checkSum() {
  if (nums.length < 2 || !$requiredSumInput.value) {
    return
  }

  const requiredSum = +$requiredSumInput.value

  const values = getPairWithRequiredSumHashMapVersion(nums, requiredSum)

  const textContent = values
    ? `The sum of [${values}] gives ${requiredSum}`
    : `No pair adds up to ${requiredSum}`

  $result.textContent = textContent
}
