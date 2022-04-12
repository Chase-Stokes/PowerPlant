// class Plant {
//     constructor() {
//       this.water = 0;
//       this.soil = 0;
//       this.light = 0;
//     }
//     hydrate() {
//       this.water ++
//     }
//     feed() {
//       this.soil ++
//     }
//     giveLight() {
//       this.light ++
//     }
//   }
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// methods can only be called on the plant class
// methods are mutating any object they are called on

// const feed = (plant) => {
//     return {
//       ...plant,
//       soil: (plant.soil || 0) + 1
//     }
//   };
// still limited to the plant object class and is specific to one property so its not very reusable
//------------------------------------------------------------------------------------------------


// const changePlantState = (plant, property) => {
//     return {
//         ...plant,
//         [property]: (plant[property] || 0) + 1
//     }
// }
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// how you would use this on a plant object to adjust properties without mutating original object

// let plant = { soil: 0, light: 0, water: 0 }
// changePlantState(plant, "soil") <-- passing in plant object and the property you want to change
// {soil: 1, light: 0, water: 0}
//-------------------------------------------------------------------------------------------------


// const changeState = (state, prop) => {
//     return {
//         ...state,
//         [prop]: (state[prop] || 0) + 1
//     }
// }
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// this makes the function no longer limited to plants
// now it could increment the property of any state by 1
//-------------------------------------------------------------------------------------------------


// const changeState = (state, prop, value) => {
//     return {
//         ...state,
//         [prop]: (state[prop] || 0) + value
//     }
// }
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// small change to previous function, but allows it to be more flexible
// in the process weve gone from a unary function which takes one arguement to a function that takes three
//----------------------------------------------------------------------------------------------------------


// const changeState = (prop) => {
//     return (value) => {
//         return (state) => ({
//             ...state,
//             [prop] : (state[prop] || 0) + value
//         })
//     }
// }
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// curried function
// prop is passed into outer function, value inner function, and state innermost function
// examples below


// const feed = changeState("soil");       \
// const hydrate = changeState("water");    > these pass in the outer parameter
// const giveLight = changeState("light"); /
// feed(5)(plant) <---- this passes in the value then the state

// could be even more specific

// const blueFood = changeState("soil")(5)
// blueFood(plant)
//----------------------------------------------------------------------------------------------------------------


// in the above code, we have no place to save the information
// to make it fully functional we need to retrieve the state from the DOM when we need to update it
// below is a function to store our state inside a function

// this approach uses closures a very important concept
// const storeState = () => {
//     let currentState = {};
//     return (stateChangeFunction) => {
//       const newState = stateChangeFunction(currentState);
//       currentState = {...newState};
//       return newState;
//     }
//   }

// we will need to store our function in another constant like so 
// const stateControl = storeState();

// if we were to look at the value of stateControl we would see

// (stateChangeFunction) => {
//     const newState = stateChangeFunction(currentState);
//     currentState = {...newState};
//     return newState;
//   }

// we could pass in a default parameter as well like below

// const storeState = () => {
//     let currentState = {};
//     return (stateChangeFunction = state => state) => {
//         const newState = stateChangeFunction(currentState);
//         currentState = {...newState};
//         return newState;
//     }
// }

// so this is saying if stateChangeFunction is undefined/no argument is passed in, the stateChangeFunction should be state=>state
// this means all we need to do is call stateControl() without arguments in order to return the current state

