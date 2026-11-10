package com.fahad.ApplicationTracker.repository;

import com.fahad.ApplicationTracker.entity.ApplicationStatus;
import com.fahad.ApplicationTracker.entity.JobApplication;
import com.fahad.ApplicationTracker.entity.StatusCount;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JobApplicationRepository
 */

@Repository
public interface JobApplicationRepository
  extends JpaRepository<JobApplication, Long>
{
  @Query(
    """
    select a from JobApplication a
    where (
        lower(a.companyName) like lower(concat('%', :search, '%'))
        or lower(a.role) like lower(concat('%', :search, '%'))
        or lower(a.jobDescription) like lower(concat('%', :search, '%'))
    )
    """
  )
  Page<JobApplication> searchApplications(
    @Param("search") String search,
    Pageable pageable
  );

  @Query(
    """
    select a from JobApplication a
    where (
        lower(a.companyName) like lower(concat('%', :search, '%'))
        or lower(a.role) like lower(concat('%', :search, '%'))
        or lower(a.jobDescription) like lower(concat('%', :search, '%'))
    )
    and (:status is null or a.status = :status)
    """
  )
  Page<JobApplication> searchApplications(
    @Param("search") String search,
    @Param("status") ApplicationStatus status,
    Pageable pageable
  );

  @Query("""
      select a.status as status, count(a) as total
      from JobApplication a
      group by a.status
      """)
  List<StatusCount> findApplicationsOverview();

  Page<JobApplication> findByStatus(
    ApplicationStatus status,
    Pageable pageable
  );
}
