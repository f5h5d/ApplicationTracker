package com.fahad.ApplicationTracker.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * CreateResume
 */
public record CreateResumeRequest(
  @NotBlank(message = "Resume can not be blank") String resumeText
) {}
