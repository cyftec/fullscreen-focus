import {
  EXTENSION_INIT_FLAG,
  TOP_ENTER_ZONE_PX,
  TOP_EXIT_ZONE_PX,
} from "./@libs/constants";

const win = window as Window & { [EXTENSION_INIT_FLAG]?: boolean };

const isAltKey = (event: KeyboardEvent) =>
  event.key === "Alt" ||
  event.code === "AltLeft" ||
  event.code === "AltRight";

if (!win[EXTENSION_INIT_FLAG]) {
  win[EXTENSION_INIT_FLAG] = true;

  let wantFullscreen: boolean | null = null;
  let lastClientY = 0;

  const applyPointerY = (clientY: number, blockEnterFullscreen: boolean) => {
    let next = wantFullscreen;
    if (next === null) {
      next = clientY > TOP_EXIT_ZONE_PX;
    } else if (next && clientY <= TOP_EXIT_ZONE_PX) {
      next = false;
    } else if (!next && clientY > TOP_ENTER_ZONE_PX) {
      next = true;
    } else {
      return;
    }

    if (blockEnterFullscreen && next) return;

    if (next === wantFullscreen) return;
    wantFullscreen = next;
    chrome.runtime.sendMessage({ wantFullscreen: next }).catch(() => {});
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      lastClientY = event.clientY;
      applyPointerY(event.clientY, event.altKey);
    },
    { capture: true, passive: true },
  );

  window.addEventListener(
    "keyup",
    (event) => {
      if (!isAltKey(event)) return;
      applyPointerY(lastClientY, false);
    },
    { capture: true },
  );
}
