let pendingFullscreen: boolean | null = null;
let pendingWindowId: number | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const flushWindowState = () => {
  debounceTimer = null;
  if (pendingWindowId === null || pendingFullscreen === null) return;

  const windowId = pendingWindowId;
  const wantFullscreen = pendingFullscreen;
  pendingWindowId = null;
  pendingFullscreen = null;

  chrome.windows.update(windowId, {
    state: wantFullscreen ? "fullscreen" : "normal",
  });
};

chrome.runtime.onMessage.addListener((message, sender) => {
  const windowId = sender.tab?.windowId;
  if (windowId === undefined || typeof message.wantFullscreen !== "boolean") {
    return;
  }

  pendingWindowId = windowId;
  pendingFullscreen = message.wantFullscreen;

  if (debounceTimer !== null) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(flushWindowState, 120);
});
