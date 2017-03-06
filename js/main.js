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

function createElement(tagName, className, parent) {
  const element = document.createElement(tagName);
  /*

   a.forEach(function(element) {
   console.log(element);
   });
   const cardDiscription = createElement('p', ['card-description', 'p-no-margins'], cardWraper);

   */

  if (className !== undefined) {
    let classesStr = '';
    className.forEach((e) => {
      classesStr += ' ' + e;
    });
    element.className = classesStr;

  }

  if (parent !== undefined) {
    parent.appendChild(element);

  }

  return element;
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

function changeListName(event) {

  if (event.keyCode === ENTER || event.type === 'click') {
    const currentTarget = event.target;
    const currentPanelHeader = currentTarget.parentNode;

    //target the input

    const titleInPut = currentPanelHeader.querySelector('input');
    titleInPut.style.display = 'block';
    titleInPut.focus();

    //hide title
    currentTarget.style.display = 'none';
  }
}

function saveListName(event) {

  if (event.keyCode === ENTER || event.type === 'blur') {

    const target = event.target;
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
function toggelModal(event){

  console.log(event.target);

  const cardModal = document.querySelector('.light-box');
  if (cardModal.style.display === 'flex') {
    cardModal.style.display = 'none';
  }
  else {
    cardModal.style.display = 'flex';
    const closecardModalBtns = cardModal.querySelectorAll('.close-modal');

    for(const closecardModalBtn of closecardModalBtns ){
      closecardModalBtn.addEventListener("click", toggelModal);
    }
  }
}

function addNewCard(event) {

  //how to add the members?
  //take 2 1st letter from each str
  //chang the text
  function scrollTo(element, to, duration){
    if (duration <= 0) return;
    const difference = to - element.scrollTop;
    const perTick = difference / duration * 10;

    setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop == to) return;
      scrollTo(element, to, duration - 10);
    }, 10)
  }

  const targetElement = event.target;
  console.info(targetElement);
targetElement.blur();

  const parantSection = targetElement.closest('.panel-default');

  const currentList = parantSection.querySelector('.flex-box');

  const cardWraper = createElement('li', ['assignment'], currentList);

  const editBtn = createElement('button', ['card-edit-btn', 'btn', 'btn-info', 'btn-xs'], cardWraper);
  editBtn.textContent = 'Edit card';
  editBtn.addEventListener("click", toggelModal);

  const cardDiscription = createElement('p', ['card-description', 'p-no-margins'], cardWraper);
  cardDiscription.textContent = 'new card';

  const parntScroler = parantSection.querySelector('.over-flow-mask');

  scrollTo(parntScroler, parntScroler.scrollHeight, 300);
}


//new list to main

