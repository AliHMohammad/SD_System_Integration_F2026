### REST Endpoint Naming
Imagine that you have a database with CVs whose design is based on the [CV XSD exercise](https://github.com/arturomorarioja-ek/SD_System_Integration_F26_Materials/blob/main/File%20Formats/Exercises/06%20CV%20XSD.md). You have to design a REST API based on this data.

Write down the names of the following REST endpoints:
- List CVs. Either the full list or filtered by:
  - Last name
  - Language

`/cvs`
`/cvs?lastname=&language=`


- Create a new CV
`/cvs`
  
- Get a full CV
`/cvs/id`
- Replace an entire CV
`/cvs/id`
- Partially update a CV
`/cvs/id`
- Delete a CV
`/cvs/id`

- Get personal information for a CV
`/cvs/id/informations`
- Replace personal information for a CV
`/cvs/id/informations`
- Partially update personal information for a CV
`/cvs/id/informations`
- Retrieve the picture file name for a CV
`/cvs/id/pictures`
- Update the picture file name for a CV
`/cvs/id/pictures`

- Get all degrees for a CV
`/cvs/id/degrees`
- Add a new degree to a CV
`/cvs/id/degrees`
- Get one degree for a CV
`/cvs/id/degrees/id`
- Replace a degree in a CV
`/cvs/id/degrees/id`
- Delete a degree in a CV
`/cvs/id/degrees/id`

- Logging in
`/auth`
- Logging out
None. REST is stateless.
