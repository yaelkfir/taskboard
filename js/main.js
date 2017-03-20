/**
 * Created by yaelo on 2/27/17.
 */
//DOM

const ENTER = 13;

/** general functions */

function addEventListeners(elements, arrayOfEvents, eventListener) {
  for (const element of elements) {
    for (const event of arrayOfEvents) {
      element.addEventListener(event, eventListener);
    }
  }
}

function createElement(tagName, className, parent) {

  const element = document.createElement(tagName);

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

function toggleVisibility(element) {
  if (element.style.display === 'block') {
    element.style.display = 'none';
  }
  else {
    element.style.display = 'block';
  }
}

function getInishials(str) {

  const strArr = str.split(' ');
  const twoWordArr = [];
  for (const smallStr of strArr) {
    const letter = smallStr[0];

    twoWordArr.push(letter);
  }
  return twoWordArr.join('');
}

function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;

  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop == to) return;
    scrollTo(element, to, duration - 10);
  }, 10)
}




/** list functions */

//create list
function handelListMaking(data) {

  if (data !== undefined) {
    const lists = data;
    const main = document.querySelector('main');

    main.innerHTML = `<div class="boards board-flex">
    <div class="list-container board-flex height-100">
    </div>
      <div>
       <button type="button" class="btn add-list-btn-primary  btn-primary margin-right" onclick="handelListMaking()">
          add new list..
       </button>
      </div>
    </div>`;

    lists.forEach((list) => {
      createList(list)
    });
  }

  else {
    createList();
  }

  function createList(list) {

    function handelListName(obj) {

      if (obj !== undefined) {
        listName.innerHTML = obj.title;

      }
      else {
        listName.innerHTML = "brand new list";
      }
    }

    function handelCards(obj, task) {

      if (obj !== undefined) {
        let tasks = obj.tasks;

        for (task of tasks) {

          //create card wraper and appand to dad ul
          const cardWraper = createElement('li', ['assignment'], listUl);
          cardWraper.tabIndex = '0';
          cardWraper.setAttribute('data-id', `${task.id}`);
          cardWraper.setAttribute('draggable', "true");

          cardWraper.addEventListener('dragstart', dragStart);
          cardWraper.addEventListener("dragend",dargEnd);
          cardWraper.addEventListener("dragover", dragOver);
          cardWraper.addEventListener("dragleave", dragLeave);
          //create edit btn and appand to dad ul
          const editBtn = createElement('button', ['card-edit-btn', 'btn', 'btn-info', 'btn-xs'], cardWraper);
          editBtn.textContent = 'Edit card';
          editBtn.addEventListener("click", toggleModal);

          //create interactive task description
          const cardDiscription = createElement('p', ['card-description', 'p-no-margins'], cardWraper);

          cardDiscription.textContent = task.text;

          //loop the member

          membersMaker(task.members, cardWraper);

        }
      }
    }

    function handelListId(obj) {

      if (obj !== undefined) {
        newList.setAttribute('data-id', list.id);
      }
      else {
        newList.setAttribute('data-id', uuid());
      }
    }

    /*create the list*/

    const listsContainer = document.querySelector('main > div > div');

    const newList = createElement('section', ['panel panel-default'], listsContainer);

    const listHead = createElement('div', ['panel-heading, task-name-wraper'], newList);

    const listName = createElement('h3', ['panel-title'], listHead);

    handelListId(list);
    handelListName(list);
    listName.tabIndex = '0';

    listName.addEventListener("click", changeListName);
    listName.addEventListener('keydown', changeListName);

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

    //darg&drop

    listUl.addEventListener("dragover", allowDrop);
    listUl.addEventListener("drop", dropCard);

    // highlight potential drop target when the draggable element enters it


    //create the add card btn in footer and give class and onclick
    const addCardBtn = createElement('span', ['panel-footer-btn'], listFooter);

    addCardBtn.innerHTML = `
<span class="padding-right glyphicon glyphicon-plus"></span>Add New Card`;
    listFooter.addEventListener("click", addNewCard);

    if (list === undefined) {
      addNewListToAppData(newList, listName);
    }
  }
}


