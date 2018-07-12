// your code goes here ...

const householdObj = {}
let memberId = 0

function formManipulation(){

  let htmlForm = document.getElementsByTagName('form')[0]
  htmlForm.onsubmit = addClick // making addClick the onsubmit function allows me to use HTML's built in form validation

  let age = document.getElementsByName('age')[0]
  age.required = true

  let relationship = document.getElementsByName('rel')[0]
  relationship.required = true

  let submitButton = document.getElementsByTagName('button')[1]
  submitButton.onclick = formSubmit

}

function addClick(){

  let memberObj = {
    age: document.getElementsByName('age')[0].value,
    relationship: document.getElementsByName('rel')[0].value,
    smoker: document.getElementsByName('smoker')[0].checked
  }

  let valid = validator(memberObj)
  if (valid) {
    householdObj[memberId] = memberObj
    householdDisplay(memberObj, memberId)
    memberId++
    return false // prevents the form submission from refreshing the page
  } else {
    return false
  }
}

function validator(obj){
  let age = obj.age
  if (Number(age) < 0){
    let container = document.getElementsByClassName('debug')[0]
    container.style.display = 'flex'
    container.innerHTML = 'age must be greater than zero'
    container.style.color = 'red'
    container.style.borderColor = 'red'
    return false;
  } else {
    return true
  }
}

function householdDisplay(memberObj, idNum){

  let household = document.getElementsByClassName('household')[0]

  let memberLi = document.createElement('li')
  memberLi.appendChild(document.createTextNode(`age: ${memberObj.age}, relationship: ${memberObj.relationship}, smoker: ${memberObj.smoker}`))
  household.appendChild(memberLi)

  let removeButton = document.createElement('button')
  removeButton.appendChild(document.createTextNode('remove'))
  memberLi.appendChild(removeButton)
  removeButton.onclick = removeMember

  function removeMember(){
    household.removeChild(memberLi)
    delete householdObj[idNum]
  }
}

function formSubmit(){
  let json = JSON.stringify(householdObj)

  let container = document.getElementsByClassName('debug')[0]
  container.style.display = 'flex'

  if (json === '{}') {
    container.innerHTML = 'Please add household members before submitting'
    container.style.color = 'red'
    container.style.borderColor = 'red'
    return false
  }
  // trip to the server would go in else statement, on a successful response the submitted household would be displayed
  container.innerHTML = `the following household has been submitted: 

${json}
  
Is this information incorrect? Edit your response and resubmit`

  container.style.whiteSpace = 'pre-wrap'
  container.style.color = 'black'
  container.style.borderColor = 'black'
  return false
}

formManipulation();
