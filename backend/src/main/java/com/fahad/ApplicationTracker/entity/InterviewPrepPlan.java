package com.fahad.ApplicationTracker.entity;

import java.util.List;

public record InterviewPrepPlan(
  List<Item> practiceQuestions,
  List<Item> topicsToReview,
  List<Item> talkingPoints
) {
  public record Item(String header, String description) {}
}
