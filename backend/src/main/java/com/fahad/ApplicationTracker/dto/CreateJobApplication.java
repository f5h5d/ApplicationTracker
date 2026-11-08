package com.fahad.ApplicationTracker.dto;

import com.fahad.ApplicationTracker.entity.ApplicationStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateJobApplication(
  @Size (max=255, message="Company name must be 255 characters or fewer")
  @NotBlank(message="Company name can not be blank")
  String companyName,
  
  @Size (max=100, message="Name's of roles must be 100 characters or less")
  @NotBlank(message="Role can not be blank")
  String role,
  
  String jobDescription,
  
  String jobUrl,

  @Size (max=100, message="Notes must be 100 characters or fewer")
  String notes,

  @NotNull (message="Application status must be provided")
  ApplicationStatus status
  
) {}
