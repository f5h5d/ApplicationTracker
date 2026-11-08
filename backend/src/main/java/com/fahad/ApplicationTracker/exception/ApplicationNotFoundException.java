package com.fahad.ApplicationTracker.exception;

/**
 * ApplicationNotFoundException
 */

public class ApplicationNotFoundException extends RuntimeException {

  public ApplicationNotFoundException(Long id) {
    super("Job application " + id + " was not found");
  }
}