//events
function deleteList(event) {

  //target the list
  const target = event.target;
  const listSection = target.closest('.panel');
  const listSectionId = listSection.getAttribute('data-id');
  const listsContainer = document.querySelector('.list-container');
  const listTitle = listSection.querySelector('h3').textContent;

  const r = confirm(`Deleting ${listTitle} list. Are you sure?`);
  if (r === true) {
    listsContainer.removeChild(listSection);
    //remove list from appData
    removeListFromAppData(listSectionId);
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

function saveListName(event) {

  if (event.keyCode === ENTER || event.type === 'blur') {

    const target = event.target;
    const container = target.closest('.task-name-wraper');
    const list = target.closest('.panel');
    const listDataId = list.getAttribute('data-id');
    const title = container.querySelector('h3');


    //Change in appData
    changeListNameInAppData(listDataId, target);

    if (target.style.display === 'block') {
      //target the h3
      title.textContent = target.value;
      title.style.display = 'block';
      target.style.display = 'none';
    }
  }
}

function addNewCard(event) {

//scroll to the lest card added.
  const targetElement = event.target;
  targetElement.blur();

  const parantSection = targetElement.closest('.panel-default');
  const parentSectionId = parantSection.getAttribute('data-id');
  const currentList = parantSection.querySelector('.flex-box');
  const cardWraper = createElement('li', ['assignment'], currentList);

  const editBtn = createElement('button', ['card-edit-btn', 'btn', 'btn-info', 'btn-xs'], cardWraper);
  editBtn.textContent = 'Edit card';
  editBtn.addEventListener("click", toggleModal);
  const cardDiscription = createElement('p', ['card-description', 'p-no-margins'], cardWraper);
  cardDiscription.textContent = 'new card';
  const parntScroler = parantSection.querySelector('.over-flow-mask');


  scrollTo(parntScroler, parntScroler.scrollHeight, 300);
  const cardId = uuid();
  cardWraper.setAttribute('data-id', `${cardId}`);

  cardWraper.setAttribute('draggable', "true");
  cardWraper.addEventListener('dragstart', dragStart);
  cardWraper.addEventListener("dragend",dargEnd);
  cardWraper.addEventListener("dragover", dragOver);
  cardWraper.addEventListener("dragleave", dragLeave);

  addCardToListInAppData(cardId, cardDiscription, parentSectionId);

}

//drag & drop

function dragStart(e) {

  const draggedCardId = e.target.getAttribute('data-id');
  e.dataTransfer.setData("text/plain", draggedCardId);
  e.target.style.opacity = 0.5;
  e.target.style.border = '3px solid #c8ecfd'
}

function dragOver(e) {
  const target = e.target;
  if (e.target.className !== " flex-box") {
    if (target.className !== 'assignment') {

      const targetCard = target.closest('.assignment');
      targetCard.style.borderTop = '5px solid #c8ecfd'
    }
    if (target.className === 'assignment') {
      target.style.borderTop = '5px solid #c8ecfd'
    }
  }
}

function dragLeave(e) {
  const target= e.target;

  if (e.target.className !== " flex-box") {
    if (target.className !== 'assignment') {

      const targetCard = target.closest('.assignment');
      targetCard.style.borderTop = '1px solid #c8ecfd'
    }

    if (target.className === 'assignment') {
      target.style.borderTop = '1px solid #c8ecfd'
    }
  }
}

function dargEnd(e){
  e.target.style.opacity = 1;
  e.target.style.border = '1px solid #c8ecfd'

}

function allowDrop(e) {
  e.preventDefault();
}

function dropCard(e) {

  e.preventDefault();
// get needed data from to in order to save the card in the dragged to list in app data
  const draggedCardId = e.dataTransfer.getData("text/plain");
  const dragedCard = document.querySelector(`[data-id = '${draggedCardId}']`);
  const dragedToList = e.target.closest('.panel');
  const dragedToListId = dragedToList.getAttribute('data-id');
  const oldListId = dragedCard.closest('.panel').getAttribute('data-id');
  const ulList = e.target.closest('.flex-box');

  //appData card

  let draggedCardInAppData = getCardDataById(oldListId, draggedCardId);


  if (e.target.className !== " flex-box") {

    if (oldListId !== dragedToListId) {

      const targetTask = e.target.closest('.assignment');
      targetTask.style.borderTop = '1px solid #c8ecfd'
      dragedCard.style.borderTop = '1px solid #c8ecfd'

      const targetTaskId = targetTask.getAttribute('data-id');

      ulList.insertBefore(dragedCard, targetTask);

      //apdate list in appdata saveMoveToListAppData(CardInAppData, moveToListId)
      saveMoveToListAppData(draggedCardInAppData, dragedToListId);

      updateTaskOrder(dragedToListId,dragedToList,targetTaskId,draggedCardId);

      //remove from prev list in appdata
      removeCardInAppData(oldListId, draggedCardId);


    }

    if (oldListId === dragedToListId) {

      const targetTask = e.target.closest('.assignment');
      const targetTaskId = targetTask.getAttribute('data-id');
      targetTask.style.borderTop = '1px solid #c8ecfd';
      dragedCard.style.borderTop = '1px solid #c8ecfd';

      ulList.insertBefore(dragedCard, targetTask);

      //save new task order to appdata
//get the tasks order from dom

      updateTaskOrder(dragedToListId,dragedToList,targetTaskId,draggedCardId);
    }

  }

  else {

    const targetTask = e.target.closest('.assignment');

    ulList.insertBefore(dragedCard, targetTask)

    const scrollerContainer = ulList.closest('.over-flow-mask');
    //get the e targt
    scrollTo(scrollerContainer, scrollerContainer.scrollHeight, 300);


    //apdate list in appdata saveMoveToListAppData(CardInAppData, moveToListId)
    saveMoveToListAppData(draggedCardInAppData, dragedToListId);

    //remove from prev list in appdata
    removeCardInAppData(oldListId, draggedCardId);

  }

}


/** modal functions */

function removeModalContent(cardModal) {
  const moveToList = cardModal.querySelector('.move-to-list');
  const membersList = cardModal.querySelector('.check-box-list');

  const options = moveToList.querySelectorAll('option');
  options.forEach((option) => {
    moveToList.removeChild(option)
  });
  const members = membersList.querySelectorAll('label');
  members.forEach((member) => {
    membersList.removeChild(member)
  });
}

function getMembersToModal(membersList,selectedCardData){
  const members = getMembersFromAppData();

  members.forEach((member) => {

    let memberLabel = createElement('label', ['margin-top-5', 'display-block', 'form-check-label'], membersList);

    memberLabel.innerHTML = `<input class="margin-right-5 form-check-input" type="checkbox">${member.name}`;
    memberLabel.setAttribute('data-id', `${member.id}`)
    //check correct members
    selectedCardData.members.forEach((memberData) => {

      if (memberData === member.id) {
        memberLabel.innerHTML = `<input class="margin-right-5 form-check-input" type="checkbox" checked>${member.name}`;
      }
    });
  });
}

function getListsandTxtToModal(moveToList,selectedListId,selectedCardId,textArea){
  const lists = getLists();

  lists.forEach((list) => {

    let option = createElement('option', undefined, moveToList);
    option.setAttribute('data-list-id', list.id);
    option.textContent = list.title;

    const optionId = option.getAttribute('data-list-id');
    if (optionId === selectedListId) {
      option.selected = true;


      //add card description
      let card = list.tasks.find((task) => {
        return task.id === selectedCardId;
      });
      textArea.value = card.text;
    }
  });
}

function getModalContent(target, cardModal) {

  const moveToList = cardModal.querySelector('.move-to-list');
  const textArea = cardModal.querySelector('textarea');
  const membersList = cardModal.querySelector('.check-box-list');

  const selectedPanel = target.closest('.panel');
  const selectedcard = target.closest('.assignment');
  const selectedListId = selectedPanel.getAttribute('data-id');
  const selectedCardId = selectedcard.getAttribute('data-id');
  const cardModalId = cardModal.setAttribute('data-card', selectedCardId);
  const listModalId = cardModal.setAttribute('data-list', selectedListId);

  const selectedListData = findListInAppData(selectedListId);

  const selectedCardData = findCardByListInAppData(selectedListData,selectedCardId);

  //add members
  getMembersToModal(membersList,selectedCardData);

  //fill move-to options and text area content
  getListsandTxtToModal(moveToList,selectedListId,selectedCardId,textArea);

}



//save btn
function saveCardTxt(currentCardDom, selectedListId, selectedCardId) {

  //save DOM elements
  const textArea = document.querySelector('textarea');
  const cardTxt = currentCardDom.querySelector('p');
  cardTxt.textContent = textArea.value;

  //save change in AppData
  saveModalDiscription(selectedListId, selectedCardId, cardTxt);

}

function saveCardMembers(cardModal, currentCardDom, selectedListId, selectedCardId) {
  const checkboxes = cardModal.querySelectorAll("input[type ='checkbox']");

  const temMembersArr = [];

  //find checked modal checkboxes
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked === true) {
      //get the checkbox label container id and push it to temarr
      let lableId = checkbox.closest('label').getAttribute('data-id');
      temMembersArr.push(lableId);
    }
  });

  //get the current card footer
  const selectedCardFooter = currentCardDom.querySelector('.assignment-footer');
  //if it 'is' remove it
  if (selectedCardFooter) {
    currentCardDom.removeChild(selectedCardFooter);
  }

  //make new members in current card
  membersMaker(temMembersArr, currentCardDom);

  saveModalMembers(selectedListId, selectedCardId, temMembersArr);
}

