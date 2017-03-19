const appData = {
  lists: [],
  members: []
};


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
}

function saveMemberEditingInAppData(memberDataId, memberInPut) {
  let currentMember = appData.members.find((member) => {
    return member.id === memberDataId;
  });
  //find the currnt member index in appdata

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
function saveModalDiscription(selectedListId, selectedCardId, cardTxt) {

  //get the card from app data
  let selectedCardData = getCardDataById(selectedListId, selectedCardId);
  //change the discription
  selectedCardData.text = cardTxt.textContent;
}

function saveModalMembers(selectedListId, selectedCardId, temMembersArr) {

  //get the card from app data
  let selectedCardData = getCardDataById(selectedListId, selectedCardId);
  //change the members
  selectedCardData.members = temMembersArr;
}

function removeCardInAppData(selectedListId, selectedCardId) {

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

function saveMoveToListAppData(CardInAppData, moveToListId) {
  appData.lists.forEach((list) => {
    if (list.id === moveToListId) {
      list.tasks.push(CardInAppData);
    }
  });
}
//darg and drop
function updateTaskOrder(dragedToListId,dragedToList,targetTaskId,draggedCardId) {


  const listInAppData = findListInAppData(dragedToListId);


  //get index of e.target card

  const targetedCardInAppData = findCardByListInAppData(listInAppData, targetTaskId);

  //push the dragged card before the index
  const index = listInAppData.tasks.indexOf(targetedCardInAppData);

  //get the gradded card in appdata
  const draggedCardInAppData = findCardByListInAppData(listInAppData, draggedCardId)
  const index2 = listInAppData.tasks.indexOf(draggedCardInAppData);

  listInAppData.tasks.splice(index2,1);
  //put it in the right order
  listInAppData.tasks.splice(index,0,draggedCardInAppData);

}


//general func
function getCardDataById(ListId, CardId) {
  const ListData = appData.lists.find((list) => {
    return list.id === ListId;
  });

  const CardData = ListData.tasks.find((task) => {
    return task.id === CardId;
  });

  return CardData;
}

function findListInAppData(selectedListId){

 const list =  appData.lists.find((list) => {
    return list.id === selectedListId
  });

 return list;

}

function findCardByListInAppData(selectedListData, selectedCardId){
  const CardData = selectedListData.tasks.find((task) => {

    return task.id === selectedCardId;
  });
  return CardData;
}