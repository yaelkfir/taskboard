/**
 * Created by yaelo on 2/27/17.
 */
const appData = {
  lists: [],
  members: []
};
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

function toggleVisibility(element) {
  if (element.style.display === 'block') {
    element.style.display = 'none';
  }
  else {
    element.style.display = 'block';
  }
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
    <button type="button" class="btn add-list-btn-primary  btn-primary margin-right" onclick="handelListMaking()">add new list..</button>
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

    //cards
    function handelCards(obj) {

      if (obj !== undefined) {
        let tasks = obj.tasks;

        for (task of tasks) {

          //create card wraper and appand to dad ul
          const cardWraper = createElement('li', ['assignment'], listUl);
          cardWraper.tabIndex = '0';


          //create edit btn and appand to dad ul
          const editBtn = createElement('button', ['card-edit-btn', 'btn', 'btn-info', 'btn-xs'], cardWraper);
          editBtn.textContent = 'Edit card';
          editBtn.addEventListener("click", handelModal);

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

              twoWordArr.push(letter);
            }
            return twoWordArr.join('');
          }

          function membersMaker() {
            if (task.members.length > 0) {

              const cardFooter = createElement('div', ['assignment-footer'], cardWraper);

              for (let member of task.members) {

                const userOnTask = createElement('span', ['user-icon', 'label', 'label-primary'], cardFooter);
                userOnTask.setAttribute('title', `${member}`);
                userOnTask.innerHTML = getInishials(member);
              }
            }
          }


        }
      }
    }


    /*create the list*/

    const listsContainer = document.querySelector('main > div > div');

    const newList = createElement('section', ['panel panel-default'], listsContainer);

    const listHead = createElement('div', ['panel-heading, task-name-wraper'], newList);

    const listName = createElement('h3', ['panel-title'], listHead);


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

      //add to appData
      let temList = {
        title: `${listName.textContent}`,
        tasks: []
      }
      appData.lists.push(temList);
    }
  }
}

