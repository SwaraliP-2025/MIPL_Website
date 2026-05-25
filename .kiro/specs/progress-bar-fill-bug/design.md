# Progress Bar Fill Bug - Design

## Overview

The progress bar fill is extending to 100% instead of stopping at the last completed milestone because milestones with past dates are not being marked as `completed: true`. The fix requires ensuring that date parsing correctly converts dates to YYYY-MM-DD format, date comparison correctly identifies past dates as completed, and the progress bar fill width is set to the position of the last completed milestone (not 100%).

## Glossary

- **Bug_Condition (C)**: Milestones with past dates (before today) are not marked as `completed: true`, causing the progress bar to fill beyond the last completed milestone
- **Property (P)**: The progress bar fill width should be set to the position of the last completed milestone, not 100%
- **Preservation**: Existing behavior for projects with all completed milestones, no completed milestones, or all valid dates must remain unchanged
- **parseMilestoneDate()**: Function in `timeline-utils.js` that converts date strings to YYYY-MM-DD format
- **getMilestoneStatus()**: Function in `timeline-utils.js` that determines if a milestone is completed based on date comparison
- **processMilestones()**: Function in `timeline-utils.js` (line 401) that applies completion logic to all milestones
- **barFillPct**: Variable in `script.js` (lines 2618-2631) that stores the progress bar fill percentage

## Bug Details

### Bug Condition

The bug manifests when a project has milestones with past dates (e.g., April 2, 2026 for HRMS, March 11, 2026 for Property Tax Kit Tender) followed by milestones with TBD dates. The `processMilestones()` function is either not correctly parsing the dates, not correctly comparing them to today's date, or not correctly identifying them as completed.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type MilestoneArray
  OUTPUT: boolean
  
  RETURN EXISTS milestone IN input WHERE
         milestone.date is a past date (before today)
         AND milestone.completed = false
         AND EXISTS later_milestone IN input WHERE
             later_milestone.date = "TBD" or null
