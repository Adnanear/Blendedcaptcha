/*

  Copyright 2021 Blendedcoders

  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  Visit our website: https://www.blendedcoders.ma

  Library author: Adnane Aref
  Github: https://github.com/Adnanear

*/


(function() {
  console.warn("Blendedcoders captcha integrated")
  
  // Preparing some pre process that we might need
  Object.defineProperty(Array.prototype, 'random', {
    configurable: false,
    enumerable: false,
    get: function() {
      var layer = Math.floor(Math.random() * (this.length - 0) + 0)
      return {
        key: layer,
        value: this[layer]
      }
    }
  })

  Math.randomExcept = function(exception, min=0, max=999) {
    var luck = Math.floor(Math.random() * (max - min) + min)
    return luck == +exception ? Math.randomExcept(exception, min, max) : luck
  }


  // Generating the theme
  var theme_plain = `@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap");figure.blendedcoders-captcha{position:relative;box-sizing:border-box;border-radius:8px;border:1px solid rgba(0,0,0,0.15);width:fit-content;margin:2rem auto;background:#f3f3f3;font-family:Ubuntu, sans-serif;max-width:270px;display:block}figure.blendedcoders-captcha img{pointer-events:none;user-select:none}figure.blendedcoders-captcha span.ak-ask{position:absolute;right:0;top:100%;display:flex;max-width:100%;padding:.12rem 0}figure.blendedcoders-captcha span.ak-ask a{color:black;font-family:inherit;font-size:13px;cursor:pointer;transition:all 0s ease;text-decoration:none}figure.blendedcoders-captcha span.ak-ask a:hover,figure.blendedcoders-captcha span.ak-ask a:active{text-decoration:underline}figure.blendedcoders-captcha span.ak-ask a:focus{box-shadow:0 0 2px #83c8ff}figure.blendedcoders-captcha>main{display:grid;grid-template-columns:auto 1fr auto;grid-gap:1rem;align-items:center;padding:1.25rem 1rem;border:inherit;border-top:0;border-left:0;border-right:0;z-index:1;background:inherit;border-radius:inherit}figure.blendedcoders-captcha>main>menu{padding:0;margin:0;display:flex}figure.blendedcoders-captcha>main>menu>label{font-weight:500;font-size:1.05em}figure.blendedcoders-captcha>main>menu>main{position:relative;border-radius:4px;border:2px solid rgba(0,0,0,0.15);display:block;width:30px;height:30px;cursor:pointer;background:white;transition:all .15s ease;text-align:center;line-height:1.7em;color:transparent}figure.blendedcoders-captcha>main>menu>main>i{transform:scale(0);transition:transform .2s ease-in}figure.blendedcoders-captcha>main>menu>img{max-width:40px;max-height:40px;margin:0 0 0 .5rem;pointer-events:none !important;filter:saturate(0) invert(1) opacity(0.2);-webkit-filter:saturate(0) invert(1) opacity(0.2);-moz-filter:saturate(0) invert(1) opacity(0.2);-ms-filter:saturate(0) invert(1) opacity(0.2);-o-filter:saturate(0) invert(1) opacity(0.2);user-select:none}figure.blendedcoders-captcha>nav{background:white;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;align-items:center;height:0;margin-top:-1px;padding:0;text-align:center;border-radius:inherit}figure.blendedcoders-captcha>nav label.ak-captcha-question{font-size:1.05em;font-weight:500;margin-bottom:1rem}figure.blendedcoders-captcha>nav>nav{flex:1;margin-top:1rem}figure.blendedcoders-captcha>nav>nav>button{padding:.5rem .75rem;cursor:pointer;transition:all .15s ease;color:black;border-radius:4px;border:1px solid rgba(0,0,0,0.15);font-size:.9em;text-transform:none;font-weight:500;font-family:inherit;background:#f1f1f1;margin-bottom:.25rem}figure.blendedcoders-captcha>nav>nav>button:hover{background:#e4e4e4}figure.blendedcoders-captcha>nav>nav>button:active{background:#dedede}figure.blendedcoders-captcha>nav>nav>button.active{border-color:#83c8ff;background:#d0eaff}figure.blendedcoders-captcha>nav>img{max-width:100%;max-height:300px;border-radius:8px;box-shadow:0 0 0 1px rgba(0,0,0,0.15)}figure.blendedcoders-captcha.developped>main>menu>main{pointer-events:none;border-radius:50%;border-color:transparent}figure.blendedcoders-captcha.developped>main>menu>main::before,figure.blendedcoders-captcha.developped>main>menu>main::after{content:'';width:100%;height:100%;position:absolute;left:50%;top:50%;border-radius:50%;background:rgba(0,124,183,0.3);z-index:1;pointer-events:none;animation:.75s waitingForVeirifcation linear infinite alternate;transform-origin:50% 50%;transform:translate(-50%, -50%) scale(0)}@keyframes waitingForVeirifcation{from{transform:translate(-50%, -50%) scale(0)}to{transform:translate(-50%, -50%) scale(1.5)}}figure.blendedcoders-captcha.developped>main>menu>main::before{animation-delay:.75s}figure.blendedcoders-captcha.developped>nav{margin-top:0;height:fit-content;padding:1rem}figure.blendedcoders-captcha.verified>main>menu>main{pointer-events:none;border-radius:50%;border-color:transparent;color:#1f9cff;box-shadow:0 0 0 1px rgba(0,0,0,0.15)}figure.blendedcoders-captcha.verified>main>menu>main>i{transform:scale(1)}figure.blendedcoders-captcha.failed>main>menu>main{pointer-events:none;border-radius:50%;border-color:transparent;color:#ff5c5c;box-shadow:0 0 0 1px rgba(0,0,0,0.15)}figure.blendedcoders-captcha.failed>main>menu>main>i{transform:scale(1)}figure.blendedcoders-captcha.redo>main>menu>main{border-radius:50%;border-color:transparent;box-shadow:0 0 0 1px rgba(0,0,0,0.15);color:inherit}figure.blendedcoders-captcha.redo>main>menu>main>i{transform:scale(1)}`

  let theme_node = document.createElement("style")
  theme_node.innerHTML = theme_plain
  document.head.appendChild(theme_node)
}())

