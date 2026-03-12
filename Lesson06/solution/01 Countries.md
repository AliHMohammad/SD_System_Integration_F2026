### Countries
Create the following queries in Trevor Blades's [Countries GraphQL API](https://countries.trevorblades.com/):

1. Retrieve the code and name of all continents

```graphql
query {
  continents {
    code
    name
  }
}
```

2. For the continent with the code `EU`, retrieve the name, capital, and currency of all its countries

```graphql
query($filter: ContinentFilterInput) {
  continents(filter: $filter) {
    countries {
      name
      capital
      currency
    }
  }
}

{
  "filter": {
    "code": {
      "eq": "EU"
    }
  }
}
```

3. Add to the previous query the list of languages spoken in each country, including their name in English, their name in the language they give name to, and whether they are written from right to left

```graphql
query($filter: ContinentFilterInput) {
  continents(filter: $filter) {
    countries {
      name
      capital
      currency
      languages {
        name
        native
        rtl
      }
    }
  }
}

{
  "filter": {
    "code": {
      "eq": "EU"
    }
  }
}
```

4. For the language with the code `en`, retrieve the countries where it is spoken and the continent each country belongs to

```graphql
query($filter: LanguageFilterInput) {
  languages(filter: $filter) {
    countries {
      name
      continent {
        name
      }
    }
  }
}

{
  "filter": {
    "code": {
      "eq": "en"
    }
  }
}
```

5. Repeat the previous query so that it receives the country code as a parameter

```graphql
query($filter: CountryFilterInput) {
  countries(filter: $filter) {
    name
    code
    languages {
      rtl
      name
      native
    }
  }
}

{
  "filter": {
    "code": {
      "eq": "AE"
    }
  }
}
```

6. Retrieve the name and capital of all countries. The query should receive a boolean parameter `$showLanguages` which, if true, should also include the code and name of all languages spoken in each country

```graphql
query($showLanguages: Boolean!) {
  countries {
    name
    capital
    languages @include(if: $showLanguages) {
      code 
      name
    }
  }
}

{
  "showLanguages": false
}
```

7. Update the previous query so that it filters countries by continent based on a parameter

```graphql
query($showLanguages: Boolean!, $filter: CountryFilterInput) {
  countries(filter: $filter) {
    name
    capital
    languages @include(if: $showLanguages) {
      code 
      name
    }
  }
}

{
  "showLanguages": false,
  "filter": {
    "continent": {
      "eq": "NA"
    }
  }
}
```

8. A company wants to list primary market countries (those in a specific continent that use a specific currency) and secondary markets (those in the rest of continents that use that specific currency). For each country, the following attributes will be shown: code, name, capital, and continent name. Write a query to solve this problem using a fragment

# Specific continent and currency. List countries

```graphql
query($primaryFilter: CountryFilterInput, $secondaryFilter: CountryFilterInput) {
  primary: countries(filter: $primaryFilter) {
		...CountryFragment
  }
  secondary: countries(filter: $secondaryFilter) {
		...CountryFragment
  }
}

fragment CountryFragment on Country {
    code
    name
    capital
    continent {
      name
    }
}

## Variables

{
  "primaryFilter": {
    "currency": {
      "eq": "USD"
    },
    "continent": {
      "eq": "NA"
    }
  },
  "secondaryFilter": {
    "currency": {
      "eq": "USD"
    },
    "continent": {
      "ne": "NA"
    }
  }
}
```