function createList(list) {

  function handelListName(obj) {

    if (obj !== undefined) {
      listName.innerHTML = obj.title;

    }
    else {
      listName.innerHTML = "brand new card";
    }
  }


  function handelCards(obj) {

    if (obj !== undefined) {

      let tasks = list.tasks;
      for (task of tasks) {
        //create card wraper and appand to dad ul
        const cardWraper = createElement('li', ['assignment'], listUl);
        cardWraper.tabIndex = '0';


        //create edit btn and appand to dad ul
        const editBtn = createElement('button', ['card-edit-btn', 'btn', 'btn-info', 'btn-xs'], cardWraper);
        editBtn.textContent = 'Edit card';
        editBtn.addEventListener("click", toggelModal);

        //create interactive task description
        const cardDiscription = createElement('p', ['card-description', 'p-no-margins'], cardWraper);
        cardDiscription.textContent = task.text;

        //loop the member

        membersMaker();

        function getInishials(str) {

          const strArr = str.split(' ');
          const twoWordArr = [];
          for (const smallStr of strArr) {
            const letter = smallStr[0].toUpperCase();
            console.info(letter);

            console.log(letter);
            twoWordArr.push(letter);
          }
          return twoWordArr.join('');
        }

        function membersMaker() {
          if (task.members.length > 0) {

            const cardFooter = createElement('div', ['assignment-footer'], cardWraper);

            for (let member of task.members) {
              const userOnTask = createElement('span', ['user-icon', 'label', 'label-primary'], cardFooter);
              userOnTask.innerHTML = getInishials(member);
            }
          }
        }
      }
    }
  }


  /*create the list*/

  const listsContainer = document.querySelector('main > div > div');

  //create the list add it to dad and give class
  const newList = createElement('section', ['panel panel-default'], listsContainer);

  //create the list head add it to dad and give class
  const listHead = createElement('div', ['panel-heading, task-name-wraper'], newList);

  //create the title head name
  const listName = createElement('h3', ['panel-title'], listHead);

  handelListName(list);
  listName.tabIndex = '0';

  listName.addEventListener("click", changeListName);
  listName.addEventListener('keydown', changeListName);

  //create input with currnet name as value and add events listiner
  const titelInPut = createElement('input', ['list-name-input'], listHead);

  titelInPut.setAttribute("value", `${listName.innerHTML}`);
  titelInPut.style.display = "none";

  titelInPut.addEventListener("blur", saveListName);
  titelInPut.addEventListener('keydown', saveListName);

  //create the editBtn container
  const editBtnContainer = createElement('div', ['btn-group'], listHead);

  editBtnContainer.innerHTML = `
              <button type="button" class="delete-btn btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="smaller-glyphicon glyphicon glyphicon-triangle-bottom"></span>
            </button>
            <ul class="ul-drop-down dropdown-menu">
              <li><a href="#"><span class="padding-right glyphicon glyphicon-trash
                "></span>Delete</a></li>
            </ul>
`;
  //target btn and add events
  const editBtn = editBtnContainer.querySelector('button');
  const deleteLi = editBtnContainer.querySelector('li');

  addEventListeners([editBtn], ['click', 'blur', 'keydown'], handelDropDown);
  addEventListeners([deleteLi], ['mousedown'], deleteList);

  //create the list content add it to dad and give class
  const overFlowMask = createElement('div', ['over-flow-mask'], newList);

  //create the list ul
  const listUl = createElement('ul', ['flex-box'], overFlowMask);
  handelCards(list);
  //create the list footer add it to dad and give class
  const listFooter = createElement('div', ['panel-footer', 'list-footer'], newList);
  listFooter.tabIndex = '0';

  //create the add card btn in footer and give class and onclick
  const addCardBtn = createElement('span', ['panel-footer-btn'], listFooter);

  addCardBtn.innerHTML = `
<span class="padding-right glyphicon glyphicon-plus"></span>
            Add New Card
`;
  listFooter.addEventListener("click", addNewCard);

}


function handelListMaking(data) {

  if (data !== undefined) {
    const lists = data.board;

    for (let list of lists) {
      console.info(list);
      createList(list);
    }
  }

  else {
    createList();
  }
}

function MembersHandeler() {
  console.info(event.target);
  craeteMember();
}

//make a function similar to the input h3 save and change name


function craeteMember() {

  function changeMember(event) {

    const currentTarget = event.target;
    const currentMemberLi = currentTarget.closest('li');


    const memberInPut = currentMemberLi.querySelector('input');
    const memberName = currentMemberLi.querySelector('span');
    console.info(memberInPut);

    memberInPut.style.display='block';
    memberInPut.setAttribute( 'value', `${memberName.textContent}` )
    memberName.style.display='none';




  }

  const membersList = document.querySelector('.members-list');
  const ListInput = document.querySelector('.add-new-member');


  const member = createElement('li', ['list-group-item'], membersList);

  const memberInPlace = membersList.insertBefore(member, ListInput );


  const memberName = createElement('span', undefined, memberInPlace);
  memberName.textContent ='namle'
  const memberNameInput = createElement('input', ['list-name-input','member-name-input'], memberInPlace);

  const btnContainer = createElement('div', ['btn-container'], memberInPlace);
  btnContainer.innerHTML =` 
          <button class="edit-member btn btn-info btn-xs">Edit</button>
          <button class="delete-member btn btn-danger btn-xs">Delete</button>
`
  const deleltMemberBtn = btnContainer.querySelector('.delete-member');
  const editMemberBtn = btnContainer.querySelector('.edit-member');


  deleltMemberBtn.addEventListener("click", craeteMember);
  editMemberBtn.addEventListener("click", changeMember);

}

craeteMember();


//get JSON
function reqListener(event) {
  const target = event.target

  let data = JSON.parse(target.responseText);

  handelListMaking(data);

  //board is array of obj

}


const oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "assets/board.json");
oReq.send();


