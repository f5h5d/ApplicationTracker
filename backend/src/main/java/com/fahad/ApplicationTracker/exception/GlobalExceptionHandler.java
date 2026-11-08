package com.fahad.ApplicationTracker.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * GlobalExceptionHandler
 */

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
  // used to log errors
  private static final Logger log = LoggerFactory.getLogger(
    GlobalExceptionHandler.class
  );

  @ExceptionHandler(ApplicationNotFoundException.class)
  public ResponseEntity<String> handleNotFound(
    ApplicationNotFoundException exception
  ) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
      exception.getMessage()
    );
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> handleUnexpected(Exception exception) {
    log.error("Unexpected request failure", exception);

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
      "An unexpected error occurred."
    );
  }
}
