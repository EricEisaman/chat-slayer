const STORAGE_KEY = 'chat-slayer-private-room-names-remembered';

function readRemembered() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((n) => typeof n === 'string' && n.trim())
      : [];
  } catch {
    return [];
  }
}

function writeRemembered(names) {
  const unique = [...new Set(names.map((n) => n.trim()).filter(Boolean))];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
}

function rememberName(name) {
  const trimmed = name.trim();
  if (!trimmed) {
    return;
  }
  const list = readRemembered();
  if (!list.includes(trimmed)) {
    writeRemembered([...list, trimmed]);
  }
}

function renderRememberedChips(container) {
  container.replaceChildren();
  for (const name of readRemembered()) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'room-by-name-chip';
    chip.textContent = name;
    chip.addEventListener('click', () => {
      const input = document.getElementById('room-by-name-input');
      if (input) {
        input.value = name;
        input.focus();
      }
    });
    container.appendChild(chip);
  }
}

function flashDialogSuccess(dialog) {
  dialog.classList.add('room-by-name-dialog--success');
  window.setTimeout(() => {
    dialog.classList.remove('room-by-name-dialog--success');
  }, 600);
}

async function loadPrivateRoomsConfig() {
  try {
    const res = await fetch('/demo-config.json', {cache: 'no-store'});
    if (!res.ok) {
      return {privateRoomsEnabled: false};
    }
    return await res.json();
  } catch {
    return {privateRoomsEnabled: false};
  }
}

function wireDiscoverProxy() {
  const proxy = document.getElementById('discover-room-proxy');
  const input = document.getElementById('room-by-name-input');
  const dialog = document.getElementById('room-by-name-dialog');
  const chips = document.getElementById('room-by-name-remembered');
  const trigger = document.getElementById('room-by-name-trigger');
  const cancel = document.getElementById('room-by-name-cancel');
  const openBtn = document.getElementById('room-by-name-open');

  if (!proxy || !input || !dialog || !trigger) {
    return;
  }

  trigger.hidden = false;

  const openDialog = () => {
    renderRememberedChips(chips);
    if (!input.value && readRemembered().length > 0) {
      input.value = readRemembered()[readRemembered().length - 1];
    }
    dialog.showModal();
    input.focus();
  };

  trigger.addEventListener('click', openDialog);
  cancel?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    dialog.close();
  });
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });

  const submit = () => {
    const name = input.value.trim();
    if (name.length < 3) {
      input.reportValidity?.();
      return;
    }
    window.__csDiscoverRoomName = name;
    proxy.click();
  };

  openBtn?.addEventListener('click', submit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  });

  let pendingDiscover = false;
  proxy.addEventListener('click', () => {
    pendingDiscover = true;
  });

  const statusEl = document.getElementById('status');
  if (statusEl) {
    const obs = new MutationObserver(() => {
      if (!pendingDiscover) {
        return;
      }
      const text = statusEl.textContent?.trim() ?? '';
      if (text.startsWith('Opened ')) {
        pendingDiscover = false;
        const name = window.__csDiscoverRoomName?.trim();
        if (name) {
          rememberName(name);
        }
        flashDialogSuccess(dialog);
        dialog.close();
        input.value = '';
        window.__csDiscoverRoomName = '';
      } else if (
        text &&
        !text.endsWith('…') &&
        !text.startsWith('Opened ')
      ) {
        pendingDiscover = false;
      }
    });
    obs.observe(statusEl, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
}

loadPrivateRoomsConfig().then((config) => {
  if (config.privateRoomsEnabled) {
    wireDiscoverProxy();
  }
});
