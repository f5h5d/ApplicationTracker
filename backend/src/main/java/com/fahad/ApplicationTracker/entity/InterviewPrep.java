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
import org.hibernate.annotations.UpdateTimestamp;

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
  private JobApplication application;

  @Column(name = "practice_questions", nullable = false)
  private String practiceQuestions;

  @Column(name = "review_topics", nullable = false)
  private String reviewTopics;

  @Column(name = "resume_talking_points", nullable = false)
  private String resumeTalkingPoints;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  public InterviewPrep(
    Long id,
    JobApplication application,
    String practiceQuestions,
    String reviewTopics,
    String resumeTalkingPoints,
    Instant createdAt,
    Instant updatedAt
  ) {
    this.id = id;
    this.application = application;
    this.practiceQuestions = practiceQuestions;
    this.reviewTopics = reviewTopics;
    this.resumeTalkingPoints = resumeTalkingPoints;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public JobApplication getApplication() {
    return application;
  }

  public void setApplication(JobApplication jobApplication) {
    this.application = jobApplication;
  }

  public String getPracticeQuestions() {
    return practiceQuestions;
  }

  public void setPracticeQuestions(String practiceQuestions) {
    this.practiceQuestions = practiceQuestions;
  }

  public String getReviewTopics() {
    return reviewTopics;
  }

  public void setReviewTopics(String reviewTopics) {
    this.reviewTopics = reviewTopics;
  }

  public String getResumeTalkingPoints() {
    return resumeTalkingPoints;
  }

  public void setResumeTalkingPoints(String resumeTalkingPoints) {
    this.resumeTalkingPoints = resumeTalkingPoints;
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
