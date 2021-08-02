nest-pgsql

Nest.js project for work with PostgreSQL

For absolute path use node.js - module "module-alias"
https://www.npmjs.com/package/module-alias
!!! Then add this line at the very main file of your app, before any code
require('module-alias/register')   !!! <- in manual
 ... in main.ts 

 "start:dev", "start:debug" - delete from package.json;
 For web-dev install nodemon ( https://www.npmjs.com/package/nodemon )
 in "start" run nodemon with config /nodemon.json
 in nodemon.json start "IS_TS_NODE=true ts-node -r tsconfig-paths/register src/main.ts"

 _____________________________________________________________

 
