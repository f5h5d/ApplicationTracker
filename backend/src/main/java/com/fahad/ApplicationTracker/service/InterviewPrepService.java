package com.fahad.ApplicationTracker.service;

import com.fahad.ApplicationTracker.dto.CreateResumeRequest;
import com.fahad.ApplicationTracker.entity.ApplicationStatus;
import com.fahad.ApplicationTracker.entity.JobApplication;
import com.fahad.ApplicationTracker.entity.Resume;
import com.fahad.ApplicationTracker.repository.JobApplicationRepository;
import com.fahad.ApplicationTracker.repository.ResumeRepository;
import java.util.List;
import java.util.Optional;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * InterviewPrepService
 */

@Service
public class InterviewPrepService {

  private final AiService aiService;

  @Autowired
  private ResumeRepository resumeRepository;

  @Autowired
  private JobApplicationRepository jobApplicationRepository;

  public InterviewPrepService(AiService aiService) {
    this.aiService = aiService;
  }

  public void createInterviewPrep(JobApplication application) {
    String prompt = """
      Based on the following job description and given resume, help create some interview prep.
      I need you to give 5 practice questions, 3 - 4 topics to review with a short subinformation and
      3 talking points from the given resume that are relevant to the job description
    """;
  }

  public void addResume(CreateResumeRequest request) {
    Resume resume = new Resume();
    resume.setResume(request.resumeText());
    resumeRepository.save(resume);
  }

  public List<JobApplication> fetchInterviewingJobApplications() {
    return jobApplicationRepository.findByStatus(ApplicationStatus.INTERVIEW); // second is the pageable filter
  }

  public String fetchRecentResume() {
    Optional<Resume> resume =
      resumeRepository.findFirstByOrderByCreatedAtDescIdDesc();

    if (resume.isEmpty()) {
      return null;
    } else {
      return resume.get().getResume();
    }
  }
}
