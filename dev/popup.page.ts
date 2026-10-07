import { m } from "@cyftec/maya/core";

export default m.Html({
  lang: "en",
  children: [
    m.Head({
      children: [
        m.Title("Fullscreen Focus"),
        m.Meta({ charset: "UTF-8" }),
        m.Meta({
          "http-equiv": "X-UA-Compatible",
          content: "IE=edge",
        }),
        m.Meta({
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        }),
        m.Link({ rel: "stylesheet", href: "assets/styles.css" }),
      ],
    }),
    m.Body({
      children: [
        m.Script({ src: "popup.main.js", defer: true }),
        m.Div({
          style:
            "font-family: system-ui, sans-serif; padding: 1rem; max-width: 28rem; line-height: 1.5",
          children: [
            m.H1("Hold Alt to prevent fullscreen"),
            m.P(
              "While you hold the Alt key, moving the pointer will not enter fullscreen from normal window mode. This applies across tabs in the same window.",
            ),
            m.P(
              "Leaving fullscreen still works as usual: move the pointer to the top edge of the page.",
            ),
          ],
        }),
      ],
    }),
  ],
});
