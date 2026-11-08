package com.fahad.ApplicationTracker.controller;

import com.fahad.ApplicationTracker.dto.CreateJobApplication;
import com.fahad.ApplicationTracker.dto.UpdateStatusRequest;
import com.fahad.ApplicationTracker.entity.ApplicationStatus;
import com.fahad.ApplicationTracker.entity.JobApplication;
import com.fahad.ApplicationTracker.service.JobApplicationService;
import jakarta.validation.Valid;
import java.util.List;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

/**
 * JobApplicationController
 */
@RestController
@RequestMapping("/api/applications/")
public class JobApplicationController {

  @Autowired
  private JobApplicationService jobApplicationService;

  @PostMapping("")
  public ResponseEntity<?> createJobApplication(
    @Valid @RequestBody CreateJobApplication request
  ) {
    return ResponseEntity.ok(
      jobApplicationService.createJobApplication(request)
    );
    // try {
    //   JobApplication application = jobApplicationService.createJobAppalication(
    //     jobApplication
    //   );
    //   return new ResponseEntity<>(application, HttpStatus.CREATED);
    // } catch (Exception e) {
    //   return new ResponseEntity<>(
    //     e.getMessage(),
    //     HttpStatus.INTERNAL_SERVER_ERROR
    //   );
    // }
  }

  @PutMapping("{id}")
  public ResponseEntity<JobApplication> updateJobApplication(
    @PathVariable Long id,
    @Valid @RequestBody UpdateStatusRequest request
  ) {
    return ResponseEntity.ok(
      jobApplicationService.updateJobApplication(id, request)
    );
  }

  @GetMapping("{id}")
  public ResponseEntity<JobApplication> fetchJobApplication(
    @PathVariable Long id
  ) {
    return ResponseEntity.ok(jobApplicationService.fetchJobApplication(id));
  }

  @GetMapping("search")
  public ResponseEntity<List<JobApplication>> fetchJobApplicationSearchResults(
    @RequestParam("search") String search
  ) {
    return ResponseEntity.ok(
      jobApplicationService.fetchJobApplicationSearchResults(search)
    );
  }

  @GetMapping("")
  public ResponseEntity<List<JobApplication>> fetchJobApplications() {
    return ResponseEntity.ok(jobApplicationService.fetchJobApplications());
  }

  @DeleteMapping("")
  public ResponseEntity<Void> deleteJobApplications() {
    jobApplicationService.deleteJobApplications();
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("{id}")
  public ResponseEntity<Void> deleteJobApplication(@PathVariable Long id) {
    jobApplicationService.deleteJobApplication(id);
    return ResponseEntity.noContent().build();
  }
}
