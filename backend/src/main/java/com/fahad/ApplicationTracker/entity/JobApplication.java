package com.fahad.ApplicationTracker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.time.LocalDate;
import org.hibernate.annotations.Changelog.Timestamp;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * JobApplication
 */
@Entity
public class JobApplication {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "company_name", length = 255, nullable = false)
  private String companyName;

  @Column(name = "role", length = 100, nullable = false)
  private String role;

  @Column(name = "job_description", columnDefinition = "TEXT", nullable = true)
  private String jobDescription;

  @Column(name = "job_url", columnDefinition = "TEXT", nullable = true)
  private String jobUrl;

  @Column(name = "semester", length = 25, nullable = true)
  private String semester;

  @Column(name = "deadline", nullable = true)
  private LocalDate deadline;

  @Column(name = "notes", columnDefinition = "TEXT", nullable = true)
  private String notes;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false)
  private ApplicationStatus status = ApplicationStatus.SAVED;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private Instant updatedAt;

  public JobApplication() {}

  public JobApplication(
    Long id,
    String companyName,
    String role,
    String jobDescription,
    String jobUrl,
    String notes,
    ApplicationStatus status,
    Instant createdAt,
    Instant updatedAt
  ) {
    this.id = id;
    this.companyName = companyName;
    this.role = role;
    this.jobDescription = jobDescription;
    this.jobUrl = jobUrl;
    this.notes = notes;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public Long getId() {
    return id;
  }

  public String getCompanyName() {
    return companyName;
  }

  public void setCompanyName(String companyName) {
    this.companyName = companyName;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public String getJobDescription() {
    return jobDescription;
  }

  public void setJobDescription(String jobDescription) {
    this.jobDescription = jobDescription;
  }

  public String getJobUrl() {
    return jobUrl;
  }

  public void setJobUrl(String jobUrl) {
    this.jobUrl = jobUrl;
  }

  public String getSemester() {
    return semester;
  }

  public LocalDate getDeadline() {
    return deadline;
  }

  public String getNotes() {
    return notes;
  }

  public void setNotes(String notes) {
    this.notes = notes;
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

  public ApplicationStatus getStatus() {
    return status;
  }

  public void setStatus(ApplicationStatus status) {
    this.status = status;
  }
}
