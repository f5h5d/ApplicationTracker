package com.fahad.ApplicationTracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * SessionController
 */
@RestController
public class SessionController {

  @GetMapping ("/api/session")
  public boolean isSignedIn(java.security.Principal principal) {
    return principal != null;
  }
}