//list btns and input
function deleteList(event) {

  //target the list
  const target = event.target;
  const list = target.closest('section');
  const listsContainer = document.querySelector('.list-container');
  const listTitle = list.querySelector('h3').textContent;

  const r = confirm(`Deleting ${listTitle} list. Are you sure?`);
  if (r === true) {
    listsContainer.removeChild(list);

    //remove from appData
    let currentList = appData.lists.find((list) => {
      return list.title === listTitle
    });
    const index = appData.lists.indexOf(currentList);

    appData.lists.splice(index, 1);
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
    console.info(container);
    const title = container.querySelector('h3');


    //Change in appData
    let currentList = appData.lists.find((list) => {
      return list.title === title.textContent
    });
    console.info(currentList);
    const index = appData.lists.indexOf(currentList);
    console.info(index);

    if (target.style.display === 'block') {
      //target the h3
      title.textContent = target.value;
      title.style.display = 'block';
      target.style.display = 'none';
    }
    appData.lists[index].title = target.value;
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
  const listTitle = parantSection.querySelector('h3');
  const currentList = parantSection.querySelector('.flex-box');
  const cardWraper = createElement('li', ['assignment'], currentList);
  const editBtn = createElement('button', ['card-edit-btn', 'btn', 'btn-info', 'btn-xs'], cardWraper);
  editBtn.textContent = 'Edit card';
  editBtn.addEventListener("click", handelModal);
  const cardDiscription = createElement('p', ['card-description', 'p-no-margins'], cardWraper);
  cardDiscription.textContent = 'new card';
  const parntScroler = parantSection.querySelector('.over-flow-mask');

  scrollTo(parntScroler, parntScroler.scrollHeight, 300);

  let tempCard = {
    text: `${cardDiscription.textContent }`,
    members: []
  };

  for (let list of appData.lists) {
    if (list.title === listTitle.textContent) {

      list.tasks.push(tempCard);
    }
  }
}


/** modal functions */


function handelModal(event) {



  function getModalContent(target) {

    const selectedPanel = target.closest('.panel');
    const selectedcard = target.closest('.assignment');
    const cardDiscription = selectedcard.querySelector('p').textContent;
    const listTitle = selectedPanel.querySelector('h3').textContent;
    const saveChangesBtn = cardModal.querySelector('.save-changes');
    saveChangesBtn.addEventListener("click", saveCardChanges);

    //find card in appData
    const selectedListData = appData.lists.find((list) => {
      return list.title === listTitle
    });
    const selectedCardData = selectedListData.tasks.find((task) => {
      return task.text === cardDiscription;
    });

      //add members
      appData.members.forEach((member) => {
      let memberLabel = createElement('label', ['display-block', 'form-check-label'], membersList);
      memberLabel.innerHTML = `<input class="form-check-input" type="checkbox"> ${member.name}`;

      //check correct members
      selectedCardData.members.forEach((memberData)=>{
        if(memberData === member.name){
          memberLabel.innerHTML = `<input class="form-check-input" type="checkbox" checked> ${member.name}`;
        }
      });
    });

    //fill move-to options and text area content
    appData.lists.forEach((list) => {
      let option = createElement('option', undefined, moveToList);
      option.textContent = list.title;

      if (list.title === listTitle) {
        option.selected = true;

        //add card description
        let card = list.tasks.find((task) => {
          return task.text === cardDiscription;
        });
        textArea.innerHTML = card.text;
      }
    });

    function saveCardChanges(){

      //get selected move to option
      const optionSelected =  moveToList.querySelector('option:checked').text;
      console.info('options', optionSelected);
      //get the card
      const selectedListData = appData.lists.find((list) => {
        return list.title === listTitle
      });
      const selectedCardData = selectedListData.tasks.find((task) => {
        return task.text === cardDiscription;
      });

      if(listTitle !== optionSelected){
        //find selected list
        const moveCardTo = appData.lists.find((list) => {
          return list.title === optionSelected;
          console.info(moveCardTo);
        });
      }

    }
  }

  function removeModalContent() {

    const options = moveToList.querySelectorAll('option');
    options.forEach((option) => {
      moveToList.removeChild(option)
    });
    const members = membersList.querySelectorAll('label');
    members.forEach((member)=>{
      membersList.removeChild(member)
    })
  }

  //get modal dom elements
  const cardModal = document.querySelector('.light-box');
  const moveToList = cardModal.querySelector('.move-to-list');
  const textArea = cardModal.querySelector('textarea');
  const membersList = cardModal.querySelector('.check-box-list');

  //close modal
  if (cardModal.style.display === 'flex') {
    cardModal.style.display = 'none';
    removeModalContent();


  }

  //open modal
  else {
    cardModal.style.display = 'flex';
    const target = event.target;
    getModalContent(target);

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

  const currentMemberLi = target.closest('li');
  const memberInPut = currentMemberLi.querySelector('input');
  const memberName = currentMemberLi.querySelector('span');
  const saveNameBtnContainer = currentMemberLi.querySelector('.edit-member-btn-container');
  const editBtnContainer = currentMemberLi.querySelector('.btn-container');

  //find the currnt member in appdata
  let currentMember = appData.members.find((member) => {
    return member.name === memberName.textContent;
  });

  //find the currnt member index in appdata
  const index = appData.members.indexOf(currentMember);

  //change the currnt member name in dom
  memberInPut.style.display = 'none';
  memberName.textContent = `${memberInPut.value}`;

  memberName.style.display = 'block';
  saveNameBtnContainer.style.display = 'none';
  editBtnContainer.classList.toggle('display-none');

  //changed the name in appdata
  currentMember.name = `${memberInPut.value}`;


  /*
   appData.members[index] = target.value;


   const index = appData.members.indexOf(currentList);
   console.info(index);
   */
}

//add/remove members
function DeleteMember(event) {
  const target = event.target;
  const membersList = document.querySelector('.members-list');
  const currentMemberLi = target.closest('li');
  const memberName = currentMemberLi.querySelector('span').textContent

  membersList.removeChild(currentMemberLi);

  let currentMember = appData.members.find((member) => {
    return member.name === memberName;
  });

  console.info(currentMember);
  const index = appData.members.indexOf(currentMember);
  console.info(index);

  appData.members.splice(index, 1);

}

function createMember(memberData) {

  function handelMemberName(memberData) {

    if (memberData !== undefined) {
      memberName.textContent = memberData.name;

    }
    else {

      const membersInput = document.querySelector('.add-new-member > input');

      if (membersInput.value !== '') {
        memberName.textContent = membersInput.value;

        let temMember = {name: `${membersInput.value}`};
        appData.members.push(temMember);
        console.info(appData.members);
      }
      else {
        membersList.removeChild(memberInPlace);
      }

      membersInput.value = '';
    }
  }

  const membersList = document.querySelector('.members-list');
  const ListInput = document.querySelector('.add-new-member');


  const member = createElement('li', ['list-group-item'], membersList);

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
    <p>counter:<span></span></p>
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
