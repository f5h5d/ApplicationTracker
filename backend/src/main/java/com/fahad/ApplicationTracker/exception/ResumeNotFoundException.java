package com.fahad.ApplicationTracker.exception;

/**
 * ApplicationNotFoundException
 */

public class ResumeNotFoundException extends RuntimeException {

  public ResumeNotFoundException(Long id) {
    super("Resume version" + id + " was not found");
  }
}
