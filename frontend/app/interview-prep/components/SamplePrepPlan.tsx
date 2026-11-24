import styles from "../page.module.css";

const questions = [
  {
    prompt:
      "Walk me through a backend feature you built, from request to database.",
    hint: "Use Novion: explain the API, validation, database access, and one tradeoff.",
  },
  {
    prompt:
      "How would you design an API that creates an application without saving duplicates?",
    hint: "Discuss request validation, status codes, and a database uniqueness constraint.",
  },
  {
    prompt: "When would you use a database index, and what would you measure?",
    hint: "Choose a query, explain the index, and describe its write and storage costs.",
  },
  {
    prompt:
      "How would you protect data so each user can access only their own records?",
    hint: "Use your JWT and row-level security work. Connect it to a Spring service.",
  },
  {
    prompt:
      "Tell me about a technical problem you debugged and how you verified the fix.",
    hint: "Use a real Novion or TradeMind example: problem, action, result, and lesson.",
  },
];

const topics = [
  {
    title: "Spring REST APIs",
    detail:
      "Review request validation, response codes, and exception handling.",
  },
  {
    title: "JPA + PostgreSQL",
    detail:
      "Review entity relationships, transactions, indexes, and duplicate protection.",
  },
  {
    title: "Security + testing",
    detail:
      "Review JWT authentication, user-scoped queries, and API integration tests.",
  },
];

const talkingPoints = [
  {
    title: "Novion",
    detail:
      "Talk through JWT auth, row-level security, and Redis. Explain your own design decisions.",
  },
  {
    title: "TradeMind",
    detail:
      "Describe a bug you investigated, how you traced it, and the test that verified your fix.",
  },
];

function ReviewCard({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: typeof topics;
}) {
  return (
    <section className={styles.card}>
      <h3>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
      <dl className={styles.details}>
        {items.map(({ title, detail }) => (
          <div key={title}>
            <dt>{title}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function SamplePrepPlan() {
  return (
    <section aria-labelledby="plan-title">
      <header className={styles.planHeader}>
        <h2 id="plan-title">Your prep plan</h2>
        <p>
          Based on a sample resume + saved job description{" "}
          <span>Sample prep</span>
        </p>
      </header>
      <div className={styles.planGrid}>
        <section className={styles.card}>
          <h3>Practice questions</h3>
          <p className={styles.subtitle}>
            5 prompts to rehearse out loud. Use real examples from your work.
          </p>
          <ol className={styles.questions}>
            {questions.map(({ prompt, hint }, index) => (
              <li key={prompt}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4>{prompt}</h4>
                  <p>{hint}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <div className={styles.sideCards}>
          <ReviewCard
            title="Topics to review"
            subtitle="Three areas to focus your study time."
            items={topics}
          />
          <ReviewCard
            title="Your talking points"
            subtitle="Resume evidence to bring into your answers."
            items={talkingPoints}
          />
        </div>
      </div>
    </section>
  );
}
