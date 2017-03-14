/**
 * Created by yaelo on 2/27/17.
 */


const appData = {
  lists: [],
  members: []
};
const ENTER = 13;
/**
 * udating appdata
 */

//members
function removeMemberFromAppDataMembers(memberDataId) {
  let currentMember = appData.members.find((member) => {
    return member.id === memberDataId;
  });

  const index = appData.members.indexOf(currentMember);
  appData.members.splice(index, 1);
  removeMemberFromAppDataCards(memberDataId);
}

function removeMemberFromAppDataCards(memberDataId) {
  let toRemoveMember ='';
  // currentMember = id + name
  //find the tasks that have this id in members
  appData.lists.forEach((list)=>{

    list.tasks.forEach((task)=>{
      const members = task.members;

      members.forEach((member)=>{
        if(memberDataId === member){
          toRemoveMember = member;
          const index = members.indexOf(toRemoveMember);
          console.info(index);
          members.splice(index, 1);
        }
      });
    });
  });
}

function saveMemberEditingInAppData(memberDataId, memberInPut) {
  let currentMember = appData.members.find((member) => {
    return member.id === memberDataId;
  });
  //find the currnt member index in appdata
  const index = appData.members.indexOf(currentMember);

  currentMember.name = `${memberInPut.value}`;
}

function addMemberObjToAppData(memberDataId, membersInput) {
  let temMember = {
    id: `${memberDataId}`,
    name: `${membersInput.value}`
  };
  appData.members.push(temMember);
}


//lists
function addNewListToAppData(newList, listName) {
  const listDataId = newList.getAttribute('data-id');
  //add to appData
  let temList = {
    id: listDataId,
    title: `${listName.textContent}`,
    tasks: []
  }
  appData.lists.push(temList);

}

function removeListFromAppData(listSectionId) {
  let currentList = appData.lists.find((list) => {
    return list.id === listSectionId;
  });

  const index = appData.lists.indexOf(currentList);
  appData.lists.splice(index, 1);
}

function changeListNameInAppData(listDataId, target) {
  let currentList = appData.lists.find((list) => {
    return list.id === listDataId
  });

  const index = appData.lists.indexOf(currentList);

  appData.lists[index].title = target.value;
}


//cards
function addCardToListInAppData(cardId, cardDiscription, parentSectionId) {

  let tempCard = {
    id: `${cardId}`,
    text: `${cardDiscription.textContent }`,
    members: []
  };

  for (let list of appData.lists) {
    if (list.id === parentSectionId) {

      list.tasks.push(tempCard);
    }
  }
}


//modal
function saveModalChanges(selectedListId, selectedCardId, temMembersArr, cardTxt){
  //get the card from app data
  const selectedListData = appData.lists.find((list) => {
    return list.id === selectedListId;
  });
  //get the list from app data

  const selectedCardData = selectedListData.tasks.find((task) => {
    return task.id === selectedCardId;
  });

  selectedCardData.text = cardTxt.textContent;
  selectedCardData.members = temMembersArr;
}

function removeCardInAppData(selectedListId, selectedCardId){

  //find the list in appdata
  const selectedListData = appData.lists.find((list) => {
    return list.id === selectedListId;
  });

  const selectedCardData = selectedListData.tasks.find((task) => {
    return task.id === selectedCardId;
  });

  const index = selectedListData.tasks.indexOf(selectedCardData);
  selectedListData.tasks.splice(index, 1);

}




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
    const letter = smallStr[0].toUpperCase();

    twoWordArr.push(letter);
  }
  return twoWordArr.join('');
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

    function handelCards(obj) {

      if (obj !== undefined) {
        let tasks = obj.tasks;

        for (task of tasks) {

          //create card wraper and appand to dad ul
          const cardWraper = createElement('li', ['assignment'], listUl);
          cardWraper.tabIndex = '0';
          cardWraper.setAttribute('data-id', `${task.id}`);


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

function membersMaker(membersId, card) {
  if (membersId.length > 0) {
//add data-id to member span
    const cardFooter = createElement('div', ['assignment-footer'], card);

    for (let memberId of membersId) {

      const userOnTask = createElement('span', ['user-icon', 'label', 'label-primary'], cardFooter);
     appData.members.forEach((member)=>{
       if(member.id === memberId){
         let memberName = member.name
         userOnTask.setAttribute('title', `${memberName}`);
         userOnTask.innerHTML = getInishials(memberName);
       }
     });
    }
  }
}


//list btns and input
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
    console.info(container);
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
  addCardToListInAppData(cardId, cardDiscription, parentSectionId);

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

function getModalContent(target,cardModal) {

  const moveToList = cardModal.querySelector('.move-to-list');
  const textArea = cardModal.querySelector('textarea');
  const membersList = cardModal.querySelector('.check-box-list');

  const selectedPanel = target.closest('.panel');
  const selectedcard = target.closest('.assignment');
  const selectedListId = selectedPanel.getAttribute('data-id');
  const selectedCardId = selectedcard.getAttribute('data-id');
  const cardModalId = cardModal.setAttribute('data-card', selectedCardId);
  const listModalId = cardModal.setAttribute('data-list', selectedListId);

  //find card in appData
  const selectedListData = appData.lists.find((list) => {

    return list.id === selectedListId
  });


  const selectedCardData = selectedListData.tasks.find((task) => {

    return task.id === selectedCardId;
  });

  //add members
  appData.members.forEach((member) => {

    let memberLabel = createElement('label', ['margin-top-5' ,'display-block', 'form-check-label'], membersList);
    memberLabel.innerHTML = `<input class="margin-right-5 form-check-input" type="checkbox">${member.name}`;
    memberLabel.setAttribute('data-id',`${member.id}`)
    //check correct members
    selectedCardData.members.forEach((memberData) => {

      if (memberData === member.id) {
        memberLabel.innerHTML = `<input class="margin-right-5 form-check-input" type="checkbox" checked>${member.name}`;
      }
    });
  });

  //fill move-to options and text area content
  appData.lists.forEach((list) => {
    let option = createElement('option', undefined, moveToList);
    option.setAttribute('data-id', list.id);
    option.textContent = list.title;

    if (list.id === selectedListId) {
      option.selected = true;

      //add card description
      let card = list.tasks.find((task) => {
        return task.id === selectedCardId;
      });
      textArea.value = card.text;
    }
  });
}

function saveCardChanges(event) {

  //get selected move to option
  const cardModal = document.querySelector('.light-box');
  const textArea = document.querySelector('textarea');
  const moveToList = cardModal.querySelector('.move-to-list');
  const membersList = cardModal.querySelector('.check-box-list');
  const selectedCardId = cardModal.getAttribute('data-card');
  const selectedListId = cardModal.getAttribute('data-list');
  const lists = document.querySelectorAll('.panel');

  let selectedList ='';

  lists.forEach((list)=>{
  const temListId = list.getAttribute('data-id');
  if(temListId === selectedListId){
    selectedList = list;
  }
});

  const listCards = selectedList.querySelectorAll('.assignment');

  let selectedcard ='';

  listCards.forEach((card)=>{
    const temCardId = card.getAttribute('data-id');
    if(temCardId === selectedCardId){
      selectedcard = card;
    }
  });


  //change discreption
  const cardTxt = selectedcard.querySelector('p');
  cardTxt.textContent = textArea.value;

  //change members
  const checkboxes = cardModal.querySelectorAll("input[type='checkbox']");

  const temMembersArr = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked === true) {

      let lableId = checkbox.closest('label').getAttribute('data-id');
      console.info(lableId);
      temMembersArr.push(lableId);
    }
  });

  const selectedCardFooter = selectedcard.querySelector('.assignment-footer');

  if(selectedCardFooter){
    selectedcard.removeChild(selectedCardFooter);
  }

  membersMaker(temMembersArr, selectedcard);
  cardModal.style.display = 'none';
  saveModalChanges(selectedListId, selectedCardId, temMembersArr,cardTxt);
  removeModalContent(cardModal);
}