function saveMoveToList(moveToList, selectedListId, currentCardBoard, currentCardInAppData, selectedCardId) {
  const listOptions = moveToList.querySelectorAll('option');

  //get the selected option
  let selectedOption = '';

  listOptions.forEach((listOption) => {
    if (listOption.selected === true) {
      selectedOption = listOption;
    }
  });

  //get the selected option id
  let selectedOptionId = selectedOption.getAttribute('data-list-id');

  if (selectedOptionId !== selectedListId) {
    //get the card
    const moveCardTo = document.querySelector(`[data-id = "${selectedOptionId}"]`);

    //get the correct card holder in the correct list
    const moveToCardContainer = moveCardTo.querySelector('.flex-box');

    //put the  card in the correct list
    moveToCardContainer.appendChild(currentCardBoard);

    //save to appData
    saveMoveToListAppData(currentCardInAppData, selectedOptionId);

    removeCardInAppData(selectedListId, selectedCardId);

  }
}

//
function saveCardHandler(event) {

  //get modal dom
  const cardModal = document.querySelector('.light-box');
  const moveToList = cardModal.querySelector('.move-to-list');
  const selectedCardId = cardModal.getAttribute('data-card');
  const selectedListId = cardModal.getAttribute('data-list');

  //get appdata
  let currentListInAppData = findListInAppData(selectedListId);

  let currentCardInAppData = findCardByListInAppData(currentListInAppData, selectedCardId);

  //get boardPage dom
  const currentCardBoard = document.querySelector(`[data-id = "${selectedCardId}"]`);


  //SAVE CARD DESCRIPTION
  saveCardTxt(currentCardBoard, selectedListId, selectedCardId);

  //SAVE MODAL IN MEMBERS
  saveCardMembers(cardModal, currentCardBoard, selectedListId, selectedCardId);

  //remove thae task from current list in appData
  //MOVE TO LIST
  saveMoveToList(moveToList, selectedListId, currentCardBoard, currentCardInAppData, selectedCardId);

  //save in appData

  //hide modal
  cardModal.style.display = 'none';

  removeModalContent(cardModal);

}