class BlendedCaptcha {

  constructor(target, options={}) {
    this.captcha = target instanceof HTMLElement ? target : document.querySelector(target)
    this.onEvents = {}
    this.startTime = new Date().getTime()
    this.attempts = 0
    this.redos = 0
    this.status = 0
    this.options = {
      attempts: 3,
      redos: 2,
      lang: "en"
    }
    Object.entries(options).forEach(([key, value]) => this.options[key] = value)

    return this
  }

  get Api() {
    return {
      logo: "https://media.discordapp.net/attachments/887725720191795271/890978604983418930/LOGO-BLUE.png?width=150&height=150"
    }
  }

  get Session() {
    return {
      status: this.status,
      stats: {
        period: {
          open: this.startTime,
          close: undefined
        },
        navigator: navigator || undefined
      }
    }
  }

  Render() {
    let template = `
    <main>
      <menu>
        <main data-actor="checkbox">
          <i data-actor="statusIcon" class="far fa-check"></i>
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
    </nav>
    <span class="ak-ask">
      <a href="#">Provided by Blendedcoders</a>
    <span>
    `
    this.captcha.innerHTML = template
    this.captcha.actors = {}
    this.captcha.querySelectorAll("[data-actor]").forEach(actor => this.captcha.actors[actor.dataset.actor] = actor)

    return this.dispatchEvent("render").Init()
  }

  Init() {
    // on click to verify that the user is not a robot
    this.captcha.actors.checkbox.onclick = () => {
      if( +this.options.redos - this.redos < 0 ) return

      return this.loadSurvey()
    }

    return this.dispatchEvent("init")
  }

