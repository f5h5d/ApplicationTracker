package com.fahad.ApplicationTracker.repository;

import com.fahad.ApplicationTracker.entity.InterviewPrep;
import com.fahad.ApplicationTracker.entity.JobApplication;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * InterviewPrepRepository
 */
public interface InterviewPrepRepository
  extends JpaRepository<InterviewPrep, Long>
{
  Optional<InterviewPrep> findByApplication_Id(Long applicationId);
}