END FUNCTION
```

### Examples

- **HRMS Project**: "Letter of Award" has date April 2, 2026 (past date), but `completed` is false. "Work Order" has TBD date. Progress bar fills to 100% instead of stopping at "Letter of Award" position.
- **Property Tax Kit Tender**: "Technical Bid Opening" has date March 11, 2026 (past date), but `completed` is false. "Financial Bid Opening" has TBD date. Progress bar fills to 100% instead of stopping at "Technical Bid Opening" position.
- **Chalo Project**: Works correctly - all past-dated milestones are marked as completed, and progress bar stops at the last completed milestone.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Projects with all milestones having valid dates must continue to calculate progress bar fill correctly
- Projects with no completed milestones must continue to show 0% progress bar fill
- Projects with all milestones completed must continue to show 100% progress bar fill
- Milestone positioning for display purposes must remain unchanged

**Scope:**
All inputs that do NOT involve milestones with past dates that are incorrectly marked as incomplete should be completely unaffected by this fix. This includes:
- Projects with all future-dated milestones
- Projects with all completed milestones
- Projects with no milestones
- Milestone display and positioning logic

## Hypothesized Root Cause

Based on the bug description and code analysis, the most likely issues are:

1. **Date Parsing Issue**: The `parseMilestoneDate()` function may not be correctly parsing dates from the Google Sheet (e.g., "02/04/2026" or "April 2, 2026") to YYYY-MM-DD format, resulting in null or invalid dates

2. **Date Comparison Issue**: The `getMilestoneStatus()` function may be using incorrect date comparison logic (e.g., using `<` instead of `<=`, or comparing dates incorrectly due to timezone issues)

3. **Completion Status Not Applied**: The `processMilestones()` function may not be correctly applying the completion status based on the parsed date, or the completion status may be getting overwritten by subsequent logic

4. **Progress Bar Calculation Issue**: The `barFillPct` calculation in `script.js` (lines 2618-2631) may be using the wrong logic to find the last completed milestone or may be defaulting to 100% when no completed milestone is found

## Correctness Properties

Property 1: Bug Condition - Past-Dated Milestones Marked as Completed

_For any_ milestone where the date is a past date (before today), the fixed processMilestones function SHALL mark that milestone as `completed: true`, ensuring the progress bar fill stops at that milestone's position.

**Validates: Requirements 2.1, 2.2, 2.3**

Property 2: Preservation - Non-Buggy Milestone Behavior

_For any_ milestone where the date is a future date or the milestone has no date, the fixed code SHALL produce the same behavior as the original code, preserving all existing functionality for non-buggy milestone scenarios.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `e:\websitee\Project Dashboard\timeline-utils.js`

**Function**: `processMilestones()` (line 401)

**Specific Changes**:

1. **Verify Date Parsing**: Ensure `parseMilestoneDate()` correctly converts all date formats (DD/MM/YYYY, Month YYYY, etc.) to YYYY-MM-DD format
   - Test with dates like "02/04/2026", "April 2, 2026", "2/4/2026"
   - Verify the function returns valid YYYY-MM-DD strings for past dates

2. **Verify Date Comparison**: Ensure `getMilestoneStatus()` correctly compares milestone dates to today's date
   - Use `<=` comparison (milestone date <= today means completed)
   - Handle timezone issues by using UTC dates
   - Verify that past dates are marked as completed

3. **Apply Completion Status**: Ensure `processMilestones()` correctly applies the completion status from `getMilestoneStatus()`
   - Call `getMilestoneStatus()` for each milestone with a valid date
   - Set `milestone.completed = true` if the date is today or before
   - Ensure the sequential guarantee (all milestones before the last completed one are marked as completed)

4. **Verify Progress Bar Calculation**: Ensure `barFillPct` calculation in `script.js` correctly finds the last completed milestone
   - Loop through milestones from end to start
   - Find the last milestone where `completed === true`
   - Set `barFillPct` to that milestone's position
   - If no completed milestone found, set `barFillPct = 0`

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Write tests that simulate milestone data with past dates followed by TBD dates. Run these tests on the UNFIXED code to observe failures and understand the root cause.

**Test Cases**:
1. **HRMS Scenario Test**: Simulate HRMS project with "Letter of Award" (April 2, 2026) and "Work Order" (TBD) - will fail on unfixed code
2. **Property Tax Kit Scenario Test**: Simulate Property Tax Kit Tender with "Technical Bid Opening" (March 11, 2026) and "Financial Bid Opening" (TBD) - will fail on unfixed code
3. **Date Parsing Test**: Test that dates like "02/04/2026" and "April 2, 2026" are correctly parsed to YYYY-MM-DD format
4. **Date Comparison Test**: Test that past dates are correctly identified as completed when compared to today's date

**Expected Counterexamples**:
- Milestones with past dates are not marked as `completed: true`
- Progress bar fill is 100% instead of stopping at the last completed milestone's position
- Possible causes: date parsing returns null, date comparison uses wrong operator, completion status not applied

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL milestone IN milestones WHERE isBugCondition(milestone) DO
  result := processMilestones_fixed(milestone)
  ASSERT result.completed = true
  ASSERT barFillPct = result.position
END FOR
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL milestone IN milestones WHERE NOT isBugCondition(milestone) DO
  ASSERT processMilestones_original(milestone) = processMilestones_fixed(milestone)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain
- It catches edge cases that manual unit tests might miss
- It provides strong guarantees that behavior is unchanged for all non-buggy inputs

**Test Plan**: Observe behavior on UNFIXED code first for future-dated milestones and all-completed scenarios, then write property-based tests capturing that behavior.

**Test Cases**:
1. **Future-Dated Milestone Preservation**: Verify future-dated milestones continue to be marked as incomplete
2. **All-Completed Preservation**: Verify projects with all completed milestones continue to show 100% progress bar fill
3. **No-Completed Preservation**: Verify projects with no completed milestones continue to show 0% progress bar fill
4. **Mixed Dates Preservation**: Verify projects with mixed dated and undated milestones continue to work correctly

### Unit Tests

- Test `parseMilestoneDate()` with various date formats (DD/MM/YYYY, Month YYYY, etc.)
- Test `getMilestoneStatus()` with past, present, and future dates
- Test `processMilestones()` with mixed milestone scenarios
- Test progress bar fill calculation with various milestone configurations

### Property-Based Tests

- Generate random milestone arrays with past and future dates, verify completion status is correct
- Generate random milestone arrays with mixed dated and undated milestones, verify positioning is correct
- Test that progress bar fill never exceeds the position of the last completed milestone
- Test that progress bar fill is 0% when no milestones are completed

### Integration Tests

- Test full timeline display with HRMS project data
- Test full timeline display with Property Tax Kit Tender data
- Test full timeline display with Chalo project data
- Verify progress bar visual appearance matches the last completed milestone position
