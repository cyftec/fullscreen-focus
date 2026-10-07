import {
  EXTENSION_INIT_FLAG,
  TOP_ENTER_ZONE_PX,
  TOP_EXIT_ZONE_PX,
} from "./@libs/constants";

const win = window as Window & { [EXTENSION_INIT_FLAG]?: boolean };

if (!win[EXTENSION_INIT_FLAG]) {
  win[EXTENSION_INIT_FLAG] = true;

  let wantFullscreen: boolean | null = null;

  const applyPointerY = (clientY: number) => {
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

    if (next === wantFullscreen) return;
    wantFullscreen = next;
    chrome.runtime.sendMessage({ wantFullscreen: next }).catch(() => {});
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      applyPointerY(event.clientY);
    },
    { capture: true, passive: true },
  );
}
