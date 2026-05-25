# Progress Bar Fill Bug - Implementation Plan

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Past-Dated Milestones Not Marked as Completed
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: For deterministic bugs, scope the property to the concrete failing case(s) to ensure reproducibility
  - Test implementation details from Bug Condition in design
  - The test assertions should match the Expected Behavior Properties from design
  - Test scenarios:
    - HRMS project: "Letter of Award" (April 2, 2026) should be marked as completed, "Work Order" (TBD) should not
    - Property Tax Kit Tender: "Technical Bid Opening" (March 11, 2026) should be marked as completed, "Financial Bid Opening" (TBD) should not
    - Verify that `processMilestones()` marks past-dated milestones as `completed: true`
    - Verify that progress bar fill stops at the last completed milestone's position, not 100%
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found to understand root cause
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-Buggy Milestone Behavior
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-buggy inputs (future-dated milestones, all-completed scenarios)
  - Write property-based tests capturing observed behavior patterns from Preservation Requirements
  - Property-based testing generates many test cases for stronger guarantees
  - Test scenarios:
    - Projects with all future-dated milestones: progress bar should show 0% or time-based percentage
    - Projects with all completed milestones: progress bar should show 100%
    - Projects with no milestones: progress bar should show 0%
    - Projects with mixed dated and undated milestones: positioning should be correct
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 3. Fix progress bar fill bug

  - [ ] 3.1 Verify date parsing in `parseMilestoneDate()`
    - Review `parseMilestoneDate()` function in `timeline-utils.js`
    - Verify it correctly handles DD/MM/YYYY format (e.g., "02/04/2026" → "2026-04-02")
    - Verify it correctly handles Month YYYY format (e.g., "April 2, 2026" → "2026-04-02")
    - Test with HRMS and Property Tax Kit Tender dates
    - Ensure function returns valid YYYY-MM-DD strings for all date formats
    - _Bug_Condition: isBugCondition(input) where milestone.date is a past date_
    - _Expected_Behavior: parseMilestoneDate() returns valid YYYY-MM-DD format_
    - _Preservation: Date parsing for future dates and other formats remains unchanged_
    - _Requirements: 2.1_

  - [ ] 3.2 Verify date comparison in `getMilestoneStatus()`
    - Review `getMilestoneStatus()` function in `timeline-utils.js`
    - Verify it uses `<=` comparison (milestone date <= today means completed)
    - Verify it handles timezone issues by using UTC dates
    - Test with past dates (should return true), today's date (should return true), future dates (should return false)
    - Ensure function correctly identifies past dates as completed
    - _Bug_Condition: isBugCondition(input) where milestone.date is a past date_
    - _Expected_Behavior: getMilestoneStatus() returns true for past dates_
    - _Preservation: Date comparison for future dates remains unchanged_
    - _Requirements: 2.1_

  - [ ] 3.3 Verify completion status in `processMilestones()`
    - Review `processMilestones()` function in `timeline-utils.js` (line 401)
    - Verify it calls `getMilestoneStatus()` for each milestone with a valid date
    - Verify it sets `milestone.completed = true` if the date is today or before
    - Verify it applies the sequential guarantee (all milestones before the last completed one are marked as completed)
    - Test with HRMS and Property Tax Kit Tender milestone data
    - Ensure past-dated milestones are marked as completed
    - _Bug_Condition: isBugCondition(input) where milestone.date is a past date_
    - _Expected_Behavior: processMilestones() marks past-dated milestones as completed_
    - _Preservation: Completion status for future dates and undated milestones remains unchanged_
    - _Requirements: 2.1, 2.2_

  - [ ] 3.4 Verify progress bar fill calculation in `script.js`
    - Review progress bar fill calculation in `script.js` (lines 2618-2631)
    - Verify it loops through milestones from end to start
    - Verify it finds the last milestone where `completed === true`
    - Verify it sets `barFillPct` to that milestone's position
    - Verify it sets `barFillPct = 0` if no completed milestone found
    - Test with HRMS and Property Tax Kit Tender milestone data
    - Ensure progress bar fill stops at the last completed milestone's position, not 100%
    - _Bug_Condition: isBugCondition(input) where milestone.date is a past date_
    - _Expected_Behavior: barFillPct is set to the position of the last completed milestone_
    - _Preservation: Progress bar fill for all-completed and no-completed scenarios remains unchanged_
    - _Requirements: 2.3_

- [ ] 3.5 Verify bug condition exploration test now passes
  - **Property 1: Expected Behavior** - Past-Dated Milestones Marked as Completed
  - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
  - The test from task 1 encodes the expected behavior
  - When this test passes, it confirms the expected behavior is satisfied
  - Run bug condition exploration test from step 1
  - **EXPECTED OUTCOME**: Test PASSES (confirms bug is fixed)
  - _Requirements: Expected Behavior Properties from design_

- [ ] 3.6 Verify preservation tests still pass
  - **Property 2: Preservation** - Non-Buggy Milestone Behavior
  - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
  - Run preservation property tests from step 2
  - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
  - Confirm all tests still pass after fix (no regressions)

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
