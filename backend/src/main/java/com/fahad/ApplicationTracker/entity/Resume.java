package com.fahad.ApplicationTracker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.Instant;
import org.hibernate.annotations.CreationTimestamp;

/**
 * Resume
 */
@Entity
public class Resume {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "resume", columnDefinition = "TEXT", nullable = false)
  private String resume;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  public Resume(Long id, String resume, Instant createdAt) {
    this.id = id;
    this.resume = resume;
    this.createdAt = createdAt;
  }

  public Resume() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getResume() {
    return resume;
  }

  public void setResume(String resume) {
    this.resume = resume;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Instant createdAt) {
    this.createdAt = createdAt;
  }
}
