function openPopup(coin, timerId) {
  document.getElementById(`popup-${coin}`).style.display = 'block';
  startTimer(5 * 60, document.getElementById(timerId), `paid-btn-${coin}`, `more-time-btn-${coin}`);
}
function copyAddress(elementId) {
    const el = document.createElement('textarea');
    el.value = document.getElementById(elementId).textContent;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function openPopup(coin, timerId, paidBtnId, moreTimeBtnId, progressRingId) {
  document.getElementById(`popup-${coin}`).style.display = 'block';
  startTimer(5 * 60, document.getElementById(timerId), paidBtnId, moreTimeBtnId, progressRingId);
}

function startTimer(duration, display, paidBtnId, moreTimeBtnId, progressRingId) {
  let timer = duration,
    minutes,
    seconds;
  const paidBtn = document.getElementById(paidBtnId);
  const moreTimeBtn = document.getElementById(moreTimeBtnId);
  const progressRing = document.querySelector(`#${progressRingId}`);
  const circumference = 2 * Math.PI * progressRing.getAttribute("r");
  const countdown = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    const progress = (timer / duration) * circumference;
    progressRing.style.strokeDashoffset = circumference - progress;

    if (timer <= duration / 2) {
      progressRing.style.stroke = "red";
    } else {
      progressRing.style.stroke = "green";
    }

    if (--timer < 0) {
      clearInterval(countdown);
      paidBtn.style.display = "block";
      moreTimeBtn.style.display = "block";
    }
  }, 1000);

  moreTimeBtn.addEventListener("click", function () {
    clearInterval(countdown);
    startTimer(duration, display, paidBtnId, moreTimeBtnId, progressRingId);
    paidBtn.style.display = "none";
    moreTimeBtn.style.display = "none";
  });
}
  function closePopup(popupId) {
      document.getElementById(popupId).style.display = 'none';
  }
  