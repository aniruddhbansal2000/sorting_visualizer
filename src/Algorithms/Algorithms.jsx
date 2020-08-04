 


//----------------------------------------------------- Merge Sort-------------------------------------------------------------------------------
export function mergeSortAnimations(array) {
    const animations = [];
    if(array.length<=1)
        return array;
    mergeSortHelper(array,0,array.length-1,animations);
    return animations;
}

function mergeSortHelper(
    array, start, end,animations
) {
    if(start===end) return;
    if(start<end){
        let mid = start + Math.floor((end-start)/2);
        mergeSortHelper(array,start, mid, animations);
        mergeSortHelper(array,mid+1,end, animations);
        merge(array,start, mid, end, animations);
    }
}

function merge(array,start, mid, end,animations)
{
    let i = 0;
    let j = 0;
    let k = start;
    const left = array.slice(start,mid+1);
    const right = array.slice(mid+1, end+1);
    const LSIZE = left.length;
    const RSIZE = right.length;
    while(i<LSIZE && j<RSIZE)
    {   
        let iequiv = i+start;
        let jequiv = mid+1+j;
        animations.push([iequiv, jequiv]);
        animations.push([iequiv, jequiv]);
        if(left[i]<=right[j])
        {
            animations.push([k, left[i]]);
            array[k] = left[i];
            i = i + 1;
        } else {
            animations.push([k, right[j]]);
            array[k] = right[j];
            j = j+1;
        }
        k = k+1;
    }

    while(i<LSIZE){
        let iequiv = start+i;
        animations.push([iequiv, iequiv]);
        animations.push([iequiv, iequiv]);
        animations.push([k, left[i]]);
        array[k] = left[i];
        i = i+1;
        k = k+1;
    }

    while(j<RSIZE)
    {
        let jequiv = mid+1+j;
        animations.push([jequiv, jequiv]);
        animations.push([jequiv, jequiv]);
        animations.push([k, right[j]]);
        array[k] = right[j];
        j = j+1;
        k = k+1;
    }
}


//--------------------------------------------------------- QUICK SORT --------------------------------------------------------------------------


export function quickSortAnimations(array) {
    const animations=[];
    if(array.length<=1) return array;
    quickSortHelper(array , 0 , array.length-1 , animations);
    return animations;
}


//first element of animations is the key element 
//0 -> first selection change to comparision color
//1 -> means second selection change to original color
//2 -> means actual swap so 2nd element is first index and 3rd element is other index

function quickSortHelper(array,start, end, animations) {
    if(start < end)
    {
        const pivot = randomizedPartition(array , start , end , animations)
        quickSortHelper(array, start, pivot - 1, animations);
        quickSortHelper(array, pivot+1, end, animations);
    }
    return animations
}

function randomizedPartition(array, start, end, animations){
    const pivot = Math.floor(Math.random()*(end - start + 1))+start;
    //select pivot and end to swap
    animations.push([0, pivot, end]);
    //swap values of pivot and end
    animations.push([2,pivot,end]);
    //revert color of pivot and end
    animations.push([1, pivot, end]);
    [array[pivot], array[end]] = [array[end], array[pivot]];
    return partition(array, start, end, animations);
}

function partition(array, start, end, animations) {
    const pivot = array[end];
    let i = start - 1
    for(let j = start; j<end; ++j)
    {
        if(array[j] <= pivot)
        {
            i += 1;
            //select i and j to compare
            animations.push([0, i, j]);
            //swap i and j
            animations.push([2, i ,j]);
            //deselect i and j
            animations.push([1, i, j]);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    i += 1;
    //select i and end
    animations.push([0, i, end]);
    //swap i and end
    animations.push([2, i, end]);
    //deselect i and end
    animations.push([1, i, end]);
    [array[i] , array[end]] =[array[end], array[i]];
    return i;
}

//----------------------------------Heap Sort--------------------------------------------------------------

export function heapSortAnimations(array) {
    const animations = [];
    if(array.length <= 1) return animations;
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
    buildMaxHeap(array, animations);
    let heapsize = array.length-1;
    for(let i = array.length-1; i>=1; --i ) {
        animations.push([0,i,0]);
        animations.push([2,i,0]);
        animations.push([1,i,0]);
        [array[0], array[i]] = [array[i], array[0]];
        heapsize = heapsize-1;
        maxHeapify(array,0, heapsize,animations);
    }
}

function maxHeapify(array, i, heapsize,  animations) {
    let l = left(i);
    let r = right(i);
    let largest = i;
    if(array[i]<array[l] && l<=heapsize){
        largest = l;
        animations.push([0,i,l]);
        animations.push([1,i,l]);
    }
    if(array[largest]<array[r] && r<=heapsize){
        animations.push([0,largest, r]);
        animations.push([1,largest,r]);
        largest = r;
    }

    if(largest !== i)
    {
        animations.push([0 ,i ,largest]);
        animations.push([2 ,i ,largest]);
        animations.push([1, i, largest]);
        [array[i], array[largest]] = [array[largest], array[i]];
        maxHeapify(array, largest, heapsize, animations)
    }   
}

function buildMaxHeap(array, animations) {
    let heapsize = array.length-1;
    for(let i = Math.floor(array.length/2)-1; i>=0; --i)
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
    if(array.length<=1) return animations;
    insertionSortHelper(array, animations);
    return animations;
}

function insertionSortHelper(array, animations) {
    for(let i = 1; i<array.length; ++i)
    {
        let j = i-1;

        let temp = array[i];
        animations.push([0,i,i]);
        animations.push([1,i,i]);
        while(j>=0 && array[j]>temp)
        {
            animations.push([0,j,j+1]);
            animations.push([2,j,j+1]);
            animations.push([1,j,j+1]);
            [array[j], array[j+1]] = [array[j+1], array[j]];
            j--;
        }
    }
}