//delete btn
function deleteCard(event) {
  const cardModal = document.querySelector('.light-box');
  const selectedCardId = cardModal.getAttribute('data-card');
  const selectedListId = cardModal.getAttribute('data-list');

  const lists = document.querySelectorAll('.panel');

  let selectedList = '';

  lists.forEach((list) => {
    const temListId = list.getAttribute('data-id');
    if (temListId === selectedListId) {
      selectedList = list;
    }
  });

  const listCards = selectedList.querySelectorAll('.assignment');


  let selectedcard = '';

  listCards.forEach((card) => {
    const temCardId = card.getAttribute('data-id');
    if (temCardId === selectedCardId) {
      selectedcard = card;
    }
  });

  const selectedListUl = selectedList.querySelector('.flex-box');

  selectedListUl.removeChild(selectedcard);
  removeCardInAppData(selectedListId, selectedCardId);
  cardModal.style.display = 'none';
  removeModalContent(cardModal);

}

//close + edit btn
function toggleModal(event) {
  //get modal dom element
  const cardModal = document.querySelector('.light-box');
  //close modal
  if (cardModal.style.display === 'flex') {
    cardModal.style.display = 'none';

    removeModalContent(cardModal);
  }
  //open modal
  else {
    cardModal.style.display = 'flex';
    const target = event.target;

    getModalContent(target, cardModal);
  }
}