  setStatus(status) {
    this.status = +status
    const statusNames = [
      "awake",
      "loading",
      "verifying",
      "human",
      "redo",
      "failed",
      "robot"
    ]


    switch(+status) {
      case 0:
        this.captcha.classList.remove("developped")
        this.captcha.classList.remove("verified")
        this.captcha.classList.remove("failed")
        this.captcha.classList.remove("redo")
      break;

      case 1:
      case 2:
        this.captcha.classList.remove("verified")
        this.captcha.classList.remove("failed")
        this.captcha.classList.remove("redo")

        this.captcha.classList.add("developped")
      break;

      case 3:
        this.captcha.classList.remove("developped")
        this.captcha.classList.remove("failed")
        this.captcha.classList.remove("redo")

        this.captcha.classList.add("verified")
        this.dispatchEvent("human", [1])
      break;

      case 4:
        this.captcha.classList.remove("developped")
        this.captcha.classList.remove("verified")
        this.captcha.classList.remove("failed")

        this.captcha.classList.add("redo")
      break;

      case 5:
        this.captcha.classList.remove("developped")
        this.captcha.classList.remove("verified")
        this.captcha.classList.remove("redo")

        this.captcha.classList.add("failed")
      break;

      case 6:
        this.captcha.classList.remove("developped")
        this.captcha.classList.remove("verified")
        this.captcha.classList.remove("redo")

        this.captcha.classList.add("failed")

        this.dispatchEvent("robot", [0])
      break;
    }

    return this.dispatchEvent("statuschange", [statusNames[this.status]])
  }

  verifyingSurvey() {
    this.setStatus(1)
    this.captcha.actors.statusIcon.className = `far fa-check`

    let template = `
      <center style="padding: 1rem; font-size: 13px;">
        Loading survey,
        <br>
        Please wait while loading resources...
      </center>
    `
    this.captcha.actors.survey.innerHTML = template

    return this
  }

  failedSurvey() {
    this.setStatus(5)
    this.captcha.actors.statusIcon.className = `far fa-times`

    let template = `
      <center style="padding: 1rem; font-size: 13px;">
        You failed all the ${this.options.attempts} attempts.
        <br>
        We are sorry, but you can not continue
      </center>
    `
    this.captcha.actors.survey.innerHTML = template

    return this
  }

  redoSurvey() {
    this.setStatus(4)
    this.captcha.actors.statusIcon.className = `far fa-redo`

    // reset attempts
    this.attempts = 0

    // increase redos
    this.redos += 1

    return this
  }

  async loadSurvey() {
    if( +this.options.attempts - this.attempts <= 0 ) return

    this.verifyingSurvey()

    const surveys = await this.fetchURL('https://raw.githubusercontent.com/Adnanear/Blendedcaptcha/main/blendedcoders-captcha.json')
    var layer = Math.randomExcept(this.layer, 0, surveys.length - 1)
    const survey = {
      key: layer,
      value: surveys[layer],
      answerText: surveys[layer].answers[surveys[layer].answer]
    }

    let template = `
      <label class="ak-captcha-question">
        ${survey.value.question}
      </label>
      <img src="${survey.value.picture}" alt="captcha_picture_x">
      <nav>
        ${
          survey.value.answers.sort(() => Math.random() - 0.5).map(answer => `<button type="button" data-layer="${answer}">${answer}</button>`).join(' ')
        }
      </nav>
    `
    this.captcha.actors.survey.innerHTML = template
    this.captcha.actors.survey.querySelectorAll("button[data-layer]").forEach(answer => {
      answer.onclick = () => {

        //answer.parentNode.innerHTML = ""
        var layer = answer.dataset.layer

        if( layer == survey.answerText ) {
          this.setStatus(3)
          this.captcha.classList.add("verified")
        }
        else {
          if(this.attempts < this.options.attempts)
            this.loadSurvey()
          else {
            this.failedSurvey()
            if( +this.options.redos - this.redos > 0 )
              setTimeout(() => {
                this.redoSurvey()
              }, 1000)
            else this.setStatus(6)
          }
        }
      }
    })

    this.attempts += 1
    this.layer = survey.key
    return this.dispatchEvent("load")
  }

  async fetchURL(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if( xhr.readyState == 4 && xhr.status == 200 ) {
          var data = JSON.parse(xhr.response)
          resolve(data)
        }
      }
      xhr.open(
        'GET',
        url,
        true
      )
      xhr.send()
    })
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
