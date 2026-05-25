/**
 * Tints the closed room picker from the selected option's data-room-kind
 * (native <option> styling is unreliable on macOS).
 */

const KIND_CLASSES = [
  'room-picker--private-selected',
  'room-picker--public-selected',
  'room-picker--other-selected',
];

/** @param {HTMLSelectElement | null} picker */
export function syncRoomPickerAppearance(picker) {
  if (!picker) {
    return;
  }
  picker.classList.remove(...KIND_CLASSES);
  const option = picker.selectedOptions[0];
  if (!option?.value) {
    return;
  }
  const kind = option.dataset.roomKind;
  if (kind === 'private') {
    picker.classList.add('room-picker--private-selected');
  } else if (kind === 'public') {
    picker.classList.add('room-picker--public-selected');
  } else if (kind === 'other') {
    picker.classList.add('room-picker--other-selected');
  }
}

function initRoomPicker() {
  const picker = document.getElementById('room-picker');
  if (!picker) {
    return;
  }
  picker.addEventListener('change', () => syncRoomPickerAppearance(picker));
  const observer = new MutationObserver(() => syncRoomPickerAppearance(picker));
  observer.observe(picker, {childList: true, subtree: true});
  syncRoomPickerAppearance(picker);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRoomPicker);
} else {
  initRoomPicker();
}
