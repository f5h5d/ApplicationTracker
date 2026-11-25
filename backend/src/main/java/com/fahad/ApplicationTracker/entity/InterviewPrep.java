package com.fahad.ApplicationTracker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.time.Instant;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

/**
 * InterviewPrep
 */
@Entity
public class InterviewPrep {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  
  @OneToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "job_application_id", nullable = false, unique = true)
  @OnDelete (action = OnDeleteAction.CASCADE)
  private JobApplication application;

  // this annotation tells hibernate to use json when reading and writing record in this column
  @JdbcTypeCode(SqlTypes.JSON)
  @Column(name = "interview_prep", columnDefinition = "jsonb", nullable = false)
  private InterviewPrepPlan interviewPrep;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  public InterviewPrep(
    Long id,
    JobApplication application,
    InterviewPrepPlan interviewPrep,
    Instant createdAt,
    Instant updatedAt
  ) {
    this.id = id;
    this.application = application;
    this.interviewPrep = interviewPrep;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public InterviewPrep() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public InterviewPrepPlan getInterviewPrep() {
    return interviewPrep;
  }

  public void setInterviewPrep(InterviewPrepPlan interviewPrep) {
    this.interviewPrep = interviewPrep;
  }

  public JobApplication getApplication() {
    return application;
  }

  public void setApplication(JobApplication jobApplication) {
    this.application = jobApplication;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Instant createdAt) {
    this.createdAt = createdAt;
  }

  public Instant getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(Instant updatedAt) {
    this.updatedAt = updatedAt;
  }
}
