package com.fahad.ApplicationTracker.dto;

import com.fahad.ApplicationTracker.entity.ApplicationStatus;
import jakarta.validation.constraints.Size;

public record UpdateStatusRequest(
  ApplicationStatus status,
  
  String notes
) {}
