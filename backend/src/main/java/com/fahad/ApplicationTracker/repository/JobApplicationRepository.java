package com.fahad.ApplicationTracker.repository;

import com.fahad.ApplicationTracker.entity.JobApplication;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * JobApplicationRepository
 */
@Repository
public interface JobApplicationRepository
  extends JpaRepository<JobApplication, Long>
{
  List<JobApplication> findByCompanyNameContainingIgnoreCaseOrRoleContainingIgnoreCaseOrJobDescriptionContainingIgnoreCase(
    String CompanyName,
    String Role,
    String JobDescription
  );
}
