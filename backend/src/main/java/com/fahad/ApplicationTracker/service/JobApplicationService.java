package com.fahad.ApplicationTracker.service;

import com.fahad.ApplicationTracker.dto.CreateJobApplication;
import com.fahad.ApplicationTracker.dto.UpdateStatusRequest;
import com.fahad.ApplicationTracker.entity.ApplicationStatus;
import com.fahad.ApplicationTracker.entity.JobApplication;
import com.fahad.ApplicationTracker.exception.ApplicationNotFoundException;
import com.fahad.ApplicationTracker.repository.JobApplicationRepository;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * JobApplicationService
 */

@Service
public class JobApplicationService {

  @Autowired
  private JobApplicationRepository jobApplicationRepository;

  public JobApplication createJobApplication(CreateJobApplication request) {
    JobApplication application = new JobApplication();

    application.setCompanyName(request.companyName());
    application.setRole(request.role());
    application.setJobDescription(request.jobDescription());
    application.setJobUrl(request.jobUrl());
    application.setNotes(request.notes());
    application.setStatus(request.status());

    return jobApplicationRepository.save(application);
  }

  public Page<JobApplication> fetchJobApplications(int page) {
    return jobApplicationRepository.findAll(
      PageRequest.of(page, 10, Sort.by("createdAt", "id").descending())
    );
  }

  public void deleteJobApplication(Long id) {
    JobApplication application = jobApplicationRepository
      .findById(id)
      .orElseThrow(() -> new ApplicationNotFoundException(id));
    jobApplicationRepository.delete(application);
  }

  @Transactional
  public JobApplication updateJobApplication(
    Long id,
    UpdateStatusRequest request
  ) {
    JobApplication application = jobApplicationRepository
      .findById(id)
      .orElseThrow(() -> new ApplicationNotFoundException(id));

    if (request.status() != null) {
      application.setStatus(request.status());
    }

    if (request.notes() != null) {
      application.setNotes(request.notes());
    }

    return application;
  }

  public void deleteJobApplications() {
    jobApplicationRepository.deleteAll();
  }

  public List<JobApplication> fetchJobApplicationSearchResults(String search) {
    return jobApplicationRepository.findByCompanyNameContainingIgnoreCaseOrRoleContainingIgnoreCaseOrJobDescriptionContainingIgnoreCase(
      search,
      search,
      search
    );
  }

  public JobApplication fetchJobApplication(Long id) {
    return jobApplicationRepository
      .findById(id)
      .orElseThrow(() -> new ApplicationNotFoundException(id));
  }
}
