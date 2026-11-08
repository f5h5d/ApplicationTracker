package com.fahad.ApplicationTracker.dto;

import com.fahad.ApplicationTracker.entity.ApplicationStatus;
import jakarta.validation.constraints.Size;

public record UpdateStatusRequest(
  ApplicationStatus status,

  @Size(max = 100, message = "Notes must be 100 characters or fewer")
  String notes
) {}
