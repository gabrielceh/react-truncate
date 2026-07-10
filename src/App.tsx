import { TextTruncate } from "./components/TextTruncate";

function App() {
  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: 600,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <section>
        <h2>1 line without label</h2>
        <TextTruncate text="Short text that does not need truncation." />
      </section>

      <section>
        <h2>1 line with showMoreLabel</h2>
        <TextTruncate
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quae, quos quas voluptates quod quia voluptatem exercitationem."
          showMoreLabel="Show more"
        />
      </section>

      <section>
        <h2>3 lines with showMoreLabel</h2>
        <TextTruncate
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quae, quos quas voluptates quod quia voluptatem exercitationem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quae, quos quas voluptates quod quia voluptatem exercitationem."
          lines={3}
          showMoreLabel="Show more"
        />
      </section>

      <section>
        <h2>Toggle expand/collapse</h2>
        <TextTruncate
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quae, quos quas voluptates quod quia voluptatem exercitationem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quae, quos quas voluptates quod quia voluptatem exercitationem."
          lines={3}
          showMoreLabel="Show more"
          showLessLabel="Show less"
        />
      </section>

      <section>
        <h2>As span with 2 lines</h2>
        <TextTruncate
          as="span"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quae, quos quas voluptates quod quia voluptatem exercitationem."
          lines={2}
        />
      </section>

      <section>
        <h2>Custom className (as h3)</h2>
        <TextTruncate
          as="h3"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quae, quos quas voluptates quod quia voluptatem exercitationem."
          lines={2}
          className="title"
          showMoreLabel="Read more"
        />
      </section>

      <section>
        <h2>Toggle with textTruncateChild</h2>
        <TextTruncate
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quae, quos quas voluptates quod quia voluptatem exercitationem."
          lines={2}
          showMoreLabel="Show more"
          showLessLabel="Show less"
          textTruncateChild={
            <span style={{ color: "gray", fontSize: "0.85rem" }}>
              {" "}
              — Read 2h ago
            </span>
          }
        />
      </section>
    </main>
  );
}

export default App;
