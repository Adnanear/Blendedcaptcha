(function() {
  var theme_plain = `@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap");figure.adar-captcha{position:relative;box-sizing:border-box;border-radius:8px;border:1px solid rgba(0,0,0,0.15);width:fit-content;margin:0;background:#f3f3f3;overflow:hidden;font-family:Ubuntu, sans-serif}figure.adar-captcha>main{display:grid;grid-template-columns:auto 1fr auto;grid-gap:1rem;align-items:center;padding:1.25rem 1rem;border:inherit;border-top:0;border-left:0;border-right:0;z-index:1;background:inherit}figure.adar-captcha>main>menu{padding:0;margin:0;display:flex}figure.adar-captcha>main>menu>label{font-weight:500;font-size:1.05em}figure.adar-captcha>main>menu>main{position:relative;border-radius:4px;border:2px solid rgba(0,0,0,0.15);display:block;width:30px;height:30px;cursor:pointer;background:white;transition:all .15s ease;display:flex;align-items:center;justify-content:center;color:transparent}figure.adar-captcha>main>menu>main>i{transform:scale(0);transition:transform .2s ease-in}figure.adar-captcha>main>menu>img{max-width:40px;max-height:40px;margin:0 0 0 .5rem;pointer-events:none !important;filter:saturate(0) invert(1) opacity(0.2);-webkit-filter:saturate(0) invert(1) opacity(0.2);-moz-filter:saturate(0) invert(1) opacity(0.2);-ms-filter:saturate(0) invert(1) opacity(0.2);-o-filter:saturate(0) invert(1) opacity(0.2);user-select:none}figure.adar-captcha>nav{background:white;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;align-items:center;height:0;margin-top:-1px;padding:0}figure.adar-captcha>nav label.ak-captcha-question{font-size:1.05em;font-weight:500;margin-bottom:1rem}figure.adar-captcha>nav>nav{flex:1;margin-bottom:1rem}figure.adar-captcha>nav>nav>button{padding:.5rem .75rem;cursor:pointer;transition:all .15s ease;color:black;border-radius:4px;border:1px solid rgba(0,0,0,0.15);font-size:.9em;text-transform:none;font-weight:500;font-family:inherit;background:#f1f1f1}figure.adar-captcha>nav>nav>button:hover{background:#e4e4e4}figure.adar-captcha>nav>nav>button:active{background:#dedede}figure.adar-captcha>nav>nav>button.active{border-color:#83c8ff;background:#d0eaff}figure.adar-captcha>nav>img{max-width:100%;max-height:300px;border-radius:8px;box-shadow:0 0 0 1px rgba(0,0,0,0.15)}figure.adar-captcha.developped>main>menu>main{pointer-events:none;border-radius:50%;border-color:transparent}figure.adar-captcha.developped>main>menu>main::before,figure.adar-captcha.developped>main>menu>main::after{content:'';width:100%;height:100%;position:absolute;left:50%;top:50%;border-radius:50%;background:rgba(0,124,183,0.3);z-index:1;pointer-events:none;animation:.75s waitingForVeirifcation linear infinite alternate;transform-origin:50% 50%;transform:translate(-50%, -50%) scale(0)}@keyframes waitingForVeirifcation{from{transform:translate(-50%, -50%) scale(0)}to{transform:translate(-50%, -50%) scale(1.5)}}figure.adar-captcha.developped>main>menu>main::before{animation-delay:.75s}figure.adar-captcha.developped>nav{margin-top:0;height:fit-content;padding:1rem}figure.adar-captcha.verified>main>menu>main{pointer-events:none;border-radius:50%;border-color:transparent;color:#1f9cff;box-shadow:0 0 0 1px rgba(0,0,0,0.15)}figure.adar-captcha.verified>main>menu>main>i{transform:scale(1)}`
  let theme_node = document.createElement("style")
  theme_node.innerHTML = theme_plain
  document.head.appendChild(theme_node)
}())

class AdarCaptcha {

  constructor(target) {
    this.captcha = target instanceof HTMLElement ? target : document.querySelector(target)
    this.onEvents = {}
    this.startTime = new Date().getTime()
    this.survey = {
      "question": "What does this picture represent?",
      "picture": "https://images.unsplash.com/photo-1621867822738-ba65f95a8eea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80",
      "answers": ["a Beach","a River","Hawai","New York"],
      "answer": Math.floor(Math.random() * (4 - 1) + 1)
    }
    return this
  }

  get Api() {
    return {
      logo: "https://media.discordapp.net/attachments/887725720191795271/890978604983418930/LOGO-BLUE.png?width=150&height=150"
    }
  }

  get Survey() {
    return this.survey
  }

  get Session() {
    return {
      status: 0,
      stats: {
        period: {
          open: this.startTime,
          close: undefined
        },
        navigator: navigator || undefined
      },
      survey: this.Survey
    }
  }

  Render() {
    let template = `
    <main>
      <menu>
        <main data-actor="checkbox">
          <i class="far fa-check"></i>
        </main>
      </menu>
      <menu>
        <label>I'm not a robot</label>
      </menu>
      <menu>
        <img src="${this.Api.logo}" alt="provider_logo_x">
      </menu>
    </main>
    <nav data-actor="survey">
      <center style="padding: 1rem; font-size: 13px;">
        Loading survey,
        <br>
        Please wait while loading resources...
      </center>
    </nav>
    `
    this.captcha.innerHTML = template
    this.captcha.actors = {}
    this.captcha.querySelectorAll("[data-actor]").forEach(actor => this.captcha.actors[actor.dataset.actor] = actor)

    return this.dispatchEvent("render").Init()
  }

  Init() {
    // on click to verify that the user is not a robot
    this.captcha.actors.checkbox.onclick = () => {
      this.Develop()
      this.Session.status = 1
      return this.loadSurvey()
    }

    return this.dispatchEvent("init")
  }

  Develop() {
    this.captcha.classList.add("developped")
    return this
  }

  Collapse() {
    this.captcha.classList.remove("developped")
    return this
  }

  loadSurvey() {
    let template = `
      <label class="ak-captcha-question">
        ${this.Survey.question}
      </label>
      <nav>
        ${
          this.Survey.answers.map((answer, i) => `<button type="button" data-layer=${i}>${answer}</button>`).join(' ')
        }
      </nav>
      <img src="${this.Survey.picture}" alt="captcha_picture_x">
    `
    this.captcha.actors.survey.innerHTML = template
    this.captcha.actors.survey.querySelectorAll("button[data-layer]").forEach(answer => {
      answer.onclick = () => {
        var layer = isNaN(answer.dataset.layer) ? -1 : +answer.dataset.layer

        if( layer == +this.Survey.answer ) {
          this.Session.status = 2
          this.Collapse()
          this.captcha.classList.add("verified")
        }
        else this.loadSurvey()

      }
    })

    return this
  }

  on(events, callback) {
    for(let ev of events.split(' '))
      this.onEvents[ev] = callback

    return this
  }

  dispatchEvent(name, args=[]) {
    let eventHandler = this.onEvents[name]
    if( !eventHandler ) return this

    // Otherwise fire the event
    this.onEvents[name].apply(this, args)

    return this
  }

}
