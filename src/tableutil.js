
// this is not a component. But just a utility file holding a helper function.

// create a function. which takes  some data and sort.

export const sortData = (data) => {
    // copy the data into a array
    const sortedData = [...data]

    // looping through the entire list. Imagine the first element is 'a' being compared with second element 'b' and so on.

    // sortedData.sort((a,b) => {
    //     if (a.cases > b.cases) {
    //         return -1;
    //     }
    //     else {
    //         return 1;
    //     }

    
    // }
    // return to App.js
    // return sortedData;

    // or we can just do this
    //  if a is greater than b dont do anything else sort a and b
    return sortedData.sort((a,b) => (a.cases > b.cases ?  -1 : 1));

}