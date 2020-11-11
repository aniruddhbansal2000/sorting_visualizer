import React, {Component} from 'react';
import './Visualizer.css';
import {mergeSortAnimations , quickSortAnimations , heapSortAnimations , insertionSortAnimations} from '../Algorithms/Algorithms';

const ARRAYLENGTH = 60;
const MINHEIGHT = 5;
const MAXHEIGHT = 500;
const COMPCOLOR = 'purple';
const ORGCOLOR = 'DodgerBlue';
const ANIMATION_SPEED_MS = 10;//00/(ARRAYLENGTH*3);

class Visualizer extends Component{

    constructor(props) {
        super(props);
    
        this.state = {  
          array: []                          
        };
    }
    
    componentDidMount() {
        this.resetArray();
    }


    resetArray(){
        let array = [];
        for(let i = 0; i < ARRAYLENGTH; i++){
            array.push(RandomIntFromRange(MINHEIGHT,MAXHEIGHT));
        }
        this.setState({array});    
    }

    //--------------------------------------MERGESORT----------------------------------------------------//
    //mergesort implemented here
    //i%3 == 0 -> 2bars are selected for comparision change color
    //i%3 == 1 -> revert color of the bars after comparision
    //i%3 == 2 -> set one of the bars in the main array from the left and the right arrays
    mergeSort(){
        // in mergeSort -> assign values from 2 sorted partitons
        // whereas in quick/heap/insertion sort -> HAVE SWAPS (unlike merge sort) , SO CAN HAVE COMMON FUNCTION FROM animations array
        const animations = mergeSortAnimations(this.state.array);

        for(let i = 0; i < animations.length; i++){
            // here DIRECTLY CHANGE DOCUMENT , array in state changed(when making animaions) , but not reflected
            // bar - class for all bars (so here return all bars in row class from 0 to length-1)
            let array = document.getElementsByClassName('bar');

            const colorChange = i%3 !== 2;
            if(colorChange){
                const [barOneId , barTwoId] = animations[i];
                // here for each bar , inBar handle style , so ask for it -> return object (1 entry) - take first and only one
                const barOneInnerStyle = array[barOneId].getElementsByClassName('inBar')[0].style;
                const barTwoInnerStyle = array[barTwoId].getElementsByClassName('inBar')[0].style;

                const setcolor = i%3 === 0? COMPCOLOR : ORGCOLOR;  // set color (compare start / compare over)
                setTimeout(() => {
                    // execute after/on fixed predetermined time
                    barOneInnerStyle.backgroundColor = setcolor;
                    barTwoInnerStyle.backgroundColor = setcolor;
                }, i*ANIMATION_SPEED_MS);
            }

            else{
                setTimeout(() => {
                    let [barId , barHt] = animations[i];
                    // here change height of bar (equal to sorted value) - show as IF BAR CHANGED
                    array[barId].style.height = `${barHt}px`;
                }, i*ANIMATION_SPEED_MS);
            }
        }
    }
    
    //---------------------------------------------QUICKSORT---------------------------------------------//
    quickSort(){
        const animations = quickSortAnimations(this.state.array);
        this.animate(animations);
    }
    //-----------------------------------------------HEAPSORT--------------------------------------------//
    heapSort(){
        const animations = heapSortAnimations(this.state.array);
        this.animate(animations);
    }
    //-----------------------------------------INSERTION SORT--------------------------------------------//
    insertionSort(){
        let animations = insertionSortAnimations(this.state.array);
        this.animate(animations);
    }
    //first element of animations is the key element 
    //0 -> first selection change to comparision color
    //1 -> means second selection change to original color
    //2 -> means actual swap so 2nd element is first index and 3rd element is other index
    animate(animations){
        for(let i = 0; i < animations.length; i++){
            let array = document.getElementsByClassName('bar');
            const [barOneId , barTwoId] = animations[i].slice(1);
            if(animations[i][0] !== 2){
                
                const barOneInnerStyle = array[barOneId].getElementsByClassName('inBar')[0].style;
                const barTwoInnerStyle = array[barTwoId].getElementsByClassName('inBar')[0].style;

                const setcolor = animations[i][0] === 0? COMPCOLOR : ORGCOLOR;
                setTimeout(() => {
                    barOneInnerStyle.backgroundColor = setcolor;
                    barTwoInnerStyle.backgroundColor = setcolor;
                }, i*ANIMATION_SPEED_MS);
            }

            else{
                setTimeout(() => {
                const bar1Ht =  parseInt(array[barOneId].style.height.slice(0,-2));  // extract value of height
                const bar2Ht =  parseInt(array[barTwoId].style.height.slice(0,-2));  // same..
                // swap bar height (seem as if swapping bar/numbers)
                array[barOneId].style.height = `${bar2Ht}px`;
                array[barTwoId].style.height = `${bar1Ht}px`;                        
                }, i*ANIMATION_SPEED_MS);
            }
        }
    }

    render(){
        const array = this.state.array; 
        // mergeSort();  
        return(
            <div className="array">
                <div className="row">
                    {array.map((val,idx) => (
                        <div 
                        className="bar"
                        key = {idx}
                        style= {{
                            height: `${val}px`,
                        }}><div className="inBar"></div>
                        </div>
                    ))}
                </div>

                <div className="buttonBar">
                    <button onClick={() =>this.mergeSort()}>
                        Merge Sort
                    </button>
                    <button onClick={() =>this.quickSort()}>
                        Quick Sort
                    </button>
                    <button onClick={() =>this.resetArray()}>
                        Generate New Array
                    </button>
                    <button onClick={() =>this.heapSort()}>
                        Heap Sort
                    </button>
                    <button onClick={() =>this.insertionSort()}>
                        Insertion Sort
                    </button>
                </div>
                <div className="lenInput">
                    {/* <input type="number"></input> */}
                </div>
            </div>
        );

    }
}

export default Visualizer;

function RandomIntFromRange(min , max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}
