const MODEL = (function () {

  let appData = {
    lists: [],
    members: []
  };
  //all func

  //members
  function removeMemberFromAppDataMembers(memberDataId) {

    let currentMember = appData.members.find((member) => {
      return member.id === memberDataId;
    });

    const index = appData.members.indexOf(currentMember);
    appData.members.splice(index, 1);

    removeMemberFromAppDataCards(memberDataId);
//LOCAL STORAGE
    localStorage.setItem('appData', JSON.stringify(appData));

  }

  function removeMemberFromAppDataCards(memberDataId) {
    let toRemoveMember = '';
    // memberDataId = id
    //find the tasks that have this id in its members
    appData.lists.forEach((list) => {

      list.tasks.forEach((task) => {
        const members = task.members;

        members.forEach((member) => {
          if (memberDataId === member) {
            toRemoveMember = member;
            const index = members.indexOf(toRemoveMember);
            members.splice(index, 1);
          }
        });
      });
    });
    localStorage.setItem('appData', JSON.stringify(appData));

  }

  function saveMemberEditingInAppData(memberDataId, memberInPut) {
    let currentMember = appData.members.find((member) => {
      return member.id === memberDataId;
    });
    //find the currnt member index in appdata

    currentMember.name = `${memberInPut.value}`;

    localStorage.setItem('appData', JSON.stringify(appData));

  }

  function addMemberObjToAppData(memberDataId, membersInput) {
    let temMember = {
      id: `${memberDataId}`,
      name: `${membersInput.value}`
    };
    appData.members.push(temMember);

    localStorage.setItem('appData', JSON.stringify(appData));

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


    localStorage.setItem('appData', JSON.stringify(appData));

  }

  function removeListFromAppData(listSectionId) {
    let currentList = appData.lists.find((list) => {
      return list.id === listSectionId;
    });

    const index = appData.lists.indexOf(currentList);
    appData.lists.splice(index, 1);

    localStorage.setItem('appData', JSON.stringify(appData));

  }

  function changeListNameInAppData(listDataId, target) {
    let currentList = appData.lists.find((list) => {
      return list.id === listDataId
    });

    const index = appData.lists.indexOf(currentList);

    appData.lists[index].title = target.value;

    localStorage.setItem('appData', JSON.stringify(appData));

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
    localStorage.setItem('appData', JSON.stringify(appData));
  }


//modal
  function saveModalDiscription(selectedListId, selectedCardId, cardTxt) {

    //get the card from app data
    let selectedCardData = getCardDataById(selectedListId, selectedCardId);
    //change the discription
    selectedCardData.text = cardTxt.textContent;

    localStorage.setItem('appData', JSON.stringify(appData));


  }

  function saveModalMembers(selectedListId, selectedCardId, temMembersArr) {

    //get the card from app data
    let selectedCardData = getCardDataById(selectedListId, selectedCardId);
    //change the members
    selectedCardData.members = temMembersArr;

    localStorage.setItem('appData', JSON.stringify(appData));

  }

  function removeCardInAppData(selectedListId, selectedCardId) {

    //find the list in appdata
    const selectedListData = appData.lists.find((list) => {
      return list.id === selectedListId;
    });

    const selectedCardData = selectedListData.tasks.find((task) => {
      return task.id === selectedCardId;
    });

    removeFromAppData(selectedCardData, selectedListData, 'tasks');

    function removeFromAppData(ElmtoRemove, fromElem, from){

      if(from === 'tasks'){
        const index = fromElem.tasks.indexOf(ElmtoRemove);
        fromElem.tasks.splice(index, 1);
      }

    }

/*
 const index = selectedListData.tasks.indexOf(selectedCardData);
 selectedListData.tasks.splice(index, 1);
 */
    localStorage.setItem('appData', JSON.stringify(appData));

  }

  function saveMoveToListAppData(CardInAppData, moveToListId) {
    appData.lists.forEach((list) => {
      if (list.id === moveToListId) {
        list.tasks.push(CardInAppData);
      }
    });
    localStorage.setItem('appData', JSON.stringify(appData));

  }


//drag and drop
  function updateTaskOrder(dragedToListId, dragedToList, targetTaskId, draggedCardId) {


    const listInAppData = findListInAppData(dragedToListId);

    //get index of e.target card

    const targetedCardInAppData = findCardByListInAppData(listInAppData, targetTaskId);

    //push the dragged card before the index
    const index = listInAppData.tasks.indexOf(targetedCardInAppData);

    //get the gradded card in appdata
    const draggedCardInAppData = findCardByListInAppData(listInAppData, draggedCardId)
    const index2 = listInAppData.tasks.indexOf(draggedCardInAppData);

    listInAppData.tasks.splice(index2, 1);
    //put it in the right order
    listInAppData.tasks.splice(index, 0, draggedCardInAppData);

    localStorage.setItem('appData', JSON.stringify(appData));

  }


//general func
  function getLists() {
    return appData.lists
  }
  function getAppData() {
    return appData;
  }

  function getMembersFromAppData() {
    return appData.members
  }

  function getCardDataById(ListId, CardId) {
    const ListData = appData.lists.find((list) => {
      return list.id === ListId;
    });

    const CardData = ListData.tasks.find((task) => {
      return task.id === CardId;
    });

    return CardData;
  }

  function findListInAppData(selectedListId) {

    const list = appData.lists.find((list) => {
      return list.id === selectedListId
    });

    return list;

  }

  function findCardByListInAppData(selectedListData, selectedCardId) {
    const CardData = selectedListData.tasks.find((task) => {

      return task.id === selectedCardId;
    });
    return CardData;
  }

  /** loading page functions */
  function saveToLocalStorage(){
    localStorage.setItem('appData', JSON.stringify(appData));

  }

  function appDataIsLocalData(LocalAppData){
    appData = LocalAppData;
  }




  return {
    appDataIsLocalData:appDataIsLocalData,
    //members
    removeMemberFromAppDataMembers: removeMemberFromAppDataMembers,

    removeMemberFromAppDataCards: removeMemberFromAppDataCards,

    saveMemberEditingInAppData: saveMemberEditingInAppData,

    addMemberObjToAppData: addMemberObjToAppData,



    //lists
    addNewListToAppData: addNewListToAppData,

    removeListFromAppData: removeListFromAppData,

    changeListNameInAppData: changeListNameInAppData,


    //cards
    addCardToListInAppData: addCardToListInAppData,


    //modal
    saveModalDiscription: saveModalDiscription,

    saveModalMembers: saveModalMembers,

    removeCardInAppData: removeCardInAppData,

    saveMoveToListAppData: saveMoveToListAppData,


    //drag and drop
    updateTaskOrder: updateTaskOrder,


    //general func
    getAppData:getAppData,

    getLists: getLists,

    getMembersFromAppData: getMembersFromAppData,

    getCardDataById: getCardDataById,

    findListInAppData: findListInAppData,

    findCardByListInAppData: findCardByListInAppData,

    saveToLocalStorage:saveToLocalStorage
  }

})();


