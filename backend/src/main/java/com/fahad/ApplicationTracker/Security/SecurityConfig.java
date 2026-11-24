package com.fahad.ApplicationTracker.Security;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * SecurityConfig
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  UrlBasedCorsConfigurationSource corsConfigurationSource() {
    var cors = new CorsConfiguration();
    cors.setAllowedOrigins(List.of("http://localhost:3000"));
    cors.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
    cors.setAllowedHeaders(List.of("Content-Type", "X-CSRF-TOKEN"));
    cors.setAllowCredentials(true);

    var source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", cors);
    return source;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) {
    return http
      .cors(Customizer.withDefaults())
      .authorizeHttpRequests(auth ->
        auth
          .requestMatchers("/login", "/api/csrf", "/api/session")
          .permitAll()
          .anyRequest()
          .authenticated()
      )
      .exceptionHandling(errors ->
        errors.authenticationEntryPoint((request, response, exception) ->
          response.setStatus(401)
        )
      )
      .formLogin(form ->
        form
          .successHandler((request, response, authentication) ->
            response.setStatus(204)
          )
          .failureHandler((request, response, exception) ->
            response.setStatus(401)
          )
      )
      .logout(logout ->
        logout.logoutSuccessHandler((request, response, authentication) ->
          response.setStatus(204)
        )
      )
      .build();
  }
}
