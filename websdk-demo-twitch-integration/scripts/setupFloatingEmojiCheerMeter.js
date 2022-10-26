const setupFloatingEmojiCheerMeter = () => {

  const chatEl = document.querySelector(
    '.tab-pane#public-chat > livelike-chat'
  );

  function createFloatingReaction(src) {
    const rand = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const container = chatEl.firstElementChild;
    const containerWidth = container.offsetWidth;
    const startingWidth = rand(containerWidth * 0.3, containerWidth * 0.7);
    const timeout = rand(5, 10);
    const left = (startingWidth / container.offsetWidth) * 100;
    const img = document.createElement('img');
    img.src = src;
    img.setAttribute('class', 'floater');
    // img.style = `display: block; left: ${left}%; animation-duration: ${timeout}s`;
    // img.style = 'display: block; left: '+ left + '%; animation-duration: ' + timeout + 's';
    img.style.display = 'block';
    img.style.left = left + '%';
    img.style.animationDuration = timeout + 's';

    container.appendChild(img);
    setTimeout(() => img.remove(), timeout * 1000);
  }

  let voteCounts = {};

  const widgetContainer = document.querySelector('#cheer-widget-container');
  widgetContainer.customTemplateRenderer = function({ widgetPayload }) {
    if (widgetPayload.kind === 'cheer-meter') {
      return document.querySelector('template#floating-emojis');
    }
  };

  widgetContainer.addEventListener('interacted', function(e) {
    if (e.detail.widget.kind === 'cheer-meter') {
      // const clickedOption = e.detail.item.description;
      // const sound = new Audio("./sounds/" + clickedOption + ".mp3");
      // sound.play();

      e.detail.item.image_url &&
        createFloatingReaction(e.detail.item.image_url);
      // const select = document.querySelector("livelike-select");
      const options = e.detail.element.querySelectorAll('livelike-option');
      // console.log("options", options);
      Array.from(options).forEach(el => {
        if (el.item.description === e.detail.item.description) {
          const voteCount = el.querySelector('livelike-vote-count');
          // console.log("voteCount", voteCount);

          voteCounts && voteCounts[e.detail.item.description]
            ? (voteCounts[e.detail.item.description] += 1)
            : (voteCounts[e.detail.item.description] =
                e.detail.item.vote_count + 1);

          // console.log("newstartingVoteCount", voteCounts);
          voteCount.shadowRoot.innerHTML =
            voteCounts[e.detail.item.description];
        }
      });
    }
  });

  widgetContainer.createWidgetElement({
    id: 'bc708479-ae1f-453f-a6aa-1588ceaccb43',
    kind: 'cheer-meter',
    mode: function({ widget }) {
      return widgetContainer
        .attach(widget)
        .then(() => widget.interactive({ timeout: null }));
    },
  });

  function appendStyles() {
    const cheerMeter = document.querySelector('livelike-cheer-meter');

    if (cheerMeter) {
      widgetContainer.addEventListener('votecountchanged', function(e) {
        const cheerOption = cheerMeter.options.find(
          option => option.id === e.detail.id
        );
        cheerOption && createFloatingReaction(cheerOption.image_url);
      });
    } else setTimeout(appendStyles, 1000);
  }
  appendStyles();
};