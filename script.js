let array = [];
const arrayContainer = document.getElementById('array-container');

function generateArray(size = 20) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    drawArray();
}

function drawArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value * 3}px`; 
        bar.classList.add('bar');
        arrayContainer.appendChild(bar);
    });
}

async function startBubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(j, j + 1);
            }
        }
    }
}

async function swap(i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    drawArray();

    
    await new Promise(resolve => setTimeout(resolve, 100));
}

async function startSelectionSort() {
   for (let i = 0; i < array.length - 1; i++) {
       let minIndex = i;
       for (let j = i + 1; j < array.length; j++) {
           if (array[j] < array[minIndex]) {
               minIndex = j;
           }
       }
       if (minIndex !== i) {
           await swap(i, minIndex);
       }
   }
}

async function startMergeSort() {
   await mergeSort(array, 0, array.length - 1);
}
 
async function mergeSort(arr, left, right) {
   if (left >= right) return;

   const middle = Math.floor((left + right) / 2);
   await mergeSort(arr, left, middle);
   await mergeSort(arr, middle + 1, right);
   await merge(arr, left, middle, right);
}
 
async function merge(arr, left, middle, right) {
   const leftArr = arr.slice(left, middle + 1);
   const rightArr = arr.slice(middle + 1, right + 1);

   let i = 0, j = 0, k = left;

   while (i < leftArr.length && j < rightArr.length) {
       if (leftArr[i] <= rightArr[j]) {
           arr[k++] = leftArr[i++];
       } else {
           arr[k++] = rightArr[j++];
       }
       drawArray();
       await new Promise(resolve => setTimeout(resolve, 100));
   }

   while (i < leftArr.length) arr[k++] = leftArr[i++];
   while (j < rightArr.length) arr[k++] = rightArr[j++];
}


generateArray();
