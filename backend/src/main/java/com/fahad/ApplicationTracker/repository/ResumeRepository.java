package com.fahad.ApplicationTracker.repository;

import com.fahad.ApplicationTracker.entity.Resume;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * ResumeRepository
 */
@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
  // most recent resume
  Optional<Resume> findFirstByOrderByCreatedAtDescIdDesc();
}
