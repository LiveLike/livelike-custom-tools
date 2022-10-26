function setupWidgetElements(program) {
  const popupWidgetEl = document.querySelector("livelike-widgets[id=pop-up]");
  const timelineEl = document.querySelector("livelike-widgets[id=timeline]");

  popupWidgetEl.programid = program.id;
  timelineEl.programid = program.id;
}

function setupChatElements(program) {

  let publicChatId, influencerChatId;
  if (
    program.default_chat_room &&
    program.default_chat_room.id
  ) {
    if(program.default_chat_room.content_filter === 'producer'){
      influencerChatId = program.default_chat_room.id;
    } else {
      publicChatId = program.default_chat_room.id;
    }
  }
  if (program.chat_rooms && program.chat_rooms.length > 0) {
    for (chatRoom of program.chat_rooms) {
      if (publicChatId && influencerChatId) break;
      !publicChatId && chatRoom.content_filter !== 'producer' && (publicChatId = chatRoom.id);
      !influencerChatId && chatRoom.content_filter === 'producer' && (influencerChatId = chatRoom.id);
    }
  }

  const publicChatEl = document.querySelector("livelike-chat[id=public]");
  const publicTabNav = document.querySelector('#public-chat-tab');

  publicChatEl.roomid = publicChatId;
  if (publicChatId) {
    publicChatEl.roomid = publicChatId;
  } else {
    publicTabNav.parentElement.remove();
    publicChatEl.parentElement.remove();
  }

  const influencerChatEl = document.querySelector(
    'livelike-chat[id=influencer]'
  );
  const influencerTabNav = document.querySelector('#private-chat-tab');

  if (influencerChatId) {
    influencerChatEl.roomid = influencerChatId;
  } else {
    influencerTabNav.parentElement.remove();
    influencerChatEl.parentElement.remove();
  }

  if(!publicChatId && influencerChatId){
    const influencerTabPane = document.querySelector('.tab-pane#private-chat');
    influencerTabPane.classList.add('active');
    influencerTabPane.classList.add('show');
    influencerTabNav.classList.add('active');
  }
}

function setupCheerMeter(program) {
  const cheerMeterEl = document.querySelector(
    'livelike-widgets[id=cheer-widget-container]'
  );
  if (cheerMeterEl) {
    if (program.cheerMeterId) {
      cheerMeterEl.programid = program.cheerMeterId;
      const livelikeChat = document.querySelector('livelike-chat#public');
      livelikeChat.classList.add('floating-emoji-container');
      setupFloatingEmojiCheerMeter();
    } else {
      cheerMeterEl.remove();
    }
  }
}
function setupLiveLikeElements(program, endpoint) {
  setupChatElements(program);
  setupChatSwitcher(program, endpoint)
  setupWidgetElements(program);
  setupCheerMeter(program);
}