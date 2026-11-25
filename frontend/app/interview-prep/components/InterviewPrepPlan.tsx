import type { PlanPoint, PrepPlan } from "@/src/lib/interview-prep/types";
import styles from "../page.module.css";

function ReviewCard({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: PlanPoint[];
}) {
  return (
    <section className={styles.card}>
      <h3>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
      <dl className={styles.details}>
        {items.map(({ header, description }) => (
          <div key={header}>
            <dt>{header}</dt>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function InterviewPrepPlan({ plan }: { plan: PrepPlan }) {
  return (
    <section aria-labelledby="plan-title">
      <header className={styles.planHeader}>
        <h2 id="plan-title">Your prep plan</h2>
      </header>
      <div className={styles.planGrid}>
        <section className={styles.card}>
          <h3>Practice questions</h3>
          <p className={styles.subtitle}>
            Rehearse out loud using examples from your work.
          </p>
          <ol className={styles.questions}>
            {plan.practiceQuestions.map(({ header, description }, index) => (
              <li key={header}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4>{header}</h4>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <div className={styles.sideCards}>
          <ReviewCard
            title="Topics to review"
            subtitle="Focus your study time on these topics."
            items={plan.topicsToReview}
          />
          {plan.talkingPoints?.length > 0 && (
            <ReviewCard
              title="Your talking points"
              subtitle="Resume evidence to bring into your answers."
              items={plan.talkingPoints}
            />
          )}
        </div>
      </div>
    </section>
  );
}