/** member functions */

//open edit name mode
function changeMember(event) {

  const currentTarget = event.target;

  const currentMemberLi = currentTarget.closest('li');
  const editBtnContainer = currentMemberLi.querySelector('.btn-container');
  const saveNameBtnContainer = currentMemberLi.querySelector('.edit-member-btn-container');
  const memberInPut = currentMemberLi.querySelector('input');
  const memberName = currentMemberLi.querySelector('span');

  saveNameBtnContainer.style.display = 'flex';
  memberInPut.style.display = 'block';
  memberInPut.setAttribute('value', `${memberName.textContent}`)
  memberName.style.display = 'none';
  //toggel class list
  editBtnContainer.classList.toggle('display-none');

}

//close edit name mode
function cancelMemberEditing(event) {
  const target = event.target

  const currentMemberLi = target.closest('li');
  const memberInPut = currentMemberLi.querySelector('input');
  const memberName = currentMemberLi.querySelector('span');
  const saveNameBtnContainer = currentMemberLi.querySelector('.edit-member-btn-container');
  const editBtnContainer = currentMemberLi.querySelector('.btn-container');

  memberInPut.style.display = 'none';
  memberInPut.value = `${memberName.textContent}`;

  memberName.style.display = 'block';
  saveNameBtnContainer.style.display = 'none';
  editBtnContainer.classList.toggle('display-none');
}

//save changed name
function saveMemberEditing(event) {
  const target = event.target

  const currentMemberLi = target.closest('.list-group-item');
  const memberDataId = currentMemberLi.getAttribute('data-id');
  const memberInPut = currentMemberLi.querySelector('input');
  const memberName = currentMemberLi.querySelector('span');
  const saveNameBtnContainer = currentMemberLi.querySelector('.edit-member-btn-container');
  const editBtnContainer = currentMemberLi.querySelector('.btn-container');

  //change the currnt member name in dom
  memberInPut.style.display = 'none';
  memberName.textContent = `${memberInPut.value}`;

  memberName.style.display = 'block';
  saveNameBtnContainer.style.display = 'none';
  editBtnContainer.classList.toggle('display-none');

  saveMemberEditingInAppData(memberDataId, memberInPut);
  function changeMemberNameInTasks() {

  }
}

//add/remove members
function DeleteMember(event) {
  const target = event.target;
  const membersList = document.querySelector('.members-list');
  const currentMemberLi = target.closest('.list-group-item');
  const memberDataId = currentMemberLi.getAttribute('data-id');

  membersList.removeChild(currentMemberLi);
  removeMemberFromAppDataMembers(memberDataId);
}

