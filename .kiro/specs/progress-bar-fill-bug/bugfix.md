# Progress Bar Fill Bug - Requirements

## Introduction

The progress bar on the project timeline is filling beyond the last completed milestone to include upcoming milestones with TBD (To Be Determined) dates. This occurs because milestones with past dates are not being correctly marked as `completed: true`, causing the progress bar fill to extend to 100% instead of stopping at the position of the last completed milestone. The bug affects projects like HRMS and Property Tax Kit Tender, while the Chalo project works correctly.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a milestone has a past date (e.g., April 2, 2026) THEN the system does not mark it as completed, causing the progress bar to fill beyond that milestone's position

1.2 WHEN a milestone has a TBD date (no date) THEN the system treats it as if it should be included in the progress bar fill, extending the bar to 100% instead of stopping at the last completed milestone

1.3 WHEN the progress bar calculation runs on projects with past-dated milestones followed by TBD milestones THEN the barFillPct is set to 100% instead of the position of the last completed milestone

### Expected Behavior (Correct)

2.1 WHEN a milestone has a past date (e.g., April 2, 2026) THEN the system SHALL mark it as completed and set its position correctly

2.2 WHEN a milestone has a TBD date (no date) THEN the system SHALL NOT mark it as completed and the progress bar fill SHALL stop at the last completed milestone's position

2.3 WHEN the progress bar calculation runs on projects with past-dated milestones followed by TBD milestones THEN the barFillPct SHALL be set to the position of the last completed milestone (not 100%)

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a project has all milestones with valid dates THEN the system SHALL CONTINUE TO calculate progress bar fill correctly based on the last completed milestone

3.2 WHEN a project has no completed milestones THEN the system SHALL CONTINUE TO show a progress bar fill of 0%

3.3 WHEN a project has all milestones completed THEN the system SHALL CONTINUE TO show a progress bar fill of 100%

3.4 WHEN a project has mixed dated and undated milestones THEN the system SHALL CONTINUE TO handle milestone positioning correctly for display purposes
