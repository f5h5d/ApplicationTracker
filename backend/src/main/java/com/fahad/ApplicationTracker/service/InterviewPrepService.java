package com.fahad.ApplicationTracker.service;

import com.fahad.ApplicationTracker.dto.CreateResumeRequest;
import com.fahad.ApplicationTracker.entity.ApplicationStatus;
import com.fahad.ApplicationTracker.entity.InterviewPrep;
import com.fahad.ApplicationTracker.entity.InterviewPrepPlan;
import com.fahad.ApplicationTracker.entity.JobApplication;
import com.fahad.ApplicationTracker.entity.Resume;
import com.fahad.ApplicationTracker.exception.ApplicationNotFoundException;
import com.fahad.ApplicationTracker.exception.ResumeNotFoundException;
import com.fahad.ApplicationTracker.repository.InterviewPrepRepository;
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

  @Autowired
  private InterviewPrepRepository interviewPrepRepository;

  public InterviewPrepService(AiService aiService) {
    this.aiService = aiService;
  }

  public InterviewPrep createInterviewPrep(Long applicationId) {
    JobApplication application = jobApplicationRepository
      .findById(applicationId)
      .orElseThrow(() -> new ApplicationNotFoundException(applicationId));

    String resumeText;

    // if theres a resume linked to the application use that resume, if not use the most recent one
    if (application.getResume() != null) {
      resumeText = application.getResume().getResume();
    } else {
      Resume resume = fetchRecentResume();

      if (resume == null) {
        resumeText =
          "No resume inputed, return talking points as talkingPoints: []";
      } else {
        resumeText = resume.getResume();
      }
    }

    String prompt = """
      Based on the following job description and given resume, help create some interview prep. Create 5 practice questions,
      3-5 topics to review and 3-5 talking points from the given resume that are relevant to the job description. Output is jsonb.
      Each question or point has a header and description, the header is the actual question or point while the description is a
      hint that could be resume based or not depending on the quesiton: The following is an example using just one answer for each:

      {
        "practiceQuestions": [
          {
            "header": "How would you prevent duplicate applications?",
            "description": "Explain where you would enforce uniqueness and why."
          },
          {
            "header": "When would you add a database index?",
            "description": "Pick one query from your tracker and explain how you would measure the impact."
          }
        ],
        "topicsToReview": [
          {
            "header": "Database constraints",
            "description": "Review how unique constraints behave during concurrent inserts."
          }
        ],
        "talkingPoints": [
          {
            "header": "Application status tracking",
            "description": "Walk through a design decision you made while building the tracker."
          }
        ]
      }


      USER_RESUME:
      %s

      JOB_DESCRIPTION
      %s

    """.formatted(resumeText, application.getJobDescription());

    InterviewPrepPlan response = aiService.chat(prompt);

    InterviewPrep interviewPrep = new InterviewPrep();

    interviewPrep.setApplication(application);
    interviewPrep.setInterviewPrep(response);

    interviewPrepRepository.save(interviewPrep);

    return interviewPrep;
  }

  public void addResume(CreateResumeRequest request) {
    Resume resume = new Resume();
    resume.setResume(request.resumeText());
    resumeRepository.save(resume);
  }

  public List<JobApplication> fetchInterviewingJobApplications() {
    return jobApplicationRepository.findByStatus(ApplicationStatus.INTERVIEW); // second is the pageable filter
  }

  public Resume fetchRecentResume() {
    Optional<Resume> resume =
      resumeRepository.findFirstByOrderByCreatedAtDescIdDesc();

    if (resume.isEmpty()) {
      return null;
    } else {
      return resume.get();
    }
  }

  public Optional<InterviewPrep> fetchInterviewPrep(Long jobApplicationId) {
    return interviewPrepRepository.findByApplication_Id(jobApplicationId);
  }
}