function createMember(memberData) {

  function handelMemberName(memberData) {

    if (memberData !== undefined) {
      memberName.textContent = memberData.name;

    }
    else {

      const membersInput = document.querySelector('.add-new-member > input');
      const memberDataId = member.getAttribute('data-id');

      if (membersInput.value !== '') {

        memberName.textContent = membersInput.value;

        addMemberObjToAppData(memberDataId, membersInput);
      }

      else {
        membersList.removeChild(memberInPlace);
      }

      membersInput.value = '';
    }
  }

  function handelMemberId(memberData) {
    if (memberData !== undefined) {
      member.setAttribute('data-id', memberData.id);
    }
    else {
      member.setAttribute('data-id', uuid());

    }
  }

  const membersList = document.querySelector('.members-list');
  const ListInput = document.querySelector('.add-new-member');


  const member = createElement('li', ['list-group-item'], membersList);
  handelMemberId(memberData);
  const memberInPlace = membersList.insertBefore(member, ListInput);


  const memberName = createElement('span', undefined, memberInPlace);
  handelMemberName(memberData);

  const memberNameInput = createElement('input', ['list-name-input', 'member-name-input'], memberInPlace);

  const btnContainer = createElement('div', ['btn-container'], memberInPlace);
  btnContainer.innerHTML = ` 
          <button class="edit-member btn btn-info btn-xs">Edit</button>
          <button class="delete-member btn btn-danger btn-xs">Delete</button>
`
  const deleltMemberBtn = btnContainer.querySelector('.delete-member');
  const editMemberBtn = btnContainer.querySelector('.edit-member');

  const EditMemberBtnContainer = createElement('div', ['edit-member-btn-container'], memberInPlace);
  EditMemberBtnContainer.innerHTML = `
          <button class="cancel-member-btn btn btn-default btn-xs">Cancel</button>
          <button class="save-member-btn btn btn-success btn-xs">save</button>
`
  deleltMemberBtn.addEventListener("click", DeleteMember);
  editMemberBtn.addEventListener("click", changeMember);

  const cancelMemberBtn = EditMemberBtnContainer.querySelector('.cancel-member-btn');
  const saveMemberBtn = EditMemberBtnContainer.querySelector('.save-member-btn');

  cancelMemberBtn.addEventListener("click", cancelMemberEditing);
  saveMemberBtn.addEventListener("click", saveMemberEditing);

}

function handelMemberMaking(data) {

  if (data !== undefined) {
    const membersData = data.members;

    const main = document.querySelector('main');

    main.innerHTML = `<div class="members">
    <h2 class="display-block capitalize">taskboard members</h2>
    <ul class="members-list list-group">
      <li class="add-new-member list-group-item">
      <input class="display-block list-name-input" type="text" placeholder="Add new member">
        <button type="button" onclick="handelMemberMaking()" class="btn btn-primary">add</button>       
      </li>
    </ul>
  </div>`;

    for (let memberData of membersData) {
      createMember(memberData);
    }
  }
  else {
    createMember();
  }
}

/** loading page functions */

//get the json data of pages
function getBoardData() {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListenerData);
  oReq.open("GET", "assets/board.json");
  oReq.send();
}
function getMemberData() {
  const memberReq = new XMLHttpRequest();

  memberReq.addEventListener("load", reqListenerMember);
  memberReq.open("GET", "assets/members.json");
  memberReq.send();

}

//change the selcted li in nav bar by hash
function selectedNavLink(page) {

  const navbar = document.querySelector('.navbar-nav');
  const memberLi = navbar.querySelector('.member');
  const boardLi = navbar.querySelector('.board');

  if (page === 'member') {
    memberLi.classList.add('active');
    boardLi.classList.remove('active');
  }
  if (page === 'board') {
    memberLi.classList.remove('active');
    boardLi.classList.add('active');
  }
}


//run json data on arrival to page
function onArrival() {
  window.addEventListener('hashchange', handelPages);

  let LocalAppData = JSON.parse(localStorage.getItem('appData'));

  console.info('local data const',LocalAppData);
  if(!LocalAppData){
    console.info('no local data');

    getBoardData();
    getMemberData();
  }

  if (LocalAppData){

    console.info('yes local data',LocalAppData);
    console.info('is it the same?',appData);

    appData = LocalAppData;

    console.info('yey! appData', appData);

    handelPages();
  }
}


onArrival();

