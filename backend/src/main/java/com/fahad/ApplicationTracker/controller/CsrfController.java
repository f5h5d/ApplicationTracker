package com.fahad.ApplicationTracker.controller;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * CsrfController
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CsrfController {

  @GetMapping("/api/csrf")
  public CsrfToken getCsrf(CsrfToken token) {
    return token;
  }
}
