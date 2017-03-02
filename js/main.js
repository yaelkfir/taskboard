/**
 * Created by yaelo on 2/27/17.
 */


const ENTER = 13;


/*
 A list is a set of cards, where each card contains:

 A description - done
 A list of icons with the members that are assigned to the card, where each icon is actually the uppercase first letter of their name.
 A button edit will appear on mouse over on the whole card.
 Clicking it will open the “Card Edit” modal (outline below
 */
//make the li delete the to do list


//if parant ul is open than click on li will open are you sure window
//fix the on blur ul handler
/*
 problem - when blur in ul handler is active, it closes the ul, coz it blur Yo...
 if ul is open and blur than ul is block?
 */


//adEvent on document
onOpeningIndex();

function onOpeningIndex() {

  const addCardBtns = document.querySelectorAll('.panel-footer > button');
  const listNames = document.querySelectorAll('.panel-heading > h3');
  const listNamesInputs = document.querySelectorAll('.panel-heading > input');
  const dropDownBtns = document.querySelectorAll('.panel-heading  button');
  const dropDownLis = document.querySelectorAll('.ul-drop-down >  li');
  console.info(listNamesInputs);

  addTabIndx(listNames);

  addEventListeners(dropDownLis, ['mousedown'], deleteList);

  addEventListeners(listNames, ['click', 'keydown'], changeName);

  addEventListeners(addCardBtns, ['click'], addNewCard);

  addEventListeners(listNamesInputs, ['blur', 'keydown'], saveTitleName);

  addEventListeners(dropDownBtns, ['click', 'blur', 'keydown'], handelDropDown);

}


function deleteList(event) {

  //target the list
  const target = event.target;
  const list = target.closest('section');
  const listsContainer = document.querySelector('.list-container');
  const listTitle = list.querySelector('h3');

  console.info(listTitle.innerHTML);


  const r = confirm(`Deleting ${listTitle.innerHTML} list. Are you sure?`);
  if (r === true) {
    listsContainer.removeChild(list);
  }
}


function addEventListeners(elements, arrayOfEvents, eventListener) {
  for (const element of elements) {
    for (const event of arrayOfEvents) {
      element.addEventListener(event, eventListener);
    }
  }
}


function addTabIndx(elements) {
  for (let element of elements) {
    element.tabIndex = "0";
  }
}

function handelDropDown(event) {

  const currentTarget = event.target;
  const currentBtnFather = currentTarget.closest('.btn-group');
  const dropDownUl = currentBtnFather.querySelector('.dropdown-menu');

//target the ul li
  if (event.type === ENTER) {
    currentTarget.focus();
    toggleVisibility(dropDownUl);
  }

  if (event.type === 'click') {
    currentTarget.focus();
    toggleVisibility(dropDownUl);
  }

  if (event.type === 'blur') {
    if (dropDownUl.style.display === 'block') {
      dropDownUl.style.display = 'none';
    }
  }
}
function toggleVisibility(element) {
  if (element.style.display === 'block') {
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

function saveTitleName(event) {

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

function addNewCard(event) {

  const targetElement = event.target;
  const parantSection = targetElement.closest('.panel-default');
  const currentList = parantSection.querySelector('.flex-box');

  const cardWraper = createElement('li', ['assignment'], currentList);
  const editBtn = createElement('button', ['card-edit-btn','btn','btn-info','btn-xs'], cardWraper);
  editBtn.textContent = 'Edit card';
  const cardDiscription = createElement('p',['card-description','p-no-margins'], cardWraper);
  cardDiscription.textContent = `Lorem ipsum dolor sit amet, consec tetuer adipiscing elit, sed diam laoreet dolore magna aliquam eratvolutpat. Ut wisi`
  const cardFooter = createElement('div', ['assignment-footer'], cardWraper);
  const userOnTask = createElement('span', ['user-icon','label', 'label-primary'], cardFooter);
  userOnTask.textContent = 'yk';

}
/*
 function createCard() {

 }
 */
function createElement(tagName, className, parent) {
  const element = document.createElement(tagName);
/*
 a.forEach(function(element) {
 console.log(element);
 });
 */
  if (className !== undefined) {
    let classesStr = '';
    className.forEach((e) => { classesStr += ' '+ e;});
    element.className = classesStr;

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

  const newList = createElement('section', ['panel panel-default'], listsContainer);


  //create the list head add it to dad and give class

  const listHead = createElement('div', ['panel-heading'], newList);


  //create the title head name

  const listName = createElement('h3', ['panel-title'], listHead);

  listName.innerHTML = "list name";
  listName.tabIndex = '0';

  listName.addEventListener("click", changeName);
  listName.addEventListener('keydown', changeName);

  //create input with currnet name as value and add events listiner

  const titelInPut = createElement('input', ['list-name-input'], listHead);

  titelInPut.setAttribute("value", `${listName.innerHTML}`);
  titelInPut.style.display = "none";

  titelInPut.addEventListener("blur", saveTitleName);
  titelInPut.addEventListener('keydown', saveTitleName);


  //create the editBtn container
  const editBtnContainer = createElement('div', ['btn-group'], listHead);

  editBtnContainer.innerHTML = `
              <button type="button" class="delete-btn btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="caret"></span>
            </button>
            <ul class="ul-drop-down dropdown-menu">
              <li><a href="#"><span class="padding-right glyphicon glyphicon-trash
                "></span>Delete</a></li>
            </ul>
`
  //target btn and add events
  const editBtn = editBtnContainer.querySelector('button');
  const deleteLi = editBtnContainer.querySelector('li');

  addEventListeners([editBtn], ['click', 'blur', 'keydown'], handelDropDown);
  addEventListeners([deleteLi], ['mousedown'], deleteList);

  //create the list content add it to dad and give class
  const overFlowMask = createElement('div', ['over-flow-mask'], newList);

  //create the list ul
  const listUl = createElement('ul', ['flex-box'], overFlowMask);

  //create the list footer add it to dad and give class
  const listFooter = createElement('div', ['panel-footer'], newList);


  //create the add card btn in footer and give class and onclick
  const addCardBtn = createElement('button', ['panel-footer-btn'], listFooter);

  addCardBtn.innerHTML = `
<span class="padding-right glyphicon glyphicon-plus"></span>
            add a card...
`;
  addCardBtn.addEventListener("click", addNewCard);
}


