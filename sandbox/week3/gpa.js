//clean up inputs
function getGrades(inputSelector){
    const grades = document.querySelector(inputSelector).value;
    const gradesArray = grades.split(",");
    const cleanGrades = gradesArray.map((grade) => grade.trim().toUpperCase());
    console.log(cleanGrades);
    return cleanGrades;
}

//convert letter grade to points
function gradeToPoints(cleanGrades){
    let points = 0;
    if(cleanGrades === "A"){
        points = 4;
    }else if(cleanGrades === "B"){
        points = 3;
    }else if(cleanGrades === "C"){
        points = 2;
    }else if(cleanGrades === "D"){
        points = 1;
    }
    return points
}

//calculate the GPA
function calculateGpa(cleanGrades){
    const gradePoints = cleanGrades.map((grade) => gradeToPoints(grade));
    const gpa = gradePoints.reduce((total, num) => total + num, 0) / gradePoints.length;
    return gpa.toFixed(2);
}

function outputGpa(gpa, selector){
    const outputElement = document.querySelector(selector);
    outputElement.innerText = gpa;
}

function clickHandler(){
    const cleanGrades = getGrades("#grades");
    const gpa = calculateGpa(cleanGrades)
    outputGpa(gpa, "#output");
}

document.querySelector("#submitButton").addEventListener("click", clickHandler);