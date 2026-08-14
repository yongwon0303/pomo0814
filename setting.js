const STORAGE_KEY = "pomodoroMinutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const minutesInput = document.getElementById("timer-minutes");
const notice = document.getElementById("setting-notice");
const saveBtn = document.getElementById("save-btn");

function validateMinutes(rawValue) {
  if (rawValue.trim() === "") {
    return { valid: false, message: "시간을 입력해주세요." };
  }
  const minutes = Number(rawValue);
  if (!Number.isFinite(minutes) || minutes < MIN_MINUTES || minutes > MAX_MINUTES) {
    return { valid: false, message: `${MIN_MINUTES}분 이상 ${MAX_MINUTES}분 이하로 설정해주세요.` };
  }
  return { valid: true, minutes };
}

function refreshState() {
  const result = validateMinutes(minutesInput.value);
  saveBtn.disabled = !result.valid;
  notice.textContent = result.valid ? "" : result.message;
}

minutesInput.oninput = function () {
  refreshState();
};

saveBtn.onclick = function () {
  const result = validateMinutes(minutesInput.value);
  if (!result.valid) {
    notice.textContent = result.message;
    return;
  }
  localStorage.setItem(STORAGE_KEY, String(result.minutes));
  notice.textContent = "저장되었습니다.";
};

const storedMinutes = localStorage.getItem(STORAGE_KEY);
if (storedMinutes) {
  minutesInput.value = storedMinutes;
}
refreshState();
