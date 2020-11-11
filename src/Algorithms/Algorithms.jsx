// here return animations array , used to decide 
// when to compare / relax comparison
// when and what to swap (as tell indices) 


//--------------------------------------------- Merge Sort-----------------------------------------------//
export function mergeSortAnimations(array){
    const animations = [];
    if(array.length < 1)
        return animations;

    
    mergeSortHelper(array , 0 , array.length-1 , animations);
    return animations;
}

function mergeSortHelper(
    array , start , end , animations
){
    if(start === end)
        return;

    let mid = Math.floor((end + start)/2);

    mergeSortHelper(array , start , mid , animations);
    mergeSortHelper(array , mid+1 , end , animations);
    merge(array , start , mid , end , animations);

    return;
}

function merge(
    array,start, mid, end,animations
){
    let i = 0;
    let j = 0;
    let k = start;
    let left = array.slice(start,mid+1);
    let right = array.slice(mid+1, end+1);
    left.push(10000);
    right.push(10000);
    while(k <= end)
    {   
        let iequiv = Math.min(i+start , mid);   // till last element only
        let jequiv = Math.min(mid+1+j , end);   
        animations.push([iequiv, jequiv]);
        animations.push([iequiv, jequiv]);
        if(left[i] <= right[j])
        {
            array[k] = left[i];
            i = i + 1;
        } else {
            array[k] = right[j];
            j = j+1;
        }
        animations.push([k , array[k]]);
        k = k+1;
    }

}


//first element of animations is the key element 
//0 -> first selection change to comparision color
//1 -> means second selection change to original color
//2 -> means actual swap so 2nd element is first index and 3rd element is other index

//--------------------------------------------------------- QUICK SORT --------------------------------------------------------------------------

// may have PROBLEM DUE TO LET / CONST
// *** OR MOST PROBABLY PROBLEM IN ALGO...

export function quickSortAnimations(array){
    const animations = [];
    if(array.length < 1)
        return animations;
    quickSortHelper(array , 0 , array.length-1 , animations);
    return animations;
}

function quickSortHelper(
    array , start , end , animations
){
    if(start < end){
        let pivot = pivotPartition(array , start , end , animations);
        quickSortHelper(array , start , pivot-1 , animations);
        quickSortHelper(array , pivot+1 , end , animations);
    }
    return animations;
}

function pivotPartition(
    array , start , end , animations
){
    // choose pivot
    let pivot = Math.floor((start + end)/2);

    // select/compare array[pivot] and array[end]
    animations.push([0 , pivot , end]);
    // swap 2 array indice values
    animations.push([2 , pivot , end]);
    // deselect
    animations.push([1 , pivot , end]);
    
    // swapping (here reflecting in current array)
    [array[pivot] , array[end]] = [array[end] , array[pivot]];

    return partition(array , start , end , animations);
}

function partition( 
    array , start , end , animations
){
    let i = start-1;
    // const pivotElement = array[end];
    for(let j = start; j < end; j++){
        if(array[j] <= array[end]){
            i++;
            animations.push([0 , i , j]);
            animations.push([2 , i , j]);
            animations.push([1 , i , j]);
            
            [array[i] , array[j]] = [array[j] , array[i]];
        }
    }
    // assign pivot immediately after all small/equal_to it 
    i++;
    animations.push([0 , i , end]);
    animations.push([2 , i , end]);
    animations.push([1 , i , end]);

    [array[i] , array[end]] = [array[end] , array[i]];

    return i;   // final pivot position (divide array into left/right partitions)
}

//----------------------------------Heap Sort--------------------------------------------------------------

export function heapSortAnimations(array) {
    const animations = [];
    if(array.length < 1) return animations;
    heapSortHelper(array, animations);
    return animations;
}


function left(i) {
    return 2*i + 1;
}

function right(i) {
    return 2*i + 2;
}


//0->select
//1->deselect
//2->swap
function heapSortHelper(array, animations) {
    // build heap
    buildMaxHeap(array, animations);
    let heapsize = array.length;
    // extract top (largest element) at end , then correct heap
    for(let i = array.length-1; i >= 1; --i ) {
        animations.push([0 , i , 0]);
        animations.push([2 , i , 0]);
        animations.push([1 , i , 0]);
        [array[0], array[i]] = [array[i], array[0]];
        heapsize = heapsize-1;
        maxHeapify(array, 0, heapsize, animations);
    }
}

function maxHeapify(array, i, heapsize,  animations) {
    let l = left(i);
    let r = right(i);
    let largest = i;
    if(l < heapsize && array[i] < array[l]){
        largest = l;
        animations.push([0 , largest , l]);
        animations.push([1 , largest , l]);
    }
    if(r < heapsize && array[largest] < array[r]){
        largest = r;
        animations.push([0 , largest , r]);
        animations.push([1 , largest , r]);
    }

    if(largest !== i)
    {
        animations.push([0 , i , largest]);
        animations.push([2 , i , largest]);
        animations.push([1 , i , largest]);
        [array[i], array[largest]] = [array[largest], array[i]];
        maxHeapify(array, largest, heapsize, animations)
    }   
}

function buildMaxHeap(array, animations) {
    let heapsize = array.length;
    for(let i = Math.floor(array.length/2) - 1; i >= 0; --i)
    {
        maxHeapify(array, i, heapsize, animations);
    }
}


//-----------INSERTIONSORT------------------------
//first element of animations is the key element 
//0 -> select
//1 -> deselect
//2 -> swap
export function insertionSortAnimations(array) {
    const animations = [];
    if(array.length < 1) return animations;
    insertionSortHelper(array, animations);
    return animations;
}

function insertionSortHelper(array, animations) {
    for(let i = 1; i < array.length; ++i)
    {
        let j = i-1;

        let temp = array[i];
        animations.push([0 , i , i]);
        animations.push([1 , i , i]);
        while(j >= 0 && array[j] > temp)
        {
            animations.push([0 , j , j+1]);
            animations.push([2 , j , j+1]);
            animations.push([1 , j , j+1]);
            [array[j], array[j+1]] = [array[j+1], array[j]];
            j--;
        }
    }
}
