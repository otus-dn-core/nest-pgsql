nest-pgsql

Nest.js project for work with PostgreSQL

For absolute path use node.js - module "module-alias"
https://www.npmjs.com/package/module-alias
!!! Then add this line at the very main file of your app, before any code
require('module-alias/register')   !!! <- in manual
 ... in main.ts 

 "start:dev", "start:debug" - delete from package.json;
 in "start" run nodemon with config /nodemon.json

 _____________________________________________________________

 For web-dev install nodemon ( https://www.npmjs.com/package/nodemon )
