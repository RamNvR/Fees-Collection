mongoexport --db ies-sis --collection lookups --out psgtechlookup.json
mongoimport --db ies-sis --collection lookups --file psgtechlookup.json