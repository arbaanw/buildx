# Data and security

Demo data is local to the browser. It is not an authenticated multi-user service. The included SQL migration is an initial normalized schema, not a production authorization implementation. Do not connect real organization data until RLS is fully specified and tested for every table and storage object. Frontend role switching grants no server permissions.
