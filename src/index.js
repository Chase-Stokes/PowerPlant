import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';




// This function stores our state

const storeState = () => {
    let currentState= {};
    return (stateChangeFunction = state => state) => {
        const newState = stateChangeFunction(currentState);
        currentState = {...newState};
        return newState
    }
}

const stateControl = storeState();

// This is a function factory. We can easily create more specific functions that alter a plants soil, water, light to varying degrees

const changeState = (prop) => {
    return (value) => {
        return (state) => ({
            ...state,
            [prop]: (state[prop] || 0) + value
        })
    }
}

// We create four functions using our function factory, we could easily create many more

// const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

// const hydrate = changeState("water")(5);
// const superWater = changeState("water")(5);

$(document).ready(function() {

    // This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our function to alter soil. You can easily add more.

    $('#feed').click(function() {
        const newState = stateControl(blueFood);
        $('#soil-value').text(`Soil: ${newState.soil}`)
    });

    // This function doesnt actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the dom is holding anyway). However, students often do need the ability to see the current state without changing it so its included here for reference

    $('#show-state').click( function() {
        // we just need to call stateControl() without arguements to see our current state --- which we can do because of the code on line 5
        const currentState = stateControl();
        $('#soil-value').text(`Soil: ${currentState.soil}`)
    });
});