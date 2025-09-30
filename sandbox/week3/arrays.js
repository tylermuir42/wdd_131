//  arrays.js
const steps = ["one", "two", "three"];
function listTemplate(step) {
  return `<li>${step}</li>`;
}
const stepsHtml = steps.map(listTemplate);
document.querySelector("#myList").innerHTML = stepsHtml.join("");

//example 2: make another array
const grades = ["A", "B", "A"];
function gradeToPoints(grade){
  let points = 0;
  if(grade === "A"){
    points = 4;
  } else if(grade === "B"){
    points = 3;
  }
  return points;
}
const gpaPoints = grades.map(gradeToPoints);
console.log(gpaPoints);

//example 3: use reduce
const pointsTotal = gpaPoints.reduce(function(total, item){
  return total + item;
});
const gpa = pointsTotal / gpaPoints.length;
console.log(gpa);

//example 4: use filter
const words = ["watermelon", "peach", "apple", "tomato", "grape"];
const shortWords = words.filter(function(word){
  return word.length < 6;
});
console.log(shortWords);

//example 5: use indexOf
const nums = [12, 34, 21, 54];
const luckyNumber = 21;
let luckyIndex = nums.indexOf(luckyNumber);
console.log(luckyIndex);