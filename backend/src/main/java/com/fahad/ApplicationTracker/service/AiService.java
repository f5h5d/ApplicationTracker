package com.fahad.ApplicationTracker.service;

import com.fahad.ApplicationTracker.entity.InterviewPrepPlan;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

/**
 * AiService
 */
@Service
public class AiService {

  private final ChatClient chatClient;

  public AiService(ChatClient.Builder builder) {
    chatClient = builder.build();
  }

  public InterviewPrepPlan chat(String prompt) {
    // using .entity you can specify the return type using a class in this case its json,
    // check class for more details
    return chatClient.prompt(prompt).call().entity(InterviewPrepPlan.class);
  }
}