function deleteCard(event){
  const cardModal = document.querySelector('.light-box');
  const selectedCardId = cardModal.getAttribute('data-card');
  const selectedListId = cardModal.getAttribute('data-list');

  const lists = document.querySelectorAll('.panel');

  let selectedList ='';

  lists.forEach((list)=>{
    const temListId = list.getAttribute('data-id');
    if(temListId === selectedListId){
      selectedList = list;
    }
  });

  const listCards = selectedList.querySelectorAll('.assignment');

  let selectedcard ='';

  listCards.forEach((card)=>{
    const temCardId = card.getAttribute('data-id');
    if(temCardId === selectedCardId){
      selectedcard = card;
    }
  });

  const selectedListUl = selectedList.querySelector('.flex-box');

  selectedListUl.removeChild(selectedcard);
  removeCardInAppData(selectedListId, selectedCardId);
  cardModal.style.display = 'none';
  removeModalContent(cardModal);

}

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
        <input class="display-block list-name-input" type="text" placeholder="Add new member" maxlength="26">
        <button type="button" onclick="handelMemberMaking()" class="btn btn-primary">add</button>
      </li>
    </ul>
  </div>`

    for (let memberData of membersData) {
      createMember(memberData);
    }
  }
  else {
    createMember();
  }
}





console.info(appData);

/** loading page functions */
//json loading checker
function isAllDataIsReady() {

  if (appData.lists.length && appData.members.length) {
    return true;
  }
  else {
    return false
  }
}

// JSON event listiner
function reqListenerData(event) {

  const target = event.target;
  let data = JSON.parse(target.responseText);

  appData.lists = data.board;

  if (isAllDataIsReady()) {
    handelPages();
  }
}
function reqListenerMember(event) {

  const target = event.target
  let DataMembers = JSON.parse(target.responseText);

  appData.members = DataMembers.members;
  if (isAllDataIsReady()) {
    handelPages();
  }
}

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

//generate page by hash
function handelPages() {
  const location = window.location.hash;

  if (location === undefined || location !== '#Members' && location !== '#Board') {
    window.location.hash = '#Board';

  }
  if (location === '#Members') {
    handelMemberMaking(appData);
    selectedNavLink('member');
  }
  if (location === '#Board') {

    handelListMaking(appData.lists);
    selectedNavLink('board');

  }
}

//run json data on arrival to page
function onArrival() {
  window.addEventListener('hashchange', handelPages);
  getBoardData();
  getMemberData();
}

/*

 2. First thing that should run is: `getBoardData` (instead of `checkUrlHash`).
 3. When you get the board data, save it (e.g. `data.board`) under `appData.lists`
 4. Then, call `checkUrlHash` (instead of building the lists)
 5. When loading a page based on the hash, don’t call the `getBoardData`, just build the damn lists
 6. When building the lists, use `appData.lists` (edited)

 {
 "members": [
 {
 "name": "Alex Ilyaev"
 },
 {
 "name": "Dima Vishnevetsky"
 },
 {
 "name": "Gil Tayar"
 },
 {
 "name": "yael kfir"
 },
 {
 "name": "adi siman-tov"
 }
 ]
 }





 */
onArrival();
