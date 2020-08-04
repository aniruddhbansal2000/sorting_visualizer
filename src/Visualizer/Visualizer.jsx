import React, {Component} from 'react';
import './Visualizer.css';
import {mergeSortAnimations , quickSortAnimations , heapSortAnimations , insertionSortAnimations} from '../Algorithms/Algorithms';

const ARRAYLENGTH = 100;
const MINHEIGHT = 5;
const MAXHEIGHT = 500;
const COMPCOLOR = 'red';
const ORGCOLOR = 'yellow';
const ANIMATION_SPEED_MS = 5;//00/(ARRAYLENGTH*3);

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
    mergeSort() {
        const animations = mergeSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; ++i)
        {
            let array = document.getElementsByClassName("bar");
            const ColorChange = i%3 !== 2;
            if(ColorChange){
                const[barOneIdx, barTwoIdx] = animations[i];
                const barOneInnerStyle = array[barOneIdx].getElementsByClassName("inBar")[0].style;
                const barTwoInnerStyle = array[barTwoIdx].getElementsByClassName("inBar")[0].style;
                //Bool two check wether to give comparision color or original color
                const setColor = i%3 === 0 ? COMPCOLOR : ORGCOLOR;
                setTimeout(() => {
                    barOneInnerStyle.backgroundColor = setColor;
                    barTwoInnerStyle.backgroundColor = setColor;
                },i * ANIMATION_SPEED_MS);
            } else{
                setTimeout(() => {
                    const [barIdx, newHt] = animations[i];
                    array[barIdx].style.height = `${newHt}px`;
                }, i* ANIMATION_SPEED_MS);
            }
        }
    }
    
    //--------------------QUICKSORT------------------------
    quickSort(){
        const animations = quickSortAnimations(this.state.array);
        this.animate(animations);
    }
    //-------------------HEAPSORT-------------------------
    heapSort() {
        const animations = heapSortAnimations(this.state.array);
        this.animate(animations);
    }
    //-------------------INSERTION SORT-----------------
    insertionSort() {
        const animations = insertionSortAnimations(this.state.array);
        this.animate(animations);
    }
    //first element of animations is the key element 
    //0 -> first selection change to comparision color
    //1 -> means second selection change to original color
    //2 -> means actual swap so 2nd element is first index and 3rd element is other index
    animate(animations) {
        for(let i = 0; i<animations.length; ++i)
        {
            let array = document.getElementsByClassName("bar");
            if(animations[i][0] === 0)//select the two elements
            {
                const[barOneIdx, barTwoIdx] = animations[i].slice(1);
                const barOneInnerStyle = array[barOneIdx].getElementsByClassName("inBar")[0].style;
                const barTwoInnerStyle = array[barTwoIdx].getElementsByClassName("inBar")[0].style;

                setTimeout(() => {
                    barOneInnerStyle.backgroundColor = COMPCOLOR;
                    barTwoInnerStyle.backgroundColor = COMPCOLOR;
                },i * ANIMATION_SPEED_MS);
            } else if(animations[i][0] === 1)//deselect the two elements
            {
                const[barOneIdx, barTwoIdx] = animations[i].slice(1);
                const barOneInnerStyle = array[barOneIdx].getElementsByClassName("inBar")[0].style;
                const barTwoInnerStyle = array[barTwoIdx].getElementsByClassName("inBar")[0].style;

                setTimeout(() => {
                    barOneInnerStyle.backgroundColor = ORGCOLOR;
                    barTwoInnerStyle.backgroundColor = ORGCOLOR;
                },i * ANIMATION_SPEED_MS);
            } else if(animations[i][0] === 2) { // swap the two elements
                setTimeout(() => {
                    const [bar1Idx, bar2Idx] = animations[i].slice(1);
                    const bar1Ht =  parseInt(array[bar1Idx].style.height.slice(0,-2));
                    const bar2Ht =  parseInt(array[bar2Idx].style.height.slice(0,-2));
                    array[bar1Idx].style.height = `${bar2Ht}px`;
                    array[bar2Idx].style.height = `${bar1Ht}px`;
                }, i* ANIMATION_SPEED_MS);
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
                {/* {console.log(arr)} */}
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
