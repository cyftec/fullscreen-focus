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
          class: "pa3 w5 dark-gray f5",
          children: [
            m.H1({
              class: "ma0",
              children: "Press & hold 'Alt' key to stop fullscreen",
            }),
            m.P(
              "Pressing & holding the 'Alt' key prevents the page, going from normal to fullscreen mode.",
            ),
            m.P(
              "Leaving fullscreen still works as usual: move the pointer to the top of the page.",
            ),
            m.H5({ class: "ma0 gray", children: "Disclaimer" }),
            m.P({
              class: "ma0 f6 gray",
              children:
                "Some sites specifically prevent the fullscreen behavior. So this extension might not work the same on every page.",
            }),
          ],
        }),
      ],
    }),
  ],
});
