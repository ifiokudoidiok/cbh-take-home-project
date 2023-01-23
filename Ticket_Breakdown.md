# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
### Assumptions:
- The assumption is that an agent can be connected to more than one facility and vice versa. The relationship is `many-to-many`.

- Working on a new feature would mean that there is an already existing product. So certain things are already in place; like the database, codebase, tech stack and possibly a production deployed product.

- The basic feature already exists which is to book Agents at Shifts posted by Facilities on the platform

- There is the Frontend and the Backend Repo.

- We need to add a new field to the agents table in the database. This field can be nullable since we already have an existing database with user values. Migrations would need to be run and the tables updated as well. This, even though not trivial, would be best assigned to someone familiar with migrating data.

- Some of the changes will require updating the frontend and the backend codebases.

- The breakdown into tickets have two parts:
    - The Epic: This gives a summary of what we want to achieve.
    - The Stories: This are the individual tickets tackling specific parts of the problem.

- Estimates are broken down into points:
    - 1point => The change should not take more than a day to implement. Its not a trivial change
    - 2points => The change should not take more than two days to implement. Might be trivial; not neccesarily 
    - 3points => The change should not take more than three days to implement. A trivial change and should be assigned to someone more experienced
    - 4points => The change should not take more than four days tp implement. A Complex ticket and should only be assigned to a senior engineer. 
    - N/B: Tickets with points greater than 3 should be broken down further to have sub tasks.

### EPIC:
*Description:*

We need a new feature that will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked.
Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

Note also that the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.

#### Stories:
*Ticket 1: Create New Field for Agent Records in Data Store.*

`Implementation Details`:
- Create new column in Agents table.
- Add unique constraints to the values.
- Run data migration.

`Acceptance Criteria`:
- New field in Agents table created and accessible on database.
- Field should accept unique strings as its value.

`Estimate`:
- 2points.

*Ticket 2: Update Agent management dashboard with custom Agent ID input field.*

`Implementation Details`:
- Add input field to the Agent management dashboard.
- Add a method to the Agent model to save the custom Agent ID.
- Update ORM to account for new field.
- Update tests, maintainting > 85% coverage.

`Acceptance Criteria`:
- The input field is added to Agent management dashboard.
- The field has a visible label `Custom Agent ID`.
- The value is saved in the database.

`Estimate`:
- 3points


*Ticket 3: Update `getShiftsByFacility` to return Custom Agent ID.*

`Implementation Details`:
- Update the `getShiftsByFacility` function to return the custom Agent ID instead of database id.
- Update tests, maintainting > 85% coverage.

`Acceptance Criteria`:
-  The `getShiftsByFacility` function should return the custom Agent ID instead of the database id.

`Estimate`:
- 1point


*Ticket 4: Update `generateReport` to use Custom Agent ID.*

`Implementation Details`:
- Update the `generateReport` to use the custom agent id instead of the database id.
- Update tests, maintainting > 85% coverage.

`Acceptance Criteria`:
- The `generateReport` function should use the custom agent id instead of the database id.

`Estimate`:
- 1point


*Ticket 5: Update Tech documentation, API documentation.*

`Implementation Details`:
- Update the documentation of the API to reflect the new field in the Agents table.
- Update the Tech documentation to reflect the new addition to the data.

`Acceptance Criteria`:
- The API documentation should reflect the new field in the Agents table.
- The tech documentation should reflect the update in the data.

`Estimate`:
- 1point
