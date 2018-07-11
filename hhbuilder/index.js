// your code goes here ...

const householdObj = {}
let memberId = 0

function formManipulation(){
  let builder = document.getElementsByClassName("builder")[0]
  let htmlForm = builder.getElementsByTagName("form")[0]
  htmlForm.onsubmit = formSubmit
  let age = document.getElementsByName("age")[0]
  age.required = true
  let relationship = document.getElementsByName("rel")[0]
  relationship.required = true
  let addButton = document.getElementsByClassName("add")[0]
  addButton.onclick = addClick
}

function addClick(){
  let memberObj = {
    age: document.getElementsByName("age")[0].value,
    relationship: document.getElementsByName("rel")[0].value,
    smoker: document.getElementsByName("smoker")[0].checked
  }
  let valid = validator(memberObj)
  if (valid) {
    householdObj[memberId] = memberObj
    householdDisplay(memberObj, memberId)
    memberId++
    return false;
  } else {
    return false
  }
  
}

function validator(obj){
  let age = obj.age
  let relationship = obj.relationship
  if(relationship === "") {
    alert("relationship is required")
    return false;
  } 
  if (!age) {
    alert('age is required')
    return false;
  }
  if (Number(age) < 0){
    alert('age must be greater than zero');
    return false;
  }
  else return true
}

function householdDisplay(memberObj, idNum){
  console.log(memberObj)
  let household = document.getElementsByClassName("household")[0]
  let memberLi = document.createElement("li")
  memberLi.id = memberObj.id
  memberLi.appendChild(document.createTextNode(`age: ${memberObj.age}, relationship: ${memberObj.relationship}, smoker: ${memberObj.smoker}`))
  household.appendChild(memberLi)

  let removeButton = document.createElement("button")
  removeButton.appendChild(document.createTextNode('remove'))
  memberLi.appendChild(removeButton)
  removeButton.onclick = removeMember

  function removeMember(){
    console.log('remove clicked')
    household.removeChild(memberLi)
    delete householdObj[idNum]
  }
}

function formSubmit(){
  let json = JSON.stringify(householdObj)
  let container = document.getElementsByClassName("debug")[0]
  container.innerHTML = `the following household has been submitted: 
  ${json}`
  container.style.display = "flex"
  return false
}

formManipulation();
