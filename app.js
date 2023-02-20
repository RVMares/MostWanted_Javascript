/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    personInfo += `Parents: ${person.parents}\n`;
    personInfo += `Current Spouse: ${person.currentSpouse}\n`;

    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function findPersonFamily(personObj, peopleArr){
    //find person by id (spouse)
    let spouse = findSpouse(personObj, peopleArr);        

    //find people by id (parents)
    let parents = findParents(personObj, peopleArr);
    
    //find people based on parents (siblings)
    let siblings = findSiblings(personObj, peopleArr);
    
    //return collection
    let family = spouse.concat(parents).concat(siblings);
    return family;
    
}

function findById(personObj, peopleArr, personPropStr){
    return peopleArr.filter(function(person)
        {return (personObj[personPropStr] === person.id)
    });
}

function findSpouse(personObj, peopleArr){
    let currentSpouse = findById(personObj, peopleArr, "currentSpouse");
    
    if (!currentSpouse[0]){
        return "This person is not married.\n";
    } else {
        return currentSpouse
        .map(function(personObj) {
            return `Spouse: ${personObj.firstName} ${personObj.lastName}\n`;
        })
    }
}

function findParents(personObj, peopleArr){
    let foundParents = peopleArr.filter(function(person){
        return (personObj.parents.includes(person.id))
    });
    if ((!foundParents[0]) && (!foundParents[1])) {
        return "This person's parents are not in the database.\n";
    } else {
        return foundParents
            .map(function(personObj) {
                return `Parent: ${personObj.firstName} ${personObj.lastName}\n`;   
            })
    }
}

function findSiblings(personObj, peopleArr){
    let foundSiblings = peopleArr.filter(function(person){
        return (personObj.parents.includes(person.parents[0]) || personObj.parents.includes(person.parents[1]))
    });
    if (!foundSiblings[0]) {
        return "This person does not have siblings.\n";
    } else {
        return foundSiblings
            .map(function(personObj){
                return `Sibling: ${personObj.firstName} ${personObj.lastName}\n`;
            })
    }
}

function findPersonDescendants(personObj, peopleArr){
    //find children based on shared parent
    let children = findChildren(personObj, peopleArr);

    //find grandchildren
    //let grandchildren = findGrandchildren(personObj, peopleArr);

    let descendants = children;
    return descendants
}

function findChildren(personObj, peopleArr){
    let foundChildren = peopleArr.filter(function(person){
        return (person.parents.includes(personObj.id))
    });
    if (!foundChildren[0]) {
        return "This person does not have children.\n";
    } else {
        return foundChildren
            .map(function(personObj){
                return `Child: ${personObj.firstName} ${personObj.lastName}\n`;
            })
    }
}

// function findGrandchildren(personObj, peopleArr){
//     let parentsOfGrandchildren = findChildren(personObj, peopleArr);
//     let foundGrandchildren = peopleArr.filter(function(person){
//         return (person.parentsOfGrandchildren.includes(personObj.id))
//     });
//     if (!foundGrandchildren[0]) {
//         return "This person does not have grandchildren.\n";
//     } else {
//         return foundGrandchildren
//             .map(function(personObj){
//                 return `Grandchild: ${personObj.firstName} ${personObj.lastName}\n`;
//             })
//     }
// }





function searchByTraits(personObj, peopleArr) {
    let traitSearch = promptFor (
        "Would you like to search by one or multiple traits? \nEnter 'one' or 'multiple'", chars
        ).toLowerCase();
    switch(traitSearch) {
        case "one":
            let singleTraitSearchResults = singleTraitSearch(personObj, peopleArr);
            alert(singleTraitSearchResults)
            break;
        case "multiple":
            let multTraitSearchResults = multipleTraitSearch(personObj, peopleArr, personPropStr)    
            alert(multTraitSearchResults)
            break;
        default:
            searchByTraits(personObj, peopleArr);
            break;
    }
}

// function singleTraitSearch(peopleArr, personPropStr) {
//     let desiredTrait = chooseSingleTrait(personPropStr)
//     //traitFilter, find people with single selcted trait
//     let foundByTrait = peopleArr.filter(function(people){
//         return(peopleArr[personPropStr].includes(desiredTrait));
//     })
//     //personObj.filter(function(people){
//     //    return(peopleArr[personPropStr].includes(desiredTrait))
    
//     //return collection
//     if (!foundByTrait[0]){
//         alert ("Try Again");
//         return singleTraitSearch(personObj, peopleArr);
//     }else{
//         return foundByTrait
//         .map(function(personObj) {
//             return `${personObj.desiredTrait}, ${personObj.firstName}, ${personObj.lastName}`
//         })
//     }
// }


function singleTraitSearch(personObj, peopleArr) {
    let chooseTrait = promptFor (
        "What trait would you like to search for?\nEnter 'gender', 'eyeColor', or 'occupation'.", chars);
    switch (chooseTrait) {
        case "gender":
            let gender = promptFor("What gender are you searching for? \nEnter 'male' or 'female'.", chars).toLowerCase(); 
            let findByGender = peopleArr.filter(function(person) {
                if (person.gender === gender) {
                    return true;
                }
            });
            return findByGender
                .map(function(personObj) {
                    return `${personObj.gender}: ${personObj.firstName} ${personObj.lastName}\n`;
            })

        case "eyeColor":
            let eyeColor = promptFor("What is the eye color?", chars).toLowerCase();
            let findByEyeColor = peopleArr.filter(function(person) {
                if (person.eyeColor === eyeColor) {
                    return true;
                }
            });
            return findByEyeColor.map(function(personObj) {
                return `eyeColor ${personObj.eyeColor}: ${personObj.firstName} ${personObj.lastName}\n`;
            })

        case "occupation":
            let occupation = promptFor("What is the occupation?", chars).toLowerCase();
            let findByOccupation = peopleArr.filter(function(person) {
                if (person.occupation === occupation) {
                    return true;
                }
            });
            return findByOccupation.map(function(personObj) {
                return `Occupation ${personObj.occupation}: ${personObj.firstName} ${personObj.lastName}\n`;
            })

        default:
            return singleTraitSearch(personObj, peopleArr);
    }
}


// const traits = ['gender', 'eyeColor', 'occupation']
// const traitCategories = traits.filter(trait => trait.match(traitFilter))



// function multipleTraitSearch() {
//     //traitSelection

//     //use list of traits to find person

//     //return person

// }

// function traitSelection() {
//     //filter array based on selected traits

//     //create list of traits
// }