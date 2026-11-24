package com.fahad.ApplicationTracker.controller;

import com.fahad.ApplicationTracker.dto.CreateResumeRequest;
import com.fahad.ApplicationTracker.entity.JobApplication;
import com.fahad.ApplicationTracker.entity.Resume;
import com.fahad.ApplicationTracker.service.InterviewPrepService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * InterviewPrepController
 */
@RestController
@RequestMapping("/api/interview-prep/")
public class InterviewPrepController {

  @Autowired
  private InterviewPrepService interviewPrepService;

  @PostMapping("resume")
  public ResponseEntity<Void> createResume(
    @RequestBody CreateResumeRequest request
  ) {
    interviewPrepService.addResume(request);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  // return applications with status of "INTERVIEW"
  @GetMapping("applications")
  public ResponseEntity<
    List<JobApplication>
  > fetchInterviewingJobApplications() {
    return ResponseEntity.ok(
      interviewPrepService.fetchInterviewingJobApplications()
    );
  }

  @GetMapping("resume")
  public ResponseEntity<String> fetchRecentResume() {
    return ResponseEntity.ok(interviewPrepService.fetchRecentResume());
  }
}
