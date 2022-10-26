class CustomSlider extends LiveLikeEmojiSlider {
  render() {
    const initialMag = Math.round(this.widgetPayload.initial_magnitude * 100);
    const resultMark =
      this.phase !== "interactive" && (this.val || this.val === 0)
        ? html`
            <div
              class="result-mark"
              style="left: calc(${Math.round(this.average_magnitude * 100)}%)"
            ></div>
          `
        : null;

    return html`
      <template>
        <style>
          .slider-input::-webkit-slider-runnable-track {
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            background-image: linear-gradient(
              90deg,
              #0028ff,
              #dc0028 var(--x),
              transparent 0
            );
          }
          .slider-input::-moz-range-track {
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            background-image: linear-gradient(
              90deg,
              #0028ff,
              #dc0028 var(--x),
              transparent 0
            );
          }
          .slider-input::-ms-track {
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            background-image: linear-gradient(
              90deg,
              #0028ff,
              #dc0028 var(--x),
              transparent 0
            );
          }
        </style>
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <livelike-timer class="custom-timer"></livelike-timer>
            <div class="widget-kind">EMOJI SLIDER</div>
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body>
            <form style="--val: ${initialMag};" class="input-form">
              <div class="input-container">
                <input
                  type="range"
                  class="slider-input"
                  value="${initialMag}"
                />
                ${resultMark}
              </div>
              <output class="slider-thumb">
                <img class="slider-image" />
              </output>
            </form>
          </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}
customElements.define("custom-slider", CustomSlider);

class CustomAlert extends LiveLikeAlert {
  render() {
    const text =
      this.text &&
      html`
        <figcaption class="widget-caption media-caption">
          ${this.text}
        </figcaption>
      `;
    const image =
      this.image_url &&
      html`
        <img class="widget-media" src=${this.image_url} alt=${this.text} />
      `;
    const captionAndMedia =
      this.text &&
      this.image_url &&
      html` <figure class="widget-captioned-media">${text} ${image}</figure> `;

    const onlyMedia =
      !this.text &&
      this.image_url &&
      html`
        <div class="widget-media">
          <img src=${this.image_url} />
        </div>
      `;

    const onlyCaption =
      this.text &&
      !this.image_url &&
      html`
        <div class="widget-caption-container">
          <span class="widget-caption">${this.text}</span>
        </div>
      `;

    const linkFooter = this.link_url
      ? html`
          <livelike-footer>
            <a
              class="widget-link"
              href=${this.link_url}
              target="_blank"
              @click=${this.trackLinkOpened}
              >${this.link_label}</a
            >
          </livelike-footer>
        `
      : null;

    return html`
      <template>
        <style>
          livelike-footer a.widget-link {
            margin-top: 10px;
            border-radius: 5px;
            text-align: center;
            color: white;
            background-image: none;
            padding: 1rem;
            background-color: #222;
          }
          livelike-footer div.sponsor-section {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          livelike-footer div.sponsor-section span {
            margin-right: 10px;
            color: #bbbbbb;
          }
          livelike-footer div.sponsor-section img {
            height: 30px;
            width: auto;
          }
          .widget-caption {
            color: #000;
            opacity: 60%;
          }
          .widget-media img {
            max-height: none;
            height: auto;
          }
        </style>
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <livelike-timer class="custom-timer"></livelike-timer>
            <div class="widget-kind">ALERT</div>
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body>
            ${captionAndMedia || onlyMedia || onlyCaption || null} ${linkFooter}
          </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}
customElements.define("custom-alert", CustomAlert);

class CustomCheerOption extends LiveLikeWidgetElement {
  votePercentage = () => {
    const totalVotes = this.items.reduce((a, b) => a + b["vote_count"], 0);
    return totalVotes > 0
      ? Math.round((this.item.vote_count / totalVotes) * 100)
      : 0;
  };
  optionVoteUpdated = (e) => {
    const imageContainer = this.shadowRoot.querySelector("livelike-image");
    imageContainer &&
      imageContainer.style.setProperty(
        "background",
        `linear-gradient(0deg, #0096ff ${this.votePercentage()}%, transparent 0)`
      );
  };
  render() {
    return html`
      <style>
        livelike-image {
          width: 80px;
          padding: 10px;
          box-shadow: 0 0 0 1px rgb(255 255 255 / 20%) inset;
          border-radius: 6px;
        }
        livelike-image img {
          border-radius: 4px;
        }
        livelike-description {
          font-size: 1rem;
          text-align: center;
          line-height: 1.2;
        }
      </style>
      <livelike-image
        height="auto"
        width="80px"
        style="background: linear-gradient(0deg, #0096ff ${this.votePercentage()}%, transparent 0);"
      ></livelike-image>
      <livelike-description></livelike-description>
    `;
  }
}
customElements.define("custom-cheer-option", CustomCheerOption);

class CustomTextAsk extends LiveLikeTextAsk {
  render() {
    const charactersLeft = this.disabled
      ? null
      : html`<span class="text-ask-input-counter">${this.maxlength}</span>`;
    return html`
      <template>
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <livelike-timer class="custom-timer"></livelike-timer>
            <div class="widget-kind">TEXT ASK</div>
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body>
            <div class="text-ask-prompt-container">
              <span class="text-ask-prompt">${this.prompt}</span>
            </div>
            <form class="text-ask-form">
              <div class="text-ask-input-container">
                <textarea
                  class="text-ask-input"
                  type="text"
                  name="reply"
                  rows="2"
                  .value=${this.text}
                  maxlength="${this.maxlength}"
                  ?disabled="${this.disabled}"
                  placeholder=${this.owner.localize(
                    "widget.textAsk.placeholder"
                  )}
                  @input=${this.inputHandler}
                ></textarea>
                ${charactersLeft}
              </div>
            </form>
            <div class="text-ask-footer">
              <button
                class="text-ask-button"
                @click=${this.submitReply}
                ?disabled="${this.disabled || this.replyDisable}"
              >
                <span class="text-ask-button-label"
                  >${this.owner.localize(
                    "widget.textAsk.sendButton.label"
                  )}</span
                >
              </button>
              <div
                class="confirmation-message-container ${!this.showConfirmation
                  ? "hidden"
                  : ""}"
              >
                <span class="confirmation-message"
                  >${this.confirmation_message}</span
                >
              </div>
            </div>
          </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}

customElements.define("custom-text-ask", CustomTextAsk);

class CustomVideoAlert extends LiveLikeVideoAlert {
  render() {
    const headerClass = !(this.title || this.text) ? "no-header" : "";
    const footerClass = !this.link_url ? "no-footer" : "";
    const text =
      this.text &&
      html`
        <div class="video-alert-caption-container">
          <span class="video-alert-caption">${this.text}</span>
        </div>
      `;
    const footer =
      this.link_url &&
      html`
        <livelike-widget-footer>
          <a class="video-alert-link" href=${this.link_url} target="_blank"
            >${this.link_label}</a
          >
        </livelike-widget-footer>
      `;
    return html`
      <template>
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <livelike-timer class="custom-timer"></livelike-timer>
            <div class="widget-kind">VIDEO ALERT</div>
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body class=${this.title ? "" : "no-header"}>
            ${text}
            <livelike-video
              class=${headerClass + footerClass}
              .src=${this.src || this.video_url}
            ></livelike-video>
            ${footer}
          </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}
customElements.define("custom-video-alert", CustomVideoAlert);

class CustomNumberPrediction extends LiveLikeNumberPrediction {
  render() {
    const textOptionTemplate = html`
      <div style="position:relative;width:100%;display:flex;">
        <livelike-description></livelike-description>
      </div>
    `;
    const imageOptionTemplate = html`
      <livelike-image height="64px" width="64px"></livelike-image>
    `;
    const optionsRenderer = this.options.map((option, idx) => {
      return html`
        <livelike-option index="${idx}">
          ${option.image_url ? imageOptionTemplate : textOptionTemplate}
          <div class="livelike-voting-input-container">
            <input
              class="livelike-voting-number-input user-number-input"
              type="number"
              placeholder="-"
              .value="${option.number}"
              @input=${(e) => this.inputHandler(option, e)}
              @keypress=${this.keypressHandler}
              ?disabled="${this.disabled || this.voteDisable}"
            />
          </div>
        </livelike-option>
      `;
    });
    const votedLabel =
      this.disabled && (this.vote || this.interaction)
        ? html`<span class="voted-text"
            >${this.owner.localize("widget.numberPrediction.votedText")}</span
          >`
        : null;

    return html`
      <template>
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <livelike-timer class="custom-timer"></livelike-timer>
            <div class="widget-kind">NUMBER PREDICTION</div>
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body>
            ${optionsRenderer}
            <livelike-widget-footer>
              <button
                class="predict-button"
                @click=${() => this.lockInVote(this.options)}
                ?disabled=${this.disabled ||
                this.voteDisable ||
                this.voteButtonDisabled}
              >
                Predict
              </button>
              ${votedLabel}
            </livelike-widget-footer>
          </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}
customElements.define("custom-number-prediction", CustomNumberPrediction);

class CustomNumberPredictionFollowUp extends LiveLikeNumberFollowUp {
  render() {
    const textOptionTemplate = html`
      <div style="position:relative;width:100%;display:flex;">
        <livelike-description></livelike-description>
      </div>
    `;
    const imageOptionTemplate = html`
      <livelike-image height="64px" width="64px"></livelike-image>
    `;
    const widgetOption = (option) => {
      const incorrectOption =
        option.number !== option.correct_number
          ? html` <input
              class="livelike-voting-number-input incorrect-number-input"
              type="number"
              placeholder="-"
              value="${option.number}"
              disabled
            />`
          : null;

      return html`
        <div class="livelike-voting-input-container">
          ${incorrectOption}
          <input
            class="livelike-voting-number-input correct-number-input"
            type="number"
            placeholder="-"
            value="${option.correct_number}"
            disabled
          />
        </div>
      `;
    };

    const optionsRenderer = this.options.map((option, idx) => {
      return html`
        <livelike-option index="${idx}">
          ${option.image_url ? imageOptionTemplate : textOptionTemplate}
          ${widgetOption(option)}
        </livelike-option>
      `;
    });

    return html`
      <template>
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <livelike-timer class="custom-timer"></livelike-timer>
            <div class="widget-kind">NUMBER PREDICTION FOLLOW UP</div>
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body> ${optionsRenderer} </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}
customElements.define(
  "custom-number-prediction-follow-up",
  CustomNumberPredictionFollowUp
);
