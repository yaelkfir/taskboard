
const classes = ['one', 'two'];

function createClasses(classesArr) {

  let classesStr = '';

  classesArr.forEach((e) => { classesStr += ' '+ e;});

  return arrConected

}

function handelListMaking{
  let listName;

  if (data !== undefined) {
    for (list of lists) {

      createList();

      listName = list.querySelector('h3');
      listName.innerHTML = list.title;
    }
  }
  else{
    createList();

    listName = list.querySelector('h3');
    listName.innerHTML = "new list :)";
  }
}

function createList() {

  if (data !== undefined) {
    //data is definded
    //so loop the title

    const lists = data.board;
    for(list of lists){

      console.log(list);
      const listsContainer = document.querySelector('main > div > div');

      //create the list add it to dad and give class
      const newList = createElement('section', ['panel panel-default'], listsContainer);

      //create the list head add it to dad and give class
      const listHead = createElement('div', ['panel-heading'], newList);

      //create the title head name
      const listName = createElement('h3', ['panel-title'], listHead);

      listName.innerHTML = list.title;
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
  }

  else {

    const listsContainer = document.querySelector('main > div > div');

    //create the list add it to dad and give class
    const newList = createElement('section', ['panel panel-default'], listsContainer);

    //create the list head add it to dad and give class
    const listHead = createElement('div', ['panel-heading'], newList);

    //create the title head name
    const listName = createElement('h3', ['panel-title'], listHead);

    listName.innerHTML = "list name";
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



}
}




function createList() {

  const listsContainer = document.querySelector('main > div > div');

  //create the list add it to dad and give class
  const newList = createElement('section', ['panel panel-default'], listsContainer);

  //create the list head add it to dad and give class
  const listHead = createElement('div', ['panel-heading'], newList);

  //create the title head name
  const listName = createElement('h3', ['panel-title'], listHead);
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


function handelListMaking(data) {

  let listName;

  if (data !== undefined) {

    const lists = data.board;
    for (let list of lists) {

      createList();
      console.info(createList());
    }
  }

  else {
    createList();

  }
}
