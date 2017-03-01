/**
 * Created by yaelo on 2/27/17.
 */


const addCardBtns = document.querySelectorAll('.panel-footer > button');
const ENTER = 13;
const listNames = document.querySelectorAll('.panel-heading > h3');
const listNamesInputs = document.querySelectorAll('.panel-heading > input');
const dropdownbtns = document.querySelectorAll('.panel-heading  button');
console.info(dropdownbtns);

//loops adds EventListeners
//check event function
/*
 if (event.type === ENTER){
 currentTarget.focus();

 if(dropDownUl.style.display === 'block'){
 dropDownUl.style.display = 'none';
 console.info('click');
 }
 else {
 dropDownUl.style.display = 'block';
 console.info('click');
 }
 }

 if(event.type === 'click'){
 currentTarget.focus();
 if(dropDownUl.style.display === 'block'){
 dropDownUl.style.display = 'none';
 }
 else {
 dropDownUl.style.display = 'block';
 }
 }

 if(event.type === 'blur'){
 if(dropDownUl.style.display === 'block'){
 dropDownUl.style.display = 'none';

 }
 }

/*loop events
 */




//adEvent on document

for (let listName of listNames) {

  listName.addEventListener("click",changeName);
  listName.addEventListener('keydown',changeName);
  listName.tabIndex = "0";

}

for (let btn of addCardBtns) {

  btn.addEventListener("click", addCard);

}


for (let listNamesInput of listNamesInputs) {

  listNamesInput.addEventListener("blur",saveName);
  listNamesInput.addEventListener('keydown', saveName);
}


addEventListeners(dropdownbtns, ['click', 'blur', 'keydown'], openDropDwon);

function addEventListeners(elements, arrayOfEvents, eventListener) {
  for (const element of elements) {
    for (const event of arrayOfEvents) {
      element.addEventListener(event, eventListener);
    }
  }
}

//


function openDropDwon(event) {

  const currentTarget = event.target;
  console.info(currentTarget);
  const currentBtnFather = currentTarget.parentNode;
  const dropDownUl = currentBtnFather.querySelector('.dropdown-menu');

  if (event.type === ENTER){
    currentTarget.focus();
    toggleVisibility(dropDownUl);
  }

  if(event.type === 'click'){
    currentTarget.focus();
    toggleVisibility(dropDownUl);
  }

  if(event.type === 'blur'){

    if(dropDownUl.style.display === 'block'){
      dropDownUl.style.display = 'none';

    }
  }
}

function toggleVisibility(element) {
  if(element.style.display === 'block'){
    element.style.display = 'none';
  }
  else {
    element.style.display = 'block';
  }
}

function changeName(event) {

  if (event.keyCode === ENTER || event.type === 'click') {
    const currentTarget = event.target;
    const currentPanelHeader = currentTarget.parentNode;

    //target the input

    const titelInPut = currentPanelHeader.querySelector('input')
    titelInPut.style.display = 'block';
    titelInPut.focus();

    //hide title
    currentTarget.style.display = 'none';

  }
}

function saveName(event) {

  if (event.keyCode === ENTER || event.type === 'blur') {
    const target = event.target

    const container = target.parentNode;

    const titel = container.querySelector('h3');



    if (target.style.display === 'block') {
      //target the h3
      titel.innerHTML = target.value;
      titel.style.display = 'block';
      target.style.display = 'none';

    }
  }
}

//add new Card to target list


function addCard(event) {

  const targetElement = event.target;

  //target list
  const parantSection = targetElement.parentNode.parentNode;
  const currentList = parantSection.querySelector('.flex-box');

  //add new Card

  createElement('li', 'assignment', currentList);

  console.info(parantSection);

}

function createElement(tagName, className, parent) {
  const element = document.createElement(tagName);

  if (className !== undefined) {
    element.className = className;
  }

  if (parent !== undefined) {
    parent.appendChild(element);

  }
  console.info(element);
  return element;
}

//add new list to main


function addList() {

  //take the list container
  const listsContainer = document.querySelector('main > div > div');


  //create the list add it to dad and give class

  const newList = createElement('section', 'panel panel-default', listsContainer);


  //create the list head add it to dad and give class

  const listHead = createElement('div', 'panel-heading', newList);


  //create the title head name

  const listName =  createElement('h3', 'panel-title', listHead);

  listName.innerHTML = "list name";
  listName.tabIndex = '0';

  listName.addEventListener("click", changeName);
  listName.addEventListener('keydown', changeName);

  //create input with currnet name as value and add events listiner

  const titelInPut = createElement('input', 'list-name-input', listHead);

  titelInPut.setAttribute("value", `${listName.innerHTML}`);
  titelInPut.style.display = "none";

  titelInPut.addEventListener("blur", saveName);
  titelInPut.addEventListener('keydown', saveName);


  //create the editBtn container

  const editBtnContainer =   createElement('div', 'btn-group', listHead);

  editBtnContainer.innerHTML=`
          <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             <span class="caret"></span>
          </button>
          <ul class="ul-drop-down dropdown-menu">
            <li><a href="#">Action</a></li>
          </ul>
`
  //target btn and add events
  const editBtn = editBtnContainer.querySelector('button');
  addEventListeners([editBtn], ['click', 'blur', 'keydown'], openDropDwon);

  //create the list content add it to dad and give class

  const overFlowMask =   createElement('div', 'over-flow-mask', newList);



  //create the list ul

  const listUl = createElement('ul', 'flex-box', overFlowMask);



  //create the list footer add it to dad and give class

  const listFooter =  createElement('div', 'panel-footer', newList);



  //create the add card btn in footer and give class and onclick

  const addCardBtn = document.createElement('button');
  listFooter.appendChild(addCardBtn);

  addCardBtn.innerHTML = "add a card...";

  addCardBtn.addEventListener("click", addCard);

}


